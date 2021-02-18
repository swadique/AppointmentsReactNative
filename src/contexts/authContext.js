import React from 'react';
import LocalStorage from '../storage';

const AuthContext = React.createContext(LocalStorage.authToken.getItem() || {});

export default AuthContext;
