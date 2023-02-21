// assets
import {
    LoginOutlined,
    ProfileOutlined,
    DatabaseOutlined,
    DropboxOutlined,
    UserOutlined,
    IdcardOutlined,
    InsertRowAboveOutlined,
    BuildOutlined,
    FileDoneOutlined,
    ShoppingCartOutlined,
    MessageOutlined,
    ClockCircleOutlined,
    PercentageOutlined,
    QuestionCircleOutlined,
    QrcodeOutlined
} from '@ant-design/icons';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined,
    UserOutlined,
    InsertRowAboveOutlined,
    BuildOutlined,
    DatabaseOutlined,
    IdcardOutlined,
    DropboxOutlined,
    FileDoneOutlined,
    ShoppingCartOutlined,
    MessageOutlined,
    ClockCircleOutlined,
    PercentageOutlined,
    QuestionCircleOutlined,
    QrcodeOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
    id: 'authentication',
    title: 'Quản trị hệ thống',
    type: 'group',
    children: [   
        {
            id: 'admin-users',
            type: 'item',
            title: 'Quản lý tài khoản',
            icon: icons.ShoppingCartOutlined,
            url: '/admin/users',
            target: false, 
        },
        {
            id: 'admin-config',
            type: 'item',
            title: 'Cấu hình',
            icon: icons.ShoppingCartOutlined,
            url: '/e-commerce/product-list',
            target: false, 
        },
    ]
};

export default pages;
