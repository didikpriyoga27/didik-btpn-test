import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import React, {useCallback, useMemo} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import ContactItem from '../components/ContactItem';
import {StackParamList} from '../navigation/StackParamList';
import PlusIcon from '../shared/assets/svg/PlusIcon';
import BaseLayout from '../shared/components/BaseLayout';
import Text from '../shared/components/Text';
import View from '../shared/components/View';
import {Contact, baseUrl} from '../slices/contactSlice';
import Header from '../shared/components/Header';

type Response = {
  data: {
    data: Contact[];
  };
};

const ContactListScreen = () => {
  const {navigate} = useNavigation<NavigationProp<StackParamList>>();

  const fetchContacts = (): Promise<Response> => axios.get(baseUrl);

  const {data, isLoading, refetch, isRefetching} = useQuery({
    queryKey: ['contacts'],
    queryFn: fetchContacts,
  });

  const contacts: Contact[] = useMemo(
    () => data?.data?.data || [],
    [data?.data?.data],
  );

  const sortedData = useMemo(() => {
    if (contacts?.length) {
      return contacts?.sort((a, b) => {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      });
    }
    return [];
  }, [contacts]);

  const renderItem = useCallback((props: {item: Contact}) => {
    return <ContactItem {...props} />;
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <BaseLayout>
      <Header title={'Contact List'} />
      <FlatList
        data={sortedData}
        className="flex-1 bg-white dark:bg-slate-800 p-4"
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        renderItem={renderItem}
      />
      <TouchableOpacity
        testID={'ButtonAddNewContact'}
        onPress={() => navigate('ContactDetailScreen', {contactId: ''})}
        className={'absolute bottom-8 right-4'}>
        <View className="bg-teal-700 p-4 rounded-full flex-row items-center">
          <PlusIcon />
          <Text className="text-white font-semibold">Add New Contact</Text>
        </View>
      </TouchableOpacity>
    </BaseLayout>
  );
};

export default ContactListScreen;
