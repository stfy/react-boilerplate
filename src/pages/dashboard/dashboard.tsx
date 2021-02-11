import * as React from 'react';
import {AuthService} from '../../service/auth.service';
import {component, load} from "../../di/decorator";


@component()
export class Dashboard extends React.Component<any, any> {
    @load auth: AuthService;

    render() {
        return this.auth.test;
    }
}
