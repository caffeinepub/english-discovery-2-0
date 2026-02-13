import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Inquiry } from '../backend';

export function useGetAllInquiries() {
  const { actor, isFetching } = useActor();

  return useQuery<Inquiry[]>({
    queryKey: ['inquiries'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInquiries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      const timestamp = BigInt(Date.now() * 1000000); // Convert to nanoseconds
      await actor.submitInquiry(name, email, message, timestamp);
    },
    onSuccess: () => {
      // Invalidate and refetch inquiries
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });
}
