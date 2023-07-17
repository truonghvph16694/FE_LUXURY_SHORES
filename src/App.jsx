import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './Page/Admin/HomePage/AdminPage';
import Products from './Page/Admin/product/Products';
// import AddProducts from './Page/Admin/product/AddProducts';
import AdminLayout from './Layout/AdminLayout';
import Categories from './Page/Admin/Category/Categories';

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
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products />} />
          {/* <Route path="products/add" element={<AddProducts />} /> */}

    
        </Route>
      </Routes>
    </Router>

  </div >;
}

export default App
