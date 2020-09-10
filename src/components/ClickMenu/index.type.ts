export interface Props {
    style?: any;
    menus:Array<Menu>;
}

export interface Menu {
    context:string;
    click:(record:any) => void;
}

export interface ClickMenuInstance {
    handleContextMenu?:(event:any,record:any) => any;
    menus?:any
}