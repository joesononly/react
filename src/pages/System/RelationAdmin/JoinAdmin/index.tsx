import React from 'react';
import EditTable from '@/components/Table/EditTable';
import {Item} from "@/components/Table/EditTable/index.type";
import { connect } from "react-redux";
import {Dispatch, RootState} from "@/store";

/***
 * 定义组件的属性类型
 */
type Props = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & {
};

class Index extends React.Component<Props,{systemColumns:any}>{

    componentWillMount(): void {
        this.setState({systemColumns:[]});
        this.loadData();
    }

    loadData = async () => {
        /**获取数据*/
        const datas = await this.props.loadDatas();
        this.setState({systemColumns:datas[0].systemBusinessComponentJoinFields})
    }

    loadColumns = () =>{
        const columns = [
            {
                title: '关联命名',
                dataIndex: 'name',
                width: 100,
                editable: true,
            },
            {
                title: '目标表',
                dataIndex: 'targetTableName',
                width: 100,
                editable: true,
            },
            {
                title: '是否左连接',
                dataIndex: 'outerJoin',
                width: 80,
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
                title: '命名',
                dataIndex: 'name',
                width: 100,
                editable: true,
            },
            {
                title: '源字段',
                dataIndex: 'sourceColumnName',
                width: 100,
                editable: true,
            },
            {
                title: '目标字段',
                dataIndex: 'targetColumnName',
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

    render(): any{
        const rows = this.props.datas;
        let {systemColumns} = this.state;
        if(systemColumns === null) systemColumns = []
        debugger;
        return (
            <>
                <EditTable title="关联" rows={rows} columns={this.loadColumns()}
                           onRow={(record) => {
                               return {
                                   onClick:() =>{
                                       this.setState({systemColumns:record.systemBusinessComponentJoinFields});
                                   },
                                   newRow:(newRecord:any) =>{return null}
                               }
                           }
                           }
                           />

                <EditTable title="关联字段" rows={systemColumns} columns={this.loadColumnColumns()}/>
            </>
        );
    }
}

/***
 * 使用redux将全局的state与组件的state进行绑定
 * @param state
 */
const mapState = (state:RootState) => ({
    datas:state.join.datas,
    columns:state.join.columns,
    chilidDatas:state.join.childDatas,
})

const mapDispatch = (dispatch:Dispatch) =>({
    loadDatas:dispatch.join.loadDatas
})

export default connect(mapState,mapDispatch)(Index);