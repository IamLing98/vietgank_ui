// project import
import pages from './pages';
import dashboard from './dashboard';
import utilities from './utilities';
import support from './support';

import { DashboardOutlined, AliwangwangOutlined, WechatOutlined, WeiboCircleOutlined } from '@ant-design/icons';
// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [
        dashboard,
        {
            id: 'group-dashboard-1',
            title: 'Quản lý dịch vụ',
            type: 'group',
            children: [,
                {
                    id: 'customers',
                    title: 'Quản lý khách hàng',
                    type: 'item',
                    url: '/management/customers',
                    icon: WeiboCircleOutlined,
                    breadcrumbs: false
                },
                {
                    id: 'categories',
                    title: 'Quản lý danh mục',
                    type: 'item',
                    url: '/management/categories',
                    icon: DashboardOutlined,
                    breadcrumbs: false
                },
                {
                    id: 'products',
                    title: 'Quản lý sản phẩm',
                    type: 'item',
                    url: '/management/products',
                    icon: AliwangwangOutlined,
                    breadcrumbs: false
                },
                {
                    id: 'orders',
                    title: 'Quản lý đặt hàng',
                    type: 'item',
                    url: '/management/orders',
                    icon: WechatOutlined,
                    breadcrumbs: false
                } ,
                {
                    id: 'sales',
                    title: 'Quản lý khuyến mãi',
                    type: 'item',
                    url: '/management/sales',
                    icon: WechatOutlined,
                    breadcrumbs: false
                } 
            ]
        },
        {
            id: 'group-dashboard-1',
            title: 'Quản trị hệ thống',
            type: 'group',
            children: [,
                {
                    id: 'users',
                    title: 'Quản lý người dùng',
                    type: 'item',
                    url: '/system/users',
                    icon: WeiboCircleOutlined,
                    breadcrumbs: false
                },
                {
                    id: 'shop-config',
                    title: 'Cấu hình shop',
                    type: 'item',
                    url: '/system/shop-config',
                    icon: DashboardOutlined,
                    breadcrumbs: false
                } 
            ]
        },
        // pages,
        // utilities,
        // support
    ]
};

export default menuItems;
