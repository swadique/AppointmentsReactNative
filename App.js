/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ActivityIndicator, ToastAndroid, View} from 'react-native';
import Login from './src/modules/register/login';
import Signup from './src/modules/register/signup';
import UserContext from './src/contexts/userContext';
import LocalStorage from './src/storage';
import checkTokenValidity from './src/util/checkTokenvalidity';
import AuthContext from './src/contexts/authContext';
import Appointments from './src/modules/appointments';
import {Icon} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Sellers from './src/modules/sellers';
import Settings from './src/modules/settings';

const App = () => {
  const [userData, setUserData] = React.useState();
  const [authToken, setAuthToken] = React.useState();
  const [isValidToken, setIsValidToken] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  React.useEffect(() => {
    LocalStorage.userData.getItem().then((res) => {
      setUserData(res);
    });
  }, []);

  React.useEffect(() => {
    checkTokenValidity()
      .then(({status, type}) => {
        if (status) {
          setLoading(false);
          setIsValidToken(true);
        } else {
          setLoading(false);
          setIsValidToken(false);
          ToastAndroid.show(`${type}`, ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
        setIsValidToken(false);
        ToastAndroid.show('Please login again', ToastAndroid.SHORT);
      });
  }, [authToken]);

  function updateUserData(data) {
    LocalStorage.userData.setItem(data);
    setUserData(data);
  }
  function updateAuthToken(data) {
    LocalStorage.authToken.setItem(data);
    setAuthToken(data);
  }
  function clearAuthToken() {
    LocalStorage.authToken.clear();
    setAuthToken('');
  }
  function clearUserData() {
    LocalStorage.userData.clear();
    setUserData('');
  }
  function getScreenOptions({route}) {
    return {
      tabBarIcon: ({focused, color, size}) => {
        let iconName;
        if (route.name === 'sellers') {
          iconName = 'add';
        } else if (route.name === 'appointments') {
          iconName = 'alarm';
        } else if (route.name === 'Settings') {
          iconName = 'settings';
        }
        return (
          <Icon
            name={iconName}
            type="ionicons"
            color={focused ? '#61DBFB' : 'grey'}
          />
        );
      },
    };
  }
  return (
    <SafeAreaProvider>
      <UserContext.Provider
        value={{
          userData: userData,
          setUserData: updateUserData,
          clearUserData: clearUserData,
        }}>
        <AuthContext.Provider
          value={{
            authToken: authToken,
            setAuthToken: updateAuthToken,
            clearAuthToken: clearAuthToken,
          }}>
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
              <Tab.Navigator
                screenOptions={getScreenOptions}
                tabBarOptions={{
                  activeTintColor: '#61DBFB',
                  inactiveTintColor: 'gray',
                }}>
                <Tab.Screen
                  name="appointments"
                  component={Appointments}
                  options={{title: 'Appointments'}}
                />
                <Tab.Screen
                  name="sellers"
                  component={Sellers}
                  options={{title: 'Create'}}
                />
                <Tab.Screen name="Settings" component={Settings} />
              </Tab.Navigator>
            ) : (
              <Stack.Navigator initialRouteName="login" headerMode="none">
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
    </SafeAreaProvider>
  );
};

export default App;
