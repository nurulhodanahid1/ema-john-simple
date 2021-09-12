import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import  "./Shipment.css"

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log("after submitted:", data)
        const savedCart = getDatabaseCart()
        const orderDetails = {...loggedInUser, products: savedCart, shipment: data, orderTime: new Date()};
        
        fetch('https://evening-forest-20156.herokuapp.com/addOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(data => {
          if(data){
            processOrder()
            alert('Order added successfully');
          }
        })
    };
  
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: true })} defaultValue={loggedInUser.name} placeholder="Your name" />
        {errors.name && <span className="error">Name is required</span>}
        <input {...register("email", { required: true })} defaultValue={loggedInUser.email} placeholder="Your Email" />
        {errors.email && <span className="error">Email is required</span>}
        <input {...register("address", { required: true })} placeholder="Your address"/>
        {errors.address && <span className="error">Address is required</span>}
        <input {...register("phone", { required: true })} placeholder="Your phone number" />
        {errors.phone && <span className="error">Phone number is required</span>}
        
        <input type="submit" />
      </form>
    );
};

export default Shipment;