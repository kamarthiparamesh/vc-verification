node_modules/@affinidi/common/lib/services/KeyManager/LocalKeyManager.js

```
 signPresentation(vp, purpose, keySuiteType = 'ecdsa', metadata) {
        const didDocumentService = DidDocumentService_1.default.createDidDocumentService(this.keysService);
        const did = didDocumentService.getMyDid();
        const mainKeyId = didDocumentService.getKeyId(metadata === null || metadata === void 0 ? void 0 : metadata.keyId);
        const issuer = this.getIssuerForSigning(keySuiteType, this.keysService, did, mainKeyId);
        const signedVp = (0, vc_common_1.buildVPV1)({
            unsigned: vp,
            holder: {
                did,
                keyId: issuer.keyId,
                privateKey: issuer.privateKey,
            },
            getSignSuite: this.platformCryptographyTools.signSuites[keySuiteType],
            documentLoader: this.documentLoader,
            getProofPurposeOptions: () => ({
                challenge: purpose.challenge,
                domain: purpose.domain,
            }),
        });
        return signedVp;
    }
```

node_modules/@affinidi/wallet-core-sdk/dist/CommonNetworkMember/BaseNetworkMember.js

```
 async signUnsignedPresentation(vp, challenge, domain, keySuiteType) {
        return this._affinity.signPresentation({
            vp,
            purpose: {
                challenge,
                domain,
            },
            keySuiteType. // Added this type
        });
    }
```

node_modules/@affinidi/common/lib/Affinity.js

```
 async validatePresentation(vp, didDocument, challenge, didDocuments = {}, skipValidateOwnerIsHolder = false) {
        const result = await (0, vc_common_1.validateVPV1)({
            skipValidateOwnerIsHolder,
            documentLoader: this._createDocumentLoader(),
            getVerifySuite: async ({ proofType, verificationMethod, controller }) => {
                // if (proofType !== 'EcdsaSecp256k1Signature2019') {
                //     throw new Error(`Unsupported proofType: ${proofType}`);
                // }
                const providedDidDocument = this._getProvidedDidDocument(didDocuments, controller, didDocument);
                const resolvedDidDocument = await this._resolveDidIfNoDidDocument(controller, providedDidDocument);
                const publicKey = services_1.DidDocumentService.getPublicKey(verificationMethod, resolvedDidDocument);
                const factory = this._platformCryptographyTools.verifySuiteFactories[proofType];
                return factory(publicKey, verificationMethod, controller);
            },
```
