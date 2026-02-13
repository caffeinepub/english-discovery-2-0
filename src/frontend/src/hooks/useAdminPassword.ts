import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useHasAdminPassword() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['hasAdminPassword'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.hasAdminPassword();
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useSetAdminPassword() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (password: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.setAdminPassword(password);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hasAdminPassword'] });
    },
  });
}

export function useVerifyAdminPassword() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (password: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.verifyAdminPassword(password);
    },
  });
}

export function useResetAdminPassword() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.resetAdminPassword();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hasAdminPassword'] });
      queryClient.invalidateQueries({ queryKey: ['adminSession'] });
    },
  });
}
