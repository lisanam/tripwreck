import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import SearchPage from './components/Search_Components/SearchPage';
import LoginForm from './components/Login_Components/LoginForm';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Login" initial/>
      </Scene>
      <Scene key="main">
        <Scene key="SearchPage" component={SearchPage} title="Search" />
      </Scene>
    </Router>
  )
};

export default RouterComponent;
