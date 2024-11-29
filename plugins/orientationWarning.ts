import { defineNuxtPlugin } from 'nuxt/app';
import { createApp, h } from 'vue';
import OrientationWarning from '../components/OrientationWarning.vue';

export default defineNuxtPlugin(() => {
    const handleOrientation = () => {
        const isLandscape = window.matchMedia('(orientation: landscape)').matches;
        const isMobile = window.innerWidth <= 768;

        if (isLandscape && isMobile) {
            if (!document.getElementById('orientation-warning-container')) {
                const container = document.createElement('div');
                container.id = 'orientation-warning-container';
                document.body.appendChild(container);

                const app = createApp({
                    render: () => h(OrientationWarning),
                });
                app.mount('#orientation-warning-container');
            }
        } else {
            const container = document.getElementById('orientation-warning-container');
            if (container) {
                container.remove();
            }
        }
    };

    window.addEventListener('resize', handleOrientation);
    handleOrientation(); 
});
