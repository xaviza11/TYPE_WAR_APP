/**
 * Function to perform a POST request to /auth and handle errors.
 * @param {string} id - The id of the text
 * @returns {Promise<Object>} - The server response text or error
 */

import { useRuntimeConfig } from "nuxt/app";

export default async function getOneText(id: string) {


    const runtimeConfig = useRuntimeConfig()

    const url = `${runtimeConfig.public.apiUrl}/texts/findOne/${id}`

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
