import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const BottomLoader: React.FC<{loading?: boolean}> = ({loading}) => {
  if (!loading) {
    return null;
  }
  return (
    <View className="bg-white p-5">
      <ActivityIndicator />
    </View>
  );
};

export default BottomLoader;
