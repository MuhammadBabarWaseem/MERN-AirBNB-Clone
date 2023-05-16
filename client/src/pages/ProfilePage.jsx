import React, { useContext, useState } from 'react';
import { UserContext } from '../userContext';
import { Link, Navigate, useParams } from 'react-router-dom';
import '../App.css'
import axios from 'axios';
import PlacesPage from './PlacesPage';
import Loader from '../Loader';
import AccountNav from '../AccountNav';

const ProfilePage = () => {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);

    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile'
    }

    if (!ready) {
        return <Loader/>
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    const logout = async () => {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

   

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
           <AccountNav/>
            {subpage === 'profile' && (
                <div className='text-center max-w-lg mx-auto'>
                    Logged In As <span className='font-bold'>{user.name}</span> ({user.email}) <br />
                    <button onClick={logout} className="cssbuttons-io-button mx-auto mt-5"> Log Out
                        <div className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                        </div>
                    </button>
                </div>
            )}

            {subpage === 'places' && (
                <PlacesPage />
            )}

        </div>
    )
}

export default ProfilePage
