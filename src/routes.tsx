import React from 'react';
import {Route, Switch} from 'react-router-dom'
import {Dashboard} from './pages/dashboard/dashboard';

export const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
        </Switch>
    );
}


