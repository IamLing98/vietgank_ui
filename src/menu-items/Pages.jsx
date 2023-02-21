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
    title: 'Quản lý',
    type: 'group',
    children: [  
        {
            id: 'e-commerce',
            type: 'item',
            title: 'Quản lý sản phẩm',
            icon: icons.ShoppingCartOutlined,
            url: '/e-commerce/product-list',
            target: false, 
        },
        // {
        //     id: 'statistic',
        //     title: '统计数据',
        //     type: 'item',
        //     url: '/statistics',
        //     icon: icons.IdcardOutlined,
        //     target: false
        // },
        // {
        //     id: 'form-validation',
        //     title: '表单验证',
        //     type: 'item',
        //     url: '/form-validation',
        //     icon: icons.FileDoneOutlined,
        //     target: false
        // },
        // {
        //     id: 'count-down',
        //     title: '倒计时',
        //     type: 'item',
        //     url: '/count-down',
        //     icon: icons.ClockCircleOutlined,
        //     target: false
        // },
        // {
        //     id: 'qrcode',
        //     title: '二维码',
        //     type: 'item',
        //     url: '/qrcode',
        //     icon: icons.QrcodeOutlined,
        //     target: false
        // },
        // {
        //     id: 'tours',
        //     type: 'collapse',
        //     title: '导航指南',
        //     icon: icons.QuestionCircleOutlined,
        //     target: false,
        //     children: [
        //         {
        //             id: 'reactour',
        //             title: 'React tour',
        //             type: 'item',
        //             url: '/tour/reactour',
        //             target: false
        //         },
        //         {
        //             id: 'introjs',
        //             title: 'Introjs React tour',
        //             type: 'item',
        //             url: '/tour/introjs',
        //             target: false
        //         }
        //     ]
        // },
        // {
        //     id: 'courses',
        //     type: 'collapse',
        //     title: '课程管理',
        //     icon: icons.InsertRowAboveOutlined,
        //     target: false,
        //     children: [
        //         {
        //             id: 'course-list',
        //             type: 'item',
        //             title: '课程列表',
        //             url: '/courses/list',
        //             target: false
        //         },
        //         {
        //             id: 'course-add',
        //             type: 'item',
        //             title: '课程章节',
        //             url: '/courses/chapters',
        //             target: false
        //         }
        //     ]
        // },
        // {
        //     id: 'dataview',
        //     title: '数据呈现',
        //     type: 'item',
        //     url: '/data-view',
        //     icon: icons.DatabaseOutlined,
        //     target: false
        // },
        // {
        //     id: 'chat',
        //     title: '聊天',
        //     type: 'item',
        //     url: '/chat',
        //     icon: icons.MessageOutlined,
        //     target: false
        // },
        // {
        //     id: 'kanban',
        //     title: '看板',
        //     type: 'item',
        //     url: '/kanban',
        //     icon: icons.BuildOutlined,
        //     target: false
        // },
        // {
        //     id: 'e-commerce',
        //     type: 'item',
        //     title: 'Quản lý sản phẩm',
        //     icon: icons.ShoppingCartOutlined,
        //     url: '/e-commerce/product-list',
        //     target: false, 
        // },
        // // {
        // //     id: 'e-commerce',
        // //     type: 'collapse',
        // //     title: 'Quản lý sản phẩm',
        // //     icon: icons.ShoppingCartOutlined,
        // //     url: '/e-commerce',
        // //     target: false,
        // //     children: [
        // //         {
        // //             id: 'product-detail',
        // //             type: 'item',
        // //             title: '产品介绍',
        // //             url: '/e-commerce/product-detail/1',
        // //             target: false
        // //         },
        // //         {
        // //             id: 'product-list',
        // //             type: 'item',
        // //             title: '产品列表',
        // //             url: '/e-commerce/product-list',
        // //             target: false
        // //         }
        // //     ]
        // // },
        // {
        //     id: 'profile',
        //     type: 'collapse',
        //     title: '个人信息',
        //     url: '/profile',
        //     icon: icons.UserOutlined,
        //     target: false,
        //     children: [
        //         {
        //             id: 'user-profile',
        //             type: 'item',
        //             title: '用户个人信息',
        //             url: '/profile/user-profile',
        //             target: false
        //         },

        //         {
        //             id: 'account-profile',
        //             type: 'item',
        //             title: '账户个人信息',
        //             url: '/profile/account-profile',
        //             target: false
        //         },
        //         {
        //             id: 'user-list',
        //             type: 'item',
        //             title: '用户列表',
        //             url: '/profile/user-list',
        //             target: false
        //         },
        //         {
        //             id: 'user-card',
        //             type: 'item',
        //             title: '用户卡',
        //             url: '/profile/user-card',
        //             target: false
        //         }
        //     ]
        // },
        // {
        //     id: 'react-tables',
        //     type: 'collapse',
        //     title: '表格',
        //     icon: icons.InsertRowAboveOutlined,
        //     target: false,
        //     children: [
        //         {
        //             id: 'react-table-basic',
        //             type: 'item',
        //             title: '基础版',
        //             url: '/react-table/base',
        //             target: false
        //         },

        //         {
        //             id: 'react-table-filtering',
        //             type: 'item',
        //             title: '过滤',
        //             url: '/react-table/filtering',
        //             target: false
        //         }
        //     ]
        // },
        // {
        //     id: 'dropzone',
        //     type: 'item',
        //     title: '拖拽区域',
        //     icon: icons.DropboxOutlined,
        //     url: '/dropzone',
        //     target: false
        // },
        // {
        //     id: 'plugins',
        //     type: 'collapse',
        //     title: '插件',
        //     icon: icons.UserOutlined,
        //     target: false,
        //     children: [
        //         {
        //             id: 'copies',
        //             type: 'item',
        //             title: '复制到剪切板',
        //             url: '/plugins/copy-to-clipboard',
        //             target: false
        //         },
        //         {
        //             id: 'mask',
        //             type: 'item',
        //             title: '掩码',
        //             url: '/plugins/mask',
        //             target: false
        //         }
        //     ]
        // }
    ]
};

export default pages;
