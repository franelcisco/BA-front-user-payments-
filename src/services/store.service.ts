import { endpoints } from "@/config/endpoints";
import type {
  OrderResponse,
  UpdateCustomerParentIDRequest,
} from "@/types/dtos/store.dto";
import {
  restApiHttpRequest,
  type isResponseVoidType,
} from "@/utils/httpClient";

const findOrderByName = async (
  orderName: string,
): Promise<OrderResponse | undefined> => {
  try {
    const response = await restApiHttpRequest<OrderResponse>({
      endpoint: `${endpoints.store.findOrderByName.endpoint}/${orderName}`,
    });
    if (response) {
      return response;
    }
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const findOrderById = async (
  id: string,
): Promise<OrderResponse | undefined> => {
  try {
    const response = await restApiHttpRequest<OrderResponse>({
      endpoint: `${endpoints.store.findOrderById.endpoint}/${id}`,
    });
    if (response) {
      return response;
    }
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const updateCustomerParentID = async (
  data: UpdateCustomerParentIDRequest,
): Promise<boolean> => {
  try {
    const response = await restApiHttpRequest<isResponseVoidType>({
      endpoint: endpoints.store.updateCustomerParentID.endpoint,
      method: "put",
      body: data,
    });
    if (response && response.status === 200) return true;
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const findCasheaById = async (
  id: string,
): Promise<OrderResponse | undefined> => {
  try {
    const response = await restApiHttpRequest<OrderResponse>({
      endpoint: `${endpoints.store.findCasheaById.endpoint}/${id}`,
    });
    if (response) {
      return response;
    }
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const storeService = {
  findOrderById,
  findOrderByName,
  updateCustomerParentID,
  findCasheaById,
};
