import { FILTER_OPERATORS } from "simple-cached-firestore";
import { SortDirection } from "./enums";

export default {
    collectionEntities: "entities",
    collectionEntityHours: "entity_hours",
    collectionsUsers: "users",
    collectionsRoles: "roles",
    collectionsPermissions: "permissions",
}

export interface QueryInterface {
    filters?: ListFilterInterface[];
    sort?: ListSortInterface;
    offset?: number;
    limit?: number;
    before?: DalModelValue;
    after?: DalModelValue;
}
export interface ListFilterInterface {
    property: string;
    operator: FILTER_OPERATORS;
    value: DalModelValue;
}

export interface ListSortInterface {
    property: string;
    direction: SortDirection;
}

export type DalModelValue = string | Date | number | null | boolean;