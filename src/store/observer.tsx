import * as React from 'react';

import { Subscription, BehaviorSubject } from 'rxjs'

const observer = (WrappedComponent: any, observableFactory, injectActions) => {
    return class extends React.Component<any, { headerTabs: string[] }> {
        public props$: BehaviorSubject<{ headerTabs: string[] }>
        public subscription: Subscription;
        public injectProps: any = {};

        constructor(args) {
            super(args);

            const intlState = {
                headerTabs: []
            };

            const storeState = intlState;
            this.props$ = observableFactory(this.props, storeState);
            Object.keys(injectActions).forEach(k => {
                Object.defineProperty(this.injectProps, k, {
                    enumerable: true,
                    value: (arg) => {
                        injectActions[k](arg)(storeState);
                        this.props$.next(storeState);
                    }
                })
            })
            this.state = intlState;
        }

        public componentDidMount() {
            this.subscription = this.props$.subscribe((v) => this.setState(v))
        }

        public componentWillUnmount() {
            this.subscription.unsubscribe();
        }

        public render() {
            return this.state && <WrappedComponent {...this.props} {...this.state} {...this.injectProps} />
        }
    }
}

export default observer;
