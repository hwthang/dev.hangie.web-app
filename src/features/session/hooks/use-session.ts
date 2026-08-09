import { useQuery } from "@tanstack/react-query";
import { sessionService } from "../session.service";
import { sessionKeys } from "../session.keys";

export const useSession = (id?: string) => {
  return useQuery({
    queryKey: sessionKeys.detail(id ?? ""),
    queryFn: () => sessionService.getDetail(id!),
    enabled: !!id,
  });
};