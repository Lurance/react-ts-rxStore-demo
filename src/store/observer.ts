import * as React from 'react';

import { Subscription, BehaviorSubject } from 'rxjs';

import { InjectActions } from './InjectActions';


const observer = <T>(observableFactory: (props?) => {intlState: T, store: BehaviorSubject<T>}, injectActions: InjectActions<T>) => (WrappedComponent: React.ComponentType) => {
    return class extends React.Component<any> {
        public props$: BehaviorSubject<T>;
        public subscription: Subscription;
        public injectProps: React.ClassAttributes<T> = {};

        constructor(args) {
            super(args);

            const res = observableFactory();

            this.props$ = res.store;
            const storeState = res.intlState;
            
            Object.keys(injectActions).forEach(k => {
                Object.defineProperty(this.injectProps, k, {
                    enumerable: true,
                    value: (arg) => {
                        injectActions[k](arg)(storeState);
                        this.props$.next(storeState);
                    }
                })
            })
            this.state = res.intlState;
        }

        public componentDidMount() {
            this.subscription = this.props$.subscribe((v) => this.setState(v))
        }

        public componentWillUnmount() {
            this.subscription.unsubscribe();
        }

        public render() {
            const props = {
                ...this.props,
                ...this.state,
                ...this.injectProps
            };

            return this.state && React.createElement(WrappedComponent, props);
        }
    }
}

export default observer;
