import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import UserContext from '../../contexts/userContext';
import {Header} from 'react-native-elements';
import {useFocusEffect} from '@react-navigation/native';
import ApiCalls from '../../api/ApiCalls';
import CustomAvatar from '../../components/CustomAvatar';
import CustomListItem from '../../components/CustomListItem';
import AppointmentList from './AppointmentList';
import AppointmentDetails from './AppointmentDetails';
import { createStackNavigator } from '@react-navigation/stack';
function Appointments() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Appointment List" component={AppointmentList} />
      <Stack.Screen name="Appointment Details" component={AppointmentDetails} />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({});

export default Appointments;
