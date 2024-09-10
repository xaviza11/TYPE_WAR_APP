/**
 * Function to perform a POST request to /auth and handle errors.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<{access_token: CancelToken, name: userName as string, type: userType as string, expirationDate: expiration date as ISOString}>} - The server response or an error message.
 */

import { IS_VALID_PASSWORD, IS_VALID_EMAIL } from "../../utils/validators/usersRegex";
import { useRuntimeConfig } from "nuxt/app";
import Cookies from 'js-cookie';

export default async function postAuth(email: string, password: string) {
    try {
        const guestToken = Cookies.get('guestToken');

        const runtimeConfig = useRuntimeConfig();
        const url = `${runtimeConfig.public.apiUrl}/auth/signin`;

        const isValidEmail = IS_VALID_EMAIL(email);
        const isValidPassword = IS_VALID_PASSWORD(password);

        if (!isValidEmail) return { success: false, message: 'Invalid email' };
        if (!isValidPassword) return { success: false, message: 'Invalid password' };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${guestToken}`,
            },
            body: JSON.stringify({ email, password }),
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
