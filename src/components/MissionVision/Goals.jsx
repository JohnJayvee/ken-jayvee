import {useState} from 'react';
import { GOALS } from '../../Data';
import TabButton from './TabButton';
import About from '../About/About';

export default function Goals(){
    const [selectedTopic, setUpdatedTopic] = useState('mission');

    function handleClick(selectedTopic)
    {
       setUpdatedTopic(selectedTopic);
    }
  
    return(
    <>
         <section className='h1 text-center my-5' id='AboutUs'>
         <p> ABOUT US</p>
         </section>
         <div className='container d-flex my-5 '>
        <About />
        <div className='custom-about-bg p-5 rounded-5'>
          <div className='row justify-content-between' >
        <TabButton className='col-sm' onSelect={()=> { handleClick('mission')}}> Mission</TabButton>
        <TabButton className='col-sm' onSelect={()=> { handleClick('vision')}}> Vision</TabButton>
        </div>  

    {selectedTopic && <div className=" my-2 " style={{maxWidth: "35rem"}}>
    <div className="card-header h2 text-dark">{GOALS[selectedTopic].header}</div>
    <div className="card-body">
      <p className="card-title text-light">{GOALS[selectedTopic].topic}</p>
    </div>
    </div>} 
  </div>
      </div>
      </>
        
    )
}