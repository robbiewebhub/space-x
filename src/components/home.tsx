import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Launch} from '../types';
import LaunchItem from './launch-item';
import BottomLoader from './loader';

interface HomeProps {
  launches: Launch[];
  loading?: boolean;
  selectedIds?: string[];
  fetchMore?: () => void;
  onItemClick?: (item: Launch) => void;
  isLastPage?: boolean;
}
const Home: React.FC<HomeProps> = props => {
  const {launches, fetchMore, isLastPage, loading, onItemClick, selectedIds} =
    props;

  return (
    <View style={styles.container}>
      <FlatList
        data={launches}
        extraData={loading}
        onEndReachedThreshold={0.8}
        onEndReached={loading ? null : fetchMore}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <LaunchItem
            selected={selectedIds?.includes(item.id)}
            onPress={onItemClick}
            launch={item}
          />
        )}
        ListFooterComponent={<BottomLoader loading={loading && !isLastPage} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Home;
