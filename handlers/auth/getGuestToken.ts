/**
 * Function to perform a POST request to /auth and handle errors.
 * @returns {Promise<{access_token: token as string, expirationDate: expirationDate as ISOString()}>} - The server response or an error message.
 */

import { useRuntimeConfig, useRouter } from "nuxt/app";
import { useTranslateErrors } from "../../utils/useTranslate/useTranslateErrors";

export default async function getGuestToken() {

    const {translateError} = useTranslateErrors()
    const runtimeConfig = useRuntimeConfig()

    const url = `${runtimeConfig.public.apiUrl}/auth/generateGuestToken`

    try {

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, message: errorData.message || translateError('An error occurred') };
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
