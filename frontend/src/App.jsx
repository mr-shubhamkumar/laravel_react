import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import NavBar from 'react-bootstrap/Navbar';
import { Container, Row, Col} from 'react-bootstrap'
import {BrowserRouter as Router , Routes, Route, Link} from 'react-router-dom'
import ProductList from './Components/ProductList'
import CreateProduct from './Components/CreateProduct'
import EditProduct from './Components/EditProduct';
function App() {
  

  return (
    <>
    <Router>
      <NavBar bg="primary">
        <Container>
          <Link to={'/'} className='navbar-brand text-white'>
            Laravel & React Crud
          </Link>
        </Container>
      </NavBar>

      <Container className='mt-5'>
        <Row>
          <Col mb={12}>
            <Routes>
              <Route exact path='/' element={<ProductList/>} />
              <Route  path='/product/create' element={<CreateProduct/>} />
              <Route  path='/product/edit/:id' element={<EditProduct/>} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router> 
    </>
  )
}

export default App
