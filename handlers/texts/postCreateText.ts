/**
 * Function to perform a POST request to /auth and handle errors.
 * @param {string} title - The title of the text
 * @param {string} text -  The text of the document
 * @param {string}type - The type of text text || exercise
 * @param {string}language - The language of the text
 * @returns {Promise<Object>} - The server response or an error message.
 */

import { TRUNCATE_TEXT } from '@utils/index';
import Cookies from 'js-cookie';
import { useRuntimeConfig } from 'nuxt/app';

export default async function postCreateText(title: string, text: string, type: string, language: string) {
    try {
        const runtimeConfig = useRuntimeConfig()
        const url = `${runtimeConfig.public.apiUrl}/texts`
        const userToken = Cookies.get('userToken')
        const truncateText = TRUNCATE_TEXT(text)
        const userName = Cookies.get('userName')

        if (!userToken) return { success: false, message: 'please signin' }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
            },
            body: JSON.stringify({ title, name: userName, text: truncateText, type, language }),
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
