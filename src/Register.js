import React, { Component } from 'react';
import { MuiThemeProvider } from "material-ui/styles";
import { AppBar, TextField, RaisedButton } from "material-ui";
import Axios from "axios";
import Login from './Login';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name : '',
            last_name : '',
            email :'',
            password : ''
        }
    }

    render () {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar title = "Register" />
                        <TextField hintText = "Enter your first name"
                                    floatingLabelText = "First Name"
                                    onChange = {(event, newValue) => this.setState({first_name : newValue})} />
                        <TextField hintText = "Enter your last name"
                                    floatingLabelText = "Last Name"
                                    onChange = {(event, newValue) => this.setState({last_name : newValue})} />
                        <TextField hintText = "Enter your email"
                                    floatingLabelText = "Email"
                                    onChange = {(event, newValue) => this.setState({email : newValue})} />
                        <TextField hintText = "Enter your password" type = "password"
                                    floatingLabelText = "Password"
                                    onChange = {(event, newValue) => this.setState({password : newValue})} />
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style}
                                        onClick = {(event) => this.handleClick(event)} />  
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }

    handleClick(event) {
        var apiBaseUrl = "http://localhost:4000/api/";
        console.log("values: ", this.state.first_name, this.state.last_name, this.state.email, this.state.password);
        var self = this;
        var payload = {
            "firstName" : this.state.first_name,
            "lastName" : this.state.last_name,
            "email" : this.state.email,
            "password" : this.state.password
        }

        Axios.post(apiBaseUrl + '/register', payload)
        .then(function(response) {
            console.log("register");
            if(response.data.code == 200) {
                var loginscreen = [];
                loginscreen.push(<Login parentContext={this} />);
                var loginmessage =- "Not Registered yet. Go to Registration";
                self.props.parentContext.setState({
                    loginscreen:loginscreen,
                    loginmessage:loginmessage,
                    buttonLabel:"Register",
                    isLogin:true });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

const style = {
    margin: 15,
};

export default Register;