"use client"

import { getCookie } from "cookies-next"
import { string } from "zod"

import { AuthValidationError } from "@/lib/error"

import { API_BASE_URL, ApiRequestConfig } from "./api"

export const http = async <T>(
  endpoint: string,
  { method = "GET", headers = {}, stringfy = true, body }: ApiRequestConfig
): Promise<T> => {
  const token = getCookie("access_token")

  const config: RequestInit = {
    method,
    headers: stringfy
      ? {
          "Content-Type": "application/json",
          ...headers,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        }
      : {
          ...headers,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
  }

  if (stringfy && body) {
    config.body = JSON.stringify(body)
  } else {
    config.body = body
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config)

    if (response.status === 401) {
      const errorData = await response.json()
      throw new AuthValidationError(errorData, "로그인이 필요한 서비스 입니다.")
    }

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData || "API request failed")
    }

    const data = await response.json()

    return data
  } catch (error) {
    console.error("API Client Error:", error)
    throw error
  }
}
