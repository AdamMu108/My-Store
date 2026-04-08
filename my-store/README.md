# MyStore

MyStore is a single-page e-commerce application built with Angular. It displays a product catalog, allows users to view product details, add items to cart, update quantities, remove items, complete checkout with form validation, and see an order confirmation page.

The app uses local product data from data.json and serves product images from the project images folder.

## Setup and Run

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
ng serve
```

3. Open the app:

http://localhost:4200/

## Application Flow

1. The app loads the Products page and fetches product data via HttpClient.
2. Users can open product details or add products to cart.
3. The Cart page shows selected items, supports quantity updates/removal, and displays total cost.
4. Users proceed to Checkout, complete validated form fields, and place the order.
5. The app clears the cart and navigates to Order Confirmation.

## Component Structure

- App (`src/app/app.ts`)
  - Root shell with router outlet.
  - Subscribes to cart state and passes cart item count to header.
- AppHeader (`src/app/components/app-header`)
  - Child of App.
  - Uses Input for cart count and Output event to request navigation.
- ProductList (`src/app/components/product-list`)
  - Shows all products using ngFor.
  - Sends add-to-cart actions to CartService.
- ProductDetails (`src/app/components/product-details`)
  - Shows single product image, name, price, and description.
  - Supports quantity input with ngModel and ngModelChange.
- Cart (`src/app/components/cart`)
  - Displays cart items and dynamic totals.
  - Supports quantity updates and remove actions.
  - Shows feedback when items are removed.
- Checkout (`src/app/components/checkout`)
  - Collects billing/shipping/payment inputs.
  - Validates user input before submitting order.
- OrderConfirmation (`src/app/components/order-confirmation`)
  - Shows success message, order number, and order date.

## Services and Models

- ProductService (`src/app/services/product.service.ts`)
  - Fetches product data from data.json using HttpClient.
- CartService (`src/app/services/cart.service.ts`)
  - Central cart state for sibling components.
  - Handles add, remove, quantity update, totals, and localStorage persistence.
- Product Model (`src/app/models/product.ts`)
  - Strong typing for product fields.
- CartItem Model (`src/app/models/cart-item.ts`)
  - Typed structure for cart entries.

## Routing

Routes are configured in `src/app/app.routes.ts`:

- /products
- /product/:id
- /cart
- /checkout
- /confirmation

The app uses router-outlet and routerLink for SPA navigation without full page reload.

## Build and Test

- Build: `ng build`
- Unit test: `ng test`
