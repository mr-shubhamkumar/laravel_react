import  {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'


const ProductList = () => {

    const [products, setProducts] = useState([]);

    useEffect(()=>{
        fetchProducts();
    },[]);

    const fetchProducts = async ()=>{
        await axios.get(`http://localhost:8000/api/products`).then(({data})=>{
            console.log(data);
            setProducts(data);
        })
    }


    const deleteProduct = async (id)=>{
        await axios.delete(`http://localhost:8000/api/products/${id}`).then(({data})=>{
            Swal.fire({
                text: data.message,
                icon: "success"
            })
            fetchProducts();
        }).catch(({response})=>{
            Swal.fire({
                text: response.data.message,
                icon: "error"
            })
        })
    }

  return (
    <div className='container'>
        <div className="row">
            <div className="col-12">
                <Link className='btn btn-primary mb-2 float-end' to={'/product/create'} >
                    Create Product
                </Link>
            </div>

            <div className="col-12">
                <div className="cart cart-body">
                    <div className="table-responsive">
                        <table className="table table-bordered mb-0 text-center">
                            <thead>
                                <tr>
                                    <td>Title</td>
                                    <td>Description</td>
                                    <td>Image</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length > 0 ? (
                                    products.map((row, key) => (
                                        <tr key={key}>
                                            <td>{row.title}</td>
                                            <td>{row.description}</td>
                                            <td>
                                                <img width="50px" src={`http://localhost:8000/storage/product/image/${row.image}`} alt="" />
                                            </td>
                                            <td>
                                                <Link to={`/product/edit/${row.id}`} className='btn btn-success me-2'>
                                                    Edite
                                                </Link>
                                                <Button variant='danger' onClick={()=>deleteProduct(row.id)}>
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ):(
                                    <>
                                    <tr>
                                        <td colSpan={'4'}>
                                            No Product Data
                                        </td>
                                    </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductList