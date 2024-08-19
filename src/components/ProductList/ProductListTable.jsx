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
  } = useHttp(API_ENDPOINTS.FETCH_ORDERS, requestConfig, []);

  if (isLoading) {
    return <p className="h2">Fetching product list data...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch Orders" message={error} />; //since I'm setting the error state to the error message(useHttp.jsx).
  }

  return (
    <div className="table-responsive small">
      <p className="h2 text-center">Product List</p>
      <p className="h3 text-warning">
        {`Total Order: ${loadedItem && loadedItem.totalOrders}`}
      </p>
      <Table className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">Product id</th>
            <th scope="col">Item</th>
            <th scope="col">Item Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Tracking #</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loadedItem &&
            loadedItem.orders &&
            loadedItem.orders.map((order) => (
              <>
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>
                    {order.email}
                    {/* <img
                src={`${API_ENDPOINTS.FETCH_IMAGE}/${order}`}
                alt={order.productName}
              /> */}
                  </td>
                  <td>{order.productName}</td>
                  <td>{order.firstName}</td>
                  <td>{order.lastName}</td>
                  <td>{order.trackingNumber}</td>
                  <td className="row me-2">
                    <Button
                      className="btn-dark col-lg-4 me-3"
                      onClick={() => {}}
                    >
                      Edit
                    </Button>
                    <Button className="btn-danger col-lg-4" onClick={() => {}}>
                      Delete
                    </Button>
                  </td>
                </tr>
              </>
            ))}
        </tbody>
      </Table>
    </div>
  );
};
export default ProductListTable;
