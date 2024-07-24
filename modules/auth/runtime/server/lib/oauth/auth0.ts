import type { OAuthConfig } from "#sse-nui/auth";
import { useRuntimeConfig } from "#imports";
import type { H3Event } from "h3";
import {
  eventHandler,
  createError,
  getQuery,
  getRequestURL,
  sendRedirect,
} from "h3";
import { withQuery, parsePath } from "ufo";
import { defu } from "defu";

export interface OAuthAuth0Config {
  /**
   * Auth0 OAuth Client ID
   * @default process.env.NUXT_OAUTH_AUTH0_CLIENT_ID
   */
  clientId?: string;
  /**
   * Auth0 OAuth Client Secret
   * @default process.env.NUXT_OAUTH_AUTH0_CLIENT_SECRET
   */
  clientSecret?: string;
  /**
   * Auth0 OAuth Issuer
   * @default process.env.NUXT_OAUTH_AUTH0_DOMAIN
   */
  domain?: string;
  /**
   * Auth0 OAuth Audience
   * @default process.env.NUXT_OAUTH_AUTH0_AUDIENCE
   */
  audience?: string;
  /**
   * Auth0 OAuth Scope
   * @default []
   * @see https://auth0.com/docs/get-started/apis/scopes/openid-connect-scopes
   * @example ['openid']
   */
  scope?: string[];
  /**
   * Require email from user, adds the ['email'] scope if not present
   * @default false
   */
  emailRequired?: boolean;
  /**
   * Maximum Authentication Age. If the elapsed time is greater than this value, the OP must attempt to actively re-authenticate the end-user.
   * @default 0
   * @see https://auth0.com/docs/authenticate/login/max-age-reauthentication
   */
  maxAge?: number;
  /**
   * Login connection. If no connection is specified, it will redirect to the standard Auth0 login page and show the Login Widget.
   * @default ''
   * @see https://auth0.com/docs/api/authentication#social
   * @example 'github'
   */
  connection?: string;
  /**
   * Extra authorization parameters to provide to the authorization URL
   * @see https://auth0.com/docs/api/authentication#social
   * @example { display: 'popup' }
   */
  authorizationParams?: Record<string, string>;
}

export function auth0EventHandler({
  config,
  onSuccess,
  onError,
}: OAuthConfig<OAuthAuth0Config>) {
  return eventHandler(async (event: H3Event) => {
    config = defu(config, useRuntimeConfig(event).oauth?.auth0, {
      authorizationParams: {},
    }) as OAuthAuth0Config;
    const { code } = getQuery(event);

    if (!config.clientId || !config.clientSecret || !config.domain) {
      const error = createError({
        statusCode: 500,
        message:
          "Missing NUXT_OAUTH_AUTH0_CLIENT_ID or NUXT_OAUTH_AUTH0_CLIENT_SECRET or NUXT_OAUTH_AUTH0_DOMAIN env variables.",
      });
      if (!onError) throw error;
      return onError(event, error);
    }
    const authorizationURL = `https://${config.domain}/authorize`;
    const tokenURL = `https://${config.domain}/oauth/token`;

    const redirectUrl = getRequestURL(event).href;
    if (!code) {
      config.scope = config.scope || ["openid", "offline_access"];
      if (config.emailRequired && !config.scope.includes("email")) {
        config.scope.push("email");
      }
      // Redirect to Auth0 Oauth page
      return sendRedirect(
        event,
        withQuery(authorizationURL as string, {
          response_type: "code",
          client_id: config.clientId,
          redirect_uri: redirectUrl,
          scope: config.scope.join(" "),
          audience: config.audience || "",
          max_age: config.maxAge || 0,
          connection: config.connection || "",
          ...config.authorizationParams,
        })
      );
    }

    // TODO: improve typing
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tokens: any = await $fetch(tokenURL as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        grant_type: "authorization_code",
        client_id: config.clientId,
        client_secret: config.clientSecret,
        redirect_uri: parsePath(redirectUrl).pathname,
        code,
      },
    }).catch((error) => {
      return { error };
    });
    if (tokens.error) {
      const error = createError({
        statusCode: 401,
        message: `Auth0 login failed: ${
          tokens.error?.data?.error_description || "Unknown error"
        }`,
        data: tokens,
      });
      if (!onError) throw error;
      return onError(event, error);
    }

    const tokenType = tokens.token_type;
    const accessToken = tokens.access_token;

    // TODO: improve typing
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user: any = await $fetch(`https://${config.domain}/userinfo`, {
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    });

    return onSuccess(event, {
      tokens,
      user,
    });
  });
}
