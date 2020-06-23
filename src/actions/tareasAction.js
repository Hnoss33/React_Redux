import axios from 'axios';
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

export const traerTodas = () => async (dispatch) => {
	dispatch({
		type: CARGANDO
	});

	try {
		const respuesta = await axios.get('https://jsonplaceholder.typicode.com/todos');
		
		const tareas = {};
		respuesta.data.map((tar) => (
			tareas[tar.userId] = {
				...tareas[tar.userId],
				[tar.id]: {
					...tar
				}
			}
		));

		dispatch({
			type: TRAER_TODAS,
			payload: tareas
		})
	}
	catch (error) {
		console.log(error.message);
		dispatch({
			type: ERROR,
			payload: 'Tareas no disponibles.'
		})
	}
};

export const cambioUsuarioId = (valor) => (dispatch) => {
	dispatch({
		type: CAMBIO_USUARIO,
		payload: valor
	})
};

export const cambioTitulo = (valor) => (dispatch) => {
	dispatch({
		type: CAMBIO_TITULO,
		payload: valor
	})
};

export const agregar = (nueva_tarea) => async (dispatch) => {
	dispatch({
		type: CARGANDO
	});

	try {
		await axios.post('https://jsonplaceholder.typicode.com/todos', nueva_tarea);
		dispatch({
			type: GUARDADA
		});
	}
	catch (error) {
		console.log(error.message);
		dispatch({
			type: ERROR,
			payload: 'Servicio no disponible en este momento.'
		});
	}
};
// Creamos el actions agregar() que recibe por parámetro el 
// objeto con la info de la nueva tarea que se enviara a la API, 
// hacemos la petición de tipo POST con axios a la url y mandándole
// como segundo parámetro el objeto que voy a agregar a la API
// y me retorna la respuesta de la peticion en respuesta.data 
// el nuevo campo que se agrego.

export const editar = (tarea_editada) => async (dispatch) => {
	dispatch({
		type: CARGANDO
	});

	try {
		await axios.put(`https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`, tarea_editada);
		dispatch({
			type: GUARDADA
		});
	}
	catch (error) {
		console.log(error.message);
		dispatch({
			type: ERROR,
			payload: 'Servicio no disponible en este momento.'
		});
	}
};
export const cambioCheck = (usu_id, tar_id) => (dispatch, getState) => {
	const { tareas } = getState().tareasReducer;
	const seleccionada = tareas[usu_id][tar_id];

	const actualizadas = {
		...tareas
	};
	actualizadas[usu_id] = {
		...tareas[usu_id]
	};
	actualizadas[usu_id][tar_id] = {
		...tareas[usu_id][tar_id],
		completed: !seleccionada.completed
	}

	dispatch({
		type: ACTUALIZAR,
		payload: actualizadas
	})
};
//ELIMINA EN TEORIA PERO COMO ES UN JSON DE PRUEBA NO ELIMINAMOS NADA DEL
// SERVIDOR PERO TENEMOS UN STATUS 200 QUE SIGNIFICA EXITOSO,
// PARA VER ESTO DEBEMOS HACER CONSOLE.LOG(THIS.PROPS EN EL RENDER) O EN LA RESPUESTA DEL TRAER ACTIONS]
export const eliminar = (tar_id) => async (dispatch) => {
	dispatch({
		type: CARGANDO
	});
//Cuando hagan click al botón de eliminar llama a un actions llamado eliminar
// que elimina la tarea que se le dio click, ejecuta la peticion de tipo delete 
//al endpoint en especifico de la tarea Y después llama a un actions de tipo 
//TRAER_TODAS Y le mandamos un objeto vacio para que las tareas vuelvan a cargar.
//En el componente tareas/index creamos un componentDidUpdate() que llama a las tareas
	try {
		await axios.delete(`https://jsonplaceholder.typicode.com/todos/${tar_id}`);
		dispatch({
			type: TRAER_TODAS,
			payload: {}
		})
	}
	catch (error) {
		console.log(error.message);
		dispatch({
			type: ERROR,
			payload: 'Servicio no disponible en este momento.'
		})
	}
};
export const limpiarForma = () => (dispatch) => {
	dispatch({
		type: LIMPIAR
	});
};
// Terminamos el action de editar que recibe por parámetro un objeto con la info a modificar de una tarea, 
// que se mandara a la API para que la API la modifique mediante el método PUT.
// Modifico los checkbox para que queden seleccionados en el tareas/index, cuando ocurra un cambio en el checkbox 
// llama al actions cambioCheck() y le pasamos el id del usuario y el id de la tarea que pincho.
// Creo el actions cambioCheck() recibe el usu_id y la tar_id destructuro las tareas del tareasReducer,
// guardo en variable la tarea seleccionada, en especifico y hago un objeto de inmutabilidad que será 
// igual a todas las tareas pero a la tarea que se pincho en el checkbox el valor del completed será el contrario.
// Por ultimo hago un dispatch mandando en especifico, un objeto con todas las tareas pero a la tarea que se le dio click le modifico el completed
 
//entendiendo el agregar():
//cuando se de click al botón guardar llama al action agregar() que ejecuta la petición de 
// tipo post a la API y como segundo parámetro el objeto que voy a agregar a la API, es decir la nueva
// tarea a algún usuario.
	