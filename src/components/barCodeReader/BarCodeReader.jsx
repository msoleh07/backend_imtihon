import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./barCodeReader.css";
import BarCodeScan from "./barCodeScan/BarCodeScan";
import axios from "../../api";
import { AddToCart } from "../../redux/cart";

function BarCodeReader() {
  const dispatch = useDispatch();
  let [data, setData] = useState(null);
  let [id, setId] = useState("");
  let [price, setPrice] = useState("");
  let [totalquantity, setTotalQuantity] = useState("");
  let [quantity, setQuantity] = useState(1);
  let [totalPrice, setTotalPrice] = useState("");
  const onNewScanResult = (decodedText, decodedResult) => {
    setId(decodedText);
  };
  useEffect(() => {
    axios
      .post("/pro/scan", { barcode: id })
      .then((res) => {
        setData(res.data.innerData);
        setPrice(res.data.innerData.price);
        setTotalQuantity(res.data.innerData.quantity);
        setTotalPrice(res.data.innerData.price);
      })
      .catch((res) => console.log(res));
  }, [id.length]);

  // COUNTING TOTALPRICE

  function calculatePrice(e) {
    setQuantity(e);
    setTotalPrice(e * price);
    setTotalQuantity(data.quantity - e);
  }
  console.log(data);

  // ADDING TO CART SELECTED ITEM
  function addToCart(cart) {
    cart.quantity = +quantity;
    cart.price = +price;
    cart.totalPrice = +totalPrice;
    dispatch(AddToCart(cart));
    setId("");
    setData(null);
  }

  return (
    <div className="barCodeReader">
      {!data ? (
        <BarCodeScan
          fps={10}
          qrbox={450}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
          id={id}
        />
      ) : (
        <div className="scanned">
          <p>nomi:{data?.title}</p>
          <span>asl narxi:{data?.orgPrice}</span>
          <div>
            <label>Sotiladigan narxi:</label>
            <input
              type="text"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                setTotalPrice(e.target.value * quantity);
              }}
            />
          </div>
          <div>
            <label>Bazadagi miqdori:</label>
            <input type="text" value={totalquantity} />
          </div>
          <span>kategoriyasi:{data?.category}</span>
          <div>
            <label>Sotiladigan miqdori:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                calculatePrice(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Umumiy narxi:</label>
            <input
              type="text"
              value={totalPrice}
              onChange={(e) => setTotalPrice(e.target.value)}
            />
          </div>

          <button onClick={() => addToCart(data)}>Qo'shish</button>
        </div>
      )}
      <h1>{id}</h1>
    </div>
  );
}

export default BarCodeReader;
