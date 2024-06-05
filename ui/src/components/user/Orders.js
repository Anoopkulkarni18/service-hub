import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { axiosRequest } from "./util/fetchService";

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(135deg, #f3e7e9 0%, #e3eeff 100%);
    margin: 0;
    font-family: 'Arial', sans-serif;
  }
`;

const OrdersContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 40px auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
`;

const OrderCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #ffebd6;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const OrderTitle = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  background: linear-gradient(135deg, #ff6f61 0%, #de4839 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const OrderDetail = styled.p`
  margin: 5px 0;
  color: #444;
  font-weight: bold;
  font-size: 1.1rem;
`;

const Address = styled.div`
  margin-top: 10px;
  padding-left: 10px;
  border-left: 4px solid #ffab91;
`;

const AddressTitle = styled.h6`
  margin: 10px 0;
  color: #ff7043;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 1rem;
`;

const ServicePartner = styled.div`
  margin-top: 10px;
  padding-left: 10px;
  border-left: 4px solid #ff6f61;
  color: #ff6f61;
  font-weight: bold;
  font-size: 1.1rem;
`;

const ReviewContainer = styled.div`
  margin-top: 10px;
`;

const RatingSelect = styled.select`
  margin: 10px 0;
  padding: 5px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 80px;
  margin: 10px 0;
  padding: 10px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`;

const SubmitButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #ff6f61;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #de4839;
  }
`;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [ratings, setRatings] = useState({});
  const [reviews, setReviews] = useState({});

  const fetchOrders = async () => {
    const response = await axiosRequest(
      "get",
      `http://localhost:4000/srv/order/getAllOrders`,
      null,
      localStorage.getItem("token")
    );
    setOrders(response?.orders);
  };

  const handleCancelOrder = async (orderId) => {
    await axiosRequest(
      "get",
      `http://localhost:4000/srv/order/cancelOrder/${orderId}`,
      null,
      localStorage.getItem("token")
    );
    fetchOrders();
  };

  const handleRatingChange = (orderId, rating) => {
    setRatings({
      ...ratings,
      [orderId]: rating,
    });
  };

  const handleReviewChange = (orderId, review) => {
    setReviews({
      ...reviews,
      [orderId]: review,
    });
  };

  const handleReviewSubmit = async (orderId) => {
    const rating = ratings[orderId];
    const review = reviews[orderId];

    await axiosRequest(
      "post",
      `http://localhost:4000/srv/order/reviewOrder/${orderId}`,
      { rating, review },
      localStorage.getItem("token")
    );
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <GlobalStyle />
      <OrdersContainer>
        <OrderTitle>Orders</OrderTitle>
        {orders.map((item) => (
          <OrderCard key={item.orderId}>
            <OrderDetail>
              <strong>Order Name:</strong> {item.items[0].name}
            </OrderDetail>
            <OrderDetail>
              <strong>Order ID:</strong> {item.orderId}
            </OrderDetail>
            <OrderDetail>
              <strong>Order Status:</strong> {item.status}
            </OrderDetail>
            <OrderDetail>
              <strong>Name:</strong> {item.userName}
            </OrderDetail>
            <Address>
              <AddressTitle>Address:</AddressTitle>
              <OrderDetail>
                {item.addressLine1 || "NA"}, {item.addressLine2 || "NA"}
              </OrderDetail>
              <OrderDetail>
                {item.city}, {item.state} - {item.pincode}
              </OrderDetail>
              <OrderDetail>
                {item.userMobileNumber || "Mobile Number"}, {item.userEmail}
              </OrderDetail>
            </Address>
            <hr />
            <ServicePartner>
              Service Partner: {item.serviceProviderName || "Not Assigned"}
            </ServicePartner>
            <OrderDetail>
              Service Partner Mobile Number:{" "}
              {item.serviceProviderModileNumber || "Not Assigned"}
            </OrderDetail>
            {item.status !== "Cancelled" && item.status !== "Completed" && (
              <button onClick={() => handleCancelOrder(item.orderId)}>
                Cancel
              </button>
            )}
            {item.status === "Completed" && (
              <ReviewContainer>
                {!item.rating ? (
                  <>
                    <RatingSelect
                      value={ratings[item.orderId] || ""}
                      onChange={(e) =>
                        handleRatingChange(item.orderId, e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Rate the Order
                      </option>
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <option key={rating} value={rating}>
                          {rating}
                        </option>
                      ))}
                    </RatingSelect>
                    <TextArea
                      placeholder="Write your review here..."
                      value={reviews[item.orderId] || ""}
                      onChange={(e) =>
                        handleReviewChange(item.orderId, e.target.value)
                      }
                    />
                    <SubmitButton
                      onClick={() => handleReviewSubmit(item.orderId)}
                    >
                      Submit Review
                    </SubmitButton>
                  </>
                ) : (
                  <OrderDetail>
                    <strong>Rating:</strong> {item.rating}
                  </OrderDetail>
                )}
                {item.review && (
                  <OrderDetail>
                    <strong>Review:</strong> {item.review}
                  </OrderDetail>
                )}
              </ReviewContainer>
            )}
          </OrderCard>
        ))}
      </OrdersContainer>
    </>
  );
};

export default Orders;
