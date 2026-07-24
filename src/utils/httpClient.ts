import { API_HOST, endpoints } from "@/config/endpoints";
import axios from "axios";

export type RestHttpRequestType = {
  endpoint: string;
  method?: "get" | "post" | "delete" | "put";
  params?: Record<string, unknown>;
  body?: Record<string, unknown> | FormData;
  isResponseVoid?: boolean;
};

const restClient = axios.create({
  baseURL: API_HOST,
  timeout: 20000,
});

export type isResponseVoidType = {
  status: number;
  message: string;
};

export function restApiHttpRequest<T>({
  endpoint,
  method = "get",
  params,
  body,
  isResponseVoid = false,
}: RestHttpRequestType): Promise<void | T> {
  return new Promise<void | T>((resolve) => {
    (async () => {
      let response;
      const JWT = undefined; // API_SERVICE_KEY || undefined;
      if (endpoint === endpoints.payments.ValidateDirectDebit.endpoint) {
        restClient.defaults.timeout = 45000;
      }

      // Extend timeout for direct debit account operations
      if (
        endpoint === endpoints.payments.directDebitAccountWithOTP.endpoint ||
        endpoint === endpoints.payments.directDebitAccount.endpoint
      ) {
        restClient.defaults.timeout = 120000;
      }
      
      try {
        if (method === "post" || method === "put") {
          response = await restClient[method](endpoint, body, {
            params,
            headers: JWT ? { Authorization: `Bearer ${JWT}` } : {},
          });
        } else {
          response = await restClient[method](endpoint, {
            params,
            headers: JWT ? { Authorization: `Bearer ${JWT}` } : {},
          });
        }
        const { data, status } = response;
        if (status === 200) {
          if (isResponseVoid) {
            resolve({ status: status } as T);
            return;
          }
          if (data) {
            resolve(data as T);
          }
        }
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          // Handle 404 error when searching for a shared hl resolving the
          // promise to avoid retries
          if (isResponseVoid) {
            const data = {
              status: error.response?.status || 500,
              message: error.message,
            } as isResponseVoidType;
            if (endpoint === endpoints.payments.ValidateDirectDebit.endpoint) {
              data.message = error.response?.data?.error;
            }
            resolve(data as T);
            return;
          }
          if (
            error.response &&
            (error.response.status === 404 || error.response.status === 500)
          ) {
            resolve();
            return;
          }
        }
      }
    })();
  });
}
