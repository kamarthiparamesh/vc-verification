// public environment variables for frontend and backend

export const hostUrl = process.env.NEXT_PUBLIC_HOST!;

if (!hostUrl)
  throw new Error(
    "NEXT_PUBLIC_HOST environment variable is undefined, please follow instructions in README to setup the application"
  );

export const hostName = process.env.NEXT_PUBLIC_HOST_NAME!;
export const webPort = process.env.NEXT_PUBLIC_WS_PORT!;
export const webSocketUrl = process.env.NEXT_PUBLIC_WEB_SOCKET_URL!;
export const webCallback = process.env.NEXT_PUBLIC_WEB_CALLBACK!;