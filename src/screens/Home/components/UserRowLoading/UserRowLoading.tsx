import React from 'react';
import Skeleton from 'react-native-skeleton-placeholder';

export const UserRowLoading = () => (
  <Skeleton
    backgroundColor="#7C91A2"
    highlightColor="#263D4C">
    <Skeleton.Item flexDirection="row" marginBottom={10}>
      <Skeleton.Item width={120} height={100} borderRadius={8} />
      <Skeleton.Item flex={1} justifyContent="center" marginHorizontal={20}>
        <Skeleton.Item height={12} />
        <Skeleton.Item height={12} marginTop={10}/>
      </Skeleton.Item>
    </Skeleton.Item>
  </Skeleton>
);
