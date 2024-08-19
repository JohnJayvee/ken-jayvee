import FoodItem from "../components/Food-Products/FoodItem";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { API_ENDPOINTS } from "../BaseUrl";
import Error from "../components/Error";
import useHttp from "../components/Hooks/useHttp";

const requestConfig = {}; // to avoid infinit loop in recreating a new object everytime  function run and finishes OR its only creating the OBJECT ONCE.

export default function Shop() {
  const {
    // destructuring from the custom Http Hookf to get hold of the data that's eventually returned
    data: loadedItem, // set the alias loadedMeals already for the Data fetched
    isLoading,
    error,
  } = useHttp(API_ENDPOINTS.FETCH_PRODUCTS, requestConfig, []);

  if (isLoading) {
    return <p className="h2">Fetching meals...</p>;
  }

  if (error) {
    return (
      <Error title="Failed to fetch Meals" message={error && error.success} />
    ); //since I'm setting the error state to the error message(useHttp.jsx).
  }
  return (
    <>
      <Header />
      <div className="">
        <p className="h1 text-center">Shop</p>
        <div className="container-fluid">
          <p className="h3">{`Total Products: ${loadedItem.totalProducts}`}</p>
          <ul className="row h-50" id="items">
            {/* 1. Modify the useHttp hook to return the full response object instead of extracting and returning just the products array.
        2. In the Shop component, use the dot notation to access the products array from the loadedItem object. */}
            {loadedItem &&
              loadedItem.products &&
              loadedItem.products.map((items) => (
                <div
                  className="col col-lg-2 col-md-5 my-2 justify-content-sm-center"
                  key={items.id}
                >
                  <FoodItem key={items.id} foods={items} />
                </div>
              ))}
          </ul>
        </div>
      </div>

      <Footer />
    </>
  );
}

///////////////////////////
//BEFORE :  USING AXIOS
// const [loadedItem, setLoadedItem] = useState([]);
// const initialized = useRef(false);
// const userProgressCtx = useContext(UserProgressContext);

// useEffect(() => {
//   if (!initialized.current) {
//     initialized.current = true;
//     axios
//       .get(API_ENDPOINTS.FETCH_PRODUCTS, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//       .then((response) => {
//         console.log("API Response:", response);
//         // Ensure the response data has a Products array
//         if (response.data.success && Array.isArray(response.data.products)) {
//           setLoadedItem(response.data.products);
//         } else {
//           console.error("Unexpected response format:", response.data);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching the products:", error);
//       });
//   }
// }, []);
