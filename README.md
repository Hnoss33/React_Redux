## `Explicación teórica: ciclo completo de Redux`

Cuando nuestro componente terminar de cargar (componentDidMount) llama al Action Creator, luego el Action Creator contiene la promesa, trae los datos necesarios y luego va y modifica al Reducer para que actualice el estado usando dispatch() y luego lo actualizamos en el componente con el mapStateToProps.
Si no tenemos estos pasos no nos va a funcionar.

## 1: componente : => el componente se comunica con las acciones, +> se comunica con el REDUCER => y este mismo recuerda que se comunica con el componente en un ciclo sencillo, el corazón de este vendría siendo el almacenamiento o el store.

## El componente es JSX, => CARGA LA INTERFAZ , cuando termina de cargar la interfaz en el “ComponenteDidMount”: llama =>  al actionCreator,  la forma de llamarlo es con el THIS.PROPS.FUNCTION

## La función en este proyecto es: 
(TraerTodos), de esta manera es cómo se esta comunicando con el actionCreator que tiene la promesa, esta se comunica  con el URL y trae los datos con el async / await. Y se los entrega al Reducer, que en este caso del proyecto modifica al reducer para que pueda utilizar un estado diferente con lo que se modifica, esta modificación se realiza con el (Despatch) que se le dieron dos valores: el type, y el payload, en donde el type era (TraerUsuarios) que era la cadena de texto, y en el PayLoad le mandamos la información que era (respuesta.Data) .DATA: es quien traer toda la información de usuarios, y una vez llega al Reducer, viene siendo el estado, RECORDAR: que tenemos inicialState, que es como empieza, y cuando se modifica crea el nuevo estado que actualiza el JSX!  Esta actualización es posible gracias al (MapStateToProps) , se extraen todos los reducers pero solo se entrega el usuarioReducers en el MapStateToProp, y con esto se comunica el reducer con el componente o con el JSX y el ciclo seguiría fluyendo de esta manera en este proyecto entregando los usuarios.

Empezamos este curso utilizando react, nuestro estado local y luego utilizando herencia para pasar las propiedades de un componente padre a un componente hijo.
Ahora ya estamos utilizando React y Redux en conjunto para manejar un estado global y compartirlo con cualquiera de nuestros componentes. Usando normalización de los datos y las mejores prácticas.
Aprendimos a referenciar otros estados, combinarlos en uno solo, con arreglos y con objetos. Aprendimos a estructurar los datos como un flujo de información, archivos types, inmutabilidad y normalización. Estados de asincronía, métodos http, redireccionar a rutas y validaciones.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
