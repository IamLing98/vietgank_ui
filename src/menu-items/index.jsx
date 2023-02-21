// project import
import pages from './Pages';
import dashboard from './Dashboard';
import utilities from '../store/data/Utilities';
import support from '../store/data/Support';
import adminPage from './AdminPage';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [dashboard, 
        pages,
        adminPage,
        //  utilities,
        //   support
        ]
};

export default menuItems;
