import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import loggit from './loggit';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
	<StrictMode>
		<App/>
	</StrictMode>
);

loggit('UwU');
