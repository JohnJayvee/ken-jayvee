import{r as d,j as e}from"./index-3KMGfd71.js";import{a as u}from"./axios-B4uVmeYG.js";import{I as c}from"./InputBlock-DiyGPa1K.js";import{B as h}from"./Button-BR-YezWj.js";const x=()=>{const[t,m]=d.useState({name:"",email:"",username:""}),[r,l]=d.useState({}),n=s=>{const{name:a,value:o}=s.target;m({...t,[a]:o}),l({...r,[a]:""})},i=async s=>{s.preventDefault();try{const a=await u.post("http://white-emu-581912.hostingersite.com/api/user/register",t,{headers:{"Content-Type":"application/json"}});a.status===200||a.status===201?(alert("Message sent successfully!"),console.log(a),m({name:"",email:"",subject:"",message:""}),l({})):alert("Failed to send message.")}catch(a){if(a.response&&a.response.status===422){const o=a.response.data.errors||{};l(o),alert("Validation error. Please check the fields."),console.log(a.response)}else alert("Failed to send message.")}};return e.jsxs("div",{className:"container",children:[e.jsx("div",{className:"text-center mt-5",children:e.jsx("h6",{className:"h1",children:"Contact Us"})}),e.jsx("div",{className:"row d-flex justify-content-md-center",children:e.jsx("div",{className:"col-md-4",children:e.jsxs("div",{className:"border border-black rounded p-md-5",children:[e.jsx("h2",{className:"h2",children:"Get in Touch"}),e.jsx("form",{onSubmit:i,noValidate:!0,children:e.jsxs("div",{className:"",children:[e.jsxs("div",{className:"px-2 mb-4",children:[e.jsx(c,{className:`form-control w-full p-3 border rounded-lg focus:outline-none ${r.name?"border-red-500":t.name?"border-green-500":"border-blue-300"}`,name:"name",id:"name",type:"text",value:t.name,onChange:n,onFocus:s=>s.target.placeholder="",onBlur:s=>s.target.placeholder="Enter your name",label:"Name"}),r.name&&e.jsx("p",{className:"text-red-500 text-xs mt-1",children:r.name[0]})]}),e.jsxs("div",{className:"w-full md:w-1/2 px-2 mb-4",children:[e.jsx(c,{className:`form-control w-full p-3 border rounded-lg focus:outline-none ${r.email?"border-red-500":t.email?"border-green-500":"border-blue-300"}`,name:"email",id:"email",type:"email",value:t.email,onChange:n,onFocus:s=>s.target.placeholder="",onBlur:s=>s.target.placeholder="Enter email address",placeholder:"Email",label:"Email"}),r.email&&e.jsx("p",{className:"text-red-500 text-xs mt-1",children:r.email[0]})]}),e.jsxs("div",{className:"w-full px-2 mb-4",children:[e.jsx("h3",{children:"Leave a Message : "}),e.jsx("textarea",{className:`form-control w-full h-40 p-3 border rounded-lg focus:outline-none resize-none ${r.message?"border-red-500":t.message}`,name:"message",id:"message",value:t.message,onChange:n,placeholder:"Enter Message",required:!0}),r.message&&e.jsx("p",{className:"text-red-500 text-xs mt-1",children:r.message[0]})]}),e.jsx("div",{className:"container",children:e.jsx(h,{className:"btn btn-dark w-100 mb-2",type:"submit",children:"Send Message"})})]})})]})})}),e.jsx("hr",{className:"border-gray-300"})]})},f=x;export{f as F};
