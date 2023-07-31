import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './Page/Admin/HomePage/AdminPage';
import Products from './Page/Admin/product/Products';
import Demo from './Page/Admin/product/Demo';
import AddProducts from './Page/Admin/product/AddProducts';
import AdminLayout from './Layout/AdminLayout';
import Categories from './Page/Admin/Category/Categories';
import AddCategory from './Page/Admin/Category/AddCategory';
import Orders from './Page/Admin/Orders/Orders'
import NotFound from './Page/NotFound/NotFound';
import UpdateCategory from './Page/Admin/Category/UpdateCategory';
import User from './Page/Admin/User/User';
import Login from './Page/Auth/Login/Login';
import Signup from './Page/Auth/Signup/Signup';
import UpdateProduct from './Page/Admin/product/UpdateProduct';
import UpdateOrders from './Page/Admin/Orders/UpdateOrders';
import Bills from './Page/Admin/Bills/Bills';
import Order_detail from './Page/Admin/Order_Detail/Order_Detail';
import Feedback from './Page/Admin/feedback/Feedback/';

function App() {
  return <div className="App">
    <Router>
      <Routes>
        <Route path="admin/"
          element={
            // <PrivateLayout>
            <AdminLayout />
            // </PrivateLayout>
          } >
          <Route index element={<AdminPage />} />
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
          <Route path="demo" element={<Demo />} />


        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>

  </div >;
}

export default App
