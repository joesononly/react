import React from 'react';
import {Button, Col, Drawer, Form, Input, PageHeader, Row, Table} from "antd";
import {Resizable } from 'react-resizable';

import EditCell from './EditCell';
import NewRecordModal from './NewRecordModal'
import {FormInstance} from "antd/lib/form";
import {Item, Props,State,Operation,Ajax} from "./index.type"
import ClickMenu from '@/components/ClickMenu';
import {ClickMenuInstance} from "@/components/ClickMenu/index.type";


import "./index.less";
import {PlusOutlined} from "@ant-design/icons";

export default class EditTable<T extends Item> extends React.Component<Props<T>,State>{
    /**获取表单引用用于操作表单，同时由于TypeScript是强引用类型语言，
     * 因此需要调用createRef获取引用时传入一个泛型，声明引用类型*/
    formRef = React.createRef<FormInstance>();
    /**使用React.createRef声明引用类型，该方法会返回一个RefObject方法对象，
     * 对象中有个T泛型类型的current对象，该对象为组件引用*/
    contextMenuRef:React.RefObject<any> = React.createRef<ClickMenuInstance>();
    /**初始化state数据*/
    //state = {menuDisable:true,childMenuDisplay:'none',editKey:"",columns:[]}
    /**新建弹窗引用*/
    newRecordModalRef = React.createRef<NewRecordModal>();

    /**设置属性的默认值*/
    static defaultProps = {
        columns:[
            {
                title: '表名',
                dataIndex: 'name',
                width: 100,
                editable: true,
                type:'string',
            },
            {
                title: '是否被修改',
                dataIndex: 'changed',
                width:100,
                editable: true,
                type:'string',
            },
            {
                title: '是否被锁定',
                dataIndex: 'locked',
                width:100,
                editable: true,
                type:'string',
            },
            {
                title: '锁定人',
                dataIndex: 'lockedBy',
                width:100,
                editable: true,
                type:'string',
            },
            {
                title: '锁定时间',
                dataIndex: 'lockedTime',
                width:100,
                editable: true,
                type:'string',
            },
            {
                title:"备注",
                dataIndex:"comment",
                width:100,
                editable: true,
                type:'string',
            }],
        rows:[]
    }

    constructor(props:any){
        super(props);
    }

    /***
     * 组件进入render函数渲染器调用
     */
    componentWillMount() {
        console.log('Component WILL MOUNT!');
        const {columns} = this.props;
        /**将列信息保存到state中用于可伸缩列的实现*/
        this.setState({columns:columns})
    }

    /***
     * Props/State每次更新都会调用
     * @param nextProps
     * @param nextState
     */
    componentWillUpdate(nextProps:Props<T>, nextState:State) {
        console.log('Component WILL UPDATE!');
    }

    /**
     * 判断当前行的key字段是否与editKey值相同，如果相同返回True，表示该行处于编辑中
     * @param record
     */
    isEditing = (record:T) => {
        const {editKey} = this.state;
        return record.id === editKey;
    }


    /***
     * 右键回调事件
     * @param event
     */
    onContextMenu = (event:any) => {
        this.setState({menuDisable:true,childMenuDisplay:'block'})
    }

    /**
     * 点击回调事件，将editKey清空，取消所有行的编辑事件
     * @param event
     */
    onClick = (event:any,record:any) =>{
        
        const {editKey} = this.state;
        if(record.id !== editKey){
            this.setState({editKey:"",menuDisable:false,childMenuDisplay:'none'});
            const onRow = this.props.onRow;
            if(onRow != null){
                onRow(record).onClick();
            }

        }

    }

    /***
     * 设置行编辑，以及向表单填充信息
     * @param record
     */
    setFormValue = (record:any) =>{
        if(this.formRef.current != null){
            /**
             * ...record表示展开赋值，将record中存在的变量赋值到新的对象中
             * 如 var t = {a:1,b:2,c:3}
             *    var t1 = {d:4,...t}
             *    var t1 = {a:1,b:2,c:3,d:4}
             * */
            this.formRef.current.setFieldsValue({...record});
        }

        this.setState({editKey:record.id})
    }

    /***
     * 使用react-resizable实现表格表头托拽，将setResizableTitle设置到Table中的Components属性中
     * components:{
     *      header:{
     *          cell:this.setResizableTitle
     *      }
     * }
     */
    setResizableTitle = (props:any) =>{
        const { onResize, width, ...restProps } = props;
        if (!width) {
            return <th {...restProps} />;
        }

        return (
            <Resizable
                width={width}
                height={0}
                handle={
                    <span
                        className="react-resizable-handle"
                        onClick={e => {
                            e.stopPropagation();
                        }}
                    />
                }
                onResize={onResize}
                draggableOpts={{ enableUserSelectHack: false }}
            >
                <th {...restProps} />
            </Resizable>
        );
    }

