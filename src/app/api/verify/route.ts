import { verifyCredentials, verifyPresentation } from '@/app/libs/credential-verifier'
import { NextRequest, NextResponse } from 'next/server'

function detectVCorVP(payload: any) {
    if (!payload || typeof payload !== 'object') return "unknown";
    const type = payload.type;
    if (type.includes("VerifiablePresentation")) return "vp";
    else if (type.includes("VerifiableCredential")) return "vc";
    else return "unknown";
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        console.log('Received verification request:', body)

        let result;
        const type = detectVCorVP(body.data_received);
        if (type === "unknown") {
            return NextResponse.json(
                { isValid: false, errors: 'Unknown type of data received' },
                { status: 400 },
            )
        } else if (type === "vc") {
            result = await verifyCredentials({
                verifiableCredentials: [body.data_received],
            });
        } else if (type === "vp") {
            result = await verifyPresentation({
                verifiablePresentation: body.data_received,
            });
        }

        return NextResponse.json(result, { status: 200 })
    } catch (err: any) {
        console.error('Verification error:', err)
        return NextResponse.json(
            { isValid: false, errors: err.message || 'Unknown error' },
            { status: 400 },
        )
    }
}
