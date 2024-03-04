import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/user/Home";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import ServiceProviderLogin from "./components/serviceProvider/ServiceProviderLogin";
import ServiceProviderRegister from "./components/serviceProvider/ServiceProviderRegister";
import ServiceProviderHome from "./components/serviceProvider/ServiceProviderHome";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/service-provider-login" element={<ServiceProviderLogin />} />
          <Route path="/service-provider-register" element={<ServiceProviderRegister />} />
          <Route path="/service-provider-home" element={<ServiceProviderHome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
