import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import PrivateRoute from './PrivateRoute';
import UserProfile from 'pages/profile/UserProfile';
import AccountProfile from 'pages/profile/AccountProfile';
import UserList from 'pages/profile/UserList';
import UserCard from 'pages/profile/UserCard';
import Profile from 'pages/profile/Profile';

const UserCardList = Loadable(lazy(() => import('pages/profile/UserCardList')));
const CopyToClipboard = Loadable(lazy(() => import('pages/plugins/CopyToClipboard')));
const Mask = Loadable(lazy(() => import('pages/plugins/Mask')));

// react table component
import Base from 'pages/react-table/Base';
import Filtering from 'pages/react-table/Filter';
import Pagination from 'pages/react-table/Pagnation';
import RowSelection from 'pages/react-table/RowSelection';

const Chat = Loadable(lazy(() => import('pages/chat')));

const AddNewProduct = Loadable(lazy(() => import('pages/e-commerce/AddNewProduct')));
const Checkout = Loadable(lazy(() => import('pages/e-commerce/Checkout')));
const Products = Loadable(lazy(() => import('pages/e-commerce/Products')));
const ProductDetail = Loadable(lazy(() => import('pages/e-commerce/ProductDetail')));
const ProductList = Loadable(lazy(() => import('pages/e-commerce/ProductList')));

const FormValidation = Loadable(lazy(() => import('pages/form-validation/FormValidation')));

const DataView = Loadable(lazy(() => import('pages/data/DataView')));

const Statistic = Loadable(lazy(() => import('pages/statistic/Statistic')));

// render - sorting
const Sorting = Loadable(lazy(() => import('pages/react-table/Sorting')));

// render - grouping
const Grouping = Loadable(lazy(() => import('pages/react-table/Grouping')));

// render - kanban
const KanBan = Loadable(lazy(() => import('pages/kanban/KanBan')));

// render - drop zone
const MyDropZone = Loadable(lazy(() => import('pages/dropzone/DropZone')));

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// render - countdown
const CountDown = Loadable(lazy(() => import('pages/count-down/CountDown')));

// render - tour
const ReactTour = Loadable(lazy(() => import('pages/tour/reactour/Tour')));
const IntroJsTour = Loadable(lazy(() => import('pages/tour/introjs/IntroJsTour')));

// render - qrcode
const QrCode = Loadable(lazy(() => import('pages/qrcode/QrCode')));

// render - courses
const CourseListTable = Loadable(lazy(() => import('pages/courses/list/CourseList')));

// render - courses
const ChapterListTable = Loadable(lazy(() => import('pages/chapters/list/ChapterList')));


const UserManagement = Loadable(lazy(() => import('pages/admin/users')));
const Settings = Loadable(lazy(() => import('pages/admin/settings')));
const Categories = Loadable(lazy(() => import('pages/admin/categories')));
const ProductManagement = Loadable(lazy(() => import('pages/management/products')));
const PlacesManagement = Loadable(lazy(() => import('pages/management/places')));
const OrderManagement = Loadable(lazy(() => import('pages/management/orders')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    // element: <PrivateRoute />,
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'statistics',
            element: <Statistic />
        },
        {
            path: 'form-validation',
            element: <FormValidation />
        },
        {
            path: 'color',
            element: <Color />
        },
        {
            path: 'dropzone',
            element: <MyDropZone />
        },
        {
            path: 'count-down',
            element: <CountDown />
        },
        {
            path: 'tour',
            children: [
                {
                    path: 'reactour',
                    element: <ReactTour />
                },
                {
                    path: 'introjs',
                    element: <IntroJsTour />
                }
            ]
        },
        {
            path: 'qrcode',
            element: <QrCode />
        },
        {
            path: 'chat',
            element: <Chat />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'courses',
            children: [
                {
                    path: 'list',
                    element: <CourseListTable />
                },
                {
                    path: 'chapters',
                    element: <ChapterListTable />
                }
            ]
        },
        {
            path: 'e-commerce',
            children: [
                {
                    path: 'checkout',
                    element: <Checkout />
                },
                {
                    path: 'product-list',
                    element: <ProductList />
                },
                {
                    path: 'product-detail/:productId',
                    element: <ProductDetail />
                },
                {
                    path: 'products',
                    element: <Products />
                },
                {
                    path: 'add-new-product',
                    element: <AddNewProduct />
                }
            ]
        },
        {
            path: 'management',
            children: [
                {
                    path: 'products',
                    element: <ProductManagement />
                },
                {
                    path: 'places',
                    element: <PlacesManagement />
                },
                {
                    path: 'orders',
                    element: <OrderManagement />
                },
                 
            ]
        },
        {
            path: 'data-view',
            element: <DataView />
        },
        // User
        {
            path: 'profile',
            children: [
                {
                    path: 'user-profile',
                    element: <UserProfile />
                },
                {
                    path: 'account-profile',
                    element: <AccountProfile />
                },
                {
                    path: 'user-list',
                    element: <UserList />
                },
                {
                    path: 'user-card-list',
                    element: <UserCardList />
                },
                {
                    path: 'user-card',
                    element: <UserCard />
                }
            ]
        },
        //   == end User ==
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'shadow',
            element: <Shadow />
        },
        {
            path: 'kanban',
            element: <KanBan />
        },
        {
            path: 'typography',
            element: <Typography />
        },
        {
            path: 'icons/ant',
            element: <AntIcons />
        },
        // Plugins
        {
            path: 'plugins',
            children: [
                {
                    path: 'copy-to-clipboard',
                    element: <CopyToClipboard />
                },
                {
                    path: 'mask',
                    element: <Mask />
                }
            ]
        },
        // Admin
        {
            path: 'admin',
            children: [
                {
                    path: 'settings',
                    element: <Settings />
                },
                {
                    path: 'users',
                    element: <UserManagement />
                },
                {
                    path: 'categories',
                    element: <Categories />
                }
            ]
        },
        // React table
        {
            path: 'react-table',
            children: [
                {
                    path: 'base',
                    element: <Base />
                },
                {
                    path: 'sorting',
                    element: <Sorting />
                },
                {
                    path: 'filtering',
                    element: <Filtering />
                },
                {
                    path: 'grouping',
                    element: <Grouping />
                },
                {
                    path: 'pagination',
                    element: <Pagination />
                },
                {
                    path: 'row-selection',
                    element: <RowSelection />
                }
            ]
        }
    ]
};

export default MainRoutes;
