export const sessionKeys = {
  all: ["sessions"] as const,

  lists: () => [...sessionKeys.all, "list"] as const,

  list: (page: number, pageSize: number) =>
    [...sessionKeys.lists(), { page, pageSize }] as const,

  details: () => [...sessionKeys.all, "detail"] as const,

  detail: (id: string) => [...sessionKeys.details(), id] as const,
};