import { useContext, useState } from "react";
import { API_ENDPOINTS } from "../../BaseUrl";
import Error from "../Error";
import useHttp from "../Hooks/useHttp";
import Button from "../UI/Button";
import CartContext from "../../store/CartContext";
import axios from "axios";
import UserProgressContext from "../../store/UserProgressContext";
import Table from "../UI/Table";
import { useUser } from "../../Context/UserContext";

const requestConfig = {};
const ProductListTable = () => {
  const cartCtx = useContext(CartContext);
  const [deletedItem, setDeletedItem] = useState([]);
  const [editedItem, setEditedItem] = useState([]);
  const [isAction, setIsAction] = useState(false);
  const userProgressCtx = useContext(UserProgressContext);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedItem, setLoadedItem] = useState();
  const { user } = useUser();

  // const {
  //   // destructuring from the custom Http Hookf to get hold of the data that's eventually returned
  //   data: loadedItem, // set the alias loadedMeals already for the Data fetched
  //   isLoading,
  //   error,
  // } = useHttp(API_ENDPOINTS.FETCH_ORDERS, requestConfig, []);

  setLoadedItem(() => {});
  axios.get(
    `http://white-emu-581912.hostingersite.com/api/user/orders/${user.id}`
      .then((response) => {
        setIsLoading(true);
        console.log(response.data);
      })
      .catch((error) => {
        return <Error className="text-center text-dark" message={error} />; //since I'm setting the error state to the error message(useHttp.jsx).
      })
      .finally(() => {
        if (isLoading) {
          return (
            <p className="h2 text-center">Fetching product list data...</p>
          );
        }
      })
  );
  console.log(response.data);
  // if (error) {
  //   return <Error className="text-center text-dark" message={error} />; //since I'm setting the error state to the error message(useHttp.jsx).
  // }
  console.log(loadedItem);
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://white-emu-581912.hostingersite.com/api/order/delete/${id}`
      );
      // Update the state to remove the deleted item from the UI
      setDeletedItem((prevItems) => prevItems.filter((item) => item.id !== id));

      window.location.reload();
    } catch (error) {
      console.error("Failed to delete activity:", error);
    }
  };

  const handleEditListener = async (id) => {
    try {
      await axios.put(
        `http://white-emu-581912.hostingersite.com/api/order/update/${id}`
      );
      // Update the state to remove the deleted item from the UI
      setEditedItem((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete activity:", error);
    }
  };

  const handleEdit = (order) => {
    setSelectedItem(order.id);
    console.log(order.data);
  };

  return (
    <div className="table-responsive small">
      <p className="h2 text-center">Product List</p>

      <p className="h3 text-warning col-md d-flex justify-content-md-end me-5">
        {`Total Orders: ${loadedItem && loadedItem.users.totalUserOrders}`}
      </p>

      <Table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Item Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Target Date</th>
            <th scope="col">Tracking #</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        {loadedItem &&
          loadedItem.users &&
          loadedItem.users.map((order) => (
            <tbody key={order.id}>
              <tr className="p-lg-5 ">
                <td>
                  <img
                    src={`${API_ENDPOINTS.FETCH_IMAGE}/${order.image}`}
                    alt={"image not available"}
                    style={{ height: "10rem" }}
                  />
                </td>
                <td>{order.productName}</td>
                <td>{order.firstName}</td>
                <td>{order.lastName}</td>
                <td>{order.targetDate}</td>
                <td>{order.trackingNumber}</td>

                <td className="row g-md-2">
                  <Button
                    className="btn-dark col-lg-12 p-md-4"
                    onClick={() => {
                      {
                        handleEditListener(order.id);
                      }
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    className="btn-danger col-lg-12 p-md-4"
                    onClick={() => {
                      handleDelete(order.id);
                      window.confirm(
                        `Do you want to remove ${order.productName}? `
                      );
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
      </Table>
    </div>
  );
};
export default ProductListTable;
