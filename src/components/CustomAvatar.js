import React from 'react';
import {Avatar} from 'react-native-elements';
import {SERVER_URI} from '../config/connection';

function CustomAvatar({
  url,
  iconName = 'user',
  size,
  rounded = true,
  onPress,
  title,
}) {
  const baseUrl = SERVER_URI;
  return (
    <>
      <Avatar
        source={{uri: `${baseUrl}/public/${url}`}}
        icon={{name: iconName, type: 'font-awesome'}}
        size={size}
        rounded={rounded}
        onPress={onPress}
        title={title}>
        {onPress && <Avatar.Accessory onPress={onPress} />}
      </Avatar>
    </>
  );
}

export default CustomAvatar;
