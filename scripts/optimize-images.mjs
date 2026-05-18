import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = process.cwd();
const inputDir = path.join(rootDir, 'public', 'images');
const outputDir = path.join(rootDir, 'public', 'optimized');
const maxDimension = 2048;
const webpQuality = 86;
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return walk(fullPath);
      return fullPath;
    }),
  );

  return files.flat();
}

function toPublicPath(filePath) {
  return `/${filePath.split(path.sep).join('/')}`;
}

async function optimizeImage(sourcePath) {
  const relativePath = path.relative(inputDir, sourcePath);
  const sourcePublicPath = `/images/${relativePath.split(path.sep).join('/')}`;
  const outputRelativePath = `${relativePath}.webp`;
  const outputPath = path.join(outputDir, outputRelativePath);
  const outputPublicPath = toPublicPath(path.join('optimized', outputRelativePath));

  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  const sourceStats = await fs.stat(sourcePath);
  const transformer = sharp(sourcePath, { failOn: 'none' }).rotate();
  const metadata = await transformer.metadata();
  const shouldResize =
    Number.isFinite(metadata.width) &&
    Number.isFinite(metadata.height) &&
    Math.max(metadata.width, metadata.height) > maxDimension;

  let pipeline = transformer;
  if (shouldResize) {
    pipeline = pipeline.resize({
      width: maxDimension,
      height: maxDimension,
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  await pipeline.webp({ quality: webpQuality, effort: 5 }).toFile(outputPath);

  const outputStats = await fs.stat(outputPath);
  const optimizedMetadata = await sharp(outputPath).metadata();

  return {
    source: sourcePublicPath,
    optimized: outputPublicPath,
    originalBytes: sourceStats.size,
    optimizedBytes: outputStats.size,
    width: optimizedMetadata.width,
    height: optimizedMetadata.height,
  };
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });

  const files = (await walk(inputDir)).filter((file) => imageExtensions.has(path.extname(file).toLowerCase()));
  const images = [];

  for (const file of files) {
    images.push(await optimizeImage(file));
  }

  const totals = images.reduce(
    (acc, image) => ({
      originalBytes: acc.originalBytes + image.originalBytes,
      optimizedBytes: acc.optimizedBytes + image.optimizedBytes,
    }),
    { originalBytes: 0, optimizedBytes: 0 },
  );

  const manifest = {
    generatedAt: new Date().toISOString(),
    maxDimension,
    webpQuality,
    totalImages: images.length,
    originalBytes: totals.originalBytes,
    optimizedBytes: totals.optimizedBytes,
    savingsPercent: Number((100 - (totals.optimizedBytes / totals.originalBytes) * 100).toFixed(2)),
    images,
  };

  await fs.writeFile(path.join(outputDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);

  console.log(
    `Optimized ${manifest.totalImages} images: ${(manifest.originalBytes / 1024 / 1024).toFixed(1)}MB -> ${(
      manifest.optimizedBytes /
      1024 /
      1024
    ).toFixed(1)}MB (${manifest.savingsPercent}% smaller)`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
