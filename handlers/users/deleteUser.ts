/**
 * Function to perform a POST request to /auth and handle errors.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @param {string} name - The name of the user
 * @returns {Promise<Object>} - The server response or an error message.
 */

import { IS_VALID_EMAIL, IS_VALID_NAME, IS_VALID_PASSWORD } from '../../utils/validators/usersRegex';
import { useRuntimeConfig, useRouter } from 'nuxt/app';
import Cookies from 'js-cookie'
import { useTranslateErrors } from '../../utils/useTranslate/useTranslateErrors';

export default async function deleteUser(password: string) {
    try {

        const {translateError} = useTranslateErrors()

        const token = Cookies.get('userToken')
        const name = Cookies.get('userName')
        if(!name) return {success: false, message: translateError('An error occurred') }

        const runtimeConfig = useRuntimeConfig()
        const url = `${runtimeConfig.public.apiUrl}/users/delete`

        const isValidPassword = IS_VALID_PASSWORD(password)
        const isValidName = IS_VALID_NAME(name)
        if (!isValidPassword) return { success: false, message: translateError('invalid password') }
        if (!isValidName) return { success: false, message: translateError('invalid email') }

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({name, password}),
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
