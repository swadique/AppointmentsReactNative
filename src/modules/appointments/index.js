import React, {useContext,useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { ListItem,Avatar} from 'react-native-elements';
import UserContext from '../../contexts/userContext';
import {Header} from 'react-native-elements';

function Appointments({navigation}) {
  const {userData} = useContext(UserContext);
  const [appointments,setAppointments] = useState([])
  return (
    <View style={styles.container}>
      <Header
        placement="left"
        leftComponent={{text: 'MY APPOINTMENTS', style: {color: '#fff'}}}
        backgroundColor={'#455a64'}
      />
      <View>
        {appointments.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar source={{uri: l.avatar_url}} />
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
              <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
 
});

export default Appointments;
