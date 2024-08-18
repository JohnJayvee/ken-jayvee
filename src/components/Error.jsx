const Error = (title, message) => {
  return (
    <div className="error text-danger">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Error;
