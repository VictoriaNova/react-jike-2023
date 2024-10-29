// 放置和用户相关的状态管理

import { createSlice } from '@reduxjs/toolkit'
import { setToken as _setToken, getToken, removeToken } from '@/utils'
import { loginAPI, getProfileAPI } from '@/apis/user'

const userStore = createSlice({
    name: "user",
    // 声明数据状态，后端返回来是什么类型，token初始就做响应调整
    initialState:{
        token: getToken() || '',
        userInfo: {}
    },
    // 同步的修改方法
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            // localStorage也存一份
            _setToken(action.payload)
        },
        setUserInfo (state, action) {
          state.userInfo = action.payload
        },
        clearUserInfo (state) {
          state.token = ''
          state.userInfo = {}
          removeToken()
        }
    }
})


// 解构出actionCreater，解构出setToken方法。actioncreater小函数会按照按需导出
const { setToken, setUserInfo, clearUserInfo } = userStore.actions

// 还需要得到当前模块的reducer函数。userreducer一会要在index里做组合，所以默认导出
const userReducer = userStore.reducer

// 异步方法 完成登录获取token
const fetchLogin = (loginForm)=>{
    return async (dispatch)=>{
        // 1. 发送异步请求
        const response = await loginAPI(loginForm)
        // 2. 提交同步action进行token的存入
        dispatch(setToken(response.data.token))
    }
}

// 获取个人用户信息异步方法
const fetchUserInfo = () => {
    return async (dispatch) => {
      const res = await getProfileAPI()
      dispatch(setUserInfo(res.data))
    }
  }

export { fetchLogin, fetchUserInfo, clearUserInfo }

export default userReducer


