import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

function SecondaryButton({type = 'primary', text, onPress}) {
  return (
    <TouchableOpacity style={Style.buttonStyle} onPress={onPress}>
      <Text style={Style.textStyle}>{text}</Text>
    </TouchableOpacity>
  );
}
const Style = StyleSheet.create({
  buttonStyle: {
    width: 300,
    backgroundColor: 'grey',
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 13,
  },
  textStyle: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default SecondaryButton;
