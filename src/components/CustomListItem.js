import React from 'react';
import {Icon, ListItem} from 'react-native-elements';
import CustomAvatar from './CustomAvatar';

function CustomListItem({avatarUrl, title, subTitle, onPress}) {
  return (
    <ListItem bottomDivider onPress={onPress}>
      <CustomAvatar url={avatarUrl} />
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
        <ListItem.Subtitle>{subTitle}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
}

export default CustomListItem;
