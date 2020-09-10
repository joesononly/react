import React from 'react';
import {Tree} from "antd";
import {DataNode, EventDataNode} from "rc-tree/lib/interface";
import BusinessAdmin from '../BusinessAdmin';
import TableAdmin from "../TableAdmin";
import JoinAdmin from "../JoinAdmin";
import ApplyAdmin from "../ApplyAdmin";

import "./index.less"

export default class Index extends React.Component<any, any>{

    componentWillMount():any {
        this.loadTreeData();
    }

    onTreeSelect = (
        keys: React.ReactText[],
        info: {
            event: "select";
            selected: boolean;
            node: EventDataNode & { id: number; title: string,element:React.Component };
            selectedNodes: DataNode[];
            nativeEvent: MouseEvent;
        }
    ) => {
        if (info.selected) {
            this.setState({activeChild:info.node.element});
        }
        console.log(info);
    };

    loadTreeData = () =>{
        const treeDatas = [
            {
                title: '业务组件',
                key: '0',
                element: <BusinessAdmin/>,
                children:[
                    {
                        title: '关联关系',
                        key: '3',
                        element:<JoinAdmin/>
                    }
                ]
            },
            {
                title: '页面对象',
                key: '1',
                element: <ApplyAdmin/>,
            },
            {
                title: '表',
                key: '2',
                isLeaf: true,
                element:<TableAdmin/>
            },
        ];
        this.setState({treeDatas,activeChild:<BusinessAdmin/>})
    }

    renderChild = () =>{

        let {activeChild} = this.state;
        if(activeChild === null){
            activeChild = <></>;
        }

        return activeChild;
    }

    renderTreeContainer = () =>{
        return (
            <div className="page-power-admin">
                <div className="l">
                    <div className="title">目录结构</div>
                    <div>
                        <Tree onSelect={this.onTreeSelect} treeData={this.state.treeDatas}></Tree>
                    </div>
                </div>
                <div className="r">
                    <div className="searchBox">
                        <ul>
                            <li style={{width:'100%'}}>
                                {this.renderChild()}
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        );
    }

    render() {
        return this.renderTreeContainer();
    }
}