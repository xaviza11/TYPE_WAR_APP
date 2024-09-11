/**
 * Function to perform a POST request to /auth and handle errors.
 * @param {string} title - The title of the text
 * @param {string} text -  The text of the document
 * @param {string}type - The type of text text || exercise
 * @param {string}language - The language of the text
 * @returns {Promise<Object>} - The server response or an error message.
 */

import { TRUNCATE_TEXT } from '../../utils/text/truncateText';
import Cookies from 'js-cookie';
import { useRuntimeConfig, useRouter } from 'nuxt/app';
import { useTranslateErrors } from '../../utils/useTranslate/useTranslateErrors';

export default async function postCreateText(title: string, text: string, type: string, language: string) {
    try {

        const {translateError} = useTranslateErrors()

        const runtimeConfig = useRuntimeConfig()
        const url = `${runtimeConfig.public.apiUrl}/texts`
        const userToken = Cookies.get('userToken')
        const truncateText = TRUNCATE_TEXT(text)
        const userName = Cookies.get('userName')

        if (!userToken) return { success: false, message: translateError('Please signin')}

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
            return { success: false, message: errorData.message || translateError('An error occurred')};
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
