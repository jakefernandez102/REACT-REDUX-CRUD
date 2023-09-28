/* eslint-disable react/prop-types */

import {useDispatch,useSelector} from 'react-redux'

//Actions de Redux
import { createNewProductAction } from "../actions/productActions";
import { useState } from 'react';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { hideAlertAction, showAlert } from '../actions/alertActions';




const NewProduct = () => {
    
    //state del componente
    const [name,setName]=useState('')
    const [price,setPrice]=useState(0)

    const navigate = useNavigate()

    //utilizar useDispatch y te crea o devuelve una funcion
    const dispatch = useDispatch();

    //acceder al state del store
    const loading =useSelector((state) => state.products.loading )
    const error =useSelector((state) => state.products.error )
    const currentAlert = useSelector(state => state.alert.alert)
    
    

    //mandar llamar el action de productAction
    const addProduct = (product)=> dispatch(createNewProductAction(product))

    //cuando el usuario haga submit
    const handleSubmit = (e)=>{
        e.preventDefault()

        //validar formulario
        if(name.trim() === '' || price <= 0){

            const alert = {
                msg: 'All field are required',
                classes:'alert alert-danger text-center text-uppercase p-3'
            }
            dispatch(showAlert(alert))
            return
        }

        //Revisar que no haya errores
        dispatch(hideAlertAction())

        //Crear el nuevo producto
        addProduct({
            name,
            price
        })

        //direccionar
        navigate('/')
    }

    return (
    <div className='row justify-content-center'>
        <div className='col-md-8'>
            <div className='card'>
                <div className='card-body'>
                    <h2 className='text-center mb-4 font-weight-bold'>Add new Product</h2>
                    {
                        alert ? <p className={currentAlert?.classes}>{currentAlert?.msg}</p> : null
                    }
                    <form 
                        onSubmit={handleSubmit}
                    >
                        <div className='form-group'>
                            <label htmlFor="product-name">Product Name:</label>
                            <input
                                className='form-control' 
                                type="text" 
                                name='product-name'
                                id='product-name' 
                                placeholder='Product Name'
                                value={name}
                                onChange={e=>setName(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="product-price">Product Price:</label>
                            <input
                                className='form-control' 
                                type="number" 
                                name='product-price'
                                id='product-price' 
                                placeholder='Product Price'
                                value={price}
                                onChange={e=>setPrice(+e.target.value)}
                            />
                        </div>

                        <button
                            type='submit'
                            className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
                        >
                            Add
                        </button>
                    </form>
                    {loading ? <Spinner/> : null}
                    {error ? <p className='alert alert-danger p-2 mt-4 text-center'>There was an error</p> : null}
                </div>
            </div>
        </div>
    </div>
  )
}

export default NewProduct