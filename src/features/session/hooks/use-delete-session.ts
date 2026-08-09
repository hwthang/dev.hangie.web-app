import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { sessionService } from "../session.service";
import { sessionKeys } from "../session.keys";

export const useDeleteSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      sessionService.delete(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: sessionKeys.lists(),
      });

      queryClient.removeQueries({
        queryKey: sessionKeys.detail(id),
      });
    },
  });
};