import React from 'react';
import LocalStorage from '../storage';

const UserContext = React.createContext(LocalStorage.userData.getItem() || {});

export default UserContext;
