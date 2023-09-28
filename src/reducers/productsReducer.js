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
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_EDIT_ERROR,
} from '../types';

// Cada Reducer tiene su propio state
const initialState = {
    products: [],
    error: null,
    loading: false,
    productDelete: null,
    productEdit: {}
};

export default function ( state = initialState, action )
{

    switch ( action.type )
    {
        case START_DOWNLOAD_PRODUCTS:
        case ADD_PRODUCT:
            return {
                ...state,
                loading: true
            };
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                products: [...state.products, action.payload]
            };
        case DOWNLOAD_PRODUCTS_ERROR:
        case ADD_PRODUCT_ERROR:
        case PRODUCT_DELETE_ERROR:
        case PRODUCT_EDIT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case DOWNLOAD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                products: action.payload
            };
        case GET_PRODUCT_DELETE:
            return {
                ...state,
                productDelete: action.payload
            };
        case PRODUCT_DELETE_SUCCESS:
            return {
                ...state,
                products: state.products.filter( product => product.id !== state.productDelete ),
                productDelete: null
            };
        case GET_PRODUCT_EDIT:
            return {
                ...state,
                productEdit: action.payload
            };
        case PRODUCT_EDIT_SUCCESS:
            return {
                ...state,
                productEdit: null,
                products: state.products.map( product => product.id === action.payload.id ? product = action.payload : product )
            };

        default:
            return state;
    }

}