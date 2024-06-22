import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";
import { useGetUserQuery } from "./redux/api/user";
import { getUserInfo } from "./redux/reducer/userReducer";
import { initialUserStateType } from "./types/initialState-types";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Cart = lazy(() => import("./pages/Cart"));
const Search = lazy(() => import("./pages/Search"));
const CheckOut = lazy(() => import("./pages/CheckOut"));
const Order = lazy(() => import("./pages/Order"));
const OrderById = lazy(() => import("./pages/OrderById"));
const Shipping = lazy(() => import("./pages/Shipping"));
const ProductById = lazy(() => import("./pages/ProductById"));
const UserProfile = lazy(() => import("./pages/UserProfile"));

// Admin imports
const UpdateComment = lazy(() => import("./components/UpdateComment"));
const Privacy = lazy(() => import("./components/Privacy"));
const Delivery = lazy(() => import("./components/Delivery"));
const About = lazy(() => import("./components/About"));
const Dashboard = lazy(() => import("./components/admin/Dashboard"));
const NewProduct = lazy(() => import("./components/admin/NewProduct"));
const UpdateProfile = lazy(() => import("./pages/UpdateProfile"));
const Feedback = lazy(() => import("./pages/Feedback"));
const Bar = lazy(() => import("./pages/admin/BarCharts"));
const Pie = lazy(() => import("./pages/admin/PieCharts"));
const Line = lazy(() => import("./pages/admin/LineCharts"));
const AllProducts = lazy(() => import("./pages/admin/AllProduct"));
const AllCustomer = lazy(() => import("./pages/admin/AllCustomer"));
const UpdateProduct = lazy(() => import("./pages/admin/UpdateProduct"));
const UpdateCoupon = lazy(() => import("./pages/admin/UpdateCoupon"));
const Transactions = lazy(() => import("./pages/admin/Transactions"));
const UpdateTransaction = lazy(() => import("./pages/admin/UpdateTransaction"));
const UpdateCancelledOrderById = lazy(() => import("./pages/admin/UpdateCancelledOrderById"));
const AllCancelledOrder = lazy(() => import("./pages/admin/AllCancelledOrder"));
const Stopwatch = lazy(() => import("./pages/admin/Stopwatch"));
const Coupon = lazy(() => import("./pages/admin/Coupon"));

const MainContent = ({ user }: { user: any }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <Header user={user} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product/:id" element={<ProductById />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/about" element={<About />} />

          {/* If the user is already logged in then it should not be able to go to the logged in page or register page. */}
          <Route element={<ProtectedRoute isAuthenticated={user ? false : true} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Only logged in user should be able to access these routes. */}
          <Route element={<ProtectedRoute isAuthenticated={user ? true : false} />}>
            <Route path="/account/:id" element={<UserProfile />} />
            <Route path="/account/update/:id" element={<UpdateProfile />} />
            <Route path="/comment/update/:id" element={<UpdateComment />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/pay" element={<CheckOut />} />
            <Route path="/order/:id" element={<OrderById />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/cart" element={<Cart />} />
          </Route>

          {/* Admin routes & Protected Route */}
          <Route element={
            <ProtectedRoute
              isAuthenticated={user ? true : false}
              adminOnly={true}
              admin={user?.role === 'Admin'}
              redirect="/"
            />
          }>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/bar" element={<Bar />} />
            <Route path="/admin/pie" element={<Pie />} />
            <Route path="/admin/line" element={<Line />} />
            <Route path="/admin/products" element={<AllProducts />} />
            <Route path="/admin/customer" element={<AllCustomer />} />
            <Route path="/admin/products/new" element={<NewProduct />} />
            <Route path="/admin/products/update/:id" element={<UpdateProduct />} />
            <Route path="/admin/coupon/create" element={<Coupon />} />
            <Route path="/admin/coupon/update/:id" element={<UpdateCoupon />} />
            <Route path="/admin/stopwatch" element={<Stopwatch />} />
            <Route path="/admin/transaction" element={<Transactions />} />
            <Route path="/admin/transaction/update/:id" element={<UpdateTransaction />} />
            <Route path="/admin/order/cancelled" element={<AllCancelledOrder />} />
            <Route path="/admin/order/cancelled/update/:id" element={<UpdateCancelledOrderById />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        {!isAdminRoute && <Footer />}
      </Suspense>
    </>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetUserQuery(null);
  const { user, loading } = useSelector((state: { userReducer: initialUserStateType }) => state.userReducer);

  useEffect(() => {
    if (data) {
      dispatch(getUserInfo(data.user));
    }
  }, [data, dispatch]);

  return (
    loading && isLoading ? <Loader /> : (
      <Router>
        <MainContent user={user} />
      </Router>
    )
  );
};

export default App;
