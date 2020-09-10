import React from 'react';
import EditTable from '@/components/Table/EditTable';
import {Item} from "@/components/Table/EditTable/index.type";
import { connect } from "react-redux";
import {Dispatch, RootState} from "@/store";

/**自定义组件*/


/***
 * 定义组件的属性类型
 */
type Props = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & {
};

class Index extends React.Component<Props,any>{

    componentWillMount(): void {
        this.setState({systemColumns:[],editHeaderRecord:{}});
        this.loadData();
    }

    loadData = async () => {
        /**获取数据*/
        const datas = await this.props.loadTableData();
        this.setState({systemColumns:datas[0].systemColumns})
    }

    loadColumns = () =>{
        const columns = [
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
            }];
        return columns;
    }

    loadColumnColumns = () => {
        const columns = [
            {
                title: '列名',
                dataIndex: 'name',
                width: 100,
                editable: true,
                type:'string',
            },
            {
                title: '类型',
                dataIndex: 'type',
                width: 100,
                editable: true,
                type:'string',
                elType:'select',
                lov:'sys_col_type'
            },
            {
                title: '长度',
                dataIndex: 'length',
                width: 100,
                editable: true,
                type:'string',
            },
            {
                title: '数值类型长度',
                dataIndex: 'precisions',
                width: 100,
                editable: true,
                type:'string',
            },
            {
                title: '精度',
                dataIndex: 'scale',
                width: 100,
                editable: true,
                type:'string',
            },
            {
                title: '备注',
                dataIndex: 'comment',
                width: 100,
                editable: true,
                type:'string',
            },
        ];
        return columns;
}

    render(): any{
        const rows = this.props.datas;
        let {systemColumns} = this.state;
        if(systemColumns === null) systemColumns = []
        
        return (
            <>
                <EditTable
                    title="表信息" rows={rows}
                    columns={this.loadColumns()}
                    onRow={
                       (record) => {
                                       return {
                                           onClick:() =>{
                                               this.setState({systemColumns:record.systemColumns,editHeaderRecord:record});
                                           },
                                           newRow:(newRecord:any) =>{
                                               
                                               /**调用Redux中的effect保存数据*/
                                               const data = this.props.save(newRecord);
                                               /**新记录保存成功后重新刷新页面数据*/
                                               if(data!= undefined && data != null){
                                                   this.props.loadTableData();
                                               }
                                                return;
                                           }
                                       }
                                   }
                    }
                           />

                <EditTable title="字段"
                           rows={systemColumns}
                           columns={this.loadColumnColumns()}
                           onRow={
                               (record) => {
                                   return {
                                       onClick:() =>{
                                           return;
                                       },
                                       newRow:(newRecord:any) =>{
                                           newRecord.parentId = this.state.editHeaderRecord.id;
                                           /**调用Redux中的effect保存数据*/
                                           const data = this.props.childSave(newRecord);
                                           /**新记录保存成功后重新刷新页面数据*/
                                           if(data!= undefined && data != null){
                                               this.props.loadTableData();
                                           }
                                           return;
                                       }
                                   }
                               }
                           }
                />
            </>
        );
    }
}

/***
 * 使用redux将全局的state与组件的state进行绑定
 * @param state
 */
const mapState = (state:RootState) => ({
    datas:state.table.datas,
    columns:state.table.columns,
    chilidDatas:state.table.childDatas,
})

const mapDispatch = (dispatch:Dispatch) =>({
    loadTableData:dispatch.table.loadTableData,
    save:dispatch.table.save,
    childSave:dispatch.column.save,
})

export default connect(mapState,mapDispatch)(Index);