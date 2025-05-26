import React, { useEffect } from "react";
import store from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchInitialData, sell } from "../slice/RTKCarsSlice";

const CarsApp = () => {
  // const { cars } = store.getState();
  const { cars } = useSelector((state) => state.cars); // retrieving state, subscribing
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInitialData());
  }, []);

  return (
    <div>
      <h3>RTK Cars</h3>
      {cars.map(({ make, quantity, id }) => (
        <div
          key={id}
          style={{
            width: "150px",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "10px",
            border: "1px solid black",
            padding: "15px",
          }}
        >
          <div>{make}</div>
          <div>{quantity}</div>
          <button onClick={() => dispatch(sell(id))}>Sell</button>
        </div>
      ))}
    </div>
  );
};

export default CarsApp;
