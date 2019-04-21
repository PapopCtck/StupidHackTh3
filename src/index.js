import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import {Provider} from "react-redux";
import {createStore,applyMiddleware} from "redux" 
import thunk from "redux-thunk"; 
import indexRoutes from './routes/index.jsx'
import * as serviceWorker from './serviceWorker';
import reducers from "./configs/reducers"
import {checkAuth} from "./actions/firebase"
import Header from "./Components/Header"
export var hist = createBrowserHistory();
const store = createStore(reducers, applyMiddleware(thunk));

checkAuth(store.dispatch).then(()=>{
ReactDOM.render(
  <Provider store={store}>
  <Header/>
    <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => 
          prop.private?(  <PrivateRoute path={prop.path} key={key} component={prop.component} />):(
          <Route path={prop.path} key={key} component={prop.component} />
        )
        )}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      store.getState().auth.isAuth ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              from: props.location
            }
          }}
        />
      )
    }
  />
);