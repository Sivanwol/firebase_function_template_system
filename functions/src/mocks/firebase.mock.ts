/* tslint:disable */
import * as EventEmitter from "eventemitter3";
import { FirebaseHandler } from "../common/firebase";
// import * as faker from 'faker';

const authEmitter = new EventEmitter();
let isSignIn = true;
const user = {
    displayName: "test name",
    email: "redirectTest@test.com",
    emailVerified: true,
    uid: "id123",
    providerData: [
        {
            email: "redirectTest@test.com",
            displayName: "redirectResultTestDisplayName",
            providerId: "google",
        },
    ],
};
// tslint:disable-next-line: one-variable-per-declaration
const mockFirebase: any = {
    initializeApp: jest.fn().mockReturnValue({
        auth: jest.fn().mockReturnValue({
            currentUser: isSignIn
                ? {
                        displayName: "redirectResultTestDisplayName",
                        email: "redirectTest@test.com",
                        emailVerified: true,
                        uid: "id123",
                        providerData: [
                            {
                                email: "redirectTest@test.com",
                                displayName: "redirectResultTestDisplayName",
                                providerId: "google",
                            },
                        ],
                        sendEmailVerification: jest.fn(),
                  }
                : null,
            signInWithRedirect: jest.fn(),
            getRedirectResult: jest.fn().mockReturnValue({
                credential: {
                    providerId: "Google",
                },
                user: {
                    getIdToken: jest.fn().mockResolvedValue("abc1234"),
                },
                additionalUserInfo: {
                    profile: {
                        email: "__tests__@__tests__.com",
                        name: "John Doe",
                    },
                },
            }),
            onAuthStateChanged: jest.fn(fn => {
                // sign user on start
                fn(user);
                // sign-out user on start
                authEmitter.on("sign-out", fn, undefined);
                authEmitter.on("sign-in", fn, user);
            }),
            signOut: jest.fn(() => {
                isSignIn = false;
                authEmitter.emit("sign-out");
            }),
            signInWithEmailAndPassword: jest.fn(() => {
                isSignIn = true;
                authEmitter.emit("sign-in", user);
                return Promise.resolve(true);
            }),
            sendPasswordResetEmail: jest.fn(() => Promise.resolve(true)),
            sendEmailVerification: jest.fn(() => Promise.resolve(true)),
            signInWithPopup: jest.fn(() => {
                isSignIn = true;
                authEmitter.emit("sign-in", user);
                return Promise.resolve(true);
            }),
        }),
        firestore: jest.fn().mockReturnValue({
            collection: jest.fn().mockReturnValue({
                doc: jest.fn().mockReturnValue({
                    add: jest.fn().mockResolvedValue({
                        id: "abc123",
                    }),
                    set: jest.fn().mockResolvedValue({
                        uid: "abc123",
                    }),
                }),
                add: async (entity: any) => {
                    return {
                        id: "abc123",
                        get: () => {
                            entity.id = "abc123";
                            return jest.fn().mockResolvedValue(entity);
                        },
                    };
                },
            }),
        }),
    }),
    auth: {
        GoogleAuthProvider: class {
            public addScope = jest.fn();
        },
        GithubAuthProvider: class {
            public addScope = jest.fn();
        },
        FacebookAuthProvider: class {
            public addScope = jest.fn();
        },
    },
};

jest.mock("firebase/app", () => mockFirebase);
FirebaseHandler.setupFirebaseTest(mockFirebase);
