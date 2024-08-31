'use client'

import { UseMutationOptions } from '@tanstack/react-query'

import imageService from './imageService'
import { CreateImageBody, CreateImageResponse } from './type'

const queryOptions = {
  create: (): UseMutationOptions<
    CreateImageResponse,
    Error,
    CreateImageBody,
    unknown
  > => ({
    mutationFn: (variables: CreateImageBody) => imageService.create(variables),
  }),
}

export default queryOptions
