import React from  'react';

import {Form,InputNumber,Input} from "antd";

interface Item {
    key:string,
    name:string
}

interface CellPropertys extends React.HTMLAttributes<HTMLElement>{
    editing:boolean,
    dataIndex:string,
    title:string,
    inputType:'number' | 'text',
    record:Item,
    index:number,
    children:React.ReactNode
}

/**
 * 设置表格中的单元格，如果单元格中的editing属性为真时，表示单元格为编辑状态
 */
export default class Index extends React.Component<CellPropertys>{

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        } = this.props;
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
        return (
            <td {...restProps}>
                {
                    editing?
                        (
                            <Form.Item
                                name={dataIndex}
                                style={{
                                    margin: 0,
                                }}
                                rules={[
                                    {
                                        required: true,
                                        message: `Please Input ${title}!`,
                                    },
                                ]}
                            >
                                {inputNode}
                            </Form.Item>
                        ):
                        (children)
                }
            </td>
        );
    }

}