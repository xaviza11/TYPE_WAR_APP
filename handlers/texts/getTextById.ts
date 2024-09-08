/**
 * Function to perform a POST request to /auth and handle errors.
 * @param {string} id - The id of the text
 * @returns {Promise<Object>} - The server response text or error
 */

import { useRuntimeConfig } from "nuxt/app";
import Cookies from 'js-cookie'

export default async function getOneText(id: string) {
    try {

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
            return { success: false, message: errorData.message || 'An error occurred' };
        }

        const data = await response.json();
        return { success: true, data };
    } catch (err: any) {
        return { success: false, message: err.message };
    }
}
