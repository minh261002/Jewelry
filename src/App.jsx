import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import DetailPage from "./Pages/DetailPage";
import ProductPage from "./Pages/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dang-ky" element={<RegisterPage />} />
        <Route path='/dang-nhap' element={<LoginPage />} />
        <Route path="/san-pham/:id" element={<DetailPage />} />
        <Route path="/san-pham" element={<ProductPage />} />
        <Route path="/danh-muc/:id" element={<ProductPage />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;