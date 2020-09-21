
import { ValidatedBase } from 'validated-base';
import { IsDate, IsString, MaxLength } from 'class-validator';
import { FILTER_OPERATORS, toDate } from 'simple-cached-firestore';
import { SortDirection } from './enums';
export interface IBaseModel {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export class BaseModel extends ValidatedBase implements IBaseModel {
    @IsString()
    public id: string;

    @IsDate()
    public createdAt: Date;

    @IsDate()
    public updatedAt: Date;
    constructor(params: IBaseModel) {
        super();
        this.id = params.id;
        // This toDate() is necessary to convert either ISO strings or Firebase Timestamps to Date objects
        this.createdAt = toDate(params.createdAt);
        this.updatedAt = toDate(params.updatedAt);
    }
}

export interface BaseListDataModel<T> {
    size: number;
    items: T[];
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