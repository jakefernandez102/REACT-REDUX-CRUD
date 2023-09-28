
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../actions/productActions";
import { useEffect } from "react";
import Product from "./Product";
import Spinner from './Spinner';



const Products = () => {

  const dispatch = useDispatch()

  useEffect(()=>{

    //Consultar la API
    const loadProducts = ()=> dispatch(getProductsAction())
    loadProducts()
  
  },[])

  //Obtener el state
  const products = useSelector(state => state.products.products)
  const error = useSelector(state => state.products.error)
  const loading = useSelector(state => state.products.loading)
  
  return (
    <>
      <h2
        className='text-center my-5'
      >
        Products List
      </h2>

      {error ? <p className='font-weight-bold alert alert-danger text-center mt-4'>There was an error</p> : null}

      <table className='table table-striped'>
        <thead className='bg-primary table-dark'>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Price</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            products.length === 0 ? <tr><td className='text-center font-weight-bold'>There are no products</td></tr> : (
              products.map(product => (
                <Product 
                  key={product.id} 
                  product={product} 
                />
              ))
            )
          }
        </tbody>
      </table>
      {
            loading ? <Spinner/> : null
          }
    </>
  )
}

export default Products