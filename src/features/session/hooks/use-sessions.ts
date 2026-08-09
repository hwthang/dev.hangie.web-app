import { useQuery } from "@tanstack/react-query";
import { sessionService } from "../session.service";
import { sessionKeys } from "../session.keys";
import { SessionResponse } from "../session.types";

export const useSessions = (page = 1, pageSize = 10) => {
  return useQuery<SessionResponse>({
    queryKey: sessionKeys.list(page, pageSize),
    queryFn: () => sessionService.getList(page, pageSize),
  });
};
