const Error = ({ title, message }) => {
  return (
    <>
      <div className="error text-danger">
        <p className="h2">{title}</p>
        <p className="h3">{message}</p>
      </div>
    </>
  );
};

export default Error;
