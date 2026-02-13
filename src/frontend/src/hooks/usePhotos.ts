import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ExternalBlob } from '../backend';
import type { Photo } from '../backend';

export function useListPhotos(enabled: boolean) {
  const { actor, isFetching } = useActor();

  return useQuery<Photo[]>({
    queryKey: ['photos'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.listPhotos();
      } catch (error) {
        console.error('Error listing photos:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching && enabled,
    retry: false,
  });
}

export function useGetPhoto(id: string, enabled: boolean = true) {
  const { actor, isFetching } = useActor();

  return useQuery<Photo | null>({
    queryKey: ['photo', id],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getPhoto(id);
      } catch (error) {
        console.error(`Error fetching photo ${id}:`, error);
        return null;
      }
    },
    enabled: !!actor && !isFetching && enabled,
    retry: false,
  });
}

export function useAddPhoto() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      name,
      file,
      onProgress,
    }: {
      id: string;
      name: string;
      file: File;
      onProgress?: (percentage: number) => void;
    }) => {
      if (!actor) throw new Error('Actor not initialized');

      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      
      let blob = ExternalBlob.fromBytes(bytes);
      if (onProgress) {
        blob = blob.withUploadProgress(onProgress);
      }

      await actor.addPhoto(id, name, blob);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['photos'] });
      queryClient.invalidateQueries({ queryKey: ['photo'] });
    },
  });
}

export function useUpdatePhoto() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      name,
      file,
      onProgress,
    }: {
      id: string;
      name: string;
      file: File;
      onProgress?: (percentage: number) => void;
    }) => {
      if (!actor) throw new Error('Actor not initialized');

      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      
      let blob = ExternalBlob.fromBytes(bytes);
      if (onProgress) {
        blob = blob.withUploadProgress(onProgress);
      }

      await actor.updatePhoto(id, name, blob);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['photos'] });
      queryClient.invalidateQueries({ queryKey: ['photo'] });
    },
  });
}

export function useDeletePhoto() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.deletePhoto(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['photos'] });
      queryClient.invalidateQueries({ queryKey: ['photo'] });
    },
  });
}
