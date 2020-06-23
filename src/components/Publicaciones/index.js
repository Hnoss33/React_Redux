import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';
import Comentarios from './Comentarios';

import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';
//conectamos la informacion de usuarios reducer importando react-redux, conectamos este componente a redux 

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const {
	traerPorUsuario: publicacionesTraerPorUsuario,
	abrirCerrar,
	traerComentarios
} = publicacionesActions;

class Publicaciones extends Component {

	async componentDidMount() {
		const {
			usuariosTraerTodos,
			match: { params: { key } },
			publicacionesTraerPorUsuario
		} = this.props;

		if (!this.props.usuariosReducer.usuarios.length) {
			await usuariosTraerTodos();
		}
		if (this.props.usuariosReducer.error) {
			return;
		}
		if (!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])) {
			await publicacionesTraerPorUsuario(key);
		}
	}
    
    ponerUsuario = () => {
		const {
			match: { params: { key } },
			usuariosReducer
		} = this.props;

		if (usuariosReducer.error) {
			return <Fatal mensaje={ usuariosReducer.error } />;
		}
		if (!usuariosReducer.usuarios.length || usuariosReducer.cargando) {
			return <Spinner />
		}

		const nombre = usuariosReducer.usuarios[key].name;

		return (
			<h1>
				Publicaciones de { nombre }
			</h1>
		);
	};

    //Conclusión: Creamos una función llamada ponerPublicaciones() 
    //que valida los estados de publicaciones (error y cargando)
    // y si todo sale bien ya tengo las publicaciones y de ese usuario 
    // destructuro publicaciones key (donde están las publicaciones de este usuario)
    //y retorno todas las publicaciones que están en esa casilla del arreglo con un .map
    //tanto lió para mostrar las publicaciones de un usuario pero igual excelente clase…
    ponerPublicaciones = () => {
		const {
			usuariosReducer,
			usuariosReducer: { usuarios },
			publicacionesReducer,
			publicacionesReducer: { publicaciones },
			match: { params: { key } }
		} = this.props;

		if (!usuarios.length) return;
		if (usuariosReducer.error) return;
		if (publicacionesReducer.cargando) {
			return <Spinner />;
		}
		if (publicacionesReducer.error) {
			return <Fatal mensaje={ publicacionesReducer.error } />
		}
		if (!publicaciones.length) return;
		if (!('publicaciones_key' in usuarios[key])) return;

		const { publicaciones_key } = usuarios[key];
		return this.mostrarInfo(
			publicaciones[publicaciones_key],
			publicaciones_key
		);
	};

	mostrarInfo = (publicaciones, pub_key) => (
		publicaciones.map((publicacion, com_key) => (
			<div
				key={publicacion.id}
				className='pub_titulo'
				onClick={
					() => this.mostrarComentarios(pub_key, com_key, publicacion.comentarios)
				}
			>
				<h2>
					{ publicacion.title }
				</h2>
				<h3>
					{ publicacion.body }
				</h3>
				{
					(publicacion.abierto) ?
						<Comentarios
							comentarios={ publicacion.comentarios }
						/>
						: ''
				}
			</div>
		))
	);

    // Cada vez que hagan click llama a esta function mostrarComentarios() 
    // y recibe por parametro la casilla de donde están las publicaciones de 
    // este usuario y a cual publicación en especifico fue a la que le di click y nos llegan los comentarios
    // llamamos al actions Creator que modifica el atributo abierto de la publicación. abrirCerrar()
    // Creamos un ACTIONS traerComentarios() en publicacionesActions y en el componente lo destructuro y 
    // lo ponemos en el **mapDispatchToProps **ya nos llega por props ese actions y lo llamamos this.props.traerComentarios(pub_key, com_key);.
    // Conclusión: Creamos una función en el componente que cuando le dan click a una publicación esta se llama y la función llama a dos actions 
    //uno que modifica el atributo abierto y otro que va a buscar los comentarios de esa publicación.


	mostrarComentarios = (pub_key, com_key, comentarios) => {
		this.props.abrirCerrar(pub_key, com_key)
		if (!comentarios.length) {
			this.props.traerComentarios(pub_key, com_key)
		}
	};

	render() {
		return (
			<div>
				{ this.ponerUsuario() }
				{ this.ponerPublicaciones() }
			</div>
		);
	}
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
	return { usuariosReducer, publicacionesReducer };
};

const mapDispatchToProps = {
	usuariosTraerTodos,
	publicacionesTraerPorUsuario,
	abrirCerrar,
	traerComentarios
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);