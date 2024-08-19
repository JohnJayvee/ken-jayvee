export default function Table({ className = "", children, ...props }) {
  return (
    <>
      <table className={`table ${className}`} {...props}>
        {children}
      </table>
    </>
  );
}
