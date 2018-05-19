import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './scss/front.scss';

import Routes from 'front/routes/Routes';

const rootContainer : HTMLElement = document.getElementById('app');
ReactDOM.render(
	<BrowserRouter>
		<Routes/>
	</BrowserRouter>
	, rootContainer);
