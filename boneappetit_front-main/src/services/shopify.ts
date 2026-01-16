import { API_HOST } from '@/utils/constants';
import axios from 'axios';
import type { FindOrderResponse, handleFindOrder } from '../types/shopify';

export const FindOrderByName = async ({
    orderName,
}: handleFindOrder): Promise<FindOrderResponse | undefined> => {
    try {
        const response = await axios.get<FindOrderResponse>(
            `${API_HOST}/orders/${orderName}`
        );
        if (response.status === 200 && response.data) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
        return undefined;
    }
};
