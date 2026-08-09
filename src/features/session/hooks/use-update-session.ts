import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sessionKeys } from "../session.keys";
import { UpdateSessionDto } from "../session.types";
import { sessionService } from "../session.service";

type UpdateSessionVariables = {
  id: string;
  data: UpdateSessionDto;
};

export const useUpdateSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateSessionVariables) =>
      sessionService.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: sessionKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: sessionKeys.detail(variables.id),
      });
    },
  });
};
