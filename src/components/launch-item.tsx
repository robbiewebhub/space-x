import React from 'react';
import {View, Text} from 'react-native';
import {Card, TouchableRipple} from 'react-native-paper';
import {Launch} from '../types';

interface Props {
  title?: string;
  value?: string;
}

const RowItem: React.FC<Props> = props => {
  const {title, value} = props;
  if (!value) {
    return;
  }
  return (
    <View className="flex-row items-center p-2 flex-1">
      <Text className="mr-2 font-bold size text-xs w-1/4">{title}:</Text>
      <Text className="flex-1 text-xs" numberOfLines={3} ellipsizeMode="middle">
        {value}
      </Text>
    </View>
  );
};

interface LaunchItemProps {
  launch: Launch;
  onPress?: (item: Launch) => void;
  selected?: boolean;
}
const LaunchItem: React.FC<LaunchItemProps> = props => {
  const {launch, onPress, selected} = props;
  return (
    <TouchableRipple
      onPress={() => {
        if (onPress) {
          onPress(launch);
        }
      }}>
      <Card className={`m-0.5 ${selected ? 'bg-blue-200' : ''}`}>
        <RowItem title="Mission" value={launch.mission_name} />
        <RowItem title="Launch Date" value={launch.launch_date_local} />
        <RowItem title="Launch Site" value={launch.launch_site.site_name} />
        <RowItem
          title="Rocket"
          value={launch.rocket.rocket_name + ' ' + launch.rocket.rocket_type}
        />
      </Card>
    </TouchableRipple>
  );
};

export default LaunchItem;
