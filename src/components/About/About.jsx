import aboutImg from './about.jpg';
import './About.css';

export default function About(){
    return(
        <>
        <div className='container '>
        <img src={aboutImg} className='img-fluid h-100 rounded-5' alt="dog background" />
        </div>
        </>
    );
}