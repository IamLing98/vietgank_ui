/* eslint-disable no-unused-vars */
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import './index.css'
// scroll bar
import 'simplebar/src/simplebar.css';

// third-party
import { Provider as ReduxProvider } from 'react-redux';

// apex-chart
import 'assets/third-party/apex-chart.css';

// project import
import App from './App';
import { store } from 'store';

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
    // <StrictMode>
    <ReduxProvider store={store}>
        {/* <BrowserRouter basename={process.env.PUBLIC_URL}> */}
        <HashRouter>
            {/* <BrowserRouter basename="/admin"> */}
            <App />
            {/* </BrowserRouter> */}
        </HashRouter>
    </ReduxProvider>
    // </StrictMode>
);
