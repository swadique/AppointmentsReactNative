import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {Card} from 'react-native-elements';
import ApiCalls from '../../api/ApiCalls';
import PrimaryButton from '../../components/PrimaryButton';
import moment from 'moment';

function BookAppointment({navigation, route}) {
  const {seller, slot, appointmentDate} = route.params;
  const sellerData = [
    {
      label: 'Seller Name',
      value: `${seller.firstName} ${seller.lastName || ''}`,
    },
    {label: 'Seller Email', value: seller.email},
    {label: 'Date', value: moment(appointmentDate).format('DD/MM/YYYY')},
    {label: 'Slot', value: `${slot.startTime} - ${slot.endTime}`},
  ];
  function bookAppointment() {
    ApiCalls.createAppointment({
      seller: seller._id,
      slotId: slot.slotId,
      startTime: slot.startTime,
      endTime: slot.endTime,
      duration: slot.duration,
      appointmentDate: appointmentDate,
    })
      .then((res) => {
        ToastAndroid.showWithGravity(
          'The appointment created successfully',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        navigation.navigate('Choose Seller');
      })
      .catch((e) => {
        console.log(e);
        ToastAndroid.showWithGravity(
          'Creating appointment failed',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      });
  }
  return (
    <View>
      <Card>
        <Card.Title>
          <Text>Appointment Details</Text>
        </Card.Title>
        <Card.Divider />
        <View style={Styles.CardDetails}>
          <View></View>
          {sellerData.map((item, index) => (
            <View style={Styles.textWrapper}>
              <Text>
                <Text style={Styles.textKey}>{item.label} </Text>
                <Text style={Styles.textValue}>{item.value}</Text>
              </Text>
            </View>
          ))}
          <View style={Styles.ButtonWrapper}>
            <PrimaryButton
              text="Create Appointment"
              onPress={bookAppointment}
            />
          </View>
        </View>
      </Card>
    </View>
  );
}
const Styles = StyleSheet.create({
  textKey: {
    textAlign: 'left',
    fontWeight: 'bold',
    marginRight: '16px',
    minWidth: '150px',
    paddingHorizontal: 8,
  },
  textValue: {
    textAlign: 'right',
    minWidth: '150px',
  },
  textWrapper: {
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  ButtonWrapper: {
    alignItems: 'center',
  },
  CardDetails: {
    paddingHorizontal: 16,
  },
});

export default BookAppointment;
