import Button from "../UI/Button";

export default function TabButton({children, onSelect}) {

    return( <>
        <Button onClick={onSelect} className="btn-dark" style={{width : "10rem"}}>{children}</Button>
    </>
    ) ;
        

}