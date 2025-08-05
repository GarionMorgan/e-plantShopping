import React, {useState} from 'react';  //added useState
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const [showCheckout, setShowCheckout] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    email: '',
    address: '',
    phone: '',
    city: '',
    zipCode: ''
  });

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
        const quantity = item.quantity;
        const cost = item.cost;

        //convert cost to string
        const numCost = parseFloat(cost.substring(1));

        total += numCost * quantity
    })
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };



  const handleIncrement = (item) => {
    dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity + 1
    }));
  };

  const handleDecrement = (item) => {
   if(item.quantity > 1) {
    dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity - 1
    }));
   } else {
    dispatch(removeItem(item.name));
   }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const numericCost = parseFloat(item.cost.substring(1));
    return (item.quantity * numericCost).toFixed(2);
  };

  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    setShowCheckout(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = () => {
    if (!customerInfo.fullName || !customerInfo.email || !customerInfo.address || !customerInfo.phone) {
      alert('Please fill in all required fields (Name, Email, Address, Phone)!');
      return;
  };

  const totalAmount = calculateTotalAmount().toFixed(2);
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  

 alert(`🎉 Order Placed Successfully!

Customer: ${customerInfo.fullName}
Email: ${customerInfo.email}
Delivery Address: ${customerInfo.address}
Phone: ${customerInfo.phone}

Order Summary:
• Total Items: ${itemCount}
• Total Amount: $${totalAmount}

Your plants will be delivered within 3-5 business days!
Thank you for choosing Paradise Nursery! 🌱`);

    setShowCheckout(false);
    setCustomerInfo({
      fullName: '',
      email: '',
      address: '',
      phone: '',
      city: '',
      zipCode: ''
    });
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


