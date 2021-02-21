import React, {useState, useCallback} from 'react';
import {View, ToastAndroid} from 'react-native';
import ApiCalls from '../../api/ApiCalls';
import {useFocusEffect} from '@react-navigation/native';
import CustomListItem from '../../components/CustomListItem';

function SellersList({navigation}) {
  const [sellerList, setSellerList] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      ApiCalls.getSellersList()
        .then((response) => {
          setSellerList(response);
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            ToastAndroid.show(error.response.data);
          } else {
            ToastAndroid.show('Server not responding');
          }
        });
    }, []),
  );

  function handleSelection(user) {
    navigation.navigate({name: 'Choose Slot', params: {seller: user}});
  }
  return (
    <View>
      {sellerList.map((item, index) => (
        <CustomListItem
          avatarUrl={item.profilePic}
          title={`${item.firstName} ${item.lastName || ''}`}
          subTitle={item.email}
          onPress={() => handleSelection(item)}
          key={index}
        />
      ))}
    </View>
  );
}

export default SellersList;
