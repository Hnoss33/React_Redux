import { TRAER_TODOS, CARGANDO, ERROR } from '../types/usuariosTypes';
const INITIAL_STATE = {
    usuarios: [],
    cargando: false, //cuando corre o hace render comienza en falso la primera vez en el initialState luego entra en el despatch de cargando, que esta en usuariosAction,linea 6
    //y cuando cambia el estado, el render vuelve a cambiar osea que es true, y cuando se realiza el dispatch de traer todos 
    //va al reducer y le dice que ya no esta cargando osea que nos vamos a la linea 17 y lo coloca en falso porque no esta cargandi  
    error: ''
};
//aca usuarios se conecta al reducer
//aca el usuariosReducer verifica si tienen el caso Traer usuarios, recordar que venimos de usuariosActions con el Dispatch
export default (state = INITIAL_STATE, action) => {
    switch (action.type)  {
        case TRAER_TODOS: //este es el caso de traer usuarios se llama desde usuariosActions con el Dispatch 
        //abajo en la linea 10 dice : que retorne todo lo que tenia en el estado, pero aparte voy a sobreescribir usuarios del estado que tienen en ese momento con LA INFO del actionCreator me esta entregando.
        //esto lo entrega con el PAYLOAD que vienen siendo RESPUESTA.DATA EN el archivo usuariosAction, esto se encuentra en el archivo js linea 10
            return { ...state, 
                usuarios: action.payload,
                cargando: false,
                error: '' // aca lo coloca en falso despues de que el estado cambia en el render vuelve aca para verificar que no esta cargando y se coloca en falso 
            } //una ves que este estado cambia el virtual DOM ya sabe donde colocarlo apenas esto cambia, se va al componente linea 35 en render ahi lo coloca.  
    
            case CARGANDO:
                return { ...state, cargando: true };
    
            case ERROR:
                return { ...state, error: action.payload, cargando: false };
    
            default: return state;
        };
    };