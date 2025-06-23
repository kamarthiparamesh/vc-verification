import data from './callback-raw-response.json' assert { type: 'json' };

const { vp_token, presentation_submission, state } = data;

const vpToken = JSON.parse(vp_token);
const vc = JSON.parse(vpToken.verifiableCredential[0]);
console.log('final VC from vp token', vc.verifiableCredential.credential);