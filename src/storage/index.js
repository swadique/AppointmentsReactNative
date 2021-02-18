import StorageBase from './AsyncStorage';

const LocalStorage = {
  authToken: StorageBase('authToken'),
  userData: StorageBase('userData'),
};

export default LocalStorage;
