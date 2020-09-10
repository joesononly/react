/** 全局唯一数据中心 **/

import { init, RematchDispatch, RematchRootState } from "@rematch/core";

import app from "@/models/app";
import sys from "@/models/sys";
import table from "@/models/table";
import business from "@/models/business";
import join from "@/models/join";
import apply from "@/models/apply";
import column from "@/models/column";

export interface RootModel {
  app: typeof app;
  sys: typeof sys;
  table: typeof table;
  business:typeof business;
  join:typeof join;
  apply:typeof apply;
  column:typeof column;
}

export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;

const rootModel: RootModel = { app, sys,table,business,join,apply,column };
const store = init({
  models: rootModel,
});

export type Store = typeof store;

export default store;
