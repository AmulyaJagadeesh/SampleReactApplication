import React, { Component } from 'react';
import { MuiThemeProvider } from "material-ui/styles";
import { AppBar, TextField, RaisedButton } from "material-ui";
import Axios from "axios";
import UploadScreen from './UploadScreen';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : ''
        }
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar title="Login" />
                        <TextField hintText = "Enter your Username"
                                    floatingLabelText = "Username" 
                                    onChange = {(event, newValue) => this.setState({username:newValue})}  />
                        <TextField type = "password" 
                                    hintText = "Enter your Password"
                                    floatingLabelText = "Password" 
                                    onChange = {(event, newValue) => this.setState({password:newValue})}  />
                        <br/>
                        <RaisedButton label = "Submit" primary={true} style={style}
                                    onClick={(event) => this.handleClick(event)} />            
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }


    handleClick(event) {
        var apiBaseUrl = "http://localhost:4000/api"
        var self = this;
        var payload = {
            "email" : this.state.username,
            "password" : this.state.password
        }

        Axios.post(apiBaseUrl + 'login', payload)
        .then(function (response) {
            console.log(response);
            if(response.data.code == 200) {
                console.log("Login Successful");
                var uploadScreen = [];
                uploadScreen.push(<UploadScreen appContext = {self.props.appContext} />)
                self.props.appContext.setState({loginPage: [], uploadScreen: uploadScreen})
            } else if(response.data.code == 204) {
                console.log("Username password do not match");
                alert("username password do not match")
            } else {
                console.log("Username does not exists");
                alert("Username does not exist");
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    }
}

const style = {
    margin: 15
};

export default Login;