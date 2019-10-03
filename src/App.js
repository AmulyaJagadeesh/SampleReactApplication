import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Loginscreen from './Loginscreen';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPage : [],
      loginScreen : []
    }
  }

  componentWillMount() {
    var loginPage = [];
    loginPage.push(<Loginscreen parentContect = {this} />);
    this.setState({
      loginPage: loginPage
    })
  }

  render() {
    return (
      <div className = "App">
        {this.state.loginPage}
        {this.state.loginScreen}
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default App;
