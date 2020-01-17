import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Authentication from './Components/Authentication/Authentication';

export default (
    <Switch>
        <Route exact path='/' component={Authentication}/>
    </Switch>
);