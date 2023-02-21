// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';

import axiosInterceptor from 'utils/axios.utils'

import Background from 'assets/images/ximang_background.jpg'

axiosInterceptor()
// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => ( 
    <ThemeCustomization>
        <ScrollTop>
            <Routes />
        </ScrollTop>
    </ThemeCustomization> 
);
 
export default App;
