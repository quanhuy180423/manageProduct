// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AddProduct from './components/addProduct/AddProduct'
import Layout from './Layout'
import ProductList from './components/showProduct/ProductList'
import { ProductDetail } from './components/showProduct/ProductDetail'
import Dashboard from './components/dasboard/Dashboard'
import "./App.css"
import EditProduct from './components/editProduct/EditProduct'
function App() {


  return (
    <>
      <div className='app'>
        <Router>
          <Routes >
            <Route path='/' element={<Layout />} >
              <Route index element={<ProductList />} />
              <Route path='/Product/:id' element={<ProductDetail />} />
              <Route path='/Product/Edit/:id' element={<EditProduct />} />
              <Route path='/Dashboard' element={<Dashboard />} />
              <Route path='/addProduct' element={<AddProduct />} />
            </Route>
          </Routes>
        </Router>
      </div>

    </>
  )
}

export default App
