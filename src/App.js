// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';

import axiosInterceptor from 'utils/axios.utils'

import Background from 'assets/images/ximang_background.jpg'

axiosInterceptor()
// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
    // <div style={{backgroundImage:`url(${Background})`}}>
    <ThemeCustomization>
        <ScrollTop>
            <Routes />
        </ScrollTop>
    </ThemeCustomization>
    // </div>
);

export default App;
