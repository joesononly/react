import React from 'react';
import {Select} from "antd";

const { Option } = Select;

type Props ={
    type:string,
    placeholder?:string
}


/**
 * 值列表下拉框
 */
export default class Index extends React.Component<Props, any>{

    state = {datas:[]}

    componentWillMount() {
        /**加载localStorage*/
        this.loadLocalStorage();
        /**将测试数据添加到本地缓存中*/
        this.loadDatas()
        /**获取指定type类型的值列表*/
        this.getLovFromLocalStorage();
    }

    /**
     * 判断当前浏览器是否支持localStorage
     */
    loadLocalStorage = () =>{

        const localStorage = this.getLocalStorage();

        if(!localStorage){
            throw "不支持localStorage请更换浏览器";
        }
    }

    getLocalStorage = () =>{
        return window.localStorage;
    }

    /**
     * 从本地缓存中获取对应类型的值列表
     */
    getLovFromLocalStorage = () =>{
        const localStorage = this.getLocalStorage();

        console.log(111);

        if(localStorage == null){
            return;
        }

        debugger;

        const lov_list_str = localStorage.getItem("sys_lov");
        if(lov_list_str && lov_list_str != "undefined" && lov_list_str != "null"){
            const lov_list = JSON.parse(lov_list_str);
            const datas = lov_list[this.props.type];
            this.setState({datas:datas});
        }else{
            throw `值列表类型${this.props.type}不存在`;
        }

    }

    loadDatas = () =>{

        const localStorage = this.getLocalStorage();

        if(localStorage == null){
            return;
        }

        const sys_col_type = [
            {
                value:'string',
                name:'string',
            },
            {
                value:'number',
                name:'number',
            },
            {
                value:'boolean',
                name:'boolean',
            },
        ]
        const lov_list =  {
            'sys_col_type':sys_col_type
        }

        const lov_list_str = JSON.stringify(lov_list);
        if(lov_list_str){
            localStorage.setItem("sys_lov",lov_list_str);
        }

    }

    renderOptions = () =>{

        let datas:Array<any> = this.state.datas;
        datas = datas === null ? []:datas;
        return (
            <>
                {datas.map(item =>{
                    return <Option value={item.value}>{item.name}</Option>
                })}
            </>
        );
    }

    render() {
        return (
            <>
                <Select placeholder={this.props.placeholder} >
                    {this.renderOptions()}
                </Select>
            </>
        );
    }
}