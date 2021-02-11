import {action} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react'
import {component, load} from './di/decorator';
import {AuthService} from './service/auth.service';

export type AppProps = {
    renderRoutes: () => React.ReactNode
}

@component(observer)
export class App extends React.Component<AppProps, any> {
    @load public authService: AuthService;

    render() {
        return (
            <>
                <button onClick={action(() => this.authService.login())}>+</button>

                <div>{this.authService.test}</div>

                <div>{this.authService.testComputed}</div>
            </>
        );
    }
}

