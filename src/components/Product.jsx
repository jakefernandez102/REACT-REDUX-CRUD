/* eslint-disable react/prop-types */
import {  useNavigate } from "react-router-dom";

//redux
import { useDispatch } from "react-redux";
import { deleteProductAction, getProductEdit } from "../actions/productActions";
import Swal from "sweetalert2";

const Product = ({product}) => {
    const {name, price,id} = product;
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //consfirmar si desea eliminarlo
    const handleClick=(id)=>{
        //preguntar al usuario 
        Swal.fire({
            title: 'Do you want to delete the product?',
            icon:'info',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Confirm',
            denyButtonText: `Cancel`,
            }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                //pasarlo al action
                dispatch(deleteProductAction(id))
                Swal.fire("Product deleted successfully!!!", '', 'success')
            } else if (result.isDenied) {
                Swal.fire("We didn't delete the product", '', 'info')
            }
        })

    }

    //funcion que redirige que forma programada
    const redirectEdition = product =>{
        dispatch(getProductEdit(product))
        navigate(`/products/edit/${product.id}`)
    }

  return (
    <tr>
        <td>
            {name}
        </td>
        <td>
            <span className='font-weight-bold'>${price}</span>
        </td>
        <td className='acciones'>
            <button 
                type='button' 
                className='btn btn-primary mr-2'
                onClick={()=>redirectEdition(product)}
            >
                Edit
            </button>
            <button 
                type='button'
                className='btn btn-danger'
                onClick={()=>handleClick(id)}
            >
                DELETE
            </button>
        </td>
    </tr>
  )
}

export default Product