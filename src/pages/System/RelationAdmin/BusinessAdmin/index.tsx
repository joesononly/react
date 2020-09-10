import React from 'react';
import EditTable from '@/components/Table/EditTable';
import {Item} from "@/components/Table/EditTable/index.type";
import { connect } from "react-redux";
import {Dispatch, RootState} from "@/store";
import {Button, Checkbox, Form, Input, InputNumber, Modal, Select, Table, Tree} from "antd";
import {CheckboxValueType} from "antd/lib/checkbox/Group";
import {DataNode, EventDataNode} from "rc-tree/lib/interface";

import "./index.less"

/***
 * 定义组件的属性类型
 */
type Props = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & {
};

class Index extends React.Component<Props,{childColumns:any,treeDatas:Array<any>,}>{

    componentWillMount(): void {
        this.setState({childColumns:[]});
        this.loadData();
    }

    loadData = async () => {
        /**获取数据*/
        const datas = await this.props.loadDatas();
        this.setState({childColumns:datas[0].systemFields})
    }

    loadColumns = () =>{
        const columns = [
            {
                title: '业务组件',
                dataIndex: 'name',
                width: 100,
                editable: true,
            },
            {
                title: '表',
                dataIndex: 'tableName',
                width:100,
                editable: true,
            },
            {
                title: '是否被修改',
                dataIndex: 'changed',
                width:100,
                editable: true,
            },
            {
                title: '是否被锁定',
                dataIndex: 'locked',
                width:100,
                editable: true,
            },
            {
                title: '锁定人',
                dataIndex: 'lockedBy',
                width:100,
                editable: true,
            },
            {
                title: '锁定时间',
                dataIndex: 'lockedTime',
                width:100,
                editable: true,
            },
            {
                title:"备注",
                dataIndex:"comment",
                width:100,
                editable: true,
            }];
        return columns;
    }

    loadColumnColumns = () => {
        const columns = [
            {
                title: '字段名',
                dataIndex: 'name',
                width: 100,
                editable: true,
            },
            {
                title: '关联',
                dataIndex: 'joinName',
                width: 100,
                editable: true,
            },
            {
                title: '列',
                dataIndex: 'columnName',
                width: 100,
                editable: true,
            },
            {
                title: '备注',
                dataIndex: 'comments',
                width: 100,
                editable: true,
            },
        ];
        return columns;
    }

    renderTable = () => {
        const rows = this.props.datas;
        let {childColumns} = this.state;
        if(childColumns === null) childColumns = []
        debugger;
        return (
            <>
                <EditTable title="业务组件" rows={rows} columns={this.loadColumns()}
                           onRow={(record) => {
                               return {
                                   onClick:() =>{
                                       this.setState({childColumns:record.systemFields});
                                   },
                                   newRow:(newRecord:any) =>{return null}
                               }
                           }
                           }
                />

                <EditTable title="组件字段" rows={childColumns} columns={this.loadColumnColumns()}/>
            </>
        );
    }

    render(): any{
        return this.renderTable();
    }
}

/***
 * 使用redux将全局的state与组件的state进行绑定
 * @param state
 */
const mapState = (state:RootState) => ({
    datas:state.business.datas,
    columns:state.business.columns,
    chilidDatas:state.business.childDatas,
})

const mapDispatch = (dispatch:Dispatch) =>({
    loadDatas:dispatch.business.loadDatas
})

export default connect(mapState,mapDispatch)(Index);