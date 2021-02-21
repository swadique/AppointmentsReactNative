import React from 'react';
import {Icon, ListItem} from 'react-native-elements';
import CustomAvatar from './CustomAvatar';

function CustomListItem({avatarUrl, title, subTitle, subSubTitle, onPress}) {
  return (
    <ListItem bottomDivider onPress={onPress}>
      {avatarUrl !== null && (
        <CustomAvatar url={avatarUrl} size="medium" />
      )}
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
        <ListItem.Subtitle>{subTitle}</ListItem.Subtitle>
        {subSubTitle && <ListItem.Subtitle>{subSubTitle}</ListItem.Subtitle>}
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
}

export default CustomListItem;
