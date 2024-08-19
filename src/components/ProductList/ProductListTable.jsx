import { API_ENDPOINTS } from "../../BaseUrl";
import Error from "../Error";
import useHttp from "../Hooks/useHttp";
import Table from "../Place-Order/Table";
import Button from "../UI/Button";

const requestConfig = {};
const ProductListTable = () => {
  const {
    // destructuring from the custom Http Hookf to get hold of the data that's eventually returned
    data: loadedItem, // set the alias loadedMeals already for the Data fetched
    isLoading,
    error,
  } = useHttp(API_ENDPOINTS.FETCH_ORDERS, requestConfig);

  if (isLoading) {
    return <p className="h2">Fetching product list data...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch Orders" message={error} />; //since I'm setting the error state to the error message(useHttp.jsx).
  }
  return (
    <>
      <div className="table-responsive small">
        <Table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Product id</th>
              <th scope="col">Item</th>
              <th scope="col">Item Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loadedItem &&
              loadedItem.orders &&
              loadedItem.orders.map((orders) => {
                <tr>
                  <td>{orders.id}</td>
                  <td>
                    <img
                      key={orders.id}
                      src={`${API_ENDPOINTS.FETCH_IMAGE}/${orders.image}`}
                      alt={orders.productName}
                    />
                  </td>
                  <td>{orders.productName}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td className="row me-2">
                    <Button className="btn-dark col-lg-4 me-3">Edit</Button>
                    <Button className="btn-danger col-lg-4">Delete</Button>
                  </td>
                </tr>;
              })}
            ;
          </tbody>
        </Table>
      </div>
    </>
  );
};
export default ProductListTable;
