import React from 'react';
import {API_URL} from '@env';
import {Avatar} from 'react-native-elements';

function CustomAvatar({
  url,
  iconName = 'user',
  size,
  rounded = true,
  onPress,
  title,
}) {
  const baseUrl = API_URL;
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
