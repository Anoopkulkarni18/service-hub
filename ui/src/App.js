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
import Footer from "./components/user/Footer";
import Navbar from "./components/user/Navbar";
import Orders from "./components/user/Orders";
import NavbarServiceProvider from "./components/serviceProvider/NavbarServiceProvider";
import ServiceProviderOrders from "./components/serviceProvider/ServiceProviderOrders";
import { ServiceContextProvider } from "./components/user/context/ServiceContext";
import ServiceProviderCompletedOrders from "./components/serviceProvider/ServiceProviderCompletedOrders";

function App() {
  return (
    <CartProvider>
      <ServiceContextProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <Home />
                    <Footer />
                  </>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/profile"
                element={
                  <>
                    <Navbar />
                    <Profile />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/cart"
                element={
                  <>
                    <Navbar />
                    <Cart />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/orders"
                element={
                  <>
                    <Navbar />
                    <Orders />
                    <Footer />
                  </>
                }
              />
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
                element={
                  <>
                    <NavbarServiceProvider
                      style={{ position: "sticky", top: 0, zIndex: 1000 }}
                    />
                    <ServiceProviderHome />
                  </>
                }
              />
              <Route
                path="/service-provider-orders"
                element={
                  <>
                    <NavbarServiceProvider
                      style={{ position: "sticky", top: 0, zIndex: 1000 }}
                    />
                    <ServiceProviderOrders />
                  </>
                }
              />
              <Route
                path="/service-provider-completed-orders"
                element={
                  <>
                    <NavbarServiceProvider
                      style={{ position: "sticky", top: 0, zIndex: 1000 }}
                    />
                    <ServiceProviderCompletedOrders />
                  </>
                }
              />
            </Routes>
          </div>
        </Router>
      </ServiceContextProvider>
    </CartProvider>
  );
}

export default App;
