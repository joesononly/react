export interface Item {
    id:string,
    name:string,
    comment:string,
    changed:number,
    locked:boolean,
    lockedBy:string,
    lockedTime:string
}

export type Ajax = {
    url:string,
    method:string,
}

export type Operation = {
    save?:Ajax,
    delete?:Ajax,
    update?:Ajax,
    select?:Ajax,
}

export type RowEvent = {
    onClick:() => any;
    newRow:(newRecord:any) => any;
}

export interface Props<T extends any> {
    columns: Array<any>,
    rows: Array<T>,
    operation?: Operation,
    title:string,
    onRow?: (record: any) => RowEvent,
}

export interface State {
    menuDisable:boolean;
    childMenuDisplay:string;
    editKey:string;
    columns:Array<any>;
    newRecordVisible:boolean;
}