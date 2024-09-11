/**
 * Function to perform a POST request to /auth and handle errors.
 * @returns {Promise<Object>} - The server response or an error message.
 */

import Cookies from "js-cookie";
import { useRuntimeConfig, useRouter } from "nuxt/app";

export default async function completedExercises() {
    try {

        const runtimeConfig = useRuntimeConfig()
        const url = `${runtimeConfig.public.apiUrl}/completedExercises`

        const userToken = Cookies.get('userToken')

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, message: errorData.message || 'An error occurred' };
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
