import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, ToastAndroid} from 'react-native';
import ApiCalls from '../../api/ApiCalls';
import CustomListItem from '../../components/CustomListItem';
import moment from 'moment';
function AppointmentList({navigation}) {
  const [appointments, setAppointments] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      ApiCalls.getAppointments()
        .then((response) => {
          setAppointments(response);
        })
        .catch((error) => {
          // console.log(error);
          if (error.response) {
            console.log(error.response);
            ToastAndroid.show(`${error.response.data}`, ToastAndroid.SHORT);
          } else {
            ToastAndroid.show('Server not responding', ToastAndroid.SHORT);
          }
        });
    }, []),
  );

  function viewDetailedAppointment(appointment) {
    navigation.navigate('Appointment Details', appointment);
  }
  return (
    <View>
      {appointments.map((appointment, index) => (
        <CustomListItem
          avatarUrl={appointment.seller ? appointment.seller.profilePic : ''}
          title={
            appointment.seller
              ? `${appointment.seller.firstName} ${
                  appointment.seller.lastName || ''
                }`
              : ''
          }
          subTitle={`${
            appointment.appointmentDate
              ? moment(appointment.appointmentDate).format('DD-MM-YYYY')
              : ''
          }(${appointment.startTime || ''} - ${appointment.endTime || ''})`}
          subSubTitle={appointment.status.toUpperCase()}
          subSubSubTitle={moment(appointment.appointmentDate)}
          key={index}
          onPress={() => {
            viewDetailedAppointment(appointment);
          }}
        />
      ))}
    </View>
  );
}

export default AppointmentList;
