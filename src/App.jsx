import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './Page/Admin/HomePage/AdminPage';
import Products from './Page/Admin/product/Products';
import AdminLayout from './Layout/AdminLayout';
import Categories from './Page/Admin/Category/Categories';
import AddCategory from './Page/Admin/Category/AddCategory';
import NotFound from './Page/NotFound/NotFound';
import UpdateCategory from './Page/Admin/Category/UpdateCategory';
import User from './Page/Admin/User/User';
import Login from './Page/Admin/User/Login/Login';

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
          <Route path="signin" element={<Login />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>

  </div >;
}

export default App
