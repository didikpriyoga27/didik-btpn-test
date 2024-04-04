import React from 'react';
import {Text as RNText, TextProps} from 'react-native';

const Text = (props: TextProps) => {
  return <RNText className={'text-black dark:text-white'} {...props} />;
};

export default Text;
