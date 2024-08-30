const Error = ({ title, message, className = "", ...props }) => {
  return (
    <>
      <div className={`error ${className}`} {...props}>
        <p className="h2">{title}</p>
        <p className="h3">{message}</p>
      </div>
    </>
  );
};

export default Error;
