import{r as s,j as e}from"./index-ud2iyfy7.js";import{a as o}from"./axios-B4uVmeYG.js";import{A as t}from"./BaseUrl-6_kCCrH9.js";import{H as i,F as l}from"./Footer-DAd9gets.js";import"./Button-Cmlg19D4.js";import"./auth-CC0Cby6h.js";function d(){const[c,n]=s.useState([]),a=s.useRef(!1);return s.useEffect(()=>{a.current||(a.current=!0,o.get(t.FETCH_FEEDBACKS,{headers:{"Content-Type":"application/json"}}).then(r=>{console.log("API Response:",r),r.data.success&&Array.isArray(r.data.feedbacks)?n(r.data.feedbacks):console.error("Unexpected response format:",r.data)}).catch(r=>{console.error("Error fetching the user feedbacks:",r)}))},[]),e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"h2 text-center text-lg font-bold",children:"USER FEEDBACK"}),e.jsx("div",{className:"container",children:e.jsx("div",{className:"row text-center",children:c.slice(0,10).map(r=>e.jsxs("div",{className:"row g-3 col-md-6 p-0 m-0",children:[e.jsx("img",{className:"rounded-circle col-md-4 w-25 align-self-md-center",src:`${t.FETCH_IMAGE}/${r.image}`,alt:r.name,style:{height:"6rem"}}),e.jsx("p",{className:"h5 font-semibold col-md-4 align-self-md-center",children:r.name}),e.jsx("h2",{className:"h6 col-md-4 align-self-md-center",children:`--${r.feedback}--`})]},r.id))})})]})}function u(){return e.jsxs(e.Fragment,{children:[e.jsx(i,{}),e.jsx(d,{}),e.jsx(l,{})]})}export{u as default};