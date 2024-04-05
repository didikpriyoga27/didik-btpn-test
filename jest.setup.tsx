import '@testing-library/jest-native/extend-expect';

import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.useFakeTimers();

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
    useRoute: () => ({
      params: {
        contactId: '1',
      },
    }),
  };
});

jest.mock('@react-navigation/native-stack', () => {
  return {createNativeStackNavigator: () => {}};
});
jest.mock('react-native-safe-area-context', () => {
  return {
    useSafeAreaInsets: () => {
      return {
        top: 0,
        bottom: 0,
      };
    },
  };
});

jest.mock('@tanstack/react-query', () => ({
  QueryClient: jest.fn(),
  QueryClientProvider: jest.fn(),
  useQueryClient: jest.fn(),
  useMutation: () => {
    return {
      mutateAsync: jest.fn(),
      onSuccess: jest.fn(),
      onError: jest.fn(),
      onMutate: jest.fn(),
      onSettled: jest.fn(),
    };
  },
  useQuery: jest.fn(),
  useInfiniteQuery: () => {
    return {
      isLoading: false,
      isFetchingNextPage: true,
      isRefetching: false,
      refetch: jest.fn(),
      hasNextPage: false,
      isFetching: false,
      fetchNextPage: jest.fn(),
      reload: jest.fn(),
      data: {
        pages: [],
      },
    };
  },
}));
