import React from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker,Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;


export default class BTable extends React.Component{

    state = { visible: false };

    constructor(prop:any){
        super(prop);
    }

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
     * 渲染拖柜弹出框
     */
    renderDrawer = () =>{
        return (
            <>
                <Button type="primary" onClick={this.showDrawer}>
                    <PlusOutlined/> New account
                </Button>
                <Drawer
                    title="Create a new account"
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
                                Cancel
                            </Button>
                            <Button onClick={this.onClose} type="primary">
                                Submit
                            </Button>
                        </div>
                    }
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[{required: true, message: 'Please enter user name'}]}
                                >
                                    <Input placeholder="Please enter user name"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="url"
                                    label="Url"
                                    rules={[{required: true, message: 'Please enter url'}]}
                                >
                                    <Input
                                        style={{width: '100%'}}
                                        addonBefore="http://"
                                        addonAfter=".com"
                                        placeholder="Please enter url"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="owner"
                                    label="Owner"
                                    rules={[{required: true, message: 'Please select an owner'}]}
                                >
                                    <Select placeholder="Please select an owner">
                                        <Option value="xiao">Xiaoxiao Fu</Option>
                                        <Option value="mao">Maomao Zhou</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="type"
                                    label="Type"
                                    rules={[{required: true, message: 'Please choose the type'}]}
                                >
                                    <Select placeholder="Please choose the type">
                                        <Option value="private">Private</Option>
                                        <Option value="public">Public</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="approver"
                                    label="Approver"
                                    rules={[{required: true, message: 'Please choose the approver'}]}
                                >
                                    <Select placeholder="Please choose the approver">
                                        <Option value="jack">Jack Ma</Option>
                                        <Option value="tom">Tom Liu</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="dateTime"
                                    label="DateTime"
                                    rules={[{required: true, message: 'Please choose the dateTime'}]}
                                >

                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="description"
                                    label="Description"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'please enter url description',
                                        },
                                    ]}
                                >
                                    <Input.TextArea rows={4} placeholder="please enter url description"/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            </>
        );
    }

    /***
     * 渲染表格
     */
    renderTable = () =>{
        const columns = [
            {
                title: '表名',
                dataIndex: 'table',
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
        ];

        const data = [];
        for (let i = 0; i < 46; i++) {
            data.push({
                table: `CX_TABLE_${i}`,
                changed: i%2,
                locked: i%2,
                lockedBy:`joeson ${i}`
            });
        }
        return (
            <>
                <Table columns={columns} dataSource={data} />
            </>
        );
    }

    renderChildTable = () =>{
        const columns = [
            {
                title: '字段',
                dataIndex: 'name',
            },
            {
                title: '备注',
                dataIndex: 'comments',
            },
            {
                title: '类型',
                dataIndex: 'type',
            },
            {
                title: '长度',
                dataIndex: 'length',
            },
            {
                title: '整型长度',
                dataIndex: 'precision',
            },
            {
                title: '精度',
                dataIndex: 'scale',
            },
        ];

        const data = [];
        for (let i = 0; i < 46; i++) {
            data.push({
                name: `ID`,
                comments: '主键',
                type: 'varchar2',
                length:`15`,
                precision:``,
                scale:``
            });
        }
        return (
            <>
                <Table columns={columns} dataSource={data} />
            </>
        );
    }

    render() {
        return (
            <>
                {this.renderDrawer()}
                {this.renderTable()}
                {this.renderChildTable()}
            </>
        );
    }
}