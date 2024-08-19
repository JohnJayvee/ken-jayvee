import { API_ENDPOINTS } from "../../BaseUrl";
import Error from "../Error";
import useHttp from "../Hooks/useHttp";
import Table from "./Table";

export default function PlaceOrder() {
  const {
    // destructuring from the custom Http Hookf to get hold of the data that's eventually returned
    data: loadedItem, // set the alias loadedMeals already for the Data fetched
    isLoading,
    error,
  } = useHttp(API_ENDPOINTS.FETCH_ORDERS, requestConfig, []);

  if (isLoading) {
    return <p className="h2">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch Orders" message={error} />; //since I'm setting the error state to the error message(useHttp.jsx).
  }
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
