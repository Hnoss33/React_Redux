import { combineReducers} from 'redux';
import usuariosReducer from './usuariosReducer.js';
import publicacionesReducer from './publicacionesReducer.js';
import tareasReducer from './tareasReducer';
export default combineReducers({
usuariosReducer, 
publicacionesReducer,
tareasReducer
});