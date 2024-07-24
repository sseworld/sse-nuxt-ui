import { auth0EventHandler } from "../lib/oauth/auth0"
import { battledotnetEventHandler } from "../lib/oauth/battledotnet"
import { cognitoEventHandler } from "../lib/oauth/cognito"
import { discordEventHandler } from "../lib/oauth/discord"
import { facebookEventHandler } from "../lib/oauth/facebook"
import { githubEventHandler } from "../lib/oauth/github"
import { googleEventHandler } from "../lib/oauth/google"
import { keycloakEventHandler } from "../lib/oauth/keycloak"
import { linkedinEventHandler } from "../lib/oauth/linkedin"
import { microsoftEventHandler } from "../lib/oauth/microsoft"
import { paypalEventHandler } from "../lib/oauth/paypal"
import { spotifyEventHandler } from "../lib/oauth/spotify"
import { steamEventHandler } from "../lib/oauth/steam"
import { twitchEventHandler } from "../lib/oauth/twitch"
import { xEventHandler } from "../lib/oauth/x"
import { xsuaaEventHandler } from "../lib/oauth/xsuaa"
import { yandexEventHandler } from "../lib/oauth/yandex"

export const oauth = {
    auth0EventHandler,
    battledotnetEventHandler,
    cognitoEventHandler,
    discordEventHandler,
    facebookEventHandler,
    githubEventHandler,
    googleEventHandler,
    linkedinEventHandler,
    keycloakEventHandler,
    microsoftEventHandler,
    paypalEventHandler,
    spotifyEventHandler,
    steamEventHandler,
    twitchEventHandler,
    xEventHandler,
    xsuaaEventHandler,
    yandexEventHandler
}