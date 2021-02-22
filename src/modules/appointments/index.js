import React from 'react';
import {StyleSheet} from 'react-native';
import AppointmentList from './AppointmentList';
import AppointmentDetails from './AppointmentDetails';
import {createStackNavigator} from '@react-navigation/stack';
function Appointments() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Appointment List" component={AppointmentList} />
      <Stack.Screen name="Appointment Details" component={AppointmentDetails} />
    </Stack.Navigator>
  );
}

export default Appointments;
