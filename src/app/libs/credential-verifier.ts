import { DefaultApi, Configuration, VerifyCredentialInput, VerifyPresentationInput } from '@affinidi-tdk/credential-verification-client'

import { getAuthProvider } from "./auth-provider";

export async function verifyCredentials(apiData: VerifyCredentialInput) {
  const authProvider = getAuthProvider();
  const api = new DefaultApi(
    new Configuration({
      apiKey: authProvider.fetchProjectScopedToken.bind(authProvider),
    }),
  );
  const { data } = await api.verifyCredentials(apiData)
  return data;
}

export async function verifyPresentation(apiData: VerifyPresentationInput) {
  const authProvider = getAuthProvider();
  const api = new DefaultApi(
    new Configuration({
      apiKey: authProvider.fetchProjectScopedToken.bind(authProvider),
    }),
  );
  const { data } = await api.verifyPresentation(apiData)
  return data;
}
