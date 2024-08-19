import { API_ENDPOINTS } from "../../BaseUrl";
import Error from "../Error";
import useHttp from "../Hooks/useHttp";
import Table from "./Table";

export default function PlaceOrder() {
  return (
    <>
      {loadedItem &&
        loadedItem.orders &&
        loadedItem.orders.map((items) => {
          <div key={items.key} className="item">
            <Table key={items.key} />
          </div>;
        })}
    </>
  );
}
