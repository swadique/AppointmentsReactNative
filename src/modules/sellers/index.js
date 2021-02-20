import React from 'react';
import {View} from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import {createStackNavigator} from '@react-navigation/stack';
import SlotList from './SlotList';
import BookAppointment from './BookAppointment';
import SellersList from './SellersList';

function Sellers() {
  const Stack = createStackNavigator();

  return (
        <Stack.Navigator>
          <Stack.Screen
            name="Choose Seller"
            component={SellersList}></Stack.Screen>
          <Stack.Screen name="Choose Slot" component={SlotList}></Stack.Screen>
          <Stack.Screen
            name="Book Appointment"
            component={BookAppointment}></Stack.Screen>
        </Stack.Navigator>
  );
}


export default Sellers;
