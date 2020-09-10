import {Dispatch} from "@/store";
import {message} from "antd";

import axios from "@/util/axios";
import {Res} from "@/models/index.type";

/***
 * 关联关系的Model
 */
export default {
    state:{
        datas:[],
        columns:[],
        childDatas:[],
    },
    reducers:{
        /***
         * 将传入的datas存入state中，用于与组件绑定
         * @param state
         * @param datas
         */
        reduceDatas:(state:any,datas:any) =>{
            return {
                ...state,
                datas
            }
        }
    },
    effects:(dispatch:Dispatch) =>({

        /***
         * 读取后台数据
         */
        async loadDatas(){
            try {
                const params = {};
                const res:Res = await axios.post("/proxy/apply/list",params);

                if(res != null){
                    const datas = res.data;
                    dispatch.apply.reduceDatas(datas);
                    return datas;
                }
            }catch (e) {
                message.error("网络错误，请重试");
            }
            return;
        }
    })
}