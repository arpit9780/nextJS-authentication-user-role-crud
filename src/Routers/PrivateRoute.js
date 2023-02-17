import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { appRoutes } from '../Constant';
import Layout from '../components/Layout'
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
    const router = useRouter()
    const [hydrated, setHydrated] = useState(false);

    const {authentication} = useSelector((state)=>{
        return{
            authentication : state?.AuthLogin?.authToken
        }
    })


    useEffect(() => {
        setHydrated(true);
    }, [authentication]);
    if (!hydrated) {
        return null;
    }

  

    let unProtectedRoutes = [
        appRoutes.HOME_PAGE,
        appRoutes.AUTH_LOGIN,
        appRoutes.USER_SIGNUP,
    ]

    let protectedRoutes = [
        appRoutes.ROLE_LIST,
        appRoutes.ROLE_FORM,
        appRoutes.ROLE_EDIT,
        appRoutes.USER_LIST,
        appRoutes.USER_FORM,
        appRoutes.USER_EDIT,
    ]

    const pathIsUnProtected = unProtectedRoutes.indexOf(router.pathname) === -1;
    const pathIsProtected = protectedRoutes.indexOf(router.pathname) === -1;


    if (!authentication && pathIsUnProtected) {
        router.push(appRoutes.HOME_PAGE);
    } else if (authentication && pathIsProtected) {
        router.push(appRoutes.USER_LIST);
    }
    return <Layout>
        {children}
    </Layout>
}

export default PrivateRoute