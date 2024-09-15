/**
 * Function to perform a POST request to /auth and handle errors.
 * @param userToken - The token of the user
 * @param name - The name of the user
 * @param type - The type of the session or user
 * @returns {Promise<{ access_token: token as string, name: userName as string, type: userType as string, expirationDate: expirationDate as ISOString }>} - The server response or an error message.
 */

import { useRuntimeConfig, useRouter } from "nuxt/app";
import { useTranslateErrors } from "../../utils/useTranslate/useTranslateErrors";

export default async function postRenovateSessionToken(userToken: string, name: string, type: string) {
    try {
        const {translateError} = useTranslateErrors()
        const runtimeConfig = useRuntimeConfig();  
        const url = `${runtimeConfig.public.apiUrl}/auth/renovateSessionToken`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
            },
            body: JSON.stringify({ name, type }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, message: translateError(errorData.message) || translateError('An error occurred') };
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
