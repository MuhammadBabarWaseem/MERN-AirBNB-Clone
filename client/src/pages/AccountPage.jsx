import React, { useContext } from 'react'
import { UserContext } from '../userContext'
import { Navigate } from 'react-router-dom';

const AccountPage = () => {
    const {ready , user} = useContext(UserContext);

    if(!ready){
        return 'Loading......';
    }
 
    if(ready && !user) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div>
            Account Page for {user?.name}
        </div>
    )
}

export default AccountPage
