import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import React, {memo, useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import DeleteIcon from '../shared/assets/svg/DeleteIcon';
import {Contact, baseUrl} from '../slices/contactSlice';

type Props = {
  item: Contact;
};

function ContactItemScreen({item}: Props) {
  const [isDisableTouch, setIsDisableTouch] = useState(false);

  const queryClient = useQueryClient();

  const {mutateAsync, isPending} = useMutation({
    mutationFn: () =>
      axios.delete(`${baseUrl}/${item.id}`).then(() => {
        queryClient.refetchQueries({queryKey: ['contacts']});
      }),
  });

  const handleDeleteContact = async () => {
    setIsDisableTouch(true);
    await mutateAsync();
    setIsDisableTouch(false);
  };

  return (
    <TouchableOpacity
      disabled={isDisableTouch}
      className="flex-row items-center justify-between mb-4">
      <View className="flex-row items-center">
        <FastImage
          source={{uri: item.photo}}
          className="w-12 h-12 mr-4 rounded-full bg-gray-300"
        />
        <View className="flex-1 flex-row items-center border-b border-gray-300 pb-3">
          <View className="flex-1">
            <Text className="font-bold text-black">
              {item.firstName} {item.lastName}
            </Text>
            <Text className={'text-black'}>{item.age} Years</Text>
          </View>
          <View className="p-2 w-8 h-8 items-center justify-center">
            {isPending ? (
              <ActivityIndicator size="large" color={'#b91c1c'} />
            ) : (
              <TouchableOpacity onPress={handleDeleteContact}>
                <DeleteIcon />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default memo(ContactItemScreen);
