import { useFocusEffect } from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import ApiCalls from '../../api/ApiCalls';
function SlotList({navigation, route}) {
  const [selectedDay, setSelectedDay] = useState(new Date());
  coonst [slotsList,seetSlotsList] = useState([])
  const {seller} = route.params
  useFocusEffect(
    React.useCallback(() => {
      getAvailableSlots(new Date())
    }, []),
  );

  function getAvailableSlots(day){
    ApiCalls.getAvailableSlots({seller:seller._id,appointmentDate:new Date(day).toISOString()})
        .then((response) => {
          seetSlotsList(response);
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            // Toast.show({type: 'error', text1: error.response.data});
          } else {
            // Toast.show({type: 'error', text1: 'Server not responding'});
          }
        });
    // console.log(e)
  }


  return (
    <>
      <Agenda
        items={{
          '2021-02-19': [{name: 'item 1 - any js object'}],
          '2021-02-20': [{name: 'item 2 - any js object', height: 80}],
          '2021-02-22': [
            {name: 'item 3 - any js object'},
            {name: 'any js object'},
          ],
        }}
        loadItemsForMonth={(month) => {
          console.log('trigger items loading');
        }}
        onCalendarToggled={(calendarOpened) => {
          console.log(calendarOpened,'calendarOpened');
        }}
        onDayPress={({dateString}) => {
          getAvailableSlots(dateString)
          console.log('day pressed',dateString);
        }}
        onDayChange={(day) => {
          console.log('day changed');
        }}
        selected={new Date()}
        minDate={new Date()}
        pastScrollRange={1}
        futureScrollRange={4}
        renderItem={(item, firstItemInDay) => {
          return <Text >{item.name}</Text>;
        }}
        renderEmptyDate={() => {
          return <Text>No slots available</Text>;
        }}
        renderKnob={() => {
          return <View />;
        }}
        renderEmptyData={() => {
          return <Text></Text>;
        }}
        rowHasChanged={(r1, r2) => {
          return r1.text !== r2.text;
        }}
        
        onRefresh={() => console.log('refreshing...')}
        refreshing={false}
        refreshControl={null}
        theme={{
          agendaDayTextColor: 'yellow',
          agendaDayNumColor: 'green',
          agendaTodayColor: 'red',
          agendaKnobColor: 'blue',
        }}
        style={{}}
      />
    </>
  );
}

export default SlotList;
