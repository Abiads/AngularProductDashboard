# Angular Product Dashboard

A basic Angular 17 product dashboard app:
- Product model: id, name, category, price, stock, status, createdAt
- Product table with search, filter, sort, pagination
- Add / edit product dialog component
- Delete product action
- Product service with localStorage persistence

## Commands

- Install dependencies:
  ```bash
  npm install
  ```
- Start development server (open browser):
  ```bash
  ng serve --open
  ```
  or
  ```bash
  npm start
  ```
- Build static assets:
  ```bash
  npm run build
  ```

## Output

- Built files placed in: `dist/angular-product-dashboard`

## Images (diagrams)

- Local project assets:
  - `![Product flow](assets/Architecture_Tutorial-diagram.png)`
  - `![Component structure](assets/Architecture_Tutorial.png)`

- GitHub raw URLs:
  - `![Product flow](https://raw.githubusercontent.com/Abiads/AngularProductDashboard/9fdb6430e33350e5239efe87c074e473986983d4/src/assets/Architecture_Tutorial-diagram.png)`
  - `![Component structure](https://raw.githubusercontent.com/Abiads/AngularProductDashboard/9fdb6430e33350e5239efe87c074e473986983d4/src/assets/Architecture_Tutorial.png)`



## Main files

- `src/app/models/product.model.ts`
- `src/app/services/product.service.ts`
- `src/app/components/product-dialog/product-dialog.component.ts`
- `src/app/app.component.ts`

## Notes

- This repository uses Angular Material for table, paginator and dialogs.
- To regenerate assets for deployment: run `npm run build`.

