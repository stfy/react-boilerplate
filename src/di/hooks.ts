import React, { useContext } from 'react';
import { DependencyContainer, InjectionToken } from 'tsyringe';
import { DIContext } from './context';

export function useDi<S>(service: InjectionToken<S>): S {
    const context: DependencyContainer = useContext(DIContext)

    return React.useState(() => context.resolve<S>(service as any))[0]
}
