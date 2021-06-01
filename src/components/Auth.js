import React, { useState } from 'react';

import Login from './Login';
import Signup from './Signup';


const Auth = () => {
    const [auth, setAuth] = useState('LOGIN')
    if (auth === 'LOGIN') return <Login setAuth={setAuth} />
    else return <Signup setAuth={setAuth} />
};

export default Auth;