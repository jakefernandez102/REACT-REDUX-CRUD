import {useDispatch, useSelector } from "react-redux";
import { editProductAction } from "../actions/productActions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProduct = () => {

    const [productEdited, setProductEdited] = useState({
        id:'',
        name:'',
        price:''
    })
    const navigate = useNavigate()
    //producto a editar
    const product = useSelector(state => state.products.productEdit)
    
    //llenar state automaticamente
    useEffect(()=>{
        setProductEdited(product)
    },[product])
    //leer los datos del form
    const onChangeForm = (e)=>{
        
        setProductEdited({
            ...productEdited,
            [e.target.name]:e.target.value
        })
    }
    
    const {name,price} = productEdited
    
    const dispatch = useDispatch()
        
    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(editProductAction(productEdited))
        navigate('/')
    }

    return (
        <div className='row justify-content-center'>
            <div className='col-md-8'>
                <div className='card'>
                    <div className='card-body'>
                        <h2 className='text-center mb-4 font-weight-bold'>Edit Product</h2>
                    
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label htmlFor="product-name">Product Name:</label>
                                <input
                                    className='form-control' 
                                    type="text" 
                                    name='name'
                                    id='product-name' 
                                    placeholder='Product Name'
                                    value={name }
                                    onChange={onChangeForm}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="product-price">Product Price:</label>
                                <input
                                    className='form-control' 
                                    type="number" 
                                    name='price'
                                    id='product-price' 
                                    placeholder='Product Price'
                                    value={ price }
                                    onChange={onChangeForm}
                                />
                            </div>

                            <button
                                type='submit'
                                className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
                            >
                                Edit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default EditProduct