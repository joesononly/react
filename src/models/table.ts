import {Dispatch} from "@/store";

/**通用请求工具*/
import axios from "@/util/axios";
import {Res} from "@/models/index.type";
import {message} from "antd";
import {Item} from "@/components/Table/EditTable/index.type";


export default {
    state:{
        datas:[],
        columns:[],
        childDatas:[],
        newRecoed:{},
    },
    reducers:{
        reduceDatas: (state: any, datas: any) => {
            return {
                ...state,
                datas
            }
        },
        reduceChildDatas:(state:any,childDatas:any) => {
            return {
                ...state,
                childDatas
            }
        },
    },
    effects: (dispatch: Dispatch) => ({
        /***
         * 表单数据获取
         */
        async loadTableData(){
            try{
                const params = {};
                const res:Res = await axios.post("/proxy/table/list",params);
                if(res != undefined){
                    const datas = res.data;
                    dispatch.table.reduceDatas(datas);
                    dispatch.table.reduceChildDatas(datas[0].systemColumns);
                    return datas;
                }

            }catch (e) {
                message.error("网络错误，请重试");
            }
            return;
        },
        /**
         * 新建保存
         */
        async save(newRecord:any){
            try {
                const res:Res = await axios.post("/proxy/table/save/jpa",newRecord);
                if(res != undefined && res.status == 200){
                    const data = res.data;
                    return data;
                }
            }catch (e){
                message.error("网络错误，请重试");
            }
        }
    })

}