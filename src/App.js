import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";

import SignUp from "./components/SignUp";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import MyPage from "./pages/MyPage";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import ReaviewAdd from "./components/ReviewAdd";
import OrderConfirm from "./pages/OrderConfirm";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/:id" element={<ProductDetail />} />

          <Route path="signup" element={<SignUp />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orderconfirm" element={<OrderConfirm />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="mypage/review" element={<ReaviewAdd />}></Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
