import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';

import * as tareasActions from '../../actions/tareasAction.js';

class Guardar extends Component {
	componentDidMount() {
		const {
			match: { params: { usu_id, tar_id } },
			tareas,
			cambioUsuarioId,
			cambioTitulo,
			limpiarForma
		} = this.props;

		if (usu_id && tar_id) {
			const tarea = tareas[usu_id][tar_id];
			cambioUsuarioId(tarea.userId);
			cambioTitulo(tarea.title);
		}
		else {
			limpiarForma();
		}
	}

	cambioUsuarioId = (event) => {
		this.props.cambioUsuarioId(event.target.value);
	};

	cambioTitulo = (event) => {
		this.props.cambioTitulo(event.target.value);
	};

    // Al componente Guardar.js le agregamos al botón de 
    // guardar un evento onClick que este evento llama al 
    // actions creator agregar(nueva_tarea) mandándole por 
    // parámetro un objeto con los valores de la nuevas 
    // tarea que se enviara a la API.
	guardar = () => {
		const {
			match: { params: { usu_id, tar_id } },
			tareas,
			usuario_id,
			titulo,
			agregar,
			editar
		} = this.props;

		const nueva_tarea = {
			userId: usuario_id,
			title: titulo,
			completed: false
		};

		if (usu_id && tar_id) {
			const tarea = tareas[usu_id][tar_id];
			const tarea_editada = {
				...nueva_tarea,
				completed: tarea.completed,
				id: tarea.id
			};
			editar(tarea_editada);
		}
		else {
			agregar(nueva_tarea);
		}
	};
// Al botón de guardar en el componente Guardar.js 
// le añadimos un atributo disabled que este me desactiva
// el botón si la expresión me retorna true, la función se
// llama deshabilitar y esta retorna true si no se ha escrito
// todavía en los dos inputs

deshabilitar = () => {
    const { usuario_id, titulo, cargando } = this.props;
    if (cargando) {
        return true;
    }
    if (!usuario_id || !titulo) {
        return true;
    }
    return false;
};


    // Cuando se le di click al botón manejare los estados 
    // de la petición de tipo post colocando el spinner si 
    // esta cargando o si hay un error.

	mostrarAccion = () => {
		const { error, cargando } = this.props;
		if (cargando) {
			return <Spinner />;
		}
		if (error) {
			return <Fatal mensaje={error} />;
		}
	};
    // Y en el componente de Guardar.js en el render evaluamos si 
    // regresar es true redirecciona a tareas/index.js
	render() {
		return (
			<div>
				{
					(this.props.regresar) ?
					<Redirect to='/tareas' />
					: ''
				}
				<h1>Guardar Tarea</h1>
				Usuario id:
				<input
					type='number'
					value={ this.props.usuario_id }
					onChange={ this.cambioUsuarioId }
				/>
				<br /><br />
				Título:
				<input
					value={ this.props.titulo }
					onChange={ this.cambioTitulo }
				/>
				<br /><br />
				<button
					disabled={ this.deshabilitar() }
					onClick={ this.guardar }
				>
					Guardar
				</button>
				{ this.mostrarAccion() }
			</div>
		);
	}
}


const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Guardar);