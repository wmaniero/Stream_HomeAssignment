import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  View, ScrollView, InteractionManager,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Modal } from '../../../../components/Modal';
import { User } from '../../../../types/User';
import {
  Image,
  ImageRow,
  NameContainer,
  Name,
  Employment,
  ContactsContainer,
  InfoText
} from './DetailsModal.styled';

type DetailsModalRouteProp = {
  DetailsModal: {
    user: User;
  };
}

export const DetailsModal = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<DetailsModalRouteProp, 'DetailsModal'>>();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!user && route.params?.user) {
      setUser(route.params.user);
    }
  }, [user, route.params?.user]);

  const onClose = useCallback(() => {
    setIsVisible(false);
    return new Promise<void>((resolve) => {
      InteractionManager.runAfterInteractions(() => {
        navigation.goBack();
        resolve();
      });
    });
  }, [navigation]);

  return (
    <Modal
      hideTitle
      isVisible={isVisible}
      onClose={onClose}
      propagateSwipe
      hideCloseButton={false}
      swipeDirection="down"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={400}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {!user ? null : (
          <View>
            <ImageRow>
              <NameContainer>
                <Name>{`${user.first_name} ${user.last_name}`}</Name>
                <Employment>{`${user.employment.title} - ${user.employment.key_skill}`}</Employment>
              </NameContainer>
              <Image source={{ uri: user.avatar }} />
            </ImageRow>
            <ContactsContainer>
              <InfoText>{`Date of birth: ${user.date_of_birth}`}</InfoText>
              <InfoText>{`Email: ${user.email}`}</InfoText>
              <InfoText>{`Phone: ${user.phone_number}`}</InfoText>
            </ContactsContainer>
            <InfoText>{`${user.address.street_name}, ${user.address.street_address}`}</InfoText>
            <InfoText>{`${user.address.city}, ${user.address.state}`}</InfoText>
            <InfoText>{user.address.zip_code}</InfoText>
            <InfoText>{user.address.country}</InfoText>
          </View>
        )}
      </ScrollView>
    </Modal>
  );
};
