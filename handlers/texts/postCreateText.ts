/**
 * Function to perform a POST request to /auth and handle errors.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} - The server response or an error message.
 */

import { TRUNCATE_TEXT } from '@utils/index';
import Cookies from 'js-cookie';
import { useRuntimeConfig } from 'nuxt/app';

export default async function postCreateText(title: string, text: string, type: string, language: string) {

    const runtimeConfig = useRuntimeConfig()

    const url = `${runtimeConfig.public.apiUrl}/texts`

    try {
        const userToken = Cookies.get('userToken')
        const truncateText = TRUNCATE_TEXT(text)
        const userName = Cookies.get('userName')

        if(!userToken) return {success: false, message: 'please signin'}

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
            },
            body: JSON.stringify({ title, name: userName, text: truncateText, type, language}),
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
