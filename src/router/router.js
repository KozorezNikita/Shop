import About from "../pages/About";
import Shop from "../pages/Shop";
import ProductItemId from "../pages/ProductItemId";
import Cart from "../pages/Cart";

export const shopRoutes = [
  { path: "/about", component: About, exact: true },
  { path: "/shop", component: Shop, exact: true },
  { path: "/shop/:id", component: ProductItemId, exact: true },
  { path: "/cart", component: Cart, exact: true },
];
