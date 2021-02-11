import * as React from 'react';
import { container } from 'tsyringe';
import { DIContext } from './context';
import { InjectionProvider } from './types';

/**
 * Dependency injection HOC
 *
 * @param WrappedComponent
 * @param providers
 */
export function di(WrappedComponent, ...providers: InjectionProvider[]) {
    const reflector = container.createChildContainer();

    providers.forEach(({token, options, ...provider}) => {
        reflector.register(token, provider as any, options)
    })

    return function DependencyReflector(...props) {
        return (
            <DIContext.Provider value={reflector}>
                <WrappedComponent {...props}/>
            </DIContext.Provider>
        )
    }
}
