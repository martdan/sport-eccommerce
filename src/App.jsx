import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Shop } from './pages/shop/shop';
import { Cart } from './pages/cart/cart';
import Sell from "./pages/Sell";
import { ShopContextProvider } from "./context/shop-context";
import { AuthProvider } from "./components/AuthProvider";
import Login from "./pages/Login";  // Add Login page
import Signup from "./pages/Signup";  // Add Signup page
import Profile from "./pages/Profile";  // Add Profile page
import PrivateRoute from "./components/PrivateRoute";  // For protected routes
import Checkout from "./pages/CheckOut"; // Add Checkout page

// Import Stripe dependencies
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Load Stripe with your publishable key (replace with your actual key)
const stripePromise = loadStripe("pk_test_51QCOOVCxGoKhLvP8Sjh1FsYSvDxyEJXbUViZ02vY9fGJT0t97r2hpmv1qdp0415yehPRbEtGSfQ8d9JQlRafzxwN00UW2DwIJb");

function App() {
  return (
    <div className="App">
      <AuthProvider> {/* Wrap the app with AuthProvider to manage authentication */}
        <ShopContextProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/sell" element={<Sell />} />

              {/* Add authentication routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protect the profile route (only accessible if logged in) */}
              <Route path="/profile" element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } />

              {/* Wrap the Checkout page with Elements for Stripe */}
              <Route path="/checkout" element={
                <Elements stripe={stripePromise}>
                  <Checkout />
                </Elements>
              } />
            </Routes>
          </Router>
        </ShopContextProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
