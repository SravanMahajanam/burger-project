import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

class App extends Component {
  // state ={
  //   timed: false
  // }

  // componentDidMount() {
  //   setTimeout( () => {
  //       this.setState({timed: true});
  //     },5000);
  // }

  render() {
    return (
      <div>
        <Layout />
          <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </div>
    );
  }
}

export default App;
