export default function Table({ className = "", ...props }) {
  return (
    <>
      <table className={`table ${className}`} {...props}></table>
    </>
  );
}
