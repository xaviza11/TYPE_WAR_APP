import postRenovateSessionToken from '../handlers/auth/postRenovateSessionToken'
import Cookies from "js-cookie"

export default async () => {
    try {
        const userToken = Cookies.get('userToken') 
        const sessionExpirationDate = Cookies.get('sessionExpirationDate') 

        if (!userToken || !sessionExpirationDate) {
            console.error('Needs to signin or signup for retrieve the session token')
            return
        }

        const currentDate = new Date()
        const expiration = new Date(sessionExpirationDate)

        const name = Cookies.get('userName')
        const type = Cookies.get('userType')

        if(!name || !type){
            console.error('Needs to signin or signup for retrieve the session token')
            return
        }


        if (expiration <= currentDate) {
            const renewResponse = await postRenovateSessionToken(userToken, name, type)
            if (renewResponse.success) {
                Cookies.set('userToken', renewResponse.data.access_token)
                Cookies.set('userName', renewResponse.data.name)
                Cookies.set('userType', renewResponse.data.type)
                Cookies.set('sessionExpirationDate', renewResponse.data.expirationDate)
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
}
