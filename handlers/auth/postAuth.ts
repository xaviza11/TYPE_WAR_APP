/**
 * Function to perform a POST request to /auth and handle errors.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<{access_token: CancelToken, name: userName as string, type: userType as string, expirationDate: expiration date as ISOString}>} - The server response or an error message.
 */

import { IS_VALID_PASSWORD, IS_VALID_EMAIL } from "../../utils/validators/usersRegex";
import { useRuntimeConfig, useRouter } from "nuxt/app";
import Cookies from 'js-cookie';
import { useTranslateErrors } from "../../utils/useTranslate/useTranslateErrors";

export default async function postAuth(email: string, password: string) {
    try {
        const {translateError} = useTranslateErrors()
        const guestToken = Cookies.get('guestToken');

        const runtimeConfig = useRuntimeConfig();
        const url = `${runtimeConfig.public.apiUrl}/auth/signin`;

        const isValidEmail = IS_VALID_EMAIL(email);
        const isValidPassword = IS_VALID_PASSWORD(password);

        if (!isValidEmail) return { success: false, message: translateError('Invalid email') };
        if (!isValidPassword) return { success: false, message: translateError('Invalid password') };

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
