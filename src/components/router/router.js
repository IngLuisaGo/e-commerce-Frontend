// src/components/router/router.js
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from "../login/login";
import Inicio from '../index/index';
import PrivateRoute from '../auth/privaterouter';
// import Empleados from '../empleados/inicioe';
import Productos from '../productos/inicioe';
import Usuarios from '../usuarios/inicioe';

export default function AppRouter() {
    return (
        <Router>
            <Switch>
                {/* Al iniciar siempre carga Inicio */}
                <Route exact path={["/", "/index"]} component={Inicio} />

                {/* Login */}
                <Route exact path="/login" component={Login} />

                {/* Protegidas */}
                {/* <PrivateRoute exact path="/empleados" component={Empleados} /> */}
                <PrivateRoute exact path="/productos" component={Productos} />
                <PrivateRoute exact path="/usuarios" component={Usuarios} />

                {/* 404 */}
                <Route path="*" component={() => (
                    <h1 style={{ marginTop: 300 }}>
                        404
                        <br />
                        Página no encontrada
                    </h1>
                )} />
            </Switch>
        </Router>
    );
}