    /***
     * 表格的处理函数，返回一个鼠标的移动回调函数，用于处理鼠标移动事件，
     * 并且根据传入的移动位置，更新列单元格的width属性
     * @param index
     */
    handleResize = (index:number) => {
        return ((e:any,columnNode:any) =>{
            const {size} = columnNode;
            const {columns} = this.state;
            const nextColumns = [...columns];
            nextColumns[index] = {
                ...nextColumns[index],
                width:size.width
            };
            this.setState({columns:nextColumns});
        });
    };

    /**
     * 新建按钮的点击事件
     */
    onNewRecordClick = () =>{
        /**触发父组件传递的点击事件*/
        /*const onRow = this.props.onRow;
        if(onRow != null){
            onRow(null).newRow();
        }*/
        if(this.newRecordModalRef.current != null)
            this.newRecordModalRef.current.showDrawer();
    }

    /**
     * 调用父组件传入的保存逻辑，并用async进行声明同步
     * @param newReocrd
     */
    onSave = async (newReocrd:any) =>{
        
        /**获取父组件配置的数据对象*/
        const onRow = this.props.onRow;
        if(onRow != null){
            onRow(null).newRow(newReocrd);
        }
    }

    /***
     * 解析传入的字段数组，构建新建弹窗
     */
    initModelByColumns = () =>{
        const {columns} = this.props;
        /**将type转换成可以渲染的类型*/
        const renderColumns =  columns.map(column =>{column.type = this.initModelItemType(column)});
    }

    /**
     * 根据传入的字段信息，解析字段渲染类型
     * @param column
     */
    initModelItemType = (column:any) =>{
        switch (column.type){
            case 'string':
                return <Input/>;
            default:
                return <Input/>;
        }
    }

    /**
     * 返回当前页面的字段信息
     */
    loadColumn = () =>{
        const {columns} = this.state;
        return columns;
    }

    /***
     * 返回行信息
     */
    loadRows = () =>{
        const {rows} = this.props;
        console.log(rows);
        return rows;
    }

    /***
     * 渲染右键菜单，通过menus属性传递菜单项，以及实现菜单的点击事件
     */
    renderChildMenu = () =>{
        return (
            <ClickMenu
                ref={this.contextMenuRef}
                menus={[
                    {
                        context:'锁定',
                        click:record => {
                            console.log(record);
                            this.setFormValue(record);
                        },
                    },
                    {
                        context:'查看记录信息',
                        click:record => {
                            console.log(record);
                        },
                    }
                ]}
            >
            </ClickMenu>
        );
    }

    render(): any{
        /**初始化表头数据*/
        const columns = this.loadColumn();

        const rows:any = this.loadRows();

        /**为每个单元格添加onCell属性*/
        const mergedColumns = columns.map((col,index) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record:any) => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
                onHeaderCell: (column:any) => ({
                    width: column.width,
                    onResize: this.handleResize(index),
                }),
            };
        });

        return (
            <PageHeader
                ghost={false}
                title={this.props.title}
                extra={[
                    <Button key="1" type="primary" onClick={this.onNewRecordClick}><PlusOutlined/> 新建</Button>,
                ]}
            >
                {/*新建弹窗*/}
                <NewRecordModal ref={this.newRecordModalRef} columns={mergedColumns} save={this.onSave}/>
                <Form ref={this.formRef} component={false}>
                    {this.renderChildMenu()}
                    <Table
                        components={{
                            body: {
                                cell: EditCell,
                            },
                            header:{
                                cell:this.setResizableTitle
                            }
                        }}
                        onRow={(record) => ({
                            onClick:event =>{
                              this.onClick(event,record);
                            },
                            onContextMenu:event =>{
                                console.log(record);
                                this.onContextMenu(event);

                                /**从引用种调用子组件{@link ClickMenu}的handleContextMenu方法*/
                                this.contextMenuRef.current.handleContextMenu(event,record);
                            }
                        })}
                        bordered
                        rowKey={"id"}
                        columns={mergedColumns}
                        dataSource={rows}
                        rowClassName="editable-row"
                        pagination={{

                        }}
                    />
                </Form>
            </PageHeader>
        );
    }

}