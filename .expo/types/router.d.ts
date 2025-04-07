/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/screens/auth/signin`; params?: Router.UnknownInputParams; } | { pathname: `/screens/auth/signup`; params?: Router.UnknownInputParams; } | { pathname: `/screens/home/home`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/auth/signin`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/auth/signup`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/home/home`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/screens/auth/signin${`?${string}` | `#${string}` | ''}` | `/screens/auth/signup${`?${string}` | `#${string}` | ''}` | `/screens/home/home${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/screens/auth/signin`; params?: Router.UnknownInputParams; } | { pathname: `/screens/auth/signup`; params?: Router.UnknownInputParams; } | { pathname: `/screens/home/home`; params?: Router.UnknownInputParams; };
    }
  }
}
