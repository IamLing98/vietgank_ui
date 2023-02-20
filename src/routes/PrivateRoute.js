import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';

function PrivateRoute({ children }) {
    const authReducer = useSelector((store) => store.authReducer);

    useEffect(() => {
        console.log(authReducer, children);
    }, []);

    if (!authReducer.isAuth) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} />;
    }
    // if (item?.children) {
    //     return (
    //         <>
    //             {item?.children?.map((subItem, index) => {
    //                 return <Route path={subItem.path} element={<PrivateRoute item={subItem} />}></Route>;
    //             })}
    //         </>
    //     );
    // } 

    return (
        <>
           {children}
        </>
    );
}

export default PrivateRoute;
