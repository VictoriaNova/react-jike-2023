// 统一中转工具模块函数
// 其他地方要用的时候，统一从这里导出 import {request} from '@/utils'，后面就不再需要跟上具体的模块名了
import { request } from "./request";

export {
    request
}