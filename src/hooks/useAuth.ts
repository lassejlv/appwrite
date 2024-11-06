import { useQuery } from '@tanstack/react-query';
import { account } from '@/lib/appwrite';

export const useAuth = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: async () => await account.get(),
  });
};
