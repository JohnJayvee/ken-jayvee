import{r,C as f,U as N,a as k,j as e}from"./index-DJeIdJnr.js";import{M as p}from"./Modal-BQ1Y78iI.js";import{I as c}from"./InputBlock-Cytxh9w-.js";import{B as i}from"./Button-nUxkOgkl.js";import{a as v}from"./axios-B4uVmeYG.js";function O(){const d=r.useContext(f),o=r.useContext(N),{user:n}=k(),[x,j]=r.useState(!1),[S,m]=r.useState({}),g=d.items.reduce((a,s)=>a+s.quantity*s.price,0),[l,h]=r.useState({firstName:n.name,lastName:n.name,email:n.email,cellphoneNumber:"123",address:"",message:" ",paymentMethod:"cash on delivery",user_id:n.id,orders:d.items.map(a=>({product_id:a.id,quantity:a.quantity,totalPrice:a.quantity*a.price}))}),t=a=>{const{name:s,value:C}=a.target;h(b=>({...b,[s]:C}))},y=async a=>{a.preventDefault();try{const s=await v.post(" http://white-emu-581912.hostingersite.com/api/order/create",l,{headers:{"Content-Type":"application/json"}});console.log("Order submitted successfully:",s.data),h({message:""}),m({}),window.location.reload()}catch(s){s.response&&s.response.status===422?(m(s.response.data.errors),console.log(l),p,o.progress,i):console.error("Error submitting form:",s)}finally{j(!1)}};let u=e.jsxs(e.Fragment,{children:[e.jsx(i,{className:"btn-danger",type:"button",onClick:()=>o.hideCheckout(),children:"Close"}),e.jsx(i,{className:"btn-dark mx-3",type:"submit",children:"Submit Order"})]});return x&&(u=e.jsx("span",{children:"Sending order data..."})),e.jsx(p,{open:o.progress==="checkout",children:e.jsxs("form",{onSubmit:y,children:[e.jsx("h2",{children:"Checkout"}),e.jsxs("p",{className:"h2",children:["Total Amount: ₱",g]}),e.jsx(c,{label:"Email",type:"email",id:"email",name:"email",onChange:t}),e.jsx(c,{label:"Contact Number",type:"text",id:"cellphoneNumber",name:"cellphoneNumber",onChange:t}),e.jsx(c,{label:"Address",type:"text",id:"address",name:"address",onChange:t}),e.jsx("textarea",{className:"w-50",label:"message",type:"text",id:"message",name:"message",placeholder:"Note to seller",onChange:t}),e.jsx("div",{className:"control-row",children:e.jsxs("label",{className:"h5",children:["Payment method",e.jsxs("select",{name:"paymentMethod",id:"paymentMethod",value:l.paymentMethod,onChange:t,children:[e.jsx("option",{value:"cash on delivery",children:"Cash on Delivery"}),e.jsx("option",{value:"Gcash",children:"Gcash"})]})]})}),e.jsx("div",{className:"modal-actions",children:u})]})})}export{O as default};
