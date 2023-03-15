import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import {
  View,
  ViewToken,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components';
import FAB from 'react-native-fab';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getUsers } from './actions/getUsers';
import { Loader } from '../../components/Loader';
import { UserRow } from './components/UserRow';
import { UserRowLoading } from './components/UserRowLoading';
import { User } from '../../types/User';

const SafeArea = styled(SafeAreaView).attrs({
  edges: ['top']
})`
  flex: 1;
`;

const Container = styled(View)`
  flex: 1;
`;

const Content = styled(View)`
  flex: 1;
`;

const LoaderWrapper = styled(View)`
  flex: 1;
  alignContent: center;
  alignItems: center;
  justifyContent: center;
`;

export const Home = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [users, setUsers] = useState<User[] | []>([]);
  const flatListRef = useRef<FlatList>();
  const [flatListVisibleItems, setFlatListVisibleItems] = useState([]); 

  useEffect(() => {
    getData();
  }, []);

  const getData = (isRefresh = false) => {
    setLoading(true);
    getUsers()
      .then((response) => {
        setUsers(isRefresh ? response : prev => [...prev, ...response]);
      })
      .catch((error) => {
        Alert.alert('An error occurred', 'Please try again later! error: ', error?.code);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  const onRefresh = useCallback(() => {
    getData(true);
  }, [getData]);

  const onEndReached = useCallback(() => {
    getData();
  }, [getData]);

  const onViewableItemsChanged = useCallback((info: { viewableItems: ViewToken[], changed: ViewToken[] }): void => {
    setFlatListVisibleItems(info.viewableItems.map(it => it.index));
  }, []);

  const onFABPress = useCallback(() => {
    if (flatListRef?.current) {
      const randomIndex = Math.floor(Math.random() * (users.length + 1));
  
      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: randomIndex,
        viewOffset: 10
      });
    }
  }, [flatListRef?.current]);

  const renderUserItem = useCallback(({ item, index }) => {
    if (
      flatListVisibleItems.length > 0 && 
      flatListVisibleItems.indexOf(index) === -1
    ) {
      return <UserRowLoading key={item} />;
    }

    const goToDetails = (user: User) => navigation.navigate('DetailsModal', { user });

    return (
      <UserRow
        key={item.uid}
        item={item}
        onPress={() => goToDetails(item)}
      />
    );
  }, [
    navigation,
    flatListVisibleItems,
  ]);

  const content = useMemo(() => {
    if (!users?.length) {
      return null;
    }

    return (
      <FlatList
        ref={flatListRef}
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          padding: 20,
        }}
        data={users}
        keyExtractor={(item: User) => item.uid.toString()}
        renderItem={renderUserItem}
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh} />
        )}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 75,
        }}
        extraData={flatListVisibleItems}
      />
    );
  }, [
    users, 
    users?.length, 
    loading, 
    navigation, 
    flatListVisibleItems,
  ]);

  return (
    <>
      <SafeArea>
        <Container>
          <Content>
            {content}
          </Content>
        </Container>
        <FAB
          buttonColor="#7A72E1"
          iconTextColor="#FFFFFF"
          onClickAction={onFABPress}
          iconTextComponent={<Icon name="rotate-right"/>} />
      </SafeArea>
      <Loader isVisible={loading} />
    </>
  );
};
