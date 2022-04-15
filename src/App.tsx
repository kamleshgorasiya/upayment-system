import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProductListingPage from "./Components/productListingPage";
import ProductDetailsPage from "./Components/productDetailPage";
import ProductAddForm from "./Components/productAddForm";

function App() {
  return (
    <div className="App bg-gray-200 p-8 h-full min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductListingPage />} />
          <Route path="/:id" element={<ProductDetailsPage />} />
          <Route path="/add-product" element={<ProductAddForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
