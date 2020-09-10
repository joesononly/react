import React from 'react';
import {Button, Col, Drawer, Form, Input, Row} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {FormInstance} from "antd/lib/form";

/**
 * 新建表信息的弹出款
 */
export default class Index extends React.Component<any, any>{

    formRef = React.createRef<FormInstance>();

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

    onClose = async () => {
        if(this.formRef.current != null){
            const record:any = await this.formRef.current.validateFields();
            console.log(record.name);
        }

        this.setState({
            visible: false,
        });
    };

    render:any = () =>{
        return (
            <>
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
                            <Button onClick={this.onClose} type="primary">
                                提交
                            </Button>
                        </div>
                        }
                >
                    <Form layout="vertical" ref={this.formRef} hideRequiredMark>
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
        )
    }

}