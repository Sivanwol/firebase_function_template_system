export interface BaseEntityModel {
    id?: string;
    change_by_id?: string;
    update_at?: Date;
    create_at?: Date;
}
export interface BaseModel {
    id?: string;
}

export interface BaseListDataModel <T> {
    size: number;
    items: T[];
}