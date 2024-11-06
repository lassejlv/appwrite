/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RegisterImport } from './routes/register'
import { Route as LoginImport } from './routes/login'
import { Route as IndexImport } from './routes/index'
import { Route as AppIndexImport } from './routes/app/index'
import { Route as AppVerifyImport } from './routes/app/verify'

// Create/Update Routes

const RegisterRoute = RegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AppIndexRoute = AppIndexImport.update({
  id: '/app/',
  path: '/app/',
  getParentRoute: () => rootRoute,
} as any)

const AppVerifyRoute = AppVerifyImport.update({
  id: '/app/verify',
  path: '/app/verify',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterImport
      parentRoute: typeof rootRoute
    }
    '/app/verify': {
      id: '/app/verify'
      path: '/app/verify'
      fullPath: '/app/verify'
      preLoaderRoute: typeof AppVerifyImport
      parentRoute: typeof rootRoute
    }
    '/app/': {
      id: '/app/'
      path: '/app'
      fullPath: '/app'
      preLoaderRoute: typeof AppIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/app/verify': typeof AppVerifyRoute
  '/app': typeof AppIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/app/verify': typeof AppVerifyRoute
  '/app': typeof AppIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/app/verify': typeof AppVerifyRoute
  '/app/': typeof AppIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/login' | '/register' | '/app/verify' | '/app'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/login' | '/register' | '/app/verify' | '/app'
  id: '__root__' | '/' | '/login' | '/register' | '/app/verify' | '/app/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  LoginRoute: typeof LoginRoute
  RegisterRoute: typeof RegisterRoute
  AppVerifyRoute: typeof AppVerifyRoute
  AppIndexRoute: typeof AppIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  LoginRoute: LoginRoute,
  RegisterRoute: RegisterRoute,
  AppVerifyRoute: AppVerifyRoute,
  AppIndexRoute: AppIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/login",
        "/register",
        "/app/verify",
        "/app/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    },
    "/app/verify": {
      "filePath": "app/verify.tsx"
    },
    "/app/": {
      "filePath": "app/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */