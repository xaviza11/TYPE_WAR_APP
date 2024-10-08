/**
 * Function to perform a POST request to /auth and handle errors.
 * @param {string} id - The id of the text
 * @returns {Promise<Object>} - The server response text or error
 */

import { useRuntimeConfig, useRouter } from "nuxt/app";
import Cookies from 'js-cookie'
import { useTranslateErrors } from "../../utils/useTranslate/useTranslateErrors";

export default async function getOneText(id: string) {
    try {
        const {translateError} = useTranslateErrors()
        const runtimeConfig = useRuntimeConfig()
        const url = `${runtimeConfig.public.apiUrl}/texts/findOne/${id}`
        const guestToken = Cookies.get('guestToken')

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${guestToken}`
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, message: translateError(errorData.message) || translateError('An error occurred')};
        }

        const data = await response.json();
        return { success: true, data };
    } catch (err: any) {
        const router = useRouter();

        if (err.message === 'Failed to fetch') {
            router.push('/Server500');
        }
        return { success: false, message: err.message };
    }
}
