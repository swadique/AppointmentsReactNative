import React, {useContext, useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Icon, ListItem, Avatar} from 'react-native-elements';
import UserContext from '../../contexts/userContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Header} from 'react-native-elements';
import ApiCalls from '../../api/ApiCalls';
import Toast from 'react-native-toast-message';
import LocalStorage from '../../storage';
import AuthContext from '../../contexts/authContext';

function Sellers({navigation}) {
  const [sellerList, setSellerList] = useState([]);
  const {authToken} = useContext(AuthContext);
  useEffect(() => {
    ApiCalls.getSellersList(authToken)
      .then((response) => {
        setSellerList(response);
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response) {
          Toast.show({type: 'error', text1: error.response.data});
        } else {
          Toast.show({type: 'error', text1: 'Serve not responding'});
        }
      });
  }, []);

  return (
    <View style={styles.container}>
      <Header
        placement="left"
        leftComponent={{text: 'MY APPOINTMENTS', style: {color: '#fff'}}}
        backgroundColor={'#455a64'}
      />
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <View>
        {sellerList.map((item, index) => (
          <ListItem key={index} bottomDivider>
            <Avatar source={{uri: item.profilePic}} />
            <ListItem.Content>
              <ListItem.Title>{item.firstName}</ListItem.Title>
              <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {

  },
});

export default Sellers;
