/**
 * Function to perform a POST request to /auth and handle errors.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} - The server response or an error message.
 */

import Cookies from "js-cookie";
import { useRuntimeConfig } from "nuxt/app";

export default async function completedExercises() {

    const runtimeConfig = useRuntimeConfig()

    const url = `${runtimeConfig.public.apiUrl}/completedExercises`

    try {
        const response = await fetch(url, {
            method: 'POST',
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
