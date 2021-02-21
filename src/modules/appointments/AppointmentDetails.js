import React from 'react';
import {View, StyleSheet, Text, ToastAndroid} from 'react-native';
import CustomAvatar from '../../components/CustomAvatar';
import {Card} from 'react-native-elements';
import PrimaryButton from '../../components/PrimaryButton';
import moment from 'moment';
import SecondaryButton from '../../components/SecodaryButton';
import ApiCalls from '../../api/ApiCalls';

function AppointmentDetails({route}) {
  const {
    seller,
    startTime,
    appointmentDate,
    endTime,
    status,
    _id,
  } = route.params;
  const sellerData = [
    {label: 'Status', value: status.toUpperCase()},
    {
      label: 'Seller Name',
      value: `${seller.firstName} ${seller.lastName || ''}`,
    },
    {label: 'Seller Email', value: seller.email},
    {label: 'Date', value: moment(appointmentDate).format('DD/MM/YYYY')},
    {label: 'Slot', value: `${startTime} - ${endTime}`},
  ];
  function cancelAppointment(appointmentId) {
    ApiCalls.cancelAppointment({appointmentId: appointmentId}).then(res=>{
      navigator.navigation("Appointment List")
    }).catch(e=>{
      if(error.response){
        ToastAndroid.show(error.response.data)
      }else{
        ToastAndroid.show("Server not responding")
      }
    })
  }

  return (
    <View>
      <Card>
        <Card.Title>
          <Text>Appointment Details</Text>
        </Card.Title>
        <Card.Divider />
        <View style={Styles.CardDetails}>
          <View style={{alignItems: 'center', paddingVertical: 8}}>
            <CustomAvatar url={seller.profilePic} size="large" />
          </View>
          {sellerData.map((item, index) => (
            <View style={Styles.textWrapper} key={index}>
              <Text>
                <Text style={Styles.textKey}>{item.label}</Text>
                <Text>:</Text>
                <Text style={Styles.textValue}>{item.value}</Text>
              </Text>
            </View>
          ))}
          <View style={Styles.ButtonWrapper}>
            {
              {
                pending: (
                  <SecondaryButton
                    text="Cancel Appointment"
                    onPress={() => cancelAppointment(_id)}
                  />
                ),
                accepted: <SecondaryButton text="Accepted" />,
                rejected: <SecondaryButton text="Rejected" />,
              }[status]
            }
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
    marginHorizontal: 24,
  },
});

export default AppointmentDetails;
