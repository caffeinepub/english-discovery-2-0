import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface WebsiteContent {
    contactInfo: string;
    heroText: string;
    introVideoLink: string;
    pricingContent: string;
    classesContent: string;
    schedule: string;
    aboutContent: string;
}
export interface Inquiry {
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface UserProfile {
    name: string;
    email: string;
}
export interface Photo {
    id: string;
    blob: ExternalBlob;
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addPhoto(id: string, name: string, blob: ExternalBlob): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearAllInquiries(): Promise<void>;
    countInquiries(): Promise<bigint>;
    deleteInquiry(timestamp: bigint): Promise<void>;
    deletePhoto(id: string): Promise<void>;
    getAllInquiries(): Promise<Array<Inquiry>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPhoto(id: string): Promise<Photo | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWebsiteContent(): Promise<WebsiteContent>;
    hasAdminPassword(): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    listPhotos(): Promise<Array<Photo>>;
    resetAdminPassword(): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setAdminPassword(password: string): Promise<void>;
    submitInquiry(name: string, email: string, message: string, timestamp: bigint): Promise<void>;
    updatePhoto(id: string, name: string, blob: ExternalBlob): Promise<void>;
    updateWebsiteContent(content: WebsiteContent): Promise<void>;
    verifyAdminPassword(password: string): Promise<boolean>;
}
