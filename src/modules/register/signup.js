import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  ToastAndroid,
} from 'react-native';
import ApiCalls from '../../api/ApiCalls';

function Signup({navigation}) {
  function handleFormData(value, fieldName) {
    setFormData({...formData, [fieldName]: value});
  }
  function handleSubmit() {
    ApiCalls.signup(formData)
      .then(() => {
        navigation.navigate('login');
      })
      .catch((e) => {
        if (e.response) {
          ToastAndroid.show(`${e.response.data}`);
        } else {
          ToastAndroid.show('Server not responding');
        }
      });
  }

  function onLoginPress(params) {
    navigation.navigate('login');
  }
  const [formData, setFormData] = useState({userType: 'buyer'});

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        underlineColorAndroid="rgba(0,0,0,0)"
        placeholder="First Name"
        placeholderTextColor="#ffffff"
        selectionColor="#fff"
        onChangeText={(value) => handleFormData(value, 'firstName')}
      />
      <TextInput
        style={styles.inputBox}
        underlineColorAndroid="rgba(0,0,0,0)"
        placeholder="Second Name"
        placeholderTextColor="#ffffff"
        selectionColor="#fff"
        onChangeText={(value) => handleFormData(value, 'lastName')}
      />
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
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
      <Text style={styles.logintext} onPress={onLoginPress}>
        Login
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
  logintext: {
    marginVertical: 20,
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default Signup;
