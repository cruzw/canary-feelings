import React from 'react';
import { Router, Route, hashHistory } from 'react-router'

import HomePage from './pages/HomePage';
import NoMatch from './pages/404';
import Attributions from './pages/Attributions';

import App from './components/App';


const onChange = obj => window.ga && window.ga('send', 'pageview', obj.url);

const Routes = () => (
	<Router history={hashHistory} onChange={onChange}>
		<Route path="/" component={HomePage} />
		<Route path="/user/:twitterHandle" component={App} />
		<Route path="/attributions" component={Attributions} />
		<Route path="*" component={NoMatch} />
	</Router>
);

export default Routes;
