import React from 'react';
import BaseLayout from '../shared/components/BaseLayout';
import Text from '../shared/components/Text';
import View from '../shared/components/View';

const ContactListScreen = () => {
  return (
    <BaseLayout>
      <View className={'flex-1 p-4'}>
        <Text className={'text-center text-blue-500'}>Contact</Text>
      </View>
    </BaseLayout>
  );
};

export default ContactListScreen;
