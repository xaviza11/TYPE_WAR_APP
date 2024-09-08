import postRenovateSessionToken from '../handlers/auth/postRenovateSessionToken'
import { useCookie } from 'nuxt/app'
import Cookies from 'js-cookie'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin(async () => {
    try {
        const userToken = useCookie('userToken')
        const sessionExpirationDate = useCookie('sessionExpirationDate')

        if (!userToken.value || !sessionExpirationDate.value) {
            console.error('Needs to signin or signup to retrieve the session token')
            return
        }

        const currentDate = new Date()
        const expiration = new Date(sessionExpirationDate.value)

        const name = useCookie('userName')
        const type = useCookie('userType')

        if (!name.value || !type.value) {
            console.error('Needs to signin or signup to retrieve the session token')
            return
        }

        if (expiration <= currentDate) {
            const renewResponse = await postRenovateSessionToken(userToken.value, name.value, type.value)
            if (renewResponse.success) {
                useCookie('userToken').value = renewResponse.data.access_token
                useCookie('userName').value = renewResponse.data.name
                useCookie('userType').value = renewResponse.data.type
                useCookie('sessionExpirationDate').value = renewResponse.data.expirationDate
                console.log('Session token renewed successfully')
            } else {
                console.error('Error renewing session token:', renewResponse.message)
            }
        } else {
            console.log('Session token is still valid')
        }
    } catch (error) {
        console.error('General error in the session token plugin:', error)
    }
})
