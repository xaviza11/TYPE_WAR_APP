/**
 * Function to perform a POST request to /auth and handle errors.
 * @param guestToken - The token of the guest
 * @returns {Promise<{ access_token: token as string, expirationDate: expirationDate as ISOString() }>} - The server response or an error message.
 */

import { useRuntimeConfig } from "nuxt/app";
import Cookies from 'js-cookie'

export default async function postRenovateGuestToken(guestToken: string) {
    try {

        const guestToken = Cookies.get('guestToken')

        const runtimeConfig = useRuntimeConfig()
        const url = `${runtimeConfig.public.apiUrl}/auth/renovateGuestToken`

        const response = await fetch(url, {
            method: 'POST',
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
