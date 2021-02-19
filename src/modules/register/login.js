import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import ApiCalls from '../../api/ApiCalls';
import AuthContext from '../../contexts/authContext';
import UserContext from '../../contexts/userContext';
import Toast from 'react-native-toast-message';
import LocalStorage from '../../storage';

function Login({navigation}) {
  const {setUserData} = useContext(UserContext);
  const {setAuthToken} = useContext(AuthContext);
  function handleFormData(value, fieldName) {
    setFormData({...formData, [fieldName]: value});
  }
  async function getAuthToken() {
    const token = await LocalStorage.authToken.getItem();
    Toast.show({type: 'success', text1: token});
  }
  function handleSubmit() {
    ApiCalls.login(formData)
      .then((res) => {
        setAuthToken(res.authToken);
        setUserData(res);
      })
      .catch((e) => {
        console.log(e);
        if (e.response) {
          Toast.show({type: 'error', text1: e.response.data});
        } else {
          Toast.show({type: 'error', text1: e.message});
        }
      });
  }
  function onRegistrationPress() {
    navigation.navigate('signup');
  }
  const [formData, setFormData] = useState({});
  useEffect(() => {
    getAuthToken();
  }, []);

  return (
    <View style={styles.container}>
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <TextInput
        style={styles.inputBox}
        underlineColorAndroid="rgba(0,0,0,0)"
        placeholder="Email"
        placeholderTextColor="#ffffff"
        selectionColor="#fff"
        keyboardType="email-address"
        onChangeText={(value) => handleFormData(value, 'email')}
      />
      <TextInput
        style={styles.inputBox}
        underlineColorAndroid="rgba(0,0,0,0)"
        defaultValue={formData.password}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(value) => handleFormData(value, 'password')}
        placeholderTextColor="#ffffff"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.signupText} onPress={onRegistrationPress}>
        Register Now
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#455a64',
  },

  inputBox: {
    width: 300,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10,
  },
  button: {
    width: 300,
    backgroundColor: '#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  signupText: {
    marginVertical: 20,
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default Login;
