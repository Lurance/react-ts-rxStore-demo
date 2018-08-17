import * as React from 'react';
import { autobind } from 'core-decorators';
import appStoreFactory from './store/appStoreFactory';
import observer from './store/observer';

@autobind()
class App extends React.Component<{ onHeaderTabsAdd: any, headerTabs: string[] }> {
  constructor(args) {
    super(args);

    setInterval(() => {
      this.handleHeaderTabsAdd('Tabs rendered from Intervaler')
    }, 2000)
  }

  public componentDidUpdate(preProps) {
    console.log(this.props)
  }

  public handleHeaderTabsAdd(value: string) {
    this.props.onHeaderTabsAdd(value);
  }

  public render() {
    const { headerTabs } = this.props;
    return (
      <div className="App">
        <h2>Hi, This is an Example to show data form RxStore render in Component</h2>
        <br />
        {headerTabs.map((v, i) => (<p key={i}>{v}&nbsp;{i}</p>))}
      </div>
    );
  }
}



export default observer(App,
  appStoreFactory,
  {
    onHeaderTabsAdd: (v) => (state) => state.headerTabs.push(v)
  }
);
