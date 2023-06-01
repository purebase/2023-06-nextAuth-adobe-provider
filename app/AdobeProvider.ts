import {OAuthConfig, OAuthUserConfig} from "next-auth/providers";

// https://developer.adobe.com/developer-console/docs/guides/authentication/UserAuthentication/IMS/#userinfo
interface AdobeProfile extends Record<string, any> {
    sub: string
    name: string
    email: string
    picture: string
}

// https://next-auth.js.org/configuration/providers/oauth#options
export function AdobeProvider<P extends AdobeProfile>(
    options: OAuthUserConfig<P>
): OAuthConfig<P> {
    return {
        id: "adobe",
        name: "Adobe",
        type: "oauth",
        version: "2.0",
        //`https://ims-na1.adobelogin.com/ims/authorize/v2?
        // client_id=${adobeApiKey}
        // &scope=${scopes}
        // &response_type=code
        // &redirect_uri=${redirect_uri}
        // &prompt=login`
        authorization: {
            url: "https://ims-na1.adobelogin.com/ims/authorize/v2",
            params: {
                scope:"openid, lr_partner_apis, lr_partner_rendition_apis, offline_access",
                grant_type: "authorization_code",
                response_type: "code",
                prompt: "login"
            },
        },
        token: {
            url: "https://ims-na1.adobelogin.com/ims/token/v3",
        },
        userinfo: {
            url: "https://ims-na1.adobelogin.com/ims/userinfo/v2"
        },
        async profile(profile, tokens) {
            // You can use the tokens, in case you want to fetch more profile information
            // For example several OAuth providers do not return email by default.
            // Depending on your provider, will have tokens like `access_token`, `id_token` and or `refresh_token`
            return {
                id: profile.sub,
                name: profile.name,
                email: profile.email,
                image: profile.picture
            }
        },
        ...options
    }
}
