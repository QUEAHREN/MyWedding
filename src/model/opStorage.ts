import Taro from '@tarojs/taro'

// 获取当前用户weddingID
export const getWeddingID = () => {
    try {
        var value = Taro.getStorageSync('wedding_id')
        return value;
      } catch (e) {
        return 0
      }
 
};


 
// 保存wedding_id
export const setWeddingID = (wedding_id:string) => {

    Taro.setStorage({
        key:"wedding_id",
        data:wedding_id
      })
    
};
 
// // 用户登出，删除cookie
// export const logout = (props) => {
//     console.log(props)
//     cookie.remove('Token');
//     cookie.remove('Auth');
//     cookie.remove('UserName');
//     props.history.push('/login');
// };


// // 删除cookie
// export const deleteCookies = () => {

//     cookie.remove('Token');
//     cookie.remove('Auth');
//     cookie.remove('UserName');

// };


// // 检测token是否过期
// export const checkToken = (_this) =>{

//     let token = getToken();
//     if (typeof(token) === "undefined" ){
//         alert('登录已失效！');
//         if (typeof(_this.props) === "undefined" )   _this.history.push('/login');
//         else                                        _this.props.history.push('/login');
//     }
//     else return 1;

// }
