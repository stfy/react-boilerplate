import { action, observable } from 'mobx';
import { injectable } from 'tsyringe';

export type ThemeType = 'dark' | 'light'

@injectable()
export class UIStore {
    @observable theme: ThemeType = 'dark';

    @action.bound
    switchTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark'
    }
}
