export default function Input({label,id, className = '', ...props}){
    return <div className={`control ${className}`}>
        <label htmlFor={id}>{label}</label>
        <input  id={id} name={id} {...props} placeholder={`Enter ${label}`} required/>
    </div>
}

