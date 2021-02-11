import * as React from 'react';
import {render} from 'react-dom';
import {App} from './application';
import {provideStores} from './di/ioc';
import './i18n'
import {Routes} from './routes';
import './styles.scss'
import {UIStore} from "./store/ui.store";
import {Lifecycle} from "tsyringe";
import {AuthService} from "./service/auth.service";

type ApplicationConfig = {
    rootNode: HTMLElement;
}

export const STORE_PROVIDERS = [
    {token: UIStore, useClass: UIStore, options: {lifecycle: Lifecycle.Singleton}},
    {token: AuthService, useClass: AuthService, options: {lifecycle: Lifecycle.Singleton}}
];

export const main = ({rootNode, ...options}: ApplicationConfig) => {
    render(
        <App
            renderRoutes={() => <Routes/>}
            {...options}
        />,
        rootNode
    );
}

(function bootstrap() {
    provideStores(STORE_PROVIDERS);

    main({
        rootNode: document.getElementById('root')
    });
})();

declare const module;
if (module.hot) {
    module.hot.accept();
}
