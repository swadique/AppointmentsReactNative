import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import UserContext from '../../contexts/userContext';

function Appointments({navigation}) {
  const {userData} = useContext(UserContext);
  return (
    <View style={styles.container}>
      <Text>Hello Da</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#455a64',
  },
});

export default Appointments;
