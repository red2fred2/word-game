import { StrictMode } from 'react';
import ReactDOM, { Root } from 'react-dom/client';

import { App } from './App';

const root: Root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
	<StrictMode>
		<App/>
	</StrictMode>
);
