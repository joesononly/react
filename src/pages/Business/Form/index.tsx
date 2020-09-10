import React,{Component} from 'react';
import { Form, Button,Input,Row,Col } from "antd";
import conditionRender from 'condition-render';

export default class BForm extends Component{

    render = () => {
        const condition = {
            // This is the wrapper around the current component,
            // it's outside of @decorator, and only applies to the current scope
            // 这是当前组件的外包装， 一定在@decorator外面，且只作用于当前层
            '@wrap': [<Form />, <Row gutter={8} />],
            // Here are the decorators will applies to each leaf components
            // 这里的装饰器会作用于每一个叶组件
            // It can be a decorator or component
            // 可以是一个装饰器或组件
            // The priority of the decorator function must be greater than the component
            // 装饰器函数的优先级一定大于组件
            '@decorator': [
                <Col span={8} />,
                // target is leaf Component , params is It's attribute
                // target 是 叶组件， params是它的参数

            ],
            '@component': [
                {
                    '@component': Input,
                    value: 1,
                    title: 'Input1',
                },
                {
                    '@component': Input,
                    value: 2,
                    title: 'Input2',
                },
                {
                    '@component': Input,
                    value: 3,
                    title: 'Input3',
                },
            ],
        };

        return conditionRender(condition);
    };
}
