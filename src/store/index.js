// 组合redux子模块 + 导出store实例

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user";

// configureStore的返回结果是一个store的实例对象，直接导出
export default configureStore({
    reducer: {
        user: userReducer
    }
})