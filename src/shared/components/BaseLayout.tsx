import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const BaseLayout = ({children}: PropsWithChildren) => {
  const {bottom} = useSafeAreaInsets();

  return <View className={`flex-1 pb-[${bottom}px]`}>{children}</View>;
};

export default BaseLayout;
