/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, ToastAndroid} from 'react-native';
import ApiCalls from '../../api/ApiCalls';
import {useFocusEffect} from '@react-navigation/native';
import CustomListItem from '../../components/CustomListItem';
import {SearchBar, CheckBox} from 'react-native-elements';

function SellersList({navigation}) {
  const [sellerList, setSellerList] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [filterValue, setFilterValue] = useState('available');

  useFocusEffect(
    React.useCallback(() => {
      ApiCalls.getSellersList({searchKey: searchKey, filter: filterValue})
        .then((response) => {
          setSellerList(response);
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response) {
            ToastAndroid.show(`${error.response.data}`);
          } else {
            ToastAndroid.show('Server not responding', ToastAndroid.SHORT);
          }
        });
    }, [searchKey, filterValue]),
  );

  function handleSearch(param) {
    console.log(param);
    setSearchKey(param);
  }

  function handleSelection(user) {
    if (user.isAllSlotsActive == true) {
      navigation.navigate({name: 'Choose Slot', params: {seller: user}});
    } else {
      ToastAndroid.show('The seller is not available', ToastAndroid.SHORT);
    }
  }
  return (
    <View>
      <View>
        <SearchBar
          lightTheme={true}
          containerStyle={{
            backgroundColor: 'lightgrey',
          }}
          inputContainerStyle={{
            backgroundColor: 'white',
            borderRadius: 25,
            paddingHorizontal: 16,
          }}
          placeholder="Search..."
          onChangeText={handleSearch}
          value={searchKey}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <CheckBox
          title="All"
          checked={filterValue === 'all'}
          onPress={() => setFilterValue('all')}
        />
        <CheckBox
          title="Available"
          checked={filterValue === 'available'}
          onPress={() => setFilterValue('available')}
        />
      </View>
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
    </View>
  );
}

export default SellersList;
