import React from 'react';
import {Text, View} from 'react-native';

interface Props {
  title?: string;
  value?: string;
  compareValue?: string;
}

const RowItem: React.FC<Props> = props => {
  const {title, value, compareValue} = props;
  if (!value) {
    return;
  }
  return (
    <View className="flex-row items-center p-2 flex-1">
      <Text
        className="flex-1 text-xs w-1/3"
        numberOfLines={3}
        ellipsizeMode="middle">
        {value}
      </Text>
      <Text className="mr-2 font-bold size text-xs w-1/3 text-center">
        {title}
      </Text>
      <Text
        className="flex-1 text-sml text-right w-1/3"
        numberOfLines={3}
        ellipsizeMode="middle">
        {compareValue}
      </Text>
    </View>
  );
};

const CompareScreen: React.FC<{route: any}> = ({route}) => {
  const {first, second} = route.params;
  console.log(first);

  return (
    <View>
      <RowItem
        title="Mission"
        value={first.mission_name}
        compareValue={second.mission_name}
      />
      <RowItem
        title="Launch Date"
        value={first.launch_date_local}
        compareValue={second.launch_date_local}
      />
      <RowItem
        title="Launch Site"
        value={first.launch_site.site_name}
        compareValue={second.launch_site.site_name}
      />
      <RowItem
        title="Rocket"
        value={first.rocket.rocket_name + ' ' + first.rocket.rocket_type}
        compareValue={
          second.rocket.rocket_name + ' ' + second.rocket.rocket_type
        }
      />
    </View>
  );
};

export default CompareScreen;
