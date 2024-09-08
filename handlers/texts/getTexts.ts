/**
 * Function to perform a POST request to /auth and handle errors.
 * @param {string} type - The type of text ==> master || normal
 * @param {string} hasLanguage - Boolean for define if need send the language
 * @returns {Promise<Object>} - The server response array of texts or error
 */

import Cookies from "js-cookie";
import { useRuntimeConfig } from "nuxt/app";

export default async function getTexts(type: string, hasLanguage: boolean) {

    let language = 'all'
    if(hasLanguage) language = Cookies.get('language') || 'all'

    const runtimeConfig = useRuntimeConfig()

    const url = `${runtimeConfig.public.apiUrl}/texts/?type=${type}&language=${language}`

    try {

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, message: errorData.message || 'An error occurred' };
        }

        const data = await response.json();
        return { success: true, data };
    } catch (err: any) {
        return { success: false, message: err.message };
    }
}
