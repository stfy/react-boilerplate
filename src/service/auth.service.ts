import { action, computed, observable } from 'mobx';
import { injectable } from 'tsyringe';
import { RequestService } from './request.service';

type User = {
    name: string;
}

@injectable()
export class AuthService {
    @observable
    public isAuth: boolean = false;

    @observable
    public test = 0;

    @computed get testComputed() {

        return this.test + 2;
    }


    @observable
    user: User;

    constructor(private request: RequestService) {
    }


    @action.bound
    login = (a?: any) => {
        this.isAuth = true
        this.test++

        // this.request
        //     .fetch('/auth/login', {method: 'POST', body: {email, password}})
        //     .then((r) => r.json())
        //     .then(() => )
    }
}
