const PlaceOrderTable = () => {
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
              <td>1,001</td>
              <td>
                <img src="" alt="" />
                image1
              </td>
              <td>data</td>
              <td>placeholder</td>
              <td>text</td>
              <td>buttons</td>
            </tr>
            <tr>
              <td>1,002</td>
              <td>
                {" "}
                <img src="" alt="" />
                image2
              </td>
              <td>irrelevant</td>
              <td>visual</td>
              <td>layout</td>
              <td>buttons</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
export default PlaceOrderTable;
