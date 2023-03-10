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
    QrcodeOutlined,
    SettingOutlined
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
    QrcodeOutlined,
    SettingOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
    id: 'authentication',
    title: 'Quản trị hệ thống',
    type: 'group',
    children: [   
        {
            id: 'admin-categories',
            type: 'item',
            title: 'Cấu hình danh mục',
            icon: icons.ShoppingCartOutlined,
            url: '/admin/categories',
            target: false, 
        },
        {
            id: 'admin-users',
            type: 'item',
            title: 'Quản lý tài khoản',
            icon: icons.UserOutlined,
            url: '/admin/users',
            target: false, 
        }, 
        {
            id: 'admin-config',
            type: 'item',
            title: 'Cài đặt',
            icon: icons.SettingOutlined,
            url: '/admin/settings',
            target: false, 
        },
    ]
};

export default pages;
