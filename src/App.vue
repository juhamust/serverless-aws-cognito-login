<template>
  <div id="app">
    <div v-if="!loggedIn">
      <p>Anonymous</p>
      <button v-on:click="login()">Login</button>
    </div>
    <div v-if="loggedIn">
      <p>{{ auth.username }}</p>
      <button v-on:click="logout()">Logout</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
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

function initAuth() {
  const auth = initCognito({
    onSuccess: (session) => {
      // Cleanup hash
      window.location = window.location.pathname;
    },
    onFailure: (err) => {
      console.error('Failed to login', err);
    },
  });

  auth.parseCognitoWebResponse(window.location.href);
  Vue.set(this, 'auth', auth);
}

function handleLoginClick() {
  this.auth.getSession();
}

function handleLogoutClick() {
  this.auth.signOut();
  Vue.set(this, 'auth', null);
}

export default {
  name: 'app',
  components: {
    Message,
    PushButton,
  },
  created: initAuth,
  data: () => ({
    auth: null,
  }),
  computed: {
    loggedIn: function loggedIn() {
      return Boolean(this.auth && this.auth.username);
    },
  },
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

button {
  background-color: rgba(84, 171, 242, 1);
  border: 2px solid rgba(205, 212, 216, 1);
  border-radius: 4px;
  font-size: 1rem;
  color: #fff;
  padding: 1rem;
  cursor: pointer;
  box-shadow: 0px 0px 4px 2px rgba(84, 171, 242, 1, 0.7);
}

body {
  background-color: rgba(74, 83, 89, 1);
}
</style>
