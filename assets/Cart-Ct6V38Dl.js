import{j as s,r as c,C as l,U as d}from"./index-DyoPeTHG.js";import{M as u}from"./Modal-DmWZu83K.js";import{B as i}from"./Button-PWWCBTsc.js";import{A as m}from"./BaseUrl-DVqEL8bQ.js";import{u as x}from"./auth-BpqPyaen.js";function C({image:r,itemName:t,quantity:a,price:n,onIncrease:e,onDecrease:o}){return x()?s.jsxs("li",{className:"cart-item",children:[s.jsx("img",{src:`${m.FETCH_IMAGE}/${r}`,alt:`${t}`}),s.jsxs("p",{children:[t," - ",a," x ",`₱${n}`]}),s.jsxs("div",{className:"cart-item-actions",children:[s.jsx("button",{onClick:o,children:"-"}),s.jsxs("span",{children:[" ",a]}),s.jsx("button",{onClick:e,children:"+"})]})]}):null}function N(){const r=c.useContext(l),t=c.useContext(d),a=r.items.reduce((e,o)=>e+o.quantity*o.price,0);function n(){t.hideCart()}return s.jsxs(u,{className:"cart",open:t.progress==="cart",onClose:t.progress==="cart"?n:null,children:[s.jsx("h2",{children:"Your Cart"}),s.jsx("ul",{children:r.items.map(e=>s.jsx(C,{itemName:e.name,quantity:e.quantity,price:e.price,onIncrease:()=>r.addItem(e),onDecrease:()=>r.removeItem(e.id),image:e.image},e.id))}),s.jsx("p",{className:"cart-total",children:`₱${a}`}),s.jsxs("div",{className:"modal-actions",children:[s.jsx(i,{className:"btn-outline-danger",onClick:n,children:"Close"}),r.items.length>0&&s.jsx(i,{className:"btn-dark",onClick:()=>{t.showCheckout()},children:"Checkout"})]})]})}export{N as default};