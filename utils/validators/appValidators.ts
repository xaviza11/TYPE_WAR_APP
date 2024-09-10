export function HAS_LANGUAGE(language:string){
    const appLanguages = ['es-ES', 'en-UK', 'en-US', 'it-IT', 'fr-FR', 'de-DE']
    if(appLanguages.includes(language)) return true
    else return false
}