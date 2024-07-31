import PricingCard from "./PricingCard"

export default function AllPricing(){
    function displayPricing(createPricing){
        return(
            <PricingCard />
        )

    }
    return(
        <>
        <div className="container my-5  text-center">
        <p className="h2 my-5"> Package </p>
        </div>
        </>
    )
}