import BookingInput from "../Booking/BookingInput";


function Card({title, image, cardDescription}) {
    return(
      <>
        <div className="card border-0" style={{width: "15rem"}}>
        <img src={image} className="card-img-top" alt="..."/>
  <div className="card-img-overlay text-end text-light d-flex-inline align-self-end ">
    <h5 className="card-title">{title}</h5>
    <p className="card-text ">{cardDescription}</p>
    {/* <button  className="btn btn-dark" onClick={onBook}>Book</button> */}
    <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Book
</button>
</div>

{/* mapping  */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Book a Service</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">

        <form className="container-fluid">
        <BookingInput/>
  
        </form>
      
      </div>
      <div className="modal-footer">
        <button type="submit" className="btn btn-dark">Book Now</button>
      </div>
    </div>
  </div>
</div>
  </div>
</>

       
    );
}

export default Card;