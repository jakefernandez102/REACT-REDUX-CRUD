import axiosClient from '../config/axios.js';
import
{
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,

    START_DOWNLOAD_PRODUCTS,
    DOWNLOAD_PRODUCT_SUCCESS,
    DOWNLOAD_PRODUCTS_ERROR,

    GET_PRODUCT_DELETE,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_ERROR,

    GET_PRODUCT_EDIT,
    START_PRODUCT_EDIT,
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_EDIT_ERROR,
} from '../types';
import Swal from 'sweetalert2';



//Crear actions 

//crear nuevos products
export function createNewProductAction ( product )
{
    return async ( dispatch ) =>
    {
        dispatch( addProduct() );

        try
        {
            //insertar en la API
            await axiosClient.post( '/products', product );

            //si todo sale bien actualizar state
            dispatch( addProductSuccess( product ) );

            //Alerta
            Swal.fire(
                'Correct',
                'The product was added successfully!!!',
                'success'
            );
        } catch ( error )
        {
            console.log( error );

            //Si hay un error actualizar state
            dispatch( addProductError( true ) );

            //alerta de error
            Swal.fire( {
                icon: 'error',
                title: 'There was an error!',
                text: 'There was an error, please try again.'
            } );
        }

    };
}

const addProduct = () => ( {
    type: ADD_PRODUCT
} );

//si el producto se guarda en la BD
const addProductSuccess = ( product ) => ( {
    type: ADD_PRODUCT_SUCCESS,
    payload: product
} );


//Si hubo un error
const addProductError = ( error ) => ( {
    type: ADD_PRODUCT_ERROR,
    payload: error
} );

//FUNCION QUE DESCARGA PRODUCTOS DE LA DB
export function getProductsAction ()
{
    return async ( dispatch ) =>
    {
        dispatch( downloadProducts() );

        try
        {
            const { data } = await axiosClient.get( '/products' );
            dispatch( downloadProductsSuccess( data ) );
        } catch ( error )
        {
            dispatch( downloadProductsError() );
        }
    };
}

const downloadProducts = () => ( {
    type: START_DOWNLOAD_PRODUCTS,
    payload: true
} );

const downloadProductsSuccess = ( products ) => ( {
    type: DOWNLOAD_PRODUCT_SUCCESS,
    payload: products
} );

const downloadProductsError = () => ( {
    type: DOWNLOAD_PRODUCTS_ERROR,
    payload: true
} );


// SELECCIONA Y ELIMINA EL PRODUCTO

export function deleteProductAction ( id )
{
    return async ( dispatch ) =>
    {
        dispatch( getProductDelete( id ) );

        try
        {
            await axiosClient.delete( `/products/${ id }` );
            dispatch( deleteProductSuccess() );
        } catch ( error )
        {
            console.log( error );
            dispatch( deleteProductError() );
        }
    };
}

const getProductDelete = ( id ) => ( {
    type: GET_PRODUCT_DELETE,
    payload: id
} );

const deleteProductSuccess = () => ( {
    type: PRODUCT_DELETE_SUCCESS
} );

const deleteProductError = () => ( {
    type: PRODUCT_DELETE_ERROR,
    payload: true
} );


//colocar producto en edicion

export function getProductEdit ( product )
{
    return ( dispatch ) =>
    {
        dispatch( getProductEditAction( product ) );
    };
}

const getProductEditAction = ( product ) => ( {
    type: GET_PRODUCT_EDIT,
    payload: product
} );




//EDITA UN REGISTRO EN LA API Y STATE
export function editProductAction ( product )
{
    console.log( product );
    return async ( dispatch ) =>
    {
        dispatch( editProduct() );

        try
        {
            await axiosClient.put( `/products/${ product?.id }`, product );
            dispatch( editProductSuccess( product ) );
        } catch ( error )
        {
            console.log( error );
            dispatch( editProductError() );
        }
    };
}

const editProduct = () => ( {
    type: START_PRODUCT_EDIT
} );

const editProductSuccess = ( product ) => ( {
    type: PRODUCT_EDIT_SUCCESS,
    payload: product
} );
const editProductError = () => ( {
    type: PRODUCT_EDIT_ERROR,
    payload: true
} );