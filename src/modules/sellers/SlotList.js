import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import moment from 'moment';
import {Agenda} from 'react-native-calendars';
import ApiCalls from '../../api/ApiCalls';
function SlotList({navigation, route}) {
  const [agendaItems, setAgendaItems] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );
  const {seller} = route.params;

  useEffect(() => {
    getAvailableSlots(selectedDate);
    console.log(agendaItems);
  }, [selectedDate]);

  function getAvailableSlots(day) {
    ApiCalls.getAvailableSlots({
      seller: seller._id,
      appointmentDate: moment(day).toISOString(),
    })
      .then((response) => {
        setAgendaItems({[day]: response});
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          ToastAndroid.show(error.response.data);
        } else {
          ToastAndroid.show('Server not responding');
        }
      });
  }

  function handleSlotPress(appointmentData = {slot: {}, seller: {}}) {
    navigation.navigate({
      name: 'Book Appointment',
      params: {...appointmentData},
    });
  }

  function renderItem(item) {
    return (
      <TouchableOpacity
        style={[styles.renderItem]}
        onPress={() =>
          handleSlotPress({
            slot: item,
            seller: seller,
            appointmentDate: selectedDate,
          })
        }>
        <Text>{`${item.startTime} - ${item.endTime}`}</Text>
      </TouchableOpacity>
    );
  }
  function renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>No slots available in this day</Text>
      </View>
    );
  }

  return (
    <Agenda
      items={agendaItems}
      onDayPress={({dateString}) => setSelectedDate(dateString)}
      minDate={new Date()}
      pastScrollRange={1}
      futureScrollRange={4}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
      rowHasChanged={(r1, r2) => {
        return r1.text !== r2.text;
      }}
      refreshing={false}
      refreshControl={null}
    />
  );
}
const styles = StyleSheet.create({
  renderItem: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginRight: 10,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: 80,
  },
  emptyDate: {
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    marginRight: 10,
    marginTop: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SlotList;
