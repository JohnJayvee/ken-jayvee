import{r as a,j as e}from"./index-DyoPeTHG.js";import{a as i,H as o,F as l}from"./Header-xQyR3nAx.js";import{A as t}from"./BaseUrl-DVqEL8bQ.js";import"./Button-PWWCBTsc.js";function d(){const[c,n]=a.useState([]),r=a.useRef(!1);return a.useEffect(()=>{r.current||(r.current=!0,i.get(t.FETCH_FEEDBACKS,{headers:{"Content-Type":"application/json"}}).then(s=>{console.log("API Response:",s),s.data.success&&Array.isArray(s.data.feedbacks)?n(s.data.feedbacks):console.error("Unexpected response format:",s.data)}).catch(s=>{console.error("Error fetching the user feedbacks:",s)}))},[]),e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"text-center text-lg font-bold",children:"USER FEEDBACK"}),e.jsx("div",{className:"container mx-auto",children:e.jsx("div",{className:"flex flex-wrap justify-center",children:c.slice(0,3).map(s=>e.jsxs("div",{className:"w-full sm:w-1/2 lg:w-1/3 p-4",children:[e.jsx("img",{className:"rounded-circle w-25",src:`${t.FETCH_IMAGE}/${s.image}`,alt:s.name}),e.jsx("p",{className:"h3 font-semibold",children:s.name}),e.jsx("h2",{className:"h4",children:s.feedback})]},s.id))})})]})}function h(){return e.jsxs(e.Fragment,{children:[e.jsx(o,{}),e.jsx(d,{}),e.jsx(l,{})]})}export{h as default};