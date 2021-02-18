import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ActivityIndicator} from 'react-native';
import jwtDecode from 'jwt-decode';
import Login from './src/modules/register/login';
import Signup from './src/modules/register/signup';
import UserContext from './src/contexts/userContext';
import {View} from 'native-base';
import Home from './src/modules/home';
import LocalStorage from './src/storage';
import checkTokenValidity from './src/util/checkTokenvalidity';
import AuthContext from './src/contexts/authContext';
import Toast from 'react-native-toast-message';
import Appointments from './src/modules/appointments';
const App = () => {
  const [userData, setUserData] = React.useState(
    LocalStorage.userData.getItem() || {},
  );
  const [authToken, setAuthToken] = React.useState(
    LocalStorage.authToken.getItem() || {},
  );
  const [isValidToken, setIsValidToken] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  React.useEffect(() => {
    checkTokenValidity(authToken).then(({status, type}) => {
      console.log(status, type);
      if (status) {
        setLoading(false);
        setIsValidToken(true);
        Toast.show({ text1: type});
      } else {
        setLoading(false);
        setIsValidToken(false);
        Toast.show({ text1: type});
      }
    });
    console.log(authToken);
  }, [authToken]);

  function updateUserData(data) {
    LocalStorage.userData.setItem(data);
    setUserData(data);
  }
  function updateAuthToken(data) {
    LocalStorage.authToken.setItem(data);
    setAuthToken(data);
  }
  return (
    <>
      <UserContext.Provider
        value={{
          userData: userData,
          setUserData: updateUserData,
        }}>
        <AuthContext.Provider
          value={{
            authToken: authToken,
            setAuthToken: updateAuthToken,
          }}>
          <Toast ref={(ref) => Toast.setRef(ref)} />
          <NavigationContainer>
            {loading ? (
              <View
                style={{
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : isValidToken ? (
              <Tab.Navigator initialRouteName="login">
                <Tab.Screen
                  name="home"
                  component={Home}
                  options={{title: 'Home'}}
                />
                <Tab.Screen
                  name="appointments"
                  component={Appointments}
                  options={{title: 'Appointments'}}
                />
              </Tab.Navigator>
            ) : (
              <Stack.Navigator initialRouteName="login">
                <Stack.Screen
                  name="login"
                  component={Login}
                  options={{title: 'Login'}}
                />
                <Stack.Screen
                  name="signup"
                  component={Signup}
                  options={{title: 'Login'}}
                />
              </Stack.Navigator>
            )}
          </NavigationContainer>
        </AuthContext.Provider>
      </UserContext.Provider>
    </>
  );
};

export default App;
