
import { createWallet, EventComponent as NodeEventComponent } from '@affinidi/wallet-node-sdk'
import path from 'path';
import * as fs from 'fs';
import { buildVCV1Skeleton, buildVCV1Unsigned, buildVPV1Unsigned } from '@affinidi/vc-common';
import { NetworkMemberWithoutCognito } from '@affinidi/wallet-core-sdk/dist/CommonNetworkMember/NetworkMemberWithoutCognito';
import verificationService from '../src/app/verification/verification.service';

const SSM_AFFINIDI_API_KEY = "dummy-key-no-need"

const walletFilePath = path.join(__dirname, 'wallet.json');

async function createWalletIfNotExists(walletName: string, options: any): Promise<NetworkMemberWithoutCognito> {
    const AffinidiWallet = createWallet(NodeEventComponent.AffinidiCloudAPI)
    let wallet;
    let walletData: any = {};
    if (fs.existsSync(walletFilePath)) {
        const data = fs.readFileSync(walletFilePath, 'utf-8');
        walletData = JSON.parse(data);
    }

    if (walletData[walletName]) {
        console.log('Wallet loaded from file:', walletName);

        wallet = await AffinidiWallet.openWalletByEncryptedSeed(
            {
                env: 'prod',
                accessApiKey: SSM_AFFINIDI_API_KEY,
            },
            walletData[walletName].encryptedSeed,
            walletData[walletName].password,
        )
    } else {
        console.log('New wallet created and saved to file:', walletName);
        wallet = await AffinidiWallet.createWallet(
            {
                env: 'prod',
                accessApiKey: SSM_AFFINIDI_API_KEY,
                ...options
            },
            'my-password-for-affinidi-wallet',
            { keyTypes: ['rsa', 'ecdsa'] },
        )
        walletData[walletName] = {
            did: wallet.did,
            encryptedSeed: wallet.encryptedSeed,
            password: wallet.password,
            didDocument: wallet.didDocument,
        }

        fs.writeFileSync(walletFilePath, JSON.stringify(walletData, null, 2), 'utf-8');
    }

    return wallet;
}

async function main() {

    const holderWallet = await createWalletIfNotExists('did-key1', {
        didMethod: 'key',
    });

    const delegatedWallet = await createWalletIfNotExists('did-key2', {
        didMethod: 'key',
    });

    const issuerWallet = await createWalletIfNotExists('did-issuer-key', {
        didMethod: 'key',
    });

    console.log('Holder Wallet DID', holderWallet.did)
    console.log('Delegated Wallet DID', delegatedWallet.did)
    console.log('Issuer Wallet DID', issuerWallet.did)

    const unsignedCredential = buildVCV1Unsigned({
        skeleton: buildVCV1Skeleton<any>({
            id: 'claimId:12345678',
            credentialSubject: {
                firstName: 'Paramesh',
                email: 'paramesh.k@affinidi.com',
            },
            holder: {
                id: holderWallet.did,
            },
            type: 'PersonalProfile',
            context: ['https://www.w3.org/2018/credentials/v1', 'https://schema.affinidi.com/PersonalProfileV1-0.jsonld'],
        }),
        issuanceDate: new Date().toISOString(),
    });

    const signedCredential = await issuerWallet.signUnsignedCredential(unsignedCredential)
    console.log('Signed Credential:', JSON.stringify(signedCredential, null, 2));

    const vp = buildVPV1Unsigned({
        id: 'claimId:abc1234',
        vcs: [signedCredential as any],
        holder: {
            id: holderWallet.did,
        },
    })

    const signedPresentation: any = await holderWallet.signUnsignedPresentation(vp, 'my-challenge-string', 'paramesh.com')
    console.log('Signed Presentation:', JSON.stringify(signedPresentation, null, 2));

    const unsignedDelegateCredential = buildVCV1Unsigned({
        skeleton: buildVCV1Skeleton<any>({
            id: 'claimId:deleg123',
            holder: {
                id: delegatedWallet.did,
            },
            credentialSubject: {
                delegationLevel: "full",
                credentials: [{
                    id: signedCredential.id,
                }],
            },
            type: 'DelegationCredential',
            context: ['https://www.w3.org/2018/credentials/v1', 'https://d2oeuqaac90cm.cloudfront.net/TDelegationCredentialV1R0.jsonld'],
        }),
        issuanceDate: new Date().toISOString(),
    });
    const signedDelegateCredential = await holderWallet.signUnsignedCredential(unsignedDelegateCredential)
    console.log('Signed Delegated Credential:', JSON.stringify(signedDelegateCredential, null, 2));

    const vp2 = buildVPV1Unsigned({
        id: 'claimId:abc1234',
        vcs: [signedDelegateCredential, signedCredential as any],
        holder: {
            id: delegatedWallet.did,
        },
    })

    const signedDelegatorPresentation: any = await delegatedWallet.signUnsignedPresentation(vp2, 'my-challenge-test1', 'paramesh.com')
    console.log('Signed Delegator Presentation:', JSON.stringify(signedDelegatorPresentation, null, 2));


    const result = await verificationService.verifyPresentation({
        verifiablePresentation: signedDelegatorPresentation,
    })

    console.log('Verification Result:', JSON.stringify(result, null, 2));
}


main();