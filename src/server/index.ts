/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-02 11:54:58
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-07 21:24:05
 * @FilePath: \snow-vue\src\server\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'

const api = axios.create({
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api