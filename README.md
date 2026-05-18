# Lotus Foto React

Lotus Foto hien la mot du an React + Vite boc ngoai bo giao dien HTML legacy. React khong render lai tung trang bang component moi; thay vao do app se tai HTML trong `public/legacy`, ghep cac fragment dung chung, doi URL anh sang ban WebP toi uu, cap nhat SEO, sau do chay lai script cua tung trang.

## Cong nghe

- React 19
- Vite 7
- Bootstrap va Font Awesome tu CDN
- Sharp de tao anh WebP toi uu
- EmailJS cho form order hien tai

## Chay du an

```bash
npm install
npm run dev
```

`npm start` hien cung chi chay Vite giong `npm run dev`.

Mac dinh app chay tai:

```text
http://localhost:5173/
```

## Lenh chinh

```bash
npm run dev
npm run build
npm run preview
npm run optimize:images
```

- `dev`: chay Vite dev server.
- `build`: build production vao `dist/`.
- `preview`: preview ban build tu `dist/`.
- `optimize:images`: doc anh goc trong `public/images`, tao WebP vao `public/optimized`, va cap nhat `public/optimized/manifest.json`.

## Kien truc hien tai

### 1. React app shell

[src/App.jsx](./src/App.jsx) la diem dieu phoi chinh:

- xac dinh trang hien tai qua `PageRegistry`
- tai HTML legacy qua `LegacyPageLoader`
- ghep header, footer, modal qua `LegacyPageComposer`
- cap nhat metadata qua `SeoManager`
- chay lai script legacy qua `LegacyScriptRunner`
- ap dung animation chung qua `PageAnimationController`

React chi dong vai tro vo boc va coordinator. Noi dung trang van nam trong HTML legacy.

### 2. Legacy pages va fragments

Trang nguon nam trong `public/legacy/`:

```text
index.html
services.html
portfolio.html
order.html
photo-editing.html
day-to-dusk.html
item-removal.html
virtual-staging.html
virtual-renovation.html
```

Header, footer va modal dung chung nam trong `public/legacy/fragments/`.

Trang legacy chen fragment bang placeholder:

```html
<div data-legacy-fragment="header"></div>
<div data-legacy-fragment="footer"></div>
```

Trang home dung bien the rieng:

```html
<div data-legacy-fragment="header" data-variant="home"></div>
```

### 3. Routing va SEO

[src/config/pages.js](./src/config/pages.js) la nguon khai bao route va metadata tung trang.

Khi nguoi dung vao mot URL nhu `/portfolio.html`, `PageRegistry` se map URL do toi file legacy tuong ung. `SeoManager` sau do cap nhat:

- `title`
- `description`
- canonical URL
- Open Graph tags
- Twitter tags

SEO mac dinh trong [index.html](./index.html) duoc thay bang metadata theo trang sau khi app load xong.

### 4. Anh va toi uu anh

Anh goc nam trong:

```text
public/images/
```

Anh runtime toi uu nam trong:

```text
public/optimized/
```

`scripts/optimize-images.mjs` tao WebP toi da `2048px`, chat luong `86`, va sinh manifest de app biet anh nao co ban toi uu. `ImageUrlResolver` se tu dong doi URL dang `/images/...` sang `/optimized/...` neu co ban WebP tuong ung, dong thoi them:

- `loading`
- `decoding`
- `width`
- `height`

Manifest hien tai ghi nhan `182` anh, giam dung luong khoang `92%`.

### 5. JavaScript legacy

Script legacy nam trong:

```text
public/legacy/js/
```

`LegacyScriptRunner` se:

- bo qua cac script React, ReactDOM va Bootstrap da co san
- inline lai script noi bo trong `/legacy/js/`
- rewrite URL anh trong script neu can
- phat lai `DOMContentLoaded` va `load` de code legacy van hoat dong sau khi trang duoc nap dong

### 6. Form order

Form trong [public/legacy/order.html](./public/legacy/order.html) hien gui du lieu bang `EmailJS` tu phia client.

Form gom:

- ten
- email
- ten don
- so file
- dich vu
- noi dung yeu cau

Thong tin cau hinh EmailJS dang nam truc tiep trong file HTML legacy. Hien chua co backend rieng cho order.

## Cau truc thu muc

```text
.
|-- index.html
|-- package.json
|-- scripts/
|   `-- optimize-images.mjs
|-- src/
|   |-- App.jsx
|   |-- main.jsx
|   |-- legacy.css
|   |-- config/
|   |   `-- pages.js
|   `-- services/
|       |-- ImageUrlResolver.js
|       |-- LegacyFragmentRepository.js
|       |-- LegacyPageComposer.js
|       |-- LegacyPageLoader.js
|       |-- LegacyScriptRunner.js
|       |-- PageAnimationController.js
|       |-- PageRegistry.js
|       `-- SeoManager.js
`-- public/
    |-- images/
    |-- optimized/
    `-- legacy/
        |-- fragments/
        |-- js/
        `-- *.html
```

## Cac route hien co

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

## Cach sua noi dung

### Sua text hoac layout cua mot trang

Sua file HTML tuong ung trong `public/legacy/`.

### Sua header, footer, modal dung chung

Sua file trong:

```text
public/legacy/fragments/
```

### Them route moi

1. Tao file HTML moi trong `public/legacy/`.
2. Them khai bao vao `PAGE_DEFINITIONS` trong `src/config/pages.js`.
3. Neu can dung header/footer/modal chung, them placeholder `data-legacy-fragment`.

### Them anh moi

1. Dat anh goc vao `public/images/`.
2. Chay:

```bash
npm run optimize:images
```

3. Trong HTML van co the dung path `/images/...`; app se tu doi sang ban WebP neu manifest co ban toi uu.

## Ghi chu ky thuat

- Du an dang trong giai doan migrate dan tu HTML legacy sang React, nen `dangerouslySetInnerHTML` la co chu dich trong kien truc hien tai.
- `src/legacy.css` gom CSS chung cho toan bo giao dien legacy.
- `PageAnimationController` them reveal animation, blur-up image loading, counter animation va parallax cho mot so thanh phan.
- Home page va mot so trang legacy van tai them thu vien ngoai tu CDN.
- Mot so noi dung legacy van con loi encoding va style inline; day la no ky thuat can xu ly tiep neu tiep tuc migrate.
