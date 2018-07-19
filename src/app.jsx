import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom"

import Layout from 'component/layout/index.jsx';
// 页面
import Home from 'page/home/index.jsx';
import Login from 'page/home/login.jsx'

class App extends React.Component {
    render(){
        return (
            <Router>
                <Switch>
                    {/* 从上往下去匹配 */}
                    <Route path="/login" component={Login} />
                    <Route path="/" render={ props => (
                        <Layout>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/product" component={Home} />
                                <Route path="/product.category" component={Home} />
                            </Switch>
                        </Layout>
                    )} />
                </Switch>
            </Router>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
