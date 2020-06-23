import {
	TRAER_TODAS,
	CARGANDO,
	ERROR,
	CAMBIO_USUARIO,
	CAMBIO_TITULO,
	GUARDADA,
    ACTUALIZAR,
    LIMPIAR
} from '../types/tareasTypes';

const INITIAL_STATE = {
	tareas: {},
	cargando: false,
	error: '',
	usuario_id: '',
	titulo: '',
	regresar: false
};

// En el tareasReducer inicializamos un atributo en el estado llamado
// regresar en false

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case TRAER_TODAS:
			return {
				...state,
				tareas: action.payload,
				cargando: false,
				error: '',
				regresar: false
			};

		case CARGANDO:
			return { ...state, cargando: true };

		case ERROR:
			return { ...state, error: action.payload, cargando: false };

		case CAMBIO_USUARIO:
			return { ...state, usuario_id: action.payload };

		case CAMBIO_TITULO:
			return { ...state, titulo: action.payload };
            
            // Justo después de la petición ejecuto un dispatch
            //  de tipo agregada, en el reducer creo ese caso que
            //   retona el estado y las tareas vacío porque ya no 
            //   están las mismas tareas se puso una nueva
            case GUARDADA:
			return {
				...state,
				tareas: {},
				cargando: false,
				error: '',
				regresar: true,
				usuario_id: '',
				titulo: ''
			};

                
                // Cuando le den click al botón de guardar y cuando se 
                // ejecute el dispatch de tipo AGREGADA ese caso en el
                // reducer seteamos el estado de regresar a true y en
                // el caso de TRAER_TODAS seteamos a regresar a false
                // Adicional seteamos en el caso de AGREGADA los valores 
                // de usuario_id y titulo a “” para que los inputs queden limpios
                case ACTUALIZAR:
                    return { ...state, tareas: action.payload };
        //Limpiamos los inputs cuando ya se abrió una pestaña para editar y me 
        //regreso y quiero agregar una nueva tarea formateo los inputs para que esten vacios y no con info anterior
                    case LIMPIAR:
                    return { ...state, usuario_id: '', titulo: '' };
            
                default: return state;
            };
        };
//ESTE TAREAS REDUCER  ES PARECIDO A USUARIOS REDUCER, DESPUES DE CREAR ESTE REDUCER
// TENEMOS QUE IR A CREAR EL ACTION DENTRO DE ACTION ESE ARCHIVO SE LLAMARA TAREAS ACTION
//DE ACA SE CREAN LOS ARCHIVOS TYPES PARA EVITAR ERRORES, RECUERDA IR AHI!
//TENEMOS QUE CONECTAR EL REDUCER Y EL ACTION AL COMPONENTE CON CONNECT QUE LLEGA POR PROPS!!
//export default connect(mapStateProp, tareasActions)(Tareas)
//EN EL COMPOPNENTDIDMOUNT LLAMAM OS EL ACTION  => THIS.PROPS.TRAERTODAS()
