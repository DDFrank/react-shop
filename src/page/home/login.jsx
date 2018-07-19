import React from "react";
import './login.scss';

import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

const _mm = new MUtil();
const _user = new User();

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            redirect: _mm.getUrlParam('redirect') || ''
        }
    }

    componentWillMount() {
        document.title = '登录 - ADMIN';
    }

    // 输入框发生改变的时候
    onInputChange(e) {
        let inputValue = e.target.value;
        let inputName = e.target.name;
        this.setState({
            [inputName]: inputValue
        });
    }
    onInputKeyUp(e) {
        if(e.keyCode === 13) {
            this.onSubmit();
        }
    }
    // 用户提交表单
    onSubmit() {
        let loginInfo = {
            username: this.state.username,
            password: this.state.password
        },
            // 数据校验
            checkResult = _user.checkLoginInfo(loginInfo);
        if (checkResult.status) {
            // 验证通过
            _user.login({
                username: this.state.username,
                password: this.state.password
            }).then((res) => {
                
                this.props.history.push(this.state.redirect);
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }else{
            // 验证不通过
            _mm.errorTips(checkResult.msg);
        }        
    }

    render(){
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                        <div className="panel-heading">
                            欢迎登录 - 管理系统
                        </div>
                        <div className="panel-body">
                            <div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">用户名</label>
                                    <input type="text" 
                                        name="username"
                                        className="form-control" 
                                        placeholder="请输入用户名" 
                                        onKeyUp = {e => this.onInputKeyUp(e)}
                                        onChange={e => this.onInputChange(e)}
                                        />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">密码</label>
                                    <input type="password" 
                                        name="password"
                                        className="form-control" 
                                        placeholder="请输入密码" 
                                        onKeyUp={e => this.onInputKeyUp(e)}
                                        onChange={e => this.onInputChange(e)}
                                        />
                                </div>
                                <button 
                                    type="button" 
                                    className="btn btn-lg btn-block btn-primary"
                                    onClick={e => {this.onSubmit(e)}}
                                    >
                                    登录</button>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}

export default Login