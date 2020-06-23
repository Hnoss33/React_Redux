import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Menu from './Menu';
import Usuarios from './Usuarios';
import Publicaciones from './Publicaciones';
import Tareas from './Tareas';
import TareasGuardar from './Tareas/Guardar';

const App = (props) => (
	<BrowserRouter>
		<Menu />
		<div id="margen">
			<Route exact path='/' component={Usuarios} />
			<Route exact path='/tareas' component={Tareas} />
			<Route exact path='/publicaciones/:key' component={Publicaciones} />
			<Route exact path='/tareas/guardar' component={TareasGuardar} />
			<Route exact path='/tareas/guardar/:usu_id/:tar_id' component={TareasGuardar} />
		</div>
	</BrowserRouter>
);

export default App;
// ACA IMPORTAMOS LOS COMPONENTES TODO LO QUE ESTA ENCAPZULADO COMO TAREAS PUBLICACIONES ETC 

//CASO PARA TAREAS: EXPLICACION => Creamos un componente nuevo llamado tareas es el que se va a renderizar cuando entren 
//a la ruta/tareas, creamos el reducer y actions, creamos los types para las tareas por ultimo ahora conecto ese reducer 
//y ese actions a mi componente con connect y me llega por props.,