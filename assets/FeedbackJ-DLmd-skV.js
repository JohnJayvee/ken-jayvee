import{a as h,r as l,j as e}from"./index-DJeIdJnr.js";import{a as u}from"./axios-B4uVmeYG.js";import{B as x}from"./Button-nUxkOgkl.js";const p=()=>{const{user:d}=h(),[a,c]=l.useState({user_id:d.id,feedback:""}),[t,r]=l.useState({}),i=n=>{const{name:s,value:o}=n.target;c({...a,[s]:o}),r({...t,[s]:""})},m=async n=>{n.preventDefault();try{const s=await u.post("http://white-emu-581912.hostingersite.com/api/feedback/create",a,{headers:{"Content-Type":"application/json"}});s.status===200||s.status===201?(alert("Message sent successfully!"),console.log(s),c({message:""}),r({}),window.location.reload()):alert("Failed to send message.")}catch(s){if(s.response&&s.response.status===422){const o=s.response.data.errors||{};r(o),alert("Validation error. Please check the fields."),console.log(s.response)}else alert("Failed to send message.")}};return e.jsxs("div",{className:"container",children:[e.jsx("div",{className:"text-center mt-5",children:e.jsx("h6",{className:"h1",children:"Contact Us"})}),e.jsx("div",{className:"row d-flex justify-content-md-center",children:e.jsx("div",{className:"col-md-4",children:e.jsxs("div",{className:"border border-black rounded p-md-5",children:[e.jsx("h2",{className:"h2",children:"Get in Touch"}),e.jsx("form",{onSubmit:m,noValidate:!0,children:e.jsxs("div",{className:"",children:[e.jsxs("div",{className:"w-full px-2 mb-4",children:[e.jsx("h3",{children:"Leave a Message : "}),e.jsx("textarea",{className:`form-control w-full h-40 p-3 border rounded-lg focus:outline-none resize-none ${t.message?"border-red-500":a.message}`,name:"feedback",id:"feedback",value:a.message,onChange:i,placeholder:"Enter Feedback",required:!0}),t.message&&e.jsx("p",{className:"text-red-500 text-xs mt-1",children:t.message[0]})]}),e.jsx("div",{className:"container",children:e.jsx(x,{className:"btn btn-dark w-100 mb-2",type:"submit",children:"Send Message"})})]})})]})})})]})},g=p;export{g as F};
