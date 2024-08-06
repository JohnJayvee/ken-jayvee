import Button from "../UI/Button";

export default function Table({ className = "", ...props }) {
  return (
    <>
      <table className={`table ${className}`} {...props}>
        <Button></Button>
      </table>
    </>
  );
}
