/**
 * Function to perform a POST request to /completedExercises and handle errors.
 * @returns {Promise<Object>} - The server response or an error message.
 */

import Cookies from "js-cookie";
import { useRuntimeConfig, useRouter } from "nuxt/app";
import { useTranslateErrors } from "../../utils/useTranslate/useTranslateErrors";

export default async function completedExercises(
  user_name: string,
  test_id: string,
  pps: number,
  exerciseMode: string,
  durationInSeconds: number,
  numberErrors: number
) {
  try {
    const { translateError } = useTranslateErrors();
    const runtimeConfig = useRuntimeConfig();
    const url = `${runtimeConfig.public.apiUrl}/completedExercises`;

    const userToken = Cookies.get('userToken');

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        user_name,      
        test_id,         
        pps,            
        exerciseMode,     
        durationInSeconds,
        numberErrors
      })
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
