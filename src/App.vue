<template>
  <div id="app">
    <button v-on:click="login">Login</button>
    <button v-on:click="logout">Logout</button>
  </div>
</template>

<script>
// import AWS from 'aws-sdk';
import 'amazon-cognito-auth-js/dist/aws-cognito-sdk';
import { CognitoAuth } from 'amazon-cognito-auth-js/dist/amazon-cognito-auth';

function initCognito(opts = {}) {
  const noop = () => { };

  const authData = {
    ClientId: process.env.COGNITO_APP_CLIENT_ID,
    AppWebDomain: process.env.COGNITO_APP_WEB_DOMAIN,
    TokenScopesArray: ['email', 'openid'],
    RedirectUriSignIn: process.env.COGNITO_APP_SIGN_IN_URI,
    RedirectUriSignOut: process.env.COGNITO_APP_SIGN_OUT_URI,
  };

  const auth = new CognitoAuth(authData);
  auth.userhandler = {
    onSuccess: opts.onSuccess || noop,
    onFailure: opts.onFailure || noop,
  };

  return auth;
}

const auth = initCognito({
  onSuccess: (session) => {
    // Cleanup hash
    window.location = window.location.pathname;
  },
  onFailure: (err) => {
    console.error('Failed to login', err);
  },
});

function handleLoginClick(event) {
  event.preventDefault();
  console.log('login');
  auth.getSession();
}

function handleLogoutClick(event) {
  event.preventDefault();
  console.log('logout');
  auth.signOut();
}


export default {
  name: 'app',
  components: {},
  methods: {
    login: handleLoginClick,
    logout: handleLogoutClick,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
