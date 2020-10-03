
import { ValidatedBase } from 'validated-base';
import { IsDate, IsString } from 'class-validator';
import { toDate } from 'simple-cached-firestore';
export interface IBaseModel {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface IBlankModel {
}

export class BlankModel extends ValidatedBase implements IBlankModel {
    constructor(params: IBlankModel) {
        super();
    }
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
