import{r as o,C as j,j as e}from"./index-wmhVshuy.js";import{B as f}from"./Button-BOhMOqLC.js";import{A as x}from"./BaseUrl-6_kCCrH9.js";import{H as g,F as N}from"./Footer-BeXft4Yj.js";import{E as C}from"./Error-D8g2RMk0.js";import{a as w}from"./axios-B4uVmeYG.js";import"./auth-Cyon5g5R.js";function E({foods:t}){const s=o.useContext(j);function r(){s.addItem(t)}return e.jsx("li",{className:"food-item list-group-item",children:e.jsxs("div",{className:"item-card row",children:[e.jsx("div",{className:"col-md",children:e.jsx("img",{className:"rounded mt-2 ",src:`${x.FETCH_IMAGE}/${t.image}`,alt:t.name},t.id)}),e.jsxs("div",{className:"col-md",children:[e.jsx("h3",{children:t.name}),e.jsx("p",{className:"food-item-description m-0",children:`- ${t.description.substring(0,15)} -`})]}),e.jsxs("div",{className:"row g-sm-1 d-flex justify-content-md-center ",children:[e.jsxs("dt",{className:"food-item-price col-md-7 col-sm m-sm-1",children:["₱",t.price]}),e.jsx(f,{className:"btn-outline-light col-md-7 col-sm p-0 ",onClick:r,children:"Add to Cart"})]})]})})}async function y(t,s){var r,a;try{return(await w(t,s)).data}catch(i){const l=((a=(r=i.response)==null?void 0:r.data)==null?void 0:a.message)||"Something went wrong, failed to send request.";throw new Error(l)}}const P=(t,s,r)=>{const[a,i]=o.useState(r),[l,d]=o.useState(!1),[m,c]=o.useState(),n=o.useCallback(async function(p){d(!0);try{const u=await y(t,{...s,body:p});i(u)}catch(u){c(u.message||"Something went wrong!")}d(!1)},[t,s]);return o.useEffect(()=>{(s&&(s.method==="GET"||!s.method)||!s)&&n()},[n,s]),{data:a,isLoading:l,error:m,sendRequest:n}},v=P,S={},h=8;function _(){const{data:t,isLoading:s,error:r}=v(x.FETCH_PRODUCTS,S,[]),[a,i]=o.useState(1);if(s)return e.jsx("p",{className:"h2 text-center",children:"Fetching products..."});if(r)return e.jsx(C,{title:"Failed to fetch Products",message:r});if(!t||!t.products)return e.jsx("p",{className:"text-center",children:"No products available"});const l=Math.ceil(t.products.length/h),d=t.products.slice((a-1)*h,a*h),m=c=>{i(c)};return e.jsxs(e.Fragment,{children:[e.jsx(g,{}),e.jsxs("main",{className:"container my-4",children:[e.jsx("h1",{className:"text-center mb-4",children:"Shop"}),e.jsx("p",{className:"h3 text-center mb-2",children:`Total Products: ${t.totalProducts}`}),e.jsx("div",{className:"row row-cols-1 row-cols-sm-2 row-cols-md-3 justify-content-sm-center justify-content-xs-center",children:e.jsx("div",{className:"d-flex  col-md-auto flex-wrap",children:d.map(c=>e.jsx("div",{className:"col d-flex rounded m-3 justify-content-sm-center justify-content-center",children:e.jsx(E,{foods:c})},c.id))})}),e.jsx("div",{className:"d-flex justify-content-center mt-4",children:e.jsx("nav",{children:e.jsx("ul",{className:"pagination bg-outline-dark",children:Array.from({length:l},(c,n)=>e.jsx("li",{className:"page-item",children:e.jsx("button",{onClick:()=>m(n+1),className:`page-link  ${a===n+1?"active":""}`,children:n+1})},n+1))})})})]}),e.jsx(N,{})]})}export{_ as default};