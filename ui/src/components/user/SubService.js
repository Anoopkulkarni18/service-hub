import React, { useContext } from "react";
import { CartContext } from "./context/CartContext";
import axios from "axios";

function SubService({ stepData, handleSubServiceChange }) {
  const { cart, dispatch } = useContext(CartContext);

  const addToCart = async (subService) => {
    subService.quantity = 2;
    const { name, key, service, description, price, quantity } = subService;
    await axios.post(
      "http://localhost:4000/srv/user/updateCart",
      {
        cart: [...cart, { name, key, service, description, price, quantity }],
      },
      { headers: { token: localStorage.getItem("token") } }
    );
    dispatch({
      type: "ADD",
      value: { name, key, service, description, price, quantity },
    });
  };

  const containerStyle = {
    textAlign: "center",
    marginBottom: "20px",
  };

  const gridStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  };

  const cardStyle = {
    margin: "10px",
    padding: "10px",
    cursor: "pointer",
    width: "300px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    overflow: "hidden",
    transition: "transform 0.2s",
  };

  const cardHoverStyle = {
    transform: "scale(1.05)",
  };

  const imgStyle = {
    width: "100%",
  };

  const cardBodyStyle = {
    textAlign: "left",
  };

  const cardTitleStyle = {
    fontSize: "18px",
    fontWeight: "bold",
  };

  const buttonStyle = {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#218838",
  };

  console.log(stepData);

  return (
    <div>
      <h3 style={containerStyle}>Select a sub service</h3>
      <div style={gridStyle}>
        {stepData.map((subService, index) => (
          <div
            key={subService.key}
            style={cardStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = cardHoverStyle.transform)
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
          >
            <div
              className="card"
              style={{ height: "100%", width: "100%", border: "none" }}
            >
              <img
                src={`/${subService.key}.jpeg.jpg`}
                className="card-img-top"
                alt="..."
                style={imgStyle}
              />
              <div className="card-body" style={cardBodyStyle}>
                <h5 className="card-title" style={cardTitleStyle}>
                  {subService.name}
                </h5>
                <h5 className="card-title" style={cardTitleStyle}>
                  price:{subService.price}
                </h5>
                <p className="card-text">{subService.description}</p>
                <button
                  style={buttonStyle}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      buttonHoverStyle.backgroundColor)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      buttonStyle.backgroundColor)
                  }
                  onClick={() => addToCart(subService)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubService;
