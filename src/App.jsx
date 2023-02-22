// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axiosInterceptor from 'utils/axios.utils';

axiosInterceptor()
// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const client = new QueryClient();

const App = () => (
    <QueryClientProvider client={client}>
        <ThemeCustomization>
            <ScrollTop>
                <ToastContainer
                    containerId="an id"
                    draggable={false}
                />
                <Routes />
            </ScrollTop>
        </ThemeCustomization>
    </QueryClientProvider>
);

export default App;
