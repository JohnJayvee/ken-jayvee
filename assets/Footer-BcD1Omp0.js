import{r as n,u as g,a as h,j as e,C as j,U as b,L as a}from"./index-C5st4JjH.js";import{B as r}from"./Button-DjFtoc1X.js";import{A as m}from"./BaseUrl-6_kCCrH9.js";import{a as p}from"./axios-B4uVmeYG.js";import{u}from"./auth-DgU19GkS.js";const f="/assets/logo-transparent-DfOx56kM.png",v="/assets/Untitled_design-removebg-preview-C2l7H7g6.png",N="/assets/place-holder-YGnYt_Qi.png";function y(){const[x,c]=n.useState([]),o=n.useRef(!1),i=g(),{user:t,setUser:l}=h(),d=()=>{l(null),localStorage.getItem("token")||sessionStorage.getItem("token"),localStorage.getItem("token")?localStorage.removeItem("token"):sessionStorage.removeItem("token"),localStorage.removeItem("user"),i("/login",{replace:!0})};return n.useEffect(()=>{o.current||(o.current=!0,p.get(m.FETCH_USER,{headers:{"Content-Type":"application/json"}}).then(s=>{console.log("API Response Dropdown profile:",s),s.data.success&&Array.isArray(s.data.users)?c(s.data.users):console.error("Unexpected response format:",s.data)}).catch(s=>{console.error("Error fetching the  dropdown profile:",s)}))},[]),e.jsx("div",{className:"dropdown-menu custom-dropdown d-flex position-absolute top-20 end-0",children:e.jsxs("ul",{className:"d-flex-reverse ",children:[e.jsx("img",{className:"rounded-5",src:`${m.FETCH_IMAGE}/${t.imageUrl}`||"https://bit.ly/dan-abramov",alt:`${t.name}`,style:{display:" inline-block",width:"65px",height:"65px",borderRadius:"50%"}}),e.jsx("p",{className:"h4",children:t.username}),e.jsx("p",{className:"h6",children:t.email}),e.jsx(r,{className:"btn-danger",onClick:()=>{d(),alert("logout")},children:"Logout"})]})})}function k(){const[x,c]=n.useState([]),[o,i]=n.useState(!1),t=n.useRef(!1),{user:l}=h();return n.useEffect(()=>{t.current||(t.current=!0,p.get(m.FETCH_USER,{headers:{"Content-Type":"application/json"}}).then(s=>{console.log("API Response:",s),s.data.success&&Array.isArray(s.data.users)?c(s.data.users):console.error("Unexpected response format:",s.data)}).catch(s=>{console.error("Error fetching the  user:",s)}))},[]),u()?e.jsxs(e.Fragment,{children:[e.jsx(r,{className:"btn btn-outline-light dropdown-toggle p-0",type:"button","data-bs-toggle":"dropdown","aria-expanded":"false",onClick:()=>i(s=>!s),children:e.jsx("div",{className:"dropdown-center custom-profile overflow-hidden",children:e.jsx("img",{src:`${m.FETCH_IMAGE}/${l.imageUrl}`||"https://bit.ly/dan-abramov",alt:`${l.name}`})})}),o&&e.jsx(y,{})]}):null}function U(){const x=n.useContext(j),c=n.useContext(b),o=x.items.reduce((l,d)=>l+d.quantity,0);function i(){c.showCart()}const t=u(!0);return e.jsx("header",{className:"navbar navbar-expand-md custom-navbar border-bottom",children:e.jsxs("div",{className:"container-fluid p-0 row",children:[e.jsxs("div",{className:"col col-md-2 col-sm row d-flex justify-content-sm-between",children:[e.jsx("div",{className:"col-md-10 col-sm-6 col-6",children:e.jsxs(a,{to:"/",className:"d-flex link-body-emphasis text-decoration-none ",children:[e.jsx("img",{src:f,style:{height:"3rem"}}),e.jsx("p",{className:"h2 text-warning-emphasis",children:"PawGo"})]})}),e.jsx("div",{className:"col-sm-6 col-6 d-flex justify-content-end",children:e.jsx("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarCollapse","aria-expanded":"false",children:e.jsx("span",{className:"navbar-toggler-icon "})})})]}),e.jsx("div",{className:"col-lg-6 col-md-9",children:e.jsxs("div",{className:"navbar-collapse collapse",id:"navbarCollapse",children:[e.jsxs("ul",{className:"navbar-nav col col-md mb-2 mb-md-0 me-3 custom-navbar-nav ms-sm-3 ",children:[e.jsx("li",{children:e.jsx(a,{to:"/home",className:"nav-link px-2 ",children:"Home"})}),e.jsx("li",{children:e.jsx(a,{to:"/shop",className:"nav-link px-2",children:"Shop"})}),e.jsx("li",{children:e.jsx(a,{to:"/aboutUs",className:"nav-link px-2",children:"About"})}),e.jsx(r,{className:"btn btn-light dropdown-toggle text-start",type:"button","data-bs-toggle":"dropdown","aria-expanded":"false",children:"Feedback"}),e.jsx("div",{className:"dropdown",children:e.jsxs("ul",{className:"dropdown-menu ",children:[e.jsx("li",{children:e.jsx(a,{to:"/feedback",className:"dropdown-item",children:"Give Feedback"})}),e.jsx("li",{children:e.jsx(a,{to:"/userfeedback",className:"dropdown-item",children:"Customer's Feedback"})})]})})]}),e.jsxs("div",{className:"col-md-6 row",children:[e.jsxs("div",{className:"col-md d-flex align-items-md-center justify-content-sm-start",children:[e.jsxs(r,{onClick:i,className:"nav-link px-1 link-secondary",children:[e.jsx("img",{src:v,style:{height:"2rem"}}),o===0?e.jsx("span",{}):e.jsx("span",{className:"bg-danger rounded-circle text-light p-md-1",children:o})]}),e.jsx(r,{className:"nav-link px-1 link-secondary position-relative",children:e.jsxs(a,{to:"/productList",className:"dropdown-item ",children:[e.jsx("img",{src:N,style:{height:"4rem"}}),e.jsx("span",{className:"position-absolute top-100 start-50 translate-middle badge rounded-pill bg-warning",children:"My Orders"})]})})]}),e.jsxs("ul",{className:"nav col-md col-lg mb-2 mb-md-0 me-md-0 ms-sm-3 mt-3",children:[!t&&e.jsxs(e.Fragment,{children:[e.jsx(r,{className:"btn-outline-dark rounded-pill p-0 me-sm-2 me-2 ms-3",children:e.jsx(a,{to:"/login",className:"nav-link px-2 link-secondary",children:"Login"})}),e.jsx(r,{className:"btn-outline-primary rounded-pill p-0",children:e.jsx(a,{to:"/register",className:"nav-link px-2 link-secondary",children:"Sign Up"})})]}),t&&e.jsx("li",{className:"position-relative",children:e.jsx(k,{})})]})]})]})})]})})}const w="/assets/logo-transparent-DfOx56kM.png";function F(){return e.jsx("footer",{className:"container custom-footer py-3 position-relative",children:e.jsxs("div",{className:"d-flex  align-items-center py-3 border-top",children:[e.jsx("p",{className:"col-md-4 mb-0 text-body-secondary",children:"© 2024 Kodego Students, Ken & Jayvee"}),e.jsx(a,{to:"/",className:"col-md-4 d-flex justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none",children:e.jsx("img",{src:w,alt:"",style:{height:"4rem"}})}),e.jsxs("ul",{className:"nav col-md-4 justify-content-end",children:[e.jsx("li",{className:"nav-item",children:e.jsx(a,{to:"/home",className:"nav-link px-2 text-body-secondary",children:"Home"})}),e.jsx("li",{className:"nav-item",children:e.jsx(a,{to:"/shop",className:"nav-link px-2 text-body-secondary",children:"Shop"})}),e.jsx("li",{className:"nav-item",children:e.jsx(a,{to:"/aboutUs",className:"nav-link px-2 text-body-secondary",children:"About"})})]})]})})}export{F,U as H};
