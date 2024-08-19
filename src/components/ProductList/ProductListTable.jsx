import Button from "../UI/Button";

const ProductListTable = ({ orders }) => {
  return (
    <>
      <div className="table-responsive small">
        <table className="table table-striped table-sm">
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
            <tr>
              <td>{orders.id}</td>
              <td>
                <img
                  key={foods.id}
                  src={`${API_ENDPOINTS.FETCH_IMAGE}/${orders.image}`}
                  alt={orders.productName}
                />
              </td>
              <td>{orders.productName}</td>
              <td>{cartTotal}</td>
              <td>text</td>
              <td className="row me-2">
                <Button className="btn-dark col-lg-4 me-3">Edit</Button>
                <Button className="btn-danger col-lg-4">Delete</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
export default ProductListTable;
