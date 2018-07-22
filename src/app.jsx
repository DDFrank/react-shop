import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom"

import Layout from 'component/layout/index.jsx';
// 页面
import Home from 'page/home/index.jsx';
import Login from 'page/home/login.jsx';
import UserList from 'page/user/user.jsx';
import ErrorPage from 'page/error/error.jsx';

class App extends React.Component {
    render(){
        let LayoutRouter = (
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/product" component={Home} />
                    <Route path="/product.category" component={Home} />
                    <Route path="/user/index" component={UserList} />
                    <Redirect exact from="/user" to="/user/index" />
                    <Route component={ErrorPage} />
                </Switch>
            </Layout>
        ); 
        return (
            <Router>
                <Switch>
                    {/* 从上往下去匹配 */}
                    <Route path="/login" component={Login} />
                    <Route path="/" render={ props => LayoutRouter} />
                </Switch>
            </Router>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
