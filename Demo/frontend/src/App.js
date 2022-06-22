import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Redirect } from 'react-router'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/home'
import Header from './components/Header/header'
import Footer from './components/Footer/footer'
import Page404 from './components/Page404/Page404'
import Page500 from './components/Page500/Page500'
import jwt_decode from "jwt-decode";

class App extends React.Component {
  constructor(props) {
    super(props)
    let token = localStorage.getItem('accessToken');
    let user = null
    if (token) {
      try {
        user = jwt_decode(token)
      } catch (err) {
        console.log(err)
      }
    }
    this.state = {
      user: user,
      token: token,
    }
  }

  setToken = (newValue) => {
    this.setState({ 'token': newValue, 'user': jwt_decode(newValue) })
  }


  render() {
    return (
      <div className="wrapper">
        <Header user={this.state.user} setToken={this.setToken} />
        <div className='content-wrapper'>
          <BrowserRouter>
            <Switch>
              <Route path="/:unknown">
                <Page404 />
              </Route>

              <Route path="/" render={(props) => <Home {...props} />}>
                <Home />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
        <Footer user={this.state.user} />
      </div>
    );
  }
}

export default App;
