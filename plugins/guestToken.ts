import getGuestToken from '../handlers/auth/getGuestToken'
import postRenovateGuestToken from '../handlers/auth/postRenovateGuestToken'
import Cookies from 'js-cookie'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin(async () => {
    try {
        const guestToken = Cookies.get('guestToken')
        const expirationDate = Cookies.get('expirationDate')

        if (!guestToken || !expirationDate) {
            const response = await getGuestToken()

            if (response.success) {
                Cookies.set('guestToken', response.data.access_token)
                Cookies.set('expirationDate', response.data.expirationDate)
            } else {
                console.error('Error obtaining guest token:', response.message)
            }
        } else {
            const currentDate = new Date()
            const expiration = new Date(expirationDate)

            if (expiration <= currentDate) {
                const renewResponse = await postRenovateGuestToken(guestToken)

                if (renewResponse.success) {
                    Cookies.set('guestToken', renewResponse.data.access_token)
                    Cookies.set('expirationDate', renewResponse.data.expirationDate)
                    console.log('Guest token renewed successfully')
                } else {
                    console.error('Error renewing guest token:', renewResponse.message)
                }
            } else {
                console.log('Guest token is still valid')
            }
        }
    } catch (error) {
        console.error('General error in the guest token plugin:', error)
    }
})
