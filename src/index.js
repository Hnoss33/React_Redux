import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/iconos.css';
import App from './components/App';
//////////////////////////-configuracion inicial para utilizar el REDUX
import { createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import reduxthunk from 'redux-thunk';
//////////////////////////
import reducers from './reducers'
//Despues de crear este setup todo empieza con el componente
//este STORE es importante 
const store = createStore( //todo lo que esta adentro de esta constante la APP abajo va a tener acceso a ella, y va a poder manejar todos los estados con el provider de redux 
   reducers, //todos los reducers
  {}, //estado inicial
  applyMiddleware(reduxthunk)
)

ReactDOM.render(
  <Provider store={store}>
    <App />,
  </Provider>,
  document.getElementById('root')
);
