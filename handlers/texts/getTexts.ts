/**
 * Function to perform a POST request to /auth and handle errors.
 * @param {string} type - The type of text ==> master || normal
 * @param {string} hasLanguage - Boolean for define if need send the language
 * @returns {Promise<Object>} - The server response array of texts or error
 */

import Cookies from "js-cookie";
import { useRuntimeConfig, useRouter } from "nuxt/app";
import { useTranslateErrors } from "../../utils/useTranslate/useTranslateErrors";

export default async function getTexts(type: string, hasLanguage: boolean) {
    try {

        const {translateError} = useTranslateErrors()

        let language = 'all';
        if (hasLanguage) language = Cookies.get('language') || 'all';

        const runtimeConfig = useRuntimeConfig();
        const url = `${runtimeConfig.public.apiUrl}/texts/?type=${type}&language=${language}`;
        const guestToken = Cookies.get('guestToken');

        const headers: Record<string, string> = {'Content-Type': 'application/json'};

        if (guestToken) headers['Authorization'] = `Bearer ${guestToken}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, message: errorData.message || translateError('An error occurred')};
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
