import React from 'react';
import {
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

const TouchableOpacity = (props: TouchableOpacityProps) => {
  return (
    <RNTouchableOpacity className={'bg-white dark:bg-slate-800'} {...props} />
  );
};

export default TouchableOpacity;
