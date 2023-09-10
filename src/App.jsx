import './App.css'
import { Route, Routes } from 'react-router-dom';
import AdminLayout from './Layout/AdminLayoutt';
import ClientLayout from './Layout/ClientLayout';
// import AdminPage from './Page/Admin/HomePage/AdminPage';
import Products from './Page/Admin/product/Products';
import AddProducts from './Page/Admin/product/AddProducts';
import Categories from './Page/Admin/Category/Categories';
import AddCategory from './Page/Admin/Category/AddCategory';
import Orders from './Page/Admin/Orders/Orders'
import NotFound from './Page/NotFound/NotFound';
import UpdateCategory from './Page/Admin/Category/UpdateCategory';
import User from './Page/Admin/User/User';
import Signup from './Page/Auth/Signup/Signup';
import UpdateProduct from './Page/Admin/product/UpdateProduct';
import UpdateOrders from './Page/Admin/Orders/UpdateOrders';
import Bills from './Page/Admin/Bills/Bills';
import Order_detail from './Page/Admin/Order_Detail/Order_Detail';
import Feedback from './Page/Admin/feedback/Feedback/';
import HomePage from './Page/Home/HomePage';
import Cart from './Page/Cart/Cart';
import Signin from './Page/Auth/Signin/Signin';
import Tintuc from './Page/Tintuc/Tintuc';
import Lienhe from './Page/Lienhe/Lienhe';
import Product from './Page/Product/Product';
import Product_detail from './Page/Detail/Product_detail';
import Dashboard from './Page/Admin/Dashboard/Dashboard';
import Checkout from './Page/Checkout/Checkout';
import OrdersClient from './Page/Orders';
import Thanks from './Page/Thanks/Thanks';
import Feedback_client from './Page/Feedback/Feedback_client';


function App() {
  return <div className="App">
    <Routes>
      <Route path="admin/"
        element={
          <AdminLayout />
        } >
        <Route index element={<Dashboard />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path="category" element={<Categories />} />
        <Route path="category/add" element={<AddCategory />} />
        <Route path="category/edit/:id" element={<UpdateCategory />} />
        <Route path="products" element={<Products />} />
        <Route path="user" element={<User />} />
        <Route path="products/add" element={<AddProducts />} />
        <Route path="products/edit/:id" element={<UpdateProduct />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/edit/:id" element={<UpdateOrders />} />
        <Route path="bills" element={<Bills />} />
        <Route path="order-detail/:id" element={<Order_detail />} />
        <Route path="feedback" element={<Feedback />} />
        {/* <Route path="demo" element={<Demo />} /> */}
        {/* <Route path='dashboard' element={<Dashboard />} /> */}
      </Route>



      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
      <Route path="feedback/:id" element={<Feedback_client />} />


      {/* Frontend Route */}
      <Route path="/" element={<ClientLayout />}>
        <Route index path='/' element={<HomePage />} />
        <Route path='tintuc' element={<Tintuc />} />
        <Route path='lienhe' element={<Lienhe />} />
        <Route path='product' element={<Product />} />
        <Route path='product/:id' element={<Product_detail />} />
        <Route path='cart' element={<Cart />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='orders' element={<OrdersClient />} />
        <Route path='thanks/:id' element={<Thanks />} />

      </Route>
    </Routes >

  </div >;
}

export default App
