/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/screens${'/(auth)'}/signin` | `/screens/signin`; params?: Router.UnknownInputParams; } | { pathname: `/screens${'/(auth)'}/signup` | `/screens/signup`; params?: Router.UnknownInputParams; } | { pathname: `/screens${'/(detail)'}` | `/screens`; params?: Router.UnknownInputParams; } | { pathname: `/screens${'/(main)'}/cart` | `/screens/cart`; params?: Router.UnknownInputParams; } | { pathname: `/screens${'/(main)'}` | `/screens`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/screens${'/(auth)'}/signin` | `/screens/signin`; params?: Router.UnknownOutputParams; } | { pathname: `/screens${'/(auth)'}/signup` | `/screens/signup`; params?: Router.UnknownOutputParams; } | { pathname: `/screens${'/(detail)'}` | `/screens`; params?: Router.UnknownOutputParams; } | { pathname: `/screens${'/(main)'}/cart` | `/screens/cart`; params?: Router.UnknownOutputParams; } | { pathname: `/screens${'/(main)'}` | `/screens`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/screens${'/(auth)'}/signin${`?${string}` | `#${string}` | ''}` | `/screens/signin${`?${string}` | `#${string}` | ''}` | `/screens${'/(auth)'}/signup${`?${string}` | `#${string}` | ''}` | `/screens/signup${`?${string}` | `#${string}` | ''}` | `/screens${'/(detail)'}${`?${string}` | `#${string}` | ''}` | `/screens${`?${string}` | `#${string}` | ''}` | `/screens${'/(main)'}/cart${`?${string}` | `#${string}` | ''}` | `/screens/cart${`?${string}` | `#${string}` | ''}` | `/screens${'/(main)'}${`?${string}` | `#${string}` | ''}` | `/screens${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/screens${'/(auth)'}/signin` | `/screens/signin`; params?: Router.UnknownInputParams; } | { pathname: `/screens${'/(auth)'}/signup` | `/screens/signup`; params?: Router.UnknownInputParams; } | { pathname: `/screens${'/(detail)'}` | `/screens`; params?: Router.UnknownInputParams; } | { pathname: `/screens${'/(main)'}/cart` | `/screens/cart`; params?: Router.UnknownInputParams; } | { pathname: `/screens${'/(main)'}` | `/screens`; params?: Router.UnknownInputParams; };
    }
  }
}
