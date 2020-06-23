import React from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
const Tabla = (props) => {
    // este es un arreglo vacio el cual los usuarios se van a mostrar con los TR que se envian desde la linea 50 a esta 
//En Usuarios No hay nada, es un Arreglo VACIO, asi lo define el reducer
// el componente aca empieza a llamar el ACTIONCREATOR, esto se realiza desde el DIDMOUNT
const ponerFilas = () => props.usuarios.map((usuario, key) => ( //en el imndex.js de usuarios debemos colocar <Tabla usuarios={this.props.usuarios}/> porque de los props voy a sacar los usuarios no hemos mandado los usuarios por parametro 
    // mirar como llamamos los usuarios en la linea 26 de index.js de esta forma es sin el reducer, con el reducer abajo en la linea 48 se realiza con el reducer
        <tr key={ usuario.id }>
            <td>
            { usuario.name }
            </td>
            <td>
            { usuario.email }
            </td>
            <td>
            { usuario.website }
            </td>
            <td>
               <Link to={`/publicaciones/${key}`}>
               <div className="eye-solid2 icon"></div>
                </Link>
            </td>
        </tr>
  ));
  //todo lo de ponerFilas se cambia todo esto sucede cuando el payload: respuesta.data se actualiza con la nueva info y la trae de nmuevo
  
  
    return (
        <div>
        <table className="tabla">
            <thead>
            <tr>
                <th>
                Nombre
                </th>
                <th>
                Correo
                </th>
                <th>
                Enlace
                </th>
                </tr>
                </thead>
                <tbody> 
            { ponerFilas() } 
            {/* lo que hace este this.ponerFilas es que por cada usuario entrega una fila o un TR, mirar la linea 14 */}
            </tbody>
        </table>
        </div>
    )
}
const mapStateToProps = (reducers) => {  //de esta manera llamamos los usuarios con el reducer
return reducers.usuariosReducer;
}
export default connect(mapStateToProps)(Tabla);
