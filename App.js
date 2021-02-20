import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ActivityIndicator} from 'react-native';
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
import {Icon} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Sellers from './src/modules/sellers';

const App = () => {
  const [userData, setUserData] = React.useState(
    LocalStorage.userData.getItem() || {},
  );
  const [authToken, setAuthToken] = React.useState();
  const [isValidToken, setIsValidToken] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  React.useEffect(() => {
    checkTokenValidity()
      .then(({status, type}) => {
        if (status) {
          setLoading(false);
          setIsValidToken(true);
        } else {
          setLoading(false);
          setIsValidToken(false);
          Toast.show({text1: type});
        }
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
        setIsValidToken(false);
        Toast.show({text1: 'Please login again'});
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
  return (
    <>
      <SafeAreaProvider>
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
                <Tab.Navigator
                  initialRouteName="login"
                  screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                      let iconName;

                      if (route.name === 'sellers') {
                        iconName = focused ? 'add' : 'add';
                      } else if (route.name === 'appointments') {
                        iconName = focused ? 'alarm' : 'alarm';
                      } else if (route.name === 'home') {
                        iconName = focused ? 'home' : 'home';
                      }
                      return (
                        <Icon
                          name={iconName}
                          type="ionicons"
                          // color={focused ? '#517fa4' : 'grey'}
                        />
                      );
                    },
                  })}
                  tabBarOptions={{
                    // activeTintColor: '#517fa4',
                    // inactiveTintColor: 'gray',
                  }}>
                  <Tab.Screen
                    name="home"
                    component={Home}
                    options={{title: 'Home'}}
                  />

                  <Tab.Screen
                    name="sellers"
                    component={Sellers}
                    options={{title: 'Add'}}
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
      </SafeAreaProvider>
    </>
  );
};

export default App;
