import React from 'react';
import {Button, Col, Drawer, Form, Input, Row, Select, Table} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {tableRecord} from "@/pages/System/RelationAdmin/TableCopyAdmin/index.type";
import ClickMenu from '@/components/ClickMenu';

const { Option } = Select;

/**
 * 系统表格信息
 */
export default class TableAdmin extends React.Component{

    state = {
        visible: false,
        selectedRowKeys:[],
        editRecord:{name:"",comment:""}
    };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    /***
     * 渲染拖柜弹出框，用于表格维护
     */
    renderDrawer = () =>{
        return (
            <>
                <Button type="primary" onClick={this.showDrawer}>
                    <PlusOutlined/> 新建
                </Button>
                <Drawer
                    title="新建表"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{paddingBottom: 80}}
                    footer={
                        <div
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={this.onClose} style={{marginRight: 8}}>
                                取消
                            </Button>
                            <Button onClick={this.onClose} type="primary">
                                提交
                            </Button>
                        </div>
                    }
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="表名"
                                    initialValue={this.state.editRecord.name}
                                    rules={[{required: true, message: '请输入表名'}]}
                                >
                                    <Input placeholder="请输入表名"/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="comment"
                                    label="备注"
                                    initialValue={this.state.editRecord.comment}
                                >
                                    <Input.TextArea rows={4} placeholder="备注"/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            </>
        );
    }



    /**
     * 渲染表格
     */
    renderTable = () =>{
        const columns = [
            {
                title: '表名',
                dataIndex: 'name',
            },
            {
                title:"备注",
                dataIndex:"comment"
            },
            {
                title: '是否被修改',
                dataIndex: 'changed',
            },
            {
                title: '是否被锁定',
                dataIndex: 'locked',
            },
            {
                title: '锁定人',
                dataIndex: 'lockedBy',
            },
            {
                title: '锁定时间',
                dataIndex: 'lockedTime',
            },

        ];

        const selectRow = (record:tableRecord) => {
            let selectedRowKeys:Array<number> = [...this.state.selectedRowKeys];
            selectedRowKeys = [];
            if (selectedRowKeys.indexOf(record.key) >= 0) {
                selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
            } else {
                selectedRowKeys.push(record.key);
            }
            this.setState({ selectedRowKeys,editRecord:record });
        }
        const onSelectedRowKeysChange = (selectedRowKeys:Array<number>) => {
            this.setState({ selectedRowKeys });
        }

        const data = [];
        for (let i = 0; i < 46; i++) {
            data.push({
                key:i,
                name: `CX_TABLE_${i}`,
                comment:'备注',
                changed: i%2,
                locked: i%2,
                lockedBy:`joeson ${i}`,
                lockedTime:'2020/08/31'
            });
        }

        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: onSelectedRowKeysChange,
        };

        //this.setState({editRecord:data[0]});

        return (
            <>
                <Table columns={columns}
                       dataSource={data}
                       rowSelection={rowSelection}
                       onRow={(record) => ({
                           onClick: () => {
                               selectRow(record);
                           },
                           onRightClick:() =>{
                               console.log("row right click");
                           }
                       })} />
            </>
        );
    }

    render(){
        return (
            <>
                {/*<ClickMenu/>*/}
                {this.renderDrawer()}
                {this.renderTable()}
            </>
        );
    }
}