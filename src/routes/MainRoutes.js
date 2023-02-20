import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// render - dashboard
const FBinanceDashboard = Loadable(lazy(() => import('pages/fbinance-dashboard')));

// render - dashboard
const HFTSetting = Loadable(lazy(() => import('pages/hft-setting')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'color',
            element: <Color />
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
            path: 'management',
            children: [
                {
                    path: 'customers',
                    element: <DashboardDefault />
                },
                {
                    path: 'products',
                    element: <DashboardDefault />
                },
                {
                    path: 'categories',
                    element: <DashboardDefault />
                },
                {
                    path: 'orders',
                    element: <DashboardDefault />
                },
                {
                    path: 'sales',
                    element: <DashboardDefault />
                },
            ]
        },
        {
            path: 'system',
            children: [
                {
                    path: 'users',
                    element: <DashboardDefault />
                },
                {
                    path: 'shop-config',
                    element: <DashboardDefault />
                }, 
            ]
        },
        {
            path: 'fbinance-dashboard',
            children: [
                {
                    path: 'default',
                    element: <FBinanceDashboard />
                }
            ]
        },
        {
            path: 'hft-setting',
            element: <HFTSetting />
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'shadow',
            element: <Shadow />
        },
        {
            path: 'typography',
            element: <Typography />
        },
        {
            path: 'icons/ant',
            element: <AntIcons />
        }
    ]
};

export default MainRoutes;
