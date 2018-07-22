import React from 'React';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom"

import ProductList from './productList.jsx';
import ProductSave from './save.jsx';

class ProductRouter extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Switch>
                <Route path='/product/index' component = {ProductList}/>
                <Route path='/product/save' component={ProductSave} />
                <Redirect from='/product' to='/product/index' exact/>
            </Switch>
        );
    }
}

export default ProductRouter;