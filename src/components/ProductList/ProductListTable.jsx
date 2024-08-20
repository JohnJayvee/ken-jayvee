import { useContext, useState } from "react";
import { API_ENDPOINTS } from "../../BaseUrl";
import Error from "../Error";
import useHttp from "../Hooks/useHttp";
import Table from "../Place-Order/Table";
import Button from "../UI/Button";
import CartContext from "../../store/CartContext";
import axios from "axios";

const requestConfig = {};
const ProductListTable = ({ image }) => {
  const [deletedItem, setDeletedItem] = useState([]);
  const cartCtx = useContext(CartContext);
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://white-emu-581912.hostingersite.com/api/order/delete/${id}`
      );
      // Update the state to remove the deleted item from the UI
      setDeletedItem((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete activity:", error);
    }
  };

  return (
    <div className="table-responsive small">
      <p className="h2 text-center">Product List</p>
      <p className="h3 text-warning">
        {`Total Orders: ${loadedItem && loadedItem.totalOrders}`}
      </p>
      <Table className="table table-striped table-md">
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
                <tr className="p-lg-5" key={order.id}>
                  <td>{order.id}</td>
                  <td>
                    {
                      <img
                        key={order.id}
                        src={`${API_ENDPOINTS.FETCH_ORDERS.FETCH_IMAGE}/${image}`}
                        alt={order.productName}
                      />
                    }
                  </td>
                  <td>{order.productName}</td>
                  <td>{order.firstName}</td>
                  <td>{order.lastName}</td>
                  <td>{order.trackingNumber}</td>
                  <td className="row g-md-1">
                    <Button
                      className="btn-dark col-lg-5 me-lg-2"
                      onClick={() => {}}
                    >
                      Edit
                    </Button>
                    <Button
                      className="btn-danger col-lg-5"
                      onClick={() => {
                        handleDelete(order.id);
                        alert(`${order.productName} Deleted`);
                      }}
                    >
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
