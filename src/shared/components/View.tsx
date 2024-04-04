import React from 'react';
import {View as RNView, ViewProps} from 'react-native';

const View = (props: ViewProps) => {
  return <RNView className={'bg-white dark:bg-slate-800'} {...props} />;
};

export default View;
