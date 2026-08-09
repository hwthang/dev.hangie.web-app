import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  familyService,
  CreateFamilyDto,
  UpdateFamilyDto,
} from "@/features/family/family.service";

export const familyKeys = {
  all: ["families"] as const,

  lists: () => [...familyKeys.all, "list"] as const,

  list: (page: number, pageSize: number) =>
    [...familyKeys.lists(), { page, pageSize }] as const,

  details: () => [...familyKeys.all, "detail"] as const,

  detail: (id: string) => [...familyKeys.details(), id] as const,
};

/**
 * GET /families
 */
export const useFamilies = (page = 1, pageSize = 10) => {
  return useQuery({
    queryKey: familyKeys.list(page, pageSize),

    queryFn: () => familyService.getList(page, pageSize),
  });
};

/**
 * GET /families/:id
 */
export const useFamily = (id: string) => {
  return useQuery({
    queryKey: familyKeys.detail(id),
    queryFn: () => familyService.getDetail(id),
    enabled: !!id,
  });
};

/**
 * POST /families
 */
export const useCreateFamily = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFamilyDto) => familyService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: familyKeys.lists(),
      });
    },
  });
};

/**
 * PATCH /families/:id
 */
export const useUpdateFamily = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateFamilyDto }) =>
      familyService.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: familyKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: familyKeys.detail(variables.id),
      });
    },
  });
};

/**
 * DELETE /families/:id
 */
export const useDeleteFamily = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => familyService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: familyKeys.lists(),
      });
    },
  });
};
