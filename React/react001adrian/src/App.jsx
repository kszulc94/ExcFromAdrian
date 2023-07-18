import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Product from "./components/productPage/Product";
function App() {
  
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product" element={<Product />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
