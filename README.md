# Lotus Foto React

Project da duoc chuyen sang React + Vite. App React chay tu root `/` va render lai dung HTML/JS legacy de giu nguyen giao dien va logic cu trong luc migrate dan.

## Cai dat

```bash
npm install
```

## Chay local

```bash
npm start
```

Hoac:

```bash
npm run dev
```

Mac dinh Vite se chay o:

```text
http://localhost:5173/
```

## Build production

```bash
npm run build
```

File build se nam trong thu muc `dist/`.

## Toi uu anh

```bash
npm run optimize:images
```

Lenh nay tao anh WebP toi da 2048px trong `public/optimized` va sinh `public/optimized/manifest.json`. App React se tu dung anh optimized khi render HTML/JS legacy.

## Xem ban build

```bash
npm run preview
```

## Cau truc thu muc

```text
.
├── index.html              # Entry HTML cho React/Vite
├── src/
│   ├── main.jsx            # Mount React app
│   ├── App.jsx             # React loader cho cac trang legacy
│   └── legacy.css          # CSS goc duoc import vao React bundle
├── public/
│   ├── images/             # Tat ca image dung chung
│   └── legacy/             # HTML/JS cu
│       └── js/             # main.js, portfolio.js, react-banner-services.js cu
├── package.json
└── README.md
```

## Trang hien co

Cac trang HTML cu co the mo qua duong dan:

```text
/
/services.html
/portfolio.html
/order.html
/photo-editing.html
/day-to-dusk.html
/item-removal.html
/virtual-staging.html
/virtual-renovation.html
```

## Ghi chu

- `styles.css` cu khong con nam o root; noi dung CSS goc duoc dua vao `src/legacy.css` de React build cung giao dien cu.
- HTML/JS cu van duoc giu trong `public/legacy` va duoc React load lai.
- Image da duoc chuyen sang `public/images`, nen trong app co the dung path dang `/images/...`.
- Anh goc nam trong `public/images`; anh hien thi nhanh hon nam trong `public/optimized`.
- SEO mac dinh nam trong `index.html`; metadata theo tung trang duoc cap nhat trong `src/services/SeoManager.js`.
- Logic load trang legacy duoc tach thanh service trong `src/services/` de de migrate dan sang component React that.
