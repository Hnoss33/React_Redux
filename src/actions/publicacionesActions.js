import axios from 'axios';
import {
	CARGANDO,
	ERROR,
	ACTUALIZAR,
	COM_CARGANDO,
	COM_ERROR,
	COM_ACTUALIZAR
} from '../types/publicacionesTypes';
import * as usuariosTypes from '../types/usuariosTypes';

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes;
//Creamos un nuevo action creator traerPorUsuario() que recibe por parámetro la key (es el índice del ítem del arreglo)
//Hacemos que primero llame el actions creator de usuariosTraerTodos() con un await y luego que llame el action de traerPorUsuario(MANDAMOS_KEY) y le mandamos por parámetro la key (es el índice del ítem del arreglo)
//Este actions creator traerPorUsuario() accede a todos los usuarios con getState(), y del usuario que llego saca el id, realiza la petición trae todas las publicaciones de este usuario y hace el dispatch de tipo TRAER_TODOS
//Y ya tenemos las publicaciones de ese usuario en especifico

export const traerPorUsuario = (key) => async (dispatch, getState) => {
	dispatch({
		type: CARGANDO
	});

	let { usuarios } = getState().usuariosReducer;
	const { publicaciones } = getState().publicacionesReducer;
	const usuario_id = usuarios[key].id;

	try {
		const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`);
		const nuevas = respuesta.data.map((publicacion) => ({
			...publicacion,
			comentarios: [],
			abierto: false
		}));
		const publicaciones_actualizadas = [
			...publicaciones,
			nuevas
		];

		dispatch({
			type: ACTUALIZAR,
			payload: publicaciones_actualizadas
		});

		const publicaciones_key = publicaciones_actualizadas.length - 1;
		const usuarios_actualizados = [...usuarios];
		usuarios_actualizados[key] = {
			...usuarios[key],
			publicaciones_key
		};

		dispatch({
			type: USUARIOS_TRAER_TODOS,
			payload: usuarios_actualizados
		});
	}
	catch (error) {
		console.log(error.message);
		dispatch({
			type: ERROR,
			payload: 'Publicaciones no disponibles.'
		});
	}
};


// En el componente hacemos un condicional que dice si el atributo abierto de la publicación es 
// cierto retorna abierto caso contrario es cerrado.
// En el abrirCerrarActions, selecciono a la publicación que le di click y la guardo en const, 
// y hago otra const que va a tener esa publicación que le di click y modifica la propiedad de 
// abierto por el contrario que tiene !seleccionada.abierto.
// Guardamos en constante a todas las publicaciones de todos los usuarios, seleccionamos de todas
// las publicaciones la que le corresponden al usuario y desplegamos desplegamos todas las publicaciones
// de este usuario y por ultimo de todas las publicaciones del usuario, selecciono a la que se le dio click
// y sera igual a la publicacion pero con el abierto cambiado.
// Hago un **dispatch **mandando el arreglo con todas las publicaciones de los usuarios al PublicacionesReducer, 
// pero a la publicación que se le dio click será igual a la publicación pero con el atributo abierto cambiado.
// Conclusion: al PublicacionesReducer le mando un arreglo con todas las publicaciones de los usuarios,
// pero a la publicación que se le dio click será igual a la publicación pero con el atributo abierto cambiado.

export const abrirCerrar = (pub_key, com_key) => (dispatch, getState) => {
	const { publicaciones } = getState().publicacionesReducer;
	const seleccionada = publicaciones[pub_key][com_key];

	const actualizada = {
		...seleccionada,
		abierto: !seleccionada.abierto
	};

	const publicaciones_actualizadas = [...publicaciones];

	publicaciones_actualizadas[pub_key] = [
		...publicaciones[pub_key]
	];
	publicaciones_actualizadas[pub_key][com_key] = actualizada;
	
	dispatch({
		type: ACTUALIZAR,
		payload: publicaciones_actualizadas
	});
};

// Terminamos el actions traerComentarios() que va a buscar los comentarios de la publicacion que se le dio click. 
// Y este retorna todas las publicaciones pero modifica el atributo comentarios de la publicación que se le dio CLICK
// En el componente validamos si todavía no están los comentarios en el estado llamamos al actions creators para traer
//  los comentarios de esta publicación y si ya están no los busques
// Conclusión: Terminamos el actions traerComentarios() que va a buscar los comentarios de la publicación que se le dio click. 
// Y este retorna todas las publicaciones pero modifica el atributo comentarios de la publicación que se le dio CLICK
export const traerComentarios = (pub_key, com_key) => async (dispatch, getState) => {
	dispatch({
		type: COM_CARGANDO
	});

	const { publicaciones } = getState().publicacionesReducer;
	const seleccionada = publicaciones[pub_key][com_key];

	try {
		const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`)

		const actualizada = {
			...seleccionada,
			comentarios: respuesta.data
		};

		const publicaciones_actualizadas = [...publicaciones];

		publicaciones_actualizadas[pub_key] = [
			...publicaciones[pub_key]
		];
		publicaciones_actualizadas[pub_key][com_key] = actualizada;
		
		dispatch({
			type: COM_ACTUALIZAR,
			payload: publicaciones_actualizadas
		});
	}
	catch (error) {
		console.log(error.message);
		dispatch({
			type: COM_ERROR,
			payload: 'Comentarios no disponibles.'
		});
	}
};

// Creo una variable que será un arreglo de objetos con todo lo que me trae respuesta.data 
// y le agrego a cada publicación dos atributos mas. Y las mando al arreglo de publicaciones_actualizadas 
// (ese arreglo tiene las publicaciones) Publicaciones/index.js creo un función llamada mostrarInfo() 
// que es lo que va a retornar ponerPublicaciones() Es una función que retorna todas las publicaciones 
// del usuario en especifico (recibimos por parámetro todas las publicaciones que le corresponden a este 
// usuario y la casilla de donde están las publicaciones de este usuario)
// Creamos un **actionsCreator **en PublicacionesActions que cuando le den click al div llame al actions, 
// que recibe por parámetro la casilla de donde están las publicaciones de este usuario y a cual publicación 
// en especifico fue a la que le di click (sacamos el índice de la publicación del map)
// Conclusión: a cada publicación le agrego dos atributos, después creo una función en Publicaciones/index.js 
// llamada mostrarInfo() y Creamos un actionsCreator en PublicacionesActions que cuando le den click al div llame 
// al actions y este recibe por parámetro la casilla de donde están las publicaciones de este usuario y a cual publicación 
// en especifico fue a la que le di click

