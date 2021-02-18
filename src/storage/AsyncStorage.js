
import AsyncStorage from '@react-native-async-storage/async-storage';

function StorageBase(key) {
  async function getItem() {
    const result  = await AsyncStorage.getItem(key).then(res=>JSON.parse(res));
    return result;
  }

  function setItem(value) {
    const val = JSON.stringify(value);
    AsyncStorage.setItem(key, val);
  }

  function removeItem() {
    AsyncStorage.removeItem(key);
  }

  function clear() {
    AsyncStorage.clear();
  }

  return {
    getItem,
    setItem,
    removeItem,
    clear,
  };
}

export default StorageBase;
