import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Login from './pages/Login';
import Receitas from './pages/Receitas';
import MinhasReceitas from './pages/MinhasReceitas';
import Adicionar from './pages/Adicionar';
import VerReceita from './pages/VerReceita';
import EditarReceita from './pages/EditarReceita';


function Routes() {
  return (
    <Router>
        <Switch>
            <Route exact path="/">
                <Login />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/receitas">
                <Receitas />
            </Route>
            <Route exact path="/receita">
                <MinhasReceitas />
            </Route>
            <Route exact path="/adicionar">
                <Adicionar />
            </Route>
            <Route exact path="/verReceita/:id">
                <VerReceita />
            </Route>
            <Route exact path="/editar/:id">
                <EditarReceita />
            </Route>
        </Switch>
    </Router>
  );
}

export default Routes;
