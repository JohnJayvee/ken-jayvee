import{u as r,r as s}from"./index-DhdYleOX.js";const e="http://white-emu-581912.hostingersite.com",E={USER_REGISTER:`${e}/api/user/register`,FETCH_IMAGE:`${e}/storage`,FETCH_PRODUCTS:`${e}/api/products`,FETCH_FEEDBACKS:`${e}/api/feedbacks`,FETCH_USER:`${e}/api/users`},n=()=>{const t=r(),[o,a]=s.useState(!1);return s.useEffect(()=>{localStorage.getItem("token")||sessionStorage.getItem("token")?a(!0):t("/login",{replace:!0})},[t]),o},c=n;export{E as A,c as u};
