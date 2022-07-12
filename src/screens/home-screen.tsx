import {useLazyQuery} from '@apollo/client';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Button,
  Dialog,
  IconButton,
  Portal,
  TextInput,
} from 'react-native-paper';
import Home from '../components/home';
import {GET_LAUNCHES_QUERY} from '../graphql/queries';
import {Launch, LaunchInput, LaunchResponse} from '../types';

const HomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [list, setList] = useState<Launch[]>([]);
  const [comparison, setComparison] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [missionName, setMissionName] = useState('');
  const [rocketName, setRocketName] = useState('');
  const [isLastPage, setIsLastPage] = useState(false);
  const [filterVisible, setFilterVisibility] = useState<boolean>(false);
  const [refetching, setRefetching] = useState(false);
  const [fetchLaunches, {loading, variables}] = useLazyQuery<
    LaunchResponse,
    LaunchInput
  >(GET_LAUNCHES_QUERY, {
    variables: {
      limit: 10,
    },
  });

  useEffect(() => {
    fetchLaunches({
      variables: {offset: 0},
    }).then(result => {
      if (result.data && result.data.launchesPast) {
        setList([...result.data?.launchesPast]);
        setIsLastPage(result.data.launchesPast.length < 10);
      } else {
        alert('Something went wrong');
      }
    });
  }, [fetchLaunches]);

  const onCompareClick = useCallback(() => {
    const [first, second] = selectedIds.map(id => {
      const found = list.find(dt => dt.id === id);
      return found;
    });
    navigation.navigate('compareScreen', {first, second});
  }, [selectedIds, list, navigation]);

  const FilterButton = useMemo(() => {
    return (
      <IconButton
        onPress={() => setFilterVisibility(true)}
        icon="filter-alt"
        color="#fff"
      />
    );
  }, []);

  const CompareButton = useMemo(() => {
    return (
      <IconButton onPress={onCompareClick} icon="compare-arrows" color="#fff" />
    );
  }, [onCompareClick]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (comparison ? CompareButton : FilterButton),
    });
  });

  const applyFilters = (reset = false) => {
    setFilterVisibility(false);
    setRefetching(true);
    setIsLastPage(false);
    setList([]);
    let mission_name = missionName;
    let rocket_name = rocketName;
    if (reset) {
      setMissionName('');
      setRocketName('');
      mission_name = '';
      rocket_name = '';
    }
    fetchLaunches({
      variables: {
        filter: {mission_name, rocket_name},
        offset: 0,
      },
    }).then(result => {
      if (result.data && result.data.launchesPast) {
        setList([...result.data?.launchesPast]);
        setIsLastPage(result.data.launchesPast.length < 10);
      } else {
        alert('Something went wrong');
      }
    });
  };

  const onFetchMore = React.useCallback(() => {
    if (loading || refetching) {
      return;
    }
    let offset = 0;
    if (variables) {
      offset = (variables.offset || 0) + (variables.limit || 0);
    }
    fetchLaunches({
      variables: {
        ...variables,
        offset: offset,
      },
    }).then(result => {
      if (result.data && result.data.launchesPast) {
        setList([...list, ...result.data?.launchesPast]);
        setIsLastPage(
          result.data.launchesPast.length < (variables?.limit || 10),
        );
      } else {
        alert('Something went wrong');
      }
    });

    // console.log(variables);
    // xloadNextPage({limit:20})
  }, [loading, fetchLaunches, variables, list, refetching]);

  const onItemClick = (item: any) => {
    setSelectedIds(items => {
      if (items.length < 2) {
        if (items.includes(item.id)) {
          setComparison(false);
          return items.filter(it => it !== item.id);
        } else {
          const newData = [...items, item.id];
          setComparison(newData.length === 2);
          return newData;
        }
      } else {
        if (items.includes(item.id)) {
          setComparison(false);
          return items.filter(it => it !== item.id);
        } else {
          alert("Can't select more that than 2");
          return items;
        }
      }
    });
  };
  console.log(selectedIds);

  return (
    <>
      <Portal>
        <Dialog
          visible={filterVisible}
          onDismiss={() => setFilterVisibility(false)}>
          <Dialog.Title>Filter</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Mission name"
              value={missionName}
              onChangeText={val => setMissionName(val)}
            />
            <TextInput
              label="Rocket name"
              value={rocketName}
              onChangeText={val => setRocketName(val)}
              className="mt-4"
            />
            <Button
              className="mt-4"
              mode="contained"
              dark
              onPress={() => applyFilters()}>
              Filter
            </Button>
            <Button
              className="mt-4 bg-slate-50"
              mode="contained"
              dark={false}
              onPress={() => applyFilters(true)}>
              Reset
            </Button>
          </Dialog.Content>
        </Dialog>
      </Portal>
      <Home
        launches={list}
        loading={loading || refetching}
        isLastPage={isLastPage}
        onItemClick={onItemClick}
        selectedIds={selectedIds}
        fetchMore={onFetchMore}
      />
    </>
  );
};

export default HomeScreen;
