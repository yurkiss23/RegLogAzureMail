﻿import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import RegisterPage from './components/auth/Register';
import ConfirmEmailPage from './components/auth/ConfirmEmail';
import LoginPage from './components/auth/Login';
import CabinetPage from './components/Cabinet/CabinetPage';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/counter' component={Counter} />
    <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
    <Route path='/register' component={RegisterPage}/>
    <Route path='/confirmemail' component={ConfirmEmailPage}/>
    <Route path='/login' component={LoginPage}/>
    <Route path='/cabinet' component={CabinetPage}/>
  </Layout>
);
