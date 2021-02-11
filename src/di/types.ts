import { InjectionToken, Provider, RegistrationOptions } from 'tsyringe';

export type InjectionProvider = { token: InjectionToken, options?: RegistrationOptions; } & Provider
