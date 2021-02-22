import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

function PrimaryButton({type = 'primary', text, onPress}) {
  return (
    <TouchableOpacity style={Style.buttonStyle} onPress={onPress}>
      <Text style={Style.textStyle}>{text}</Text>
    </TouchableOpacity>
  );
}
const Style = StyleSheet.create({
  buttonStyle: {
    width: 300,
    backgroundColor: '#61DBFB',
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 13,
  },
  textStyle: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default PrimaryButton;
