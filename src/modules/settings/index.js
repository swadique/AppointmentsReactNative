/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState, useEffect} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {Card, Input} from 'react-native-elements';
import ApiCalls from '../../api/ApiCalls';
import CustomAvatar from '../../components/CustomAvatar';
import CustomListItem from '../../components/CustomListItem';
import PrimaryButton from '../../components/PrimaryButton';
import AuthContext from '../../contexts/authContext';
import UserContext from '../../contexts/userContext';

function Settings() {
  const {userData, setUserData, clearUserData} = useContext(UserContext);
  const {clearAuthToken} = useContext(AuthContext);
  const [activeInput, setActiveInput] = useState(false);
  const [profile, setProfile] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
  });

  useEffect(() => {
    setProfile({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
    });
  }, [userData]);

  function handleLogout() {
    Alert.alert(
      'Confirm Logout',
      'Are you sure want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => logoutUser()},
      ],
      {cancelable: false},
    );
    function logoutUser() {
      clearUserData();
      clearAuthToken();
    }
  }
  function handleUpdate() {
    console.log(profile);
    ApiCalls.updateProfile(profile).then((res) => {
      ApiCalls.getUserProfile().then((res) => {
        setUserData(res);
        setActiveInput(false);
      });
    });
  }
  function updateProfilePic() {}

  return (
    <View style={Styles.container}>
      <Card>
        <Card.Title>
          <Text>{`${userData.firstName} ${userData.lastName || ''}`}</Text>
        </Card.Title>
        <Card.Divider />
        <View style={Styles.CardDetails}>
          <View style={{alignItems: 'center', paddingVertical: 8}}>
            <CustomAvatar
              url={userData.profilePic}
              size="large"
              onPress={updateProfilePic}
            />
          </View>
          <View>
            <Input
              label="First Name"
              value={profile.firstName}
              key="firstName"
              onChangeText={(value) =>
                setProfile((prev) => ({...prev, firstName: value}))
              }
              nativeID="firstName"
              disabled={!activeInput}
            />
            <Input
              label="Last Name"
              value={profile.lastName}
              key="lastName"
              onChangeText={(value) =>
                setProfile((prev) => ({...prev, lastName: value}))
              }
              disabled={!activeInput}
            />
            <Input
              label="Email"
              value={profile.email}
              key="email"
              onChangeText={(value) =>
                setProfile((prev) => ({...prev, email: value}))
              }
              disabled={!activeInput}
            />
          </View>
          <View>
            {activeInput ? (
              <PrimaryButton text="Update" onPress={handleUpdate} />
            ) : (
              <PrimaryButton text="Edit" onPress={() => setActiveInput(true)} />
            )}
          </View>
        </View>
        <Card.Divider />
        <CustomListItem
          title="Logout"
          onPress={handleLogout}
          avatarUrl={null}
        />
      </Card>
    </View>
  );
}
const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  CardDetails: {
    marginHorizontal: 24,
  },
});

export default Settings;
