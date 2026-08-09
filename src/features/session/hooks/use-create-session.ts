import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { sessionKeys } from "../session.keys";
import { CreateSessionDto } from "../session.types";
import { sessionService } from "../session.service";


export const useCreateSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSessionDto) =>
      sessionService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionKeys.lists(),
      });
    },
  });
};