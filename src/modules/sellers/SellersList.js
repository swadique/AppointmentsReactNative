import React,{useState,useCallback} from 'react';
import {View} from 'react-native';
import ApiCalls from '../../api/ApiCalls';
import Toast from 'react-native-toast-message';
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
                Toast.show({type: 'error', text1: error.response.data});
              } else {
                Toast.show({type: 'error', text1: 'Server not responding'});
              }
            });
        }, []),
      );

      function handleSelection(user){
          navigation.navigate({name:'Choose Slot',params:{seller:user}})
      }
  return (
    <View>
      {sellerList.map((item, index) => (
        <CustomListItem
          avatarUrl={item.profilePic}
          key={index}
          title={`${item.firstName} ${item.lastName}`}
          subTitle={item.email}
          onPress={()=>handleSelection(item)}
        />
      ))}
    </View>
  );
}

export default SellersList;
