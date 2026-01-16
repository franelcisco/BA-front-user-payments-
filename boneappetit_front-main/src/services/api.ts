import { API_HOST } from '@/utils/constants';
import axios from 'axios';

export const uploaderValidatePayFormData = async (
    data: FormData
): Promise<boolean> => {
    try {
        await axios.post(`${API_HOST}/form/`, data);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
