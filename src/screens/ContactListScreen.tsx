import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import React, {useCallback, useMemo} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ContactItemScreen from '../components/ContactItemScreen';
import PlusIcon from '../shared/assets/svg/PlusIcon';
import BaseLayout from '../shared/components/BaseLayout';
import {Contact, baseUrl} from '../slices/contactSlice';

type Response = {
  data: {
    data: Contact[];
  };
};

const ContactListScreen = () => {
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
    return <ContactItemScreen {...props} />;
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <BaseLayout>
      <FlatList
        data={sortedData}
        className="flex-1 p-4"
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        renderItem={renderItem}
      />
      <TouchableOpacity className={'absolute bottom-8 right-4'}>
        <View className="bg-teal-700 p-4 rounded-full flex-row items-center">
          <PlusIcon />
          <Text className="text-white font-semibold">Add New Contact</Text>
        </View>
      </TouchableOpacity>
    </BaseLayout>
  );
};

export default ContactListScreen;
