import React from 'react';
import { User } from '../../../../types/User';
import {
  Card,
  Image,
  DetailsContainer,
  Name,
  Email
} from './UserRow.styled';

type Props = {
  item: User;
  onPress: () => void;
};

export const UserRow = ({
  item,
  onPress,
}: Props) => (
  <Card onLongPress={onPress}>
    <Image source={{ uri: item.avatar }} />
    <DetailsContainer>
      <Name>{`${item.first_name} ${item.last_name}`}</Name>
      <Email>{item.email}</Email>
    </DetailsContainer>
  </Card>
);
