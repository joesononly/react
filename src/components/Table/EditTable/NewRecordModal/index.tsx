import React from "react";
import {Button, Col, Drawer, Form, Input, Row} from "antd";
import {FormInstance} from "antd/lib/form";

/**自定义组件*/
import LOVSelect from "@/components/LOVSelect";

/***
 * 新建弹窗
 */
export default class Index extends React.Component<any, any>{

    state = {columns:[],visible:false};

    /**新建数据表单*/
    formRef = React.createRef<FormInstance>();

    componentWillMount() {
        const {columns} = this.props;
        this.setState({columns});
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    /**关闭弹窗*/
    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    /**验证数据，调用后台请求进行保存*/
    onSave = async () =>{
        if(this.formRef.current != null){
            const record:any = await this.formRef.current.validateFields();
            debugger;
            console.log(record.name);
            /**调用父组件传入的保存逻辑*/
            this.props.save(record);
        }
        this.onClose();
    }

    /***
     * 渲染行
     */
    renderRows = () =>{
        /**初始化行数组*/
        let rowsColumnsElements = [];
        const elementArray = [];
        const columnsElements = this.renderColumns();
        const length = columnsElements.length;
        for(let i = 0;i<length;i++){
            const index = (i+1) % 2;
            /**每两列渲染一行*/
            if(index !== 0 && i !== 0){
                elementArray.push(this.renderRow(rowsColumnsElements));
                rowsColumnsElements = [];
            }
            rowsColumnsElements.push(columnsElements[i]);
        }
        debugger;
        /**循环过后判断列数组是否有值，如果有，需要再渲染一次行*/
        if(rowsColumnsElements.length > 0){
            elementArray.push(this.renderRow(rowsColumnsElements));
        }
        return elementArray;
    }

    /**
     * 渲染单行
     * @param rowsColumnsElements
     */
    renderRow = (rowsColumnsElements:Array<any>) =>{
        return (
            <Row gutter={16}>
                {rowsColumnsElements.map(item => {return item})}
            </Row>
        )
    }

    /***
     * 将所有字段转成元素
     */
    renderColumns = () =>{
        debugger;
        const {columns} = this.state;
        const columnsElements = [];
        for(const column of columns){
            /**将单个字段转换成表单中的单元格存储到数组中*/
            columnsElements.push(this.renderColumn(column));
        }
        return columnsElements;
    }

    /***
     * 渲染单个单元格
     * @param column
     */
    renderColumn = (column:any) =>{
        return (
            <Col span={12}>
                <Form.Item
                    name={column.dataIndex}
                    label={column.title}
                    rules={[{required: false, message: '请输入:'+column.title}]}
                >
                    {this.renderColumnElement(column)}
                </Form.Item>
            </Col>
        );
    }

    /**
     * 根据列表类型决定输入元素
     * */
    renderColumnElement = (column:any) =>{
        switch (column.elType){
            case 'input':
                return <Input placeholder={'请输入'+column.title}/>;
            case 'select':
                return <LOVSelect type={column.lov} placeholder={'请选择'+column.title}/>;
            default:
                return <Input placeholder={'请输入'+column.title}/>;
        }
    }

    render() {
        return (
            <Drawer
                title="新建表"
                width={720}
                onClose={this.onClose}
                visible={this.state.visible}
                bodyStyle={{paddingBottom: 80}}
                footer={
                    <div style={{textAlign: 'right',}}>
                        <Button onClick={this.onClose} style={{marginRight: 8}}>
                            取消
                        </Button>
                        <Button onClick={this.onSave} type="primary">
                            提交
                        </Button>
                    </div>
                }
            >
                <Form layout="vertical" ref={this.formRef} hideRequiredMark>
                    {/*渲染行与列*/}
                    {this.renderRows().map(item => {
                        console.log(item);
                        return item;
                    })}
                </Form>
            </Drawer>
        );
    }
}