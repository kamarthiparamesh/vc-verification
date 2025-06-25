
export function detectVCorVP(payload: any) {
    if (!payload) return "unknown";

    if (Array.isArray(payload) && payload.some(item => item.type?.includes("VerifiableCredential"))) {
        return "vc";
    }

    if (typeof payload === 'object') {
        if (payload.type?.includes("VerifiablePresentation")) return "vp";
        else if (payload.type?.includes("VerifiableCredential")) return "vc";
    }

    return "unknown";
}