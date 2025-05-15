import * as SecureStore from "expo-secure-store";

const API_URL = "https://growthassured.webinfoghy.co.in/api";

interface ApiOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: Record<string, any> | FormData;
  requiresAuth?: boolean;
}

interface ApiResponse<T = any> {
  data?: T;
  error?: Error;
  status: boolean;
  message?: string;
}

/**
 * A secure API client for making authenticated requests to the backend
 */
export const apiClient = {
  /**
   * Make an API request
   *
   * @param endpoint - The API endpoint to call (without the base URL)
   * @param options - Request options
   * @returns Promise with response data
   */
  async request<T = any>(
    endpoint: string = "",
    options: ApiOptions = {}
  ): Promise<ApiResponse<T>> {
    const { method = "GET", headers = {}, body, requiresAuth = true } = options;

    // Build request URL
    const url = `${API_URL}${endpoint ? `/${endpoint}` : ""}`;

    // Set up headers
    const requestHeaders: Record<string, string> = {
      Accept: "application/json",
      ...headers,
    };

    // Include auth token if required
    if (requiresAuth) {
      const token = await SecureStore.getItemAsync("authToken");
      if (!token) {
        return {
          error: new Error("Authentication required"),
          status: false,
        };
      }
      requestHeaders["Authorization"] = `Bearer ${token}`;
    }

    // Prepare request options
    let requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
    };

    // Add body if present (and not GET request)
    if (body && method !== "GET") {
      if (body instanceof FormData) {
        requestOptions.body = body;
      } else {
        requestHeaders["Content-Type"] = "application/json";
        requestOptions.body = JSON.stringify(body);
      }
    }

    try {
      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      if (!response.ok) {
        return {
          error: new Error(responseData.message || "API request failed"),
          status: false,
          message: responseData.message,
        };
      }

      return {
        data: responseData,
        status: true,
      };
    } catch (error) {
      console.error("API request error:", error);
      return {
        error: error instanceof Error ? error : new Error("Unknown error"),
        status: false,
      };
    }
  },

  /**
   * Shorthand for GET requests
   */
  async get<T = any>(
    endpoint: string,
    options: Omit<ApiOptions, "method" | "body"> = {}
  ) {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  },

  /**
   * Shorthand for POST requests
   */
  async post<T = any>(
    endpoint: string,
    body: Record<string, any> | FormData,
    options: Omit<ApiOptions, "method"> = {}
  ) {
    return this.request<T>(endpoint, { ...options, method: "POST", body });
  },

  /**
   * Shorthand for PUT requests
   */
  async put<T = any>(
    endpoint: string,
    body: Record<string, any>,
    options: Omit<ApiOptions, "method"> = {}
  ) {
    return this.request<T>(endpoint, { ...options, method: "PUT", body });
  },

  /**
   * Shorthand for DELETE requests
   */
  async delete<T = any>(
    endpoint: string,
    options: Omit<ApiOptions, "method"> = {}
  ) {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  },
};
