import{r,C as d,U as u,j as e}from"./index-rIKqiirp.js";import{M as h}from"./Modal-B4xgmuuO.js";import{I as o}from"./InputBlock-Cx0FRrD0.js";import{B as l}from"./Button-OuFZhK-y.js";function C(){const a=r.useContext(d),n=r.useContext(u),c=a.items.reduce((t,s)=>t+s.quantity*s.price,0);function i(t){t.preventDefault();const s=new FormData(t.target),m=Object.fromEntries(s.entries());fetch("localhost/sample/db.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({order:{items:a.items,customer:m}})})}return e.jsx(h,{open:n.progress==="checkout",children:e.jsxs("form",{onSubmit:i,children:[e.jsx("h2",{children:"Checkout"}),e.jsxs("p",{className:"h2",children:["total Amount",` : ₱${c}`]}),e.jsx(o,{label:"Full Name",type:"text",id:"full-name"}),e.jsx(o,{label:"Email",type:"email",id:"email"}),e.jsx(o,{label:"Address",type:"text",id:"street"}),e.jsx("div",{className:"control-row",children:e.jsxs("label",{className:"h5 mt-2 ",children:["Payment method",e.jsxs("select",{name:"payment-method",children:[e.jsx("option",{value:"cash",children:"Cash"}),e.jsx("option",{value:"online payment",children:"Online payment (not available)"})]})]})}),e.jsxs("ul",{className:"checkout-button ",children:[e.jsx(l,{className:"btn-outline-danger",type:"button",onClick:()=>n.hideCheckout(),children:"Close"}),e.jsx(l,{className:"btn-dark mx-3",children:"Submit Order"})]})]})})}export{C as default};
