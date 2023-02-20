import DashboardDefault from 'pages/dashboard/index';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRoutes, Routes, Route } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

import PrivateRoute from './PrivateRoute';
// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const authReducer = useSelector((store) => store.authReducer);

    useEffect(() => {
        console.log(`Auth reducer`, authReducer);
    }, [authReducer.isAuth]);

    // return useRoutes([MainRoutes, LoginRoutes]);

    return (
        <Routes>
            <Route path={LoginRoutes.path} element={LoginRoutes.element}>
                {LoginRoutes.children.map((item, index) => {
                    return <Route path={item.path} element={item.element} />;
                })}
            </Route>
            <Route path={'/'} element={MainRoutes.element}>
                {MainRoutes.children.map((item, index) => {
                    return (
                        <Route path={item.path} key={index + `group`}>
                            {item?.children?.map((subItem, index) => {
                                return <Route path={subItem.path} element={<PrivateRoute>{subItem.element}</PrivateRoute>} />;
                            })}
                        </Route>
                    );
                })}
            </Route>
            {/* <Route element={<Layout />}>
                <Route path="/" element={<PublicPage />} />
                <Route path="/public" element={<PublicPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route element={<RequireAuth />}>
                    <Route path="/protected" element={<ProtectedPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
            </Route> */}
            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
    );
}
