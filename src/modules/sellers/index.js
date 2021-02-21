import React, {useState} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SlotList from './SlotList';
import BookAppointment from './BookAppointment';
import SellersList from './SellersList';
import {Icon} from 'react-native-elements';

function Sellers() {
  const Stack = createStackNavigator();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Choose Seller"
        component={SellersList}
        // options={{
        //   headerRight: () => (
            
        //   ),
        // }}
        ></Stack.Screen>
      <Stack.Screen name="Choose Slot" component={SlotList}></Stack.Screen>
      <Stack.Screen
        name="Book Appointment"
        component={BookAppointment}></Stack.Screen>
    </Stack.Navigator>
  );
}

export default Sellers;
