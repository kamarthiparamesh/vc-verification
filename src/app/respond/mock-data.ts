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
    },
    "ooru_vp": {
        "vp_token": "{\"verifiableCredential\":[\"{\\\"format\\\":\\\"ldp_vc\\\",\\\"identifier\\\":\\\"iiitb-ac:OpenId4VCI:cred:web:did.credissuer.com:48522182-c12e-469b-816d-640c281e393e\\\",\\\"generatedOn\\\":\\\"2025-06-18T10:33:32.598Z\\\",\\\"vcMetadata\\\":{\\\"idType\\\":\\\"\\\",\\\"requestId\\\":\\\"cred\\\",\\\"isPinned\\\":false,\\\"id\\\":\\\"cred + '_' + iiitb-ac\\\",\\\"issuer\\\":\\\"iiitb-ac\\\",\\\"protocol\\\":\\\"OpenId4VCI\\\",\\\"timestamp\\\":\\\"\\\",\\\"isVerified\\\":true,\\\"displayId\\\":\\\"603C6F4979A8\\\",\\\"format\\\":\\\"ldp_vc\\\",\\\"downloadKeyType\\\":\\\"RS256\\\"},\\\"verifiableCredential\\\":{\\\"credential\\\":{\\\"@context\\\":[\\\"https://www.w3.org/2018/credentials/v1\\\",{\\\"rollNumber\\\":{\\\"@id\\\":\\\"schema-id:rollNumber\\\",\\\"@type\\\":\\\"https://schema.org/Text\\\"},\\\"recipientName\\\":{\\\"@id\\\":\\\"schema-id:recipientName\\\",\\\"@type\\\":\\\"https://schema.org/Text\\\"},\\\"programmeLine1\\\":{\\\"@id\\\":\\\"schema-id:programmeLine1\\\",\\\"@type\\\":\\\"https://schema.org/Text\\\"},\\\"programmeLine2\\\":{\\\"@id\\\":\\\"schema-id:programmeLine2\\\",\\\"@type\\\":\\\"https://schema.org/Text\\\"},\\\"recipientEmail\\\":{\\\"@id\\\":\\\"schema-id:recipientEmail\\\",\\\"@type\\\":\\\"https://schema.org/Text\\\"},\\\"recipientPhone\\\":{\\\"@id\\\":\\\"schema-id:recipientPhone\\\",\\\"@type\\\":\\\"https://schema.org/Text\\\"},\\\"descriptionLine3\\\":{\\\"@id\\\":\\\"schema-id:descriptionLine3\\\",\\\"@type\\\":\\\"https://schema.org/Text\\\"},\\\"descriptionLine4\\\":{\\\"@id\\\":\\\"schema-id:descriptionLine4\\\",\\\"@type\\\":\\\"https://schema.org/Text\\\"}}],\\\"credentialSubject\\\":{\\\"id\\\":\\\"did:web:staging-did.credissuer.com:335d848f-1b03-48ea-bac5-0d075a3d7086\\\",\\\"type\\\":\\\"degreeCertificate15\\\",\\\"rollNumber\\\":\\\"2045678345\\\",\\\"recipientName\\\":\\\"John Doe\\\",\\\"programmeLine1\\\":\\\"Executive Post Graduate Programme in Data\\\",\\\"programmeLine2\\\":\\\"Science and Artificial Intelligence\\\",\\\"recipientEmail\\\":\\\"example@gmail.com\\\",\\\"recipientPhone\\\":\\\"9999999999\\\",\\\"descriptionLine3\\\":\\\"on 30th June 2024\\\",\\\"descriptionLine4\\\":\\\"with specialization in Business Analytics\\\",\\\"fullName\\\":\\\"John Doe\\\",\\\"credential_id\\\":\\\"603C6F4979A8\\\",\\\"public_verify_url\\\":\\\"http://127.0.0.1:8000/credentials/verify/3feb5ba75bd54610d219535b97bc272ccbf7fdbfbf483effb558b72530a7ca14\\\",\\\"email\\\":\\\"example@gmail.com\\\",\\\"qr_code\\\":\\\"https://staging-cdn.credissuer.com/media/vc_presentation_files/603C6F4979A8/qr_presentation_603C6F4979A8.png?Expires=1750329212&Signature=q8jgqtRirLQLzL2mr0O8sau087S9qvBSwuoxIt~tC1jlWcVIz9394A~JsAt1pnrf3JRI7uIQoju5BeDTISDQ7BYbNUGeUUg2pBwQxeHA5F67Sv~1ROI85dD6Z5vm0wGHjjLSjuRrAmuzxZGb526HCL8ZWrh69ngMF7ncLDnvMqiutKX0ZEu9dVVSaqJnk0XTXUfoqqhHs0aJPywxRi1oYEVUzT45DyDdXcFB9D5U3ZovdKXtooBcRU3JkXQE3XSJXRyNHZ31M0sDMPYYO1rXktrITFVtydacwnuipcCzyHkb4-EXshUynaMiMVuSfb7qOGB1PwymXBUD1WEcwJO2UQ__&Key-Pair-Id=K2D5CDWBLG6LIC\\\"},\\\"id\\\":\\\"cred:web:did.credissuer.com:48522182-c12e-469b-816d-640c281e393e\\\",\\\"issuanceDate\\\":\\\"2025-06-13T11:36:29.792Z\\\",\\\"issuer\\\":\\\"did:key:zQ3sheZGT2rqZ58hFsUfjCMrB96Kkd4cGk4Zu6j5EaL6MXzid\\\",\\\"proof\\\":{\\\"created\\\":\\\"2025-06-13T11:36:29Z\\\",\\\"jws\\\":\\\"eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..JluZz1ZwFNZnRHP7az2LE62vZl4YFgjKeFXoMSz7PiZdwvGLunhvBxQ2sGDt1CPmwTeuTWJ5M8WKGxbG5Zr5XQ\\\",\\\"proofPurpose\\\":\\\"assertionMethod\\\",\\\"type\\\":\\\"EcdsaSecp256k1Signature2019\\\",\\\"verificationMethod\\\":\\\"did:key:zQ3sheZGT2rqZ58hFsUfjCMrB96Kkd4cGk4Zu6j5EaL6MXzid#zQ3sheZGT2rqZ58hFsUfjCMrB96Kkd4cGk4Zu6j5EaL6MXzid\\\"},\\\"type\\\":[\\\"VerifiableCredential\\\"]},\\\"wellKnown\\\":\\\"https://credissuer-public-assets.s3.ap-south-1.amazonaws.com/wellknown_endpoints/STAGING/iiitb-ac.json\\\",\\\"credentialConfigurationId\\\":\\\"degreeCertificate\\\",\\\"issuerLogo\\\":{\\\"url\\\":\\\"https://credissuer-public-assets.s3.ap-south-1.amazonaws.com/issuer-assets/7a9b1b9dd2e433fc.png\\\",\\\"alt_text\\\":\\\"IIIT Bangalore Logo\\\"}}}\"],\"id\":\"7a89e130-1536-4efb-b8b4-a7a651d5826c\",\"holder\":\"\",\"proof\":{\"type\":\"RsaSignature2018\",\"created\":\"2025-06-23T18:26:24Z\",\"challenge\":\"p8jqYFPpQT8YlPhJ64Uqgw\",\"domain\":\"OpenID4VP\",\"jws\":\"eyJhbGciOiJSUzI1NiIsImp3ayI6eyJrdHkiOiJSU0EiLCJraWQiOiJnSW94TXZSZlJTaXZGOU5LOFIxemtNc296VW9OS0VZVldCb0U2NFo3TjljIiwibiI6Inl0Z21YakR5QTZKZDc4RUlIMm9BY29QN0xITmEwZURTZWJaOXdTNGFXVlJnRkYtMU5NQklMQU5xS2FMWEdKWldGNDg1amFvYjM0SFVpOEdFT2FFejJEOXBIaE93cXBxREp6ZXhycnlLZ2Y1cVk1amdHSVR5UkdGekdWa0dJcDd3UzdDV3JLZFJsUmdTQzBkcTVKU0NpY1lRSHZUcVMwQ0ZrY2M4RGFZUVpTZjBoV2daU0Ftd3JLMlhZVlVwd2RsNlBOa01jekRRX0UxRUpjaWptcWlqTG5paTNuajRKd2VCcUFSQW9KcFVISUxpRFNsbFVKckpKTlJkLVZhU2lPWFpyTm44d2dDa1JjRmNoWW9PT3ltTmVrRkRqZnFwbGVPZXgtdzBDeTFadEFRSHBSaDM4YUhiQm9Ud2x2Y2ZBRDFVTzkwbGtJUW1BU3N4ZHB3R3BZUmZkdyIsImUiOiJBUUFCIiwiYWxnIjoiUlMyNTYiLCJ1c2UiOiJzaWcifX0.eyJ2ZXJpZmlhYmxlQ3JlZGVudGlhbCI6WyJ7XCJmb3JtYXRcIjpcImxkcF92Y1wiLFwiaWRlbnRpZmllclwiOlwiaWlpdGItYWM6T3BlbklkNFZDSTpjcmVkOndlYjpkaWQuY3JlZGlzc3Vlci5jb206NDg1MjIxODItYzEyZS00NjliLTgxNmQtNjQwYzI4MWUzOTNlXCIsXCJnZW5lcmF0ZWRPblwiOlwiMjAyNS0wNi0xOFQxMDozMzozMi41OThaXCIsXCJ2Y01ldGFkYXRhXCI6e1wiaWRUeXBlXCI6XCJcIixcInJlcXVlc3RJZFwiOlwiY3JlZFwiLFwiaXNQaW5uZWRcIjpmYWxzZSxcImlkXCI6XCJjcmVkICsgJ18nICsgaWlpdGItYWNcIixcImlzc3VlclwiOlwiaWlpdGItYWNcIixcInByb3RvY29sXCI6XCJPcGVuSWQ0VkNJXCIsXCJ0aW1lc3RhbXBcIjpcIlwiLFwiaXNWZXJpZmllZFwiOnRydWUsXCJkaXNwbGF5SWRcIjpcIjYwM0M2RjQ5NzlBOFwiLFwiZm9ybWF0XCI6XCJsZHBfdmNcIixcImRvd25sb2FkS2V5VHlwZVwiOlwiUlMyNTZcIn0sXCJ2ZXJpZmlhYmxlQ3JlZGVudGlhbFwiOntcImNyZWRlbnRpYWxcIjp7XCJAY29udGV4dFwiOltcImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxXCIse1wicm9sbE51bWJlclwiOntcIkBpZFwiOlwic2NoZW1hLWlkOnJvbGxOdW1iZXJcIixcIkB0eXBlXCI6XCJodHRwczovL3NjaGVtYS5vcmcvVGV4dFwifSxcInJlY2lwaWVudE5hbWVcIjp7XCJAaWRcIjpcInNjaGVtYS1pZDpyZWNpcGllbnROYW1lXCIsXCJAdHlwZVwiOlwiaHR0cHM6Ly9zY2hlbWEub3JnL1RleHRcIn0sXCJwcm9ncmFtbWVMaW5lMVwiOntcIkBpZFwiOlwic2NoZW1hLWlkOnByb2dyYW1tZUxpbmUxXCIsXCJAdHlwZVwiOlwiaHR0cHM6Ly9zY2hlbWEub3JnL1RleHRcIn0sXCJwcm9ncmFtbWVMaW5lMlwiOntcIkBpZFwiOlwic2NoZW1hLWlkOnByb2dyYW1tZUxpbmUyXCIsXCJAdHlwZVwiOlwiaHR0cHM6Ly9zY2hlbWEub3JnL1RleHRcIn0sXCJyZWNpcGllbnRFbWFpbFwiOntcIkBpZFwiOlwic2NoZW1hLWlkOnJlY2lwaWVudEVtYWlsXCIsXCJAdHlwZVwiOlwiaHR0cHM6Ly9zY2hlbWEub3JnL1RleHRcIn0sXCJyZWNpcGllbnRQaG9uZVwiOntcIkBpZFwiOlwic2NoZW1hLWlkOnJlY2lwaWVudFBob25lXCIsXCJAdHlwZVwiOlwiaHR0cHM6Ly9zY2hlbWEub3JnL1RleHRcIn0sXCJkZXNjcmlwdGlvbkxpbmUzXCI6e1wiQGlkXCI6XCJzY2hlbWEtaWQ6ZGVzY3JpcHRpb25MaW5lM1wiLFwiQHR5cGVcIjpcImh0dHBzOi8vc2NoZW1hLm9yZy9UZXh0XCJ9LFwiZGVzY3JpcHRpb25MaW5lNFwiOntcIkBpZFwiOlwic2NoZW1hLWlkOmRlc2NyaXB0aW9uTGluZTRcIixcIkB0eXBlXCI6XCJodHRwczovL3NjaGVtYS5vcmcvVGV4dFwifX1dLFwiY3JlZGVudGlhbFN1YmplY3RcIjp7XCJpZFwiOlwiZGlkOndlYjpzdGFnaW5nLWRpZC5jcmVkaXNzdWVyLmNvbTozMzVkODQ4Zi0xYjAzLTQ4ZWEtYmFjNS0wZDA3NWEzZDcwODZcIixcInR5cGVcIjpcImRlZ3JlZUNlcnRpZmljYXRlMTVcIixcInJvbGxOdW1iZXJcIjpcIjIwNDU2NzgzNDVcIixcInJlY2lwaWVudE5hbWVcIjpcIkpvaG4gRG9lXCIsXCJwcm9ncmFtbWVMaW5lMVwiOlwiRXhlY3V0aXZlIFBvc3QgR3JhZHVhdGUgUHJvZ3JhbW1lIGluIERhdGFcIixcInByb2dyYW1tZUxpbmUyXCI6XCJTY2llbmNlIGFuZCBBcnRpZmljaWFsIEludGVsbGlnZW5jZVwiLFwicmVjaXBpZW50RW1haWxcIjpcImV4YW1wbGVAZ21haWwuY29tXCIsXCJyZWNpcGllbnRQaG9uZVwiOlwiOTk5OTk5OTk5OVwiLFwiZGVzY3JpcHRpb25MaW5lM1wiOlwib24gMzB0aCBKdW5lIDIwMjRcIixcImRlc2NyaXB0aW9uTGluZTRcIjpcIndpdGggc3BlY2lhbGl6YXRpb24gaW4gQnVzaW5lc3MgQW5hbHl0aWNzXCIsXCJmdWxsTmFtZVwiOlwiSm9obiBEb2VcIixcImNyZWRlbnRpYWxfaWRcIjpcIjYwM0M2RjQ5NzlBOFwiLFwicHVibGljX3ZlcmlmeV91cmxcIjpcImh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9jcmVkZW50aWFscy92ZXJpZnkvM2ZlYjViYTc1YmQ1NDYxMGQyMTk1MzViOTdiYzI3MmNjYmY3ZmRiZmJmNDgzZWZmYjU1OGI3MjUzMGE3Y2ExNFwiLFwiZW1haWxcIjpcImV4YW1wbGVAZ21haWwuY29tXCIsXCJxcl9jb2RlXCI6XCJodHRwczovL3N0YWdpbmctY2RuLmNyZWRpc3N1ZXIuY29tL21lZGlhL3ZjX3ByZXNlbnRhdGlvbl9maWxlcy82MDNDNkY0OTc5QTgvcXJfcHJlc2VudGF0aW9uXzYwM0M2RjQ5NzlBOC5wbmc_RXhwaXJlcz0xNzUwMzI5MjEyJlNpZ25hdHVyZT1xOGpncXRSaXJMUUx6TDJtcjBPOHNhdTA4N1M5cXZCU3d1b3hJdH50QzFqbFdjVkl6OTM5NEF-SnNBdDFwbnJmM0pSSTd1SVFvanU1QmVEVElTRFE3QlliTlVHZVVVZzJwQndReGVIQTVGNjdTdn4xUk9JODVkRDZaNXZtMHdHSGpqTFNqdVJyQW11enhaR2I1MjZIQ0w4WldyaDY5bmdNRjduY0xEbnZNcWl1dEtYMFpFdTlkVlZTYXFKbmswWFRYVWZvcXFoSHMwYUpQeXd4Umkxb1lFVlV6VDQ1RHlEZFhjRkI5RDVVM1pvdmRLWHRvb0JjUlUzSmtYUUUzWFNKWFJ5TkhaMzFNMHNETVBZWU8xclhrdHJJVEZWdHlkYWN3bnVpcGNDenlIa2I0LUVYc2hVeW5hTWlNVnVTZmI3cU9HQjFQd3ltWEJVRDFXRWN3Sk8yVVFfXyZLZXktUGFpci1JZD1LMkQ1Q0RXQkxHNkxJQ1wifSxcImlkXCI6XCJjcmVkOndlYjpkaWQuY3JlZGlzc3Vlci5jb206NDg1MjIxODItYzEyZS00NjliLTgxNmQtNjQwYzI4MWUzOTNlXCIsXCJpc3N1YW5jZURhdGVcIjpcIjIwMjUtMDYtMTNUMTE6MzY6MjkuNzkyWlwiLFwiaXNzdWVyXCI6XCJkaWQ6a2V5OnpRM3NoZVpHVDJycVo1OGhGc1VmakNNckI5NktrZDRjR2s0WnU2ajVFYUw2TVh6aWRcIixcInByb29mXCI6e1wiY3JlYXRlZFwiOlwiMjAyNS0wNi0xM1QxMTozNjoyOVpcIixcImp3c1wiOlwiZXlKaGJHY2lPaUpGVXpJMU5rc2lMQ0ppTmpRaU9tWmhiSE5sTENKamNtbDBJanBiSW1JMk5DSmRmUS4uSmx1WnoxWndGTlpuUkhQN2F6MkxFNjJ2Wmw0WUZnaktlRlhvTVN6N1BpWmR3dkdMdW5odkJ4UTJzR0R0MUNQbXdUZXVUV0o1TThXS0d4Ykc1WnI1WFFcIixcInByb29mUHVycG9zZVwiOlwiYXNzZXJ0aW9uTWV0aG9kXCIsXCJ0eXBlXCI6XCJFY2RzYVNlY3AyNTZrMVNpZ25hdHVyZTIwMTlcIixcInZlcmlmaWNhdGlvbk1ldGhvZFwiOlwiZGlkOmtleTp6UTNzaGVaR1QycnFaNThoRnNVZmpDTXJCOTZLa2Q0Y0drNFp1Nmo1RWFMNk1YemlkI3pRM3NoZVpHVDJycVo1OGhGc1VmakNNckI5NktrZDRjR2s0WnU2ajVFYUw2TVh6aWRcIn0sXCJ0eXBlXCI6W1wiVmVyaWZpYWJsZUNyZWRlbnRpYWxcIl19LFwid2VsbEtub3duXCI6XCJodHRwczovL2NyZWRpc3N1ZXItcHVibGljLWFzc2V0cy5zMy5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb20vd2VsbGtub3duX2VuZHBvaW50cy9TVEFHSU5HL2lpaXRiLWFjLmpzb25cIixcImNyZWRlbnRpYWxDb25maWd1cmF0aW9uSWRcIjpcImRlZ3JlZUNlcnRpZmljYXRlXCIsXCJpc3N1ZXJMb2dvXCI6e1widXJsXCI6XCJodHRwczovL2NyZWRpc3N1ZXItcHVibGljLWFzc2V0cy5zMy5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb20vaXNzdWVyLWFzc2V0cy83YTliMWI5ZGQyZTQzM2ZjLnBuZ1wiLFwiYWx0X3RleHRcIjpcIklJSVQgQmFuZ2Fsb3JlIExvZ29cIn19fSJdLCJpZCI6IjdhODllMTMwLTE1MzYtNGVmYi1iOGI0LWE3YTY1MWQ1ODI2YyIsImhvbGRlciI6IiJ9.TequZbo9MY8bDJqQbWCdLMPuFgX66I7Zz5FxChG7h-YUU0KO3ZIZp7_kdjED8TSswR-4AvoN3YHv\\nwXmXjQZZS2FqkaDpNbTDdoxsL3cR53kBdOq7t4OdDoD2ek6W43ZMoeyrpqx3EZcdEdeBY0bLU7CQ\\n0K_44CJxedbp9wfVgoVDVY7k23tnpzbnoYL9FxSq95s6y6GGlLYIqZIJRIF0xa7GGdeBdzTkKfDC\\n2zFera9UdB0QBwCsX-qg-sju_EsTCj32w_h0F0Q3jKz-UioxXFix5KfglJYcZv1JYG1hyqjwxkfG\\nJHEk54-2_ZcbHWZKzfBZ43LHR8elnGhArsn2pQ==\\n\",\"verificationMethod\":\"-----BEGIN PUBLIC KEY-----\\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAytgmXjDyA6Jd78EIH2oA\\ncoP7LHNa0eDSebZ9wS4aWVRgFF+1NMBILANqKaLXGJZWF485jaob34HUi8GEOaEz\\n2D9pHhOwqpqDJzexrryKgf5qY5jgGITyRGFzGVkGIp7wS7CWrKdRlRgSC0dq5JSC\\nicYQHvTqS0CFkcc8DaYQZSf0hWgZSAmwrK2XYVUpwdl6PNkMczDQ/E1EJcijmqij\\nLnii3nj4JweBqARAoJpUHILiDSllUJrJJNRd+VaSiOXZrNn8wgCkRcFchYoOOymN\\nekFDjfqpleOex+w0Cy1ZtAQHpRh38aHbBoTwlvcfAD1UO90lkIQmASsxdpwGpYRf\\ndwIDAQAB\\n-----END PUBLIC KEY-----\\n\"}}",
        "presentation_submission": "{\"id\":\"47c6090c-9be6-4986-98d5-da55015d79c4\",\"definition_id\":\"vp token example\",\"descriptor_map\":[{\"id\":\"id card credential\",\"format\":\"ldp_vp\",\"path\":\"$.verifiableCredential[0]\"}]}",
        "state": "zP5cipCAOSEJQq7v5iznRw"
    }
}