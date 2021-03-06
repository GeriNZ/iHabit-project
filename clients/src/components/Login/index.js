import React, { Component } from 'react';
import '../../styles/index.css'

class Login extends Component {

    state = {
        username: "",
        password: ""
    }

    handleInput = e => this.setState({ [e.target.name]: e.target.value });

    formIncomplete = () => Object.values(this.state).some(v => !v);

    login = e => {
        e.preventDefault();
        this.props.login(this.state);
    }

    render() {
        return (
            <div id="content">
                <h2>Login</h2>
                <form onSubmit={this.login}>
                    <div className="loginInput">
                        <label htmlFor="username">Enter your username</label>
                        <input type="text" name="username" value={this.state.username} onChange={this.handleInput} />
                    </div>
                    <div className="loginInput">
                        <label htmlFor="password">Enter your password</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleInput} />
                    </div>
                    <div className="loginInput">
                        <input type="submit" className={this.formIncomplete() ? 'disabled' : 'enabled'} disabled={this.formIncomplete()} value="Login" />
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;