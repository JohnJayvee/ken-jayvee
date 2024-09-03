import { useContext, useState, useEffect } from "react";
import { API_ENDPOINTS } from "../../BaseUrl";
import Error from "../Error";
import Button from "../UI/Button";
import CartContext from "../../store/CartContext";
import axios from "axios";
import UserProgressContext from "../../store/UserProgressContext";
import Table from "../UI/Table";
import { useUser } from "../../Context/UserContext";

const ProductListTable = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const [deletedItem, setDeletedItem] = useState([]);
  const [editedItem, setEditedItem] = useState([]);
  const [isAction, setIsAction] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedItem, setLoadedItem] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useUser();

  const currentUser = user ? user.id : 0;

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://white-emu-581912.hostingersite.com/api/user/orders/${currentUser}`,
          { headers: { "Content-Type": "application/json" } }
        );
        setLoadedItem(response.data.user);
        console.log(response.data.user);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://white-emu-581912.hostingersite.com/api/order/delete/${id}`
      );
      setDeletedItem((prevItems) => prevItems.filter((item) => item.id !== id));
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete activity:", error);
    }
  };

  const config = {
    headers: { Authorization: `Bearer ${user?.token}` },
  };

  const handleEditListener = async (id) => {
    try {
      const response = await axios.get(
        `http://white-emu-581912.hostingersite.com/api/user/order/${id}`,
        config
      );
      userProgressCtx.setOrderData(response.data.order); //store the data in context useProgress
      console.log(response.data.order);
    } catch (error) {
      console.error("Failed to update activity:", error);
    }
  };

  function handleShowUpdateOrder(id) {
    userProgressCtx.showUpdateOrder();
    handleEditListener(id);
  }

  if (isLoading) {
    return <p className="h2 text-center">Fetching product list data...</p>;
  }

  if (error) {
    return <Error className="text-center text-dark" message={error} />;
  }

  return (
    <div className="table-responsive small">
      <p className="h2 text-center">Product List</p>

      <p className="h3 text-warning col-md d-flex justify-content-md-end me-5">
        {`Total Orders: ${loadedItem?.totalUserOrders || 0}`}
      </p>

      <Table className="table table-striped">
        <thead className="text-center">
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Item Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Target Date</th>
            <th scope="col">Total Price</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {loadedItem?.orders?.map((order) => (
            <tr key={order.id} className="p-lg-5">
              <td>
                <img
                  src={`${API_ENDPOINTS.FETCH_IMAGE}/${order.image}`}
                  alt="image not available"
                  style={{ height: "10rem" }}
                />
              </td>
              <td>{order.productName}</td>
              <td>{order.quantity}</td>
              <td>{order.targetDate}</td>
              <td>{`₱${order.totalPrice}`}</td>
              <td className="row d-flex justify-content-md-end me-2">
                <Button
                  className="btn-dark col-md-7 mb-sm-2 p-sm-4"
                  onClick={() => {
                    handleShowUpdateOrder(order.id);
                    handleEditListener(order.id);
                  }}
                >
                  Edit
                </Button>
                <Button
                  className="btn-danger col-md-7 p-sm-4 mb-sm-2"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Do you want to remove ${order.productName}?`
                      )
                    ) {
                      handleDelete(order.id);
                    }
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductListTable;
