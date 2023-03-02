// assets
import {
    AlignLeftOutlined,
    UserOutlined,
    SettingOutlined, 
} from '@ant-design/icons'; 

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
            icon: AlignLeftOutlined,
            url: '/admin/categories',
            target: false, 
        },
        {
            id: 'admin-users',
            type: 'item',
            title: 'Quản lý tài khoản',
            icon: UserOutlined,
            url: '/admin/users',
            target: false, 
        }, 
        {
            id: 'admin-config',
            type: 'item',
            title: 'Cài đặt',
            icon: SettingOutlined,
            url: '/admin/settings',
            target: false, 
        },
    ]
};

export default pages;
