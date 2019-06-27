import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import SeveUpdate  from "./save-update"
import Detail  from "./detail"
import Index  from "./index/index"

export default class Product extends Component {
  render() {
    return <Switch>
      <Route path="/product/saveupdate" component={SeveUpdate}/>
      <Route path="/product/detail" component={Detail}/>
      <Route path="/product/index" component={Index}/>
      <Redirect to="product/index"/>
    </Switch>;
  }
}