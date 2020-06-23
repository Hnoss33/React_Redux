import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as usuariosActions from '../../actions/usuariosActions';
import Spinner from '..//general/Spinner';
import Fatal from '../general/Fatal';
import Tabla from './Tabla'


//AL CREAR ESTE COMPONENTE NOS MOVEMOS A LA LINEA : 50 : en el Render
//esta es la clase usuario donde comienza todo. este es un componente clase
class Usuarios extends Component { //este es un componente funcional ya que empieza con const, el componente no funcional no manejan estados, solo manejan informacion 
//en este componente didmount no llamamos los usuarios, en vez de eso estamos llamando el action creator!! y el action creator! esta yendo a la URL y trayendo los usuarios y entregarselos al REDUCER!!

componentDidMount () { //en este didmount estamos cambiando el estado estamos cargando el arreglo de dos objetos.
  //ESTE ES EL ACTION CREATOR QUE VA A TRAER TODO, sabemos que es un action reator porque en la linea 66 lo estoy conectando con mi usuarios action
  //se manda a llamar todos de usuarios action {EL TRAER TODOS O VAMOS A ENCONTRAR EN EL ARCHIVO USUARIOSACTION.JS de la carpeta actions}
  if (!this.props.usuarios.length){
    this.props.traerTodos();
  }
  
}
ponerContenido = () => {
  if (this.props.cargando) {
    return <Spinner />;
  }

  if (this.props.error) {
    return <Fatal mensaje={ this.props.error } />;
  }

  return <Tabla />
};

render() {
  return (
    <div>
      <h1>Usuarios</h1>
      { this.ponerContenido() }
    </div>
  )
}
};

const mapStateToProps = (reducers) => {
return reducers.usuariosReducer;
};

export default connect(mapStateToProps, usuariosActions)(Usuarios);
