import postRenovateSessionToken from '../handlers/auth/postRenovateSessionToken'
import Cookies from 'js-cookie'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin(async () => {
    try {
        const userToken = Cookies.get('userToken')
        const sessionExpirationDate = Cookies.get('sessionExpirationDate')

        if (!userToken || !sessionExpirationDate) {
            console.error('Needs to sign in or sign up to retrieve the session token')
            return
        }

        const currentDate = new Date()
        const expiration = new Date(sessionExpirationDate)

        const name = Cookies.get('userName')
        const type = Cookies.get('userType')

        if (!name || !type) {
            console.error('Needs to sign in or sign up to retrieve the session token')
            return
        }

        if (expiration <= currentDate) {
            const renewResponse = await postRenovateSessionToken(userToken, name, type)
            if (renewResponse.success) {
                Cookies.set('userToken', renewResponse.data.access_token, { expires: 7 })
                Cookies.set('userName', renewResponse.data.name, { expires: 7 })
                Cookies.set('userType', renewResponse.data.type, { expires: 7 })
                Cookies.set('sessionExpirationDate', renewResponse.data.expirationDate, { expires: 7 })
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
