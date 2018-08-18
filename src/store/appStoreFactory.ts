import { BehaviorSubject } from 'rxjs'

const appStoreFactory = (props?) => {
    const intlState = {
        headerTabs: []
    }

    const store = new BehaviorSubject(intlState)

    return {
        intlState,
        store
    }
};

export default appStoreFactory;