"use client";

import { useMutation } from "@tanstack/react-query";
import {
  CreateUserDto,
  userService,
} from "./user.service";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (body: CreateUserDto) =>
      userService.createUser(body),
  });
};