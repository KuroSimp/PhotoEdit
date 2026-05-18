export class PageRegistry {
  constructor(pageDefinitions, defaultPage) {
    this.pages = pageDefinitions;
    this.defaultPage = defaultPage;
    this.pagesByFile = new Map(pageDefinitions.map((page) => [page.file, page]));
  }

  getPageFromPath(pathname) {
    const file = this.getFilenameFromPath(pathname);
    return this.pagesByFile.get(file) ?? this.defaultPage;
  }

  getFilenameFromPath(pathname) {
    const cleanPath = pathname.replace(/^\/legacy\//, '/').replace(/^\/+/, '');

    if (cleanPath === '' || cleanPath === 'legacy') {
      return this.defaultPage.file;
    }

    const file = cleanPath.split('/').pop();
    return this.pagesByFile.has(file) ? file : this.defaultPage.file;
  }

  isKnownPath(pathname) {
    const file = this.getFilenameFromPath(pathname);
    return this.pagesByFile.has(file);
  }

  normalizePath(pathname) {
    const page = this.getPageFromPath(pathname);
    return page.path;
  }
}
