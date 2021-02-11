import * as React from 'react';
import 'reflect-metadata';
import {container, DependencyContainer} from 'tsyringe';
import {DIContext} from './context';

interface IInjector {
    _parent: IInjector;
}

abstract class Injector extends React.Component<any, any> implements IInjector {
    static contextType = DIContext;

    public _parent: Injector;
}

export function component(enhancer?) {
    return <R extends React.ComponentClass>(target: R) => {
        const enhanced = typeof enhancer === 'function'
            ? enhancer(target)
            : target;

        const Provider = class extends Injector {
            _parent = this.context;

            _reflector = this.context
                ? this.context.createChildContainer()
                : container;

            static displayName = 'DependencyReflector';

            constructor(props) {
                super(props);
            }

            render() {

                return React.createElement(
                    DIContext.Provider,
                    {value: this._reflector},
                    React.createElement(enhanced, this.props as any)
                );
            }
        }

        Reflect.defineMetadata('design:reflector', Provider, target);

        return Provider as unknown as R;
    }
}


export const load: PropertyDecorator = (target, propertyKey): any => {
    (target.constructor as React.ComponentClass).contextType = DIContext;

    const descriptor = {
        configurable: true,
        enumerable: true,
        get() {
            const token = Reflect.getMetadata('design:type', this, propertyKey);
            const injectedInstance = (this.context as DependencyContainer).resolve(token);

            Object.defineProperty(this, propertyKey, {
                enumerable: true,
                writable: true,
                value: injectedInstance
            });

            return injectedInstance;
        },
        set(instance) {
            Object.defineProperty(this, propertyKey, {
                enumerable: true,
                writable: true,
                value: instance
            });
        }
    };

    Object.defineProperty(target, propertyKey, descriptor);

    return descriptor;
}
