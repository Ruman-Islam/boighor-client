// import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import fetcher from '../api/axios';

const UseToken = user => {
    const [token, setToken] = useState("");
    const useData = useMemo(() => {
        return {
            email: user?.email,
            user_name: user?.displayName,
            photoURL: user?.photoURL,
            phone: user?.user?.phoneNumber,
            role: 'user',
        }
    }, [user]);

    useEffect(() => {
        if (user?.email) {
            (async () => {
                try {
                    const { data } = await fetcher.put("user/social_login", useData);
                    const accessToken = data.accessToken;
                    localStorage.setItem('accessToken', JSON.stringify(accessToken));
                    setToken(accessToken);
                } catch (error) {
                    console.log(error)
                }
            })()
        }
    }, [user?.email, useData])

    return { token };
};

export default UseToken;