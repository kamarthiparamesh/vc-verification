export const mockData = {
    "passport_vc": {
        "@context": [
            "https://www.w3.org/2018/credentials/v1",
            "https://schema.affinidi.io/TPassportDataV1R1.jsonld"
        ],
        "id": "claimId:7a6093ab6ce51a92",
        "type": [
            "VerifiableCredential",
            "VerifiedIdentityDocument",
            "Passport"
        ],
        "holder": {
            "id": "did:key:zQ3shqeuTqstXCVKL4peLhxmmLTjYSyoeCoPasx3vK3PQPf6i"
        },
        "credentialSubject": {
            "verification": {
                "document": {
                    "passportNumber": "Y3359506",
                    "docType": "PASSPORT",
                    "country": "IN",
                    "state": null,
                    "issuanceDate": "2024-06-04",
                    "expiryDate": "2034-06-03"
                },
                "person": {
                    "firstName": "PARAMESH",
                    "lastName": "KAMARTHI",
                    "dateOfBirth": "1983-08-24",
                    "gender": "M",
                    "nationality": "IN",
                    "yearOfBirth": null,
                    "placeOfBirth": null
                }
            }
        },
        "credentialSchema": {
            "id": "https://schema.affinidi.io/TPassportDataV1R1.json",
            "type": "JsonSchemaValidator2018"
        },
        "issuanceDate": "2024-11-12T08:59:54.155Z",
        "issuer": "did:web:idv.affinidi.com",
        "proof": {
            "type": "EcdsaSecp256k1Signature2019",
            "created": "2024-11-12T08:59:55Z",
            "verificationMethod": "did:web:idv.affinidi.com#23e65bfe3fa9a04e711fff6622e912e8-a6634584145cfea8",
            "proofPurpose": "assertionMethod",
            "jws": "eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..dflR4FS1iAMZOams7sf_O70rncUMQKOOCbgwXciJ2aJnS_GACanLKUfYQ1Mm6Ba6PXgIPOMVRiljsx-SQYrP_g"
        }
    },
    "passport_vp": {
        "@context": [
            "https://www.w3.org/2018/credentials/v1"
        ],
        "type": [
            "VerifiablePresentation"
        ],
        "verifiableCredential": [
            {
                "@context": [
                    "https://www.w3.org/2018/credentials/v1",
                    "https://schema.affinidi.io/TPassportDataV1R1.jsonld"
                ],
                "id": "claimId:7a6093ab6ce51a92",
                "type": [
                    "VerifiableCredential",
                    "VerifiedIdentityDocument",
                    "Passport"
                ],
                "holder": {
                    "id": "did:key:zQ3shqeuTqstXCVKL4peLhxmmLTjYSyoeCoPasx3vK3PQPf6i"
                },
                "credentialSubject": {
                    "verification": {
                        "document": {
                            "passportNumber": "Y3359506",
                            "docType": "PASSPORT",
                            "country": "IN",
                            "state": null,
                            "issuanceDate": "2024-06-04",
                            "expiryDate": "2034-06-03"
                        },
                        "person": {
                            "firstName": "PARAMESH",
                            "lastName": "KAMARTHI",
                            "dateOfBirth": "1983-08-24",
                            "gender": "M",
                            "nationality": "IN",
                            "yearOfBirth": null,
                            "placeOfBirth": null
                        }
                    }
                },
                "credentialSchema": {
                    "id": "https://schema.affinidi.io/TPassportDataV1R1.json",
                    "type": "JsonSchemaValidator2018"
                },
                "issuanceDate": "2024-11-12T08:59:54.155Z",
                "issuer": "did:web:idv.affinidi.com",
                "proof": {
                    "type": "EcdsaSecp256k1Signature2019",
                    "created": "2024-11-12T08:59:55Z",
                    "verificationMethod": "did:web:idv.affinidi.com#23e65bfe3fa9a04e711fff6622e912e8-a6634584145cfea8",
                    "proofPurpose": "assertionMethod",
                    "jws": "eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..dflR4FS1iAMZOams7sf_O70rncUMQKOOCbgwXciJ2aJnS_GACanLKUfYQ1Mm6Ba6PXgIPOMVRiljsx-SQYrP_g"
                }
            }
        ],
        "holder": {
            "id": "did:key:zQ3shqeuTqstXCVKL4peLhxmmLTjYSyoeCoPasx3vK3PQPf6i"
        },
        "id": "claimId:Rhk1IIk8d9AWw1oy9KkLu",
        "proof": {
            "type": "EcdsaSecp256k1Signature2019",
            "created": "2025-06-11T19:08:35Z",
            "verificationMethod": "did:key:zQ3shqeuTqstXCVKL4peLhxmmLTjYSyoeCoPasx3vK3PQPf6i#zQ3shqeuTqstXCVKL4peLhxmmLTjYSyoeCoPasx3vK3PQPf6i",
            "proofPurpose": "authentication",
            "challenge": "88e102cf-0",
            "domain": "did:key:zQ3shYvNUXfUSGvgh7fTy2mExxMbBUJfNZLGTZVnD1heP22Cp",
            "jws": "eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..EBSXhJp6bPOboLYmAOHmOdvWkCOMp7wRkAWe1_JnKg5DTCWJiZ0HaHlcO0VeBk9ldSnAbumBkmkRxy5lKIch9w"
        }
    },
    "revocable_vc": {
        "credentialSchema": {
            "type": "EventTicketVC",
            "id": "https://schema.affinidi.io/TEventTicketVCV1R0.json"
        },
        "credentialSubject": {
            "createdAt": "2025-06-11T19:12:34.500Z",
            "attendeeAtrributes": {
                "firstName": "John",
                "lastName": "Doe",
                "dateOfBirth": "2010-10-17",
                "email": ""
            },
            "secrete": "2025-06-14T19:12:28.412Z",
            "event": {
                "name": "Ed Sheeran",
                "eventId": "1",
                "location": "Bengaluru, India",
                "endDate": "2025-06-08T22:00:00.000Z",
                "startDate": "2025-06-08T18:00:00.000Z"
            },
            "ticket": {
                "seat": "VVIP",
                "ticketId": "1",
                "ticketType": "Ed Sheeran"
            }
        },
        "issuanceDate": "2025-06-11T19:12:35.908Z",
        "holder": {
            "id": "did:key:zQ3shqeuTqstXCVKL4peLhxmmLTjYSyoeCoPasx3vK3PQPf6i"
        },
        "id": "claimId:2ec995c725855809",
        "type": [
            "VerifiableCredential",
            "EventTicketVC"
        ],
        "@context": [
            "https://www.w3.org/2018/credentials/v1",
            "https://schema.affinidi.io/TEventTicketVCV1R0.jsonld",
            "https://w3id.org/vc-revocation-list-2020/v1"
        ],
        "issuer": "did:key:zQ3shYvNUXfUSGvgh7fTy2mExxMbBUJfNZLGTZVnD1heP22Cp",
        "credentialStatus": {
            "id": "https://801a212a-90b1-4463-bfb3-5235181d477d.apse1.issuance.affinidi.io/status-list/2024-12-20|1ec83655-66dd-463c-9395-84e394db9e51#17",
            "type": "RevocationList2020Status",
            "revocationListIndex": "17",
            "revocationListCredential": "https://801a212a-90b1-4463-bfb3-5235181d477d.apse1.issuance.affinidi.io/status-list/2024-12-20|1ec83655-66dd-463c-9395-84e394db9e51"
        },
        "proof": {
            "type": "EcdsaSecp256k1Signature2019",
            "created": "2025-06-11T19:12:59Z",
            "verificationMethod": "did:key:zQ3shYvNUXfUSGvgh7fTy2mExxMbBUJfNZLGTZVnD1heP22Cp#zQ3shYvNUXfUSGvgh7fTy2mExxMbBUJfNZLGTZVnD1heP22Cp",
            "proofPurpose": "assertionMethod",
            "jws": "eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..Q1coa2Sls0bjELhUN4yk9h47uPM7vQR2-tXfn_r0ZKd1ofMK0C6mLrsBtKeQGrP4RE0bFgKf_legZEJVi41jfQ"
        }
    },
    "invalid_vc": {
        "@context": [
            "https://www.w3.org/2018/credentials/v1",
            "https://schema.affinidi.io/TPassportDataV1R1.jsonld"
        ],
        "id": "claimId:7a6093ab6ce51a92",
        "type": [
            "VerifiableCredential",
            "VerifiedIdentityDocument",
            "Passport"
        ],
        "holder": {
            "id": "did:key:zQ3shqeuTqstXCVKL4peLhxmmLTjYSyoeCoPasx3vK3PQPf6i"
        },
        "credentialSubject": {
            "verification": {
                "document": {
                    "state": null,
                    "issuanceDate": "2024-06-04",
                    "expiryDate": "2034-06-03"
                },
                "person": {
                    "firstName": "TAMPERED",
                    "lastName": "KAMARTHI",
                    "dateOfBirth": "1983-08-24",
                    "gender": "M",
                    "nationality": "IN",
                    "yearOfBirth": null,
                    "placeOfBirth": null
                }
            }
        },
        "credentialSchema": {
            "id": "https://schema.affinidi.io/TPassportDataV1R1.json",
            "type": "JsonSchemaValidator2018"
        },
        "issuanceDate": "2024-11-12T08:59:54.155Z",
        "issuer": "did:web:idv.affinidi.com",
        "proof": {
            "type": "EcdsaSecp256k1Signature2019",
            "created": "2024-11-12T08:59:55Z",
            "verificationMethod": "did:web:idv.affinidi.com#23e65bfe3fa9a04e711fff6622e912e8-a6634584145cfea8",
            "proofPurpose": "assertionMethod",
            "jws": "eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..dflR4FS1iAMZOams7sf_O70rncUMQKOOCbgwXciJ2aJnS_GACanLKUfYQ1Mm6Ba6PXgIPOMVRiljsx-SQYrP_g"
        }
    },
    "ooru_vc": {
        "@context": [
            "https://www.w3.org/2018/credentials/v1",
            {
                "recipientName": {
                    "@id": "schema-id:recipientName",
                    "@type": "https://schema.org/Text"
                },
                "programmeLine1": {
                    "@id": "schema-id:programmeLine1",
                    "@type": "https://schema.org/Text"
                },
                "programmeLine2": {
                    "@id": "schema-id:programmeLine2",
                    "@type": "https://schema.org/Text"
                },
                "descriptionLine3": {
                    "@id": "schema-id:descriptionLine3",
                    "@type": "https://schema.org/Text"
                },
                "descriptionLine4": {
                    "@id": "schema-id:descriptionLine4",
                    "@type": "https://schema.org/Text"
                },
                "recipientEmail": {
                    "@id": "schema-id:recipientEmail",
                    "@type": "https://schema.org/Text"
                },
                "recipientPhone": {
                    "@id": "schema-id:recipientPhone",
                    "@type": "https://schema.org/Text"
                },
                "rollNumber": {
                    "@id": "schema-id:rollNumber",
                    "@type": "https://schema.org/Text"
                }
            }
        ],
        "type": [
            "VerifiableCredential"
        ],
        "issuanceDate": "2025-06-13T11:22:21.302Z",
        "holder": {
            "id": "did:web:staging-did.credissuer.com:335d848f-1b03-48ea-bac5-0d075a3d7086"
        },
        "id": "cred:web:did.credissuer.com:eb3f1269-e506-424b-a254-d1cd02e6cf0b",
        "credentialSubject": {
            "id": "did:web:staging-did.credissuer.com:335d848f-1b03-48ea-bac5-0d075a3d7086",
            "recipientName": "John Doe",
            "programmeLine1": "Executive Post Graduate Programme in Data",
            "programmeLine2": "Science and Artificial Intelligence",
            "descriptionLine3": "on 30th June 2024",
            "descriptionLine4": "with specialization in Business Analytics",
            "recipientEmail": "example@gmail.com",
            "recipientPhone": "9999999999",
            "rollNumber": "2045678345",
            "type": "degreeCertificate15"
        },
        "issuer": "did:key:zQ3sheZGT2rqZ58hFsUfjCMrB96Kkd4cGk4Zu6j5EaL6MXzid",
        "proof": {
            "type": "EcdsaSecp256k1Signature2019",
            "created": "2025-06-13T11:22:21Z",
            "verificationMethod": "did:key:zQ3sheZGT2rqZ58hFsUfjCMrB96Kkd4cGk4Zu6j5EaL6MXzid#zQ3sheZGT2rqZ58hFsUfjCMrB96Kkd4cGk4Zu6j5EaL6MXzid",
            "proofPurpose": "assertionMethod",
            "jws": "eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..OH05WSZo_1qByvIydE9-PPfs2LLP5p_z-FgVIHNo71RpPc1dExWoWMYIUlpRrTZB5yZcHekYOYaypqiIKvQpzw"
        }
    }
}