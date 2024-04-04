import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {StackParamList} from '../navigation/StackParamList';
import Text from '../shared/components/Text';
import View from '../shared/components/View';
import {baseUrl} from '../slices/contactSlice';
import Header from '../shared/components/Header';

type ContactDetailScreenRouteProp = RouteProp<
  StackParamList,
  'ContactDetailScreen'
>;

export default function ContactDetailScreen() {
  const queryClient = useQueryClient();

  const {params} = useRoute<ContactDetailScreenRouteProp>();
  const {goBack} = useNavigation<NavigationProp<StackParamList>>();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [photo, setPhoto] = useState('');

  const defaultAvatar = useMemo(() => {
    if (params.contactId) {
      return null;
    }
    return `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=0f766e&color=fff`;
  }, [firstName, lastName, params.contactId]);

  const {data: contact, isLoading} = useQuery({
    queryKey: ['contact', params.contactId],
    queryFn: () => {
      if (params.contactId) {
        return axios
          .get(`${baseUrl}/${params.contactId}`)
          .then(result => result.data.data);
      }
      return null;
    },
  });

  useEffect(() => {
    if (contact) {
      setFirstName(contact?.firstName);
      setLastName(contact?.lastName);
      setAge(contact?.age?.toString());
      setPhoto(contact?.photo);
    }
  }, [contact]);

  const {mutateAsync: mutateSaveContact, isPending: isSaveLoading} =
    useMutation({
      mutationFn: async () => {
        axios.post(`${baseUrl}`, {
          firstName,
          lastName,
          age: Number(age),
          photo: defaultAvatar,
        });
      },
    });

  const {mutateAsync: mutateEditContact, isPending: isEditLoading} =
    useMutation({
      mutationFn: async () => {
        if (params.contactId) {
          const response = axios.put(`${baseUrl}/${params.contactId}`, {
            firstName,
            lastName,
            age: Number(age),
            photo,
          });
          return response;
        }
      },
    });

  const handleSave = async () => {
    if (params.contactId) {
      return mutateEditContact().then(() => {
        ToastAndroid.show('Contact edited successfully', ToastAndroid.SHORT);
        queryClient.refetchQueries({queryKey: ['contacts']});
        queryClient.refetchQueries({queryKey: ['contacts', params.contactId]});
        setTimeout(() => {
          goBack();
        }, 500);
      });
    }
    return mutateSaveContact().then(() => {
      ToastAndroid.show('Contact saved successfully', ToastAndroid.SHORT);
      queryClient.refetchQueries({queryKey: ['contacts']});
      setTimeout(() => {
        goBack();
      }, 500);
    });
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <Header title={'Contact Detail'} isWithBackButton />
      <ScrollView keyboardShouldPersistTaps={'handled'} className="flex-1">
        <FastImage
          source={{uri: params.contactId ? photo : defaultAvatar ?? ''}}
          className="w-24 h-24 mr-4 rounded-full bg-gray-300 self-center mt-4"
        />
        <Text className="px-4 mt-4 font-bold">First Name:</Text>
        <TextInput
          className="border border-gray-300 px-4 mx-4 rounded-md text-black dark:text-white"
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter First Name"
        />
        <Text className="px-4 mt-4 font-bold">Last Name:</Text>
        <TextInput
          className="border border-gray-300 px-4 mx-4 rounded-md text-black dark:text-white"
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter Last Name"
        />
        <Text className="px-4 mt-4 font-bold">Age:</Text>
        <TextInput
          className="border border-gray-300 px-4 mx-4 rounded-md text-black dark:text-white"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          placeholder="Enter Age"
        />
      </ScrollView>
      <TouchableOpacity
        className="bg-teal-700 m-4 rounded-md h-12 justify-center"
        disabled={!firstName || !lastName || !age}
        onPress={handleSave}>
        <View className={'bg-transparent'}>
          {isEditLoading || isSaveLoading ? (
            <ActivityIndicator color={'white'} size={'small'} />
          ) : (
            <Text className="text-white text-center font-bold text-lg">
              Save
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
