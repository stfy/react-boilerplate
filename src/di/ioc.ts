import {makeAutoObservable} from 'mobx';
import {container} from 'tsyringe';
import {InjectionProvider} from './types';

export function injectionToken(type: string) {
    return Symbol(type);
}


export function provideStores(providers: InjectionProvider[]) {
    providers.forEach(({token, options, ...provider}) => {
        container.register(token, provider as any, options);

        container.afterResolution(
            token,
            (_, res) => {
                makeAutoObservable(res);
            },
            {frequency: 'Once'}
        )
    })
}
