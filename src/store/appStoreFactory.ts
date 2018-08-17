import { BehaviorSubject } from 'rxjs'

const appStoreFactory = (props, state) => {
    const store = new BehaviorSubject<{ headerTabs: string[] }>(state)

    return store;
};

export default appStoreFactory;