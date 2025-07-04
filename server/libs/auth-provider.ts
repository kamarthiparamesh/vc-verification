import {
  keyId,
  passphrase,
  privateKey,
  projectId,
  tokenId,
} from "../secrets";
import { AuthProvider } from "@affinidi-tdk/auth-provider";


const instance = global as unknown as { provider: AuthProvider };

export const getAuthProvider = () => {
  if (instance.provider) {
    return instance.provider;
  }

  instance.provider = new AuthProvider({
    projectId,
    tokenId,
    privateKey,
    ...(passphrase && { passphrase }),
    ...(keyId && { keyId }),
  });
  return instance.provider;
};
