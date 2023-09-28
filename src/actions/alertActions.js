import
{
    SHOW_ALERT,
    HIDE_ALERT
} from '../types';

//MUESTRA UNA ALERTA

export function showAlert ( alert )
{
    return ( dispatch ) =>
    {
        dispatch( createAlert( alert ) );

    };
}

const createAlert = ( alert ) => ( {
    type: SHOW_ALERT,
    payload: alert
} );

//OCULTAR ALERTA

export function hideAlertAction () 
{
    return ( dispatch ) =>
    {
        dispatch( hideAlert() );
    };
}

const hideAlert = () => ( {
    type: HIDE_ALERT
} );