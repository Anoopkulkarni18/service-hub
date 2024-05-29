import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router, Routes, and Route
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/user/Home";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import ServiceProviderLogin from "./components/serviceProvider/ServiceProviderLogin";
import ServiceProviderRegister from "./components/serviceProvider/ServiceProviderRegister";
import ServiceProviderHome from "./components/serviceProvider/ServiceProviderHome";
import Profile from "./components/user/Profile";
import { CartProvider } from "./components/user/context/CartContext";
import Cart from "./components/user/Cart";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/service-provider-login"
              element={<ServiceProviderLogin />}
            />
            <Route
              path="/service-provider-register"
              element={<ServiceProviderRegister />}
            />
            <Route
              path="/service-provider-home"
              element={<ServiceProviderHome />}
            />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
