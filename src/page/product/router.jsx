import React from 'React';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom"

class ProductRouter extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Switch>
                <Route path='/product/index' component = {ProductList}/>
                <Redirect from='/product' to='/product/index' exact/>
            </Switch>
        );
    }
}

export default ProductRouter;