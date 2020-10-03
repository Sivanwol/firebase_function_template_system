export enum DayOfWeek {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
}
export enum GenderEnum {
    Male,
    Female,
    Unknown,
}
export enum AssetType {
    Video,
    Image,
    Audio,
    Icon,
}
export enum EntityVisibility {
    Public,
    Hidden,
}
export enum EntityType {
    Shop,
    Restaurant,
}
export enum EntityStatus {
    Draft,
    Published,
    Frozen,
}
// TODO need see how much this been used
export enum HttpStatusCode {
    NotAuthorization = 403,
    NotFound = 404,
    Error = 500,
    Success = 200,
}

export enum SortDirection {
    ASC,
    DESC,
}

export enum UserAction {
    Register,
    UpdateACL,
    RemoveUser,
}
