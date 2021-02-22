import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SlotList from './SlotList';
import BookAppointment from './BookAppointment';
import SellersList from './SellersList';

function Sellers() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Choose Seller" component={SellersList} />
      <Stack.Screen name="Choose Slot" component={SlotList} />
      <Stack.Screen name="Book Appointment" component={BookAppointment} />
    </Stack.Navigator>
  );
}

export default Sellers;
