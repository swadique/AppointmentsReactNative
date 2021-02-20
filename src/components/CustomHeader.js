import React from 'react';
import {Header} from 'react-native-elements';

function CustomHeader({title}) {
  return (
    <Header
      placement="left"
      leftComponent={{text: 'MY APPOINTMENTS', style: {color: '#fff'}}}
      backgroundColor={'#455a64'}
    />
  );
}

export default CustomHeader;
