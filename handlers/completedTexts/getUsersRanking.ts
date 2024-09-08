/**
 * Function to perform a POST request to /auth and handle errors.
 * @returns {Promise<Object>} - The server response sorted array of users ranking or error
 */

import Cookies from "js-cookie";
import { useRuntimeConfig } from "nuxt/app";

export default async function getUsersRanking() {
    try {

        const runtimeConfig = useRuntimeConfig()
        const mode = Cookies.get('mode')
        const url = `${runtimeConfig.public.apiUrl}/completedExercises/getRanking?exerciseMode=${mode}`
        const guestToken = Cookies.get('guestToken')

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${guestToken}`,
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
