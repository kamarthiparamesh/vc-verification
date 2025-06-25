// public environment variables for frontend and backend

export const hostUrl = process.env.NEXT_PUBLIC_HOST!;

if (!hostUrl)
  throw new Error(
    "NEXT_PUBLIC_HOST environment variable is undefined, please follow instructions in README to setup the application"
  );

export const hostName = process.env.NEXT_PUBLIC_HOST_NAME!;
export const webPort = process.env.NEXT_PUBLIC_WS_PORT!;
export const webSocketUrl = process.env.NEXT_PUBLIC_WEB_SOCKET_URL!;
export const webUrl = process.env.NEXT_PUBLIC_WEB_URL!;

export const webPrefix = '/backend'
export const webhomeRoute = '/backend';
export const webCallbackRoute = `/backend/vp-response-callback`;
export const webVerifyRoute = `/backend/verify-credentials`;
export const webCallbackUrl = `${webUrl}/${webCallbackRoute}`;
export const webVerifyUrl = `${webUrl}/${webVerifyRoute}`;