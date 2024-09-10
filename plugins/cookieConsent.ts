// plugins/cookieConsent.js
import { defineNuxtPlugin, useNuxtApp } from 'nuxt/app';
import { createApp, h } from 'vue';
import CookieConsent from '../components/CookieConsent.vue';
import Cookies from 'js-cookie';

export default defineNuxtPlugin(() => {
    const { vueApp } = useNuxtApp();

    try {
        console.log('plugin work');

        const areCookiesConsented = Cookies.get('cookiesConsent');
        
        if (!areCookiesConsented) {
            const container = document.createElement('div');
            container.id = 'cookie-consent-container';
            document.body.appendChild(container);

            const app = createApp({
                render: () => h(CookieConsent)
            });
            app.mount('#cookie-consent-container');
        }
    } catch (error) {
        console.log(error);
    }
});
