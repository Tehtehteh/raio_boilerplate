import * as React from 'react';
import { Route, Switch } from 'react-router';

import App from 'front/components/App';
import About from 'front/components/About';

const Routes : React.StatelessComponent <any> =	() =>
	<Switch>
		<Route exact path="/" component={App}/>
		<Route exact path="/about" component={About}/>
	</Switch>;
export default Routes;