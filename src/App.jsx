
import { Routes, Route } from "react-router-dom";
// import Product from "./components/Razorpay/Product";

//import Product from "./components/Product"
import Sponsors from "./pages/Sponsors";
import Teams from "./pages/Teams";


function App() {
  return (
    <Routes>
      {/* Home route */}
      <Route
        path="/"
        element={
          <h1 className="text-3xl font-bold underline text-cyan-500">
            Hello Vite + React!
          </h1>
        }
      />

      {/* Sponsors route */}
      <Route path="/sponsors" element={<Sponsors />} />
      {/* Teams route */}
      <Route path="/teams" element={<Teams />} />
      

      {/* Razorpay demo route (optional for later) */}
      {/* <Route path="/payment-test" element={<Product />} /> */}
    </Routes>
  );
}

export default App;
