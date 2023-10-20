import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "./ProductForm";
import DeleteButton from "./DeleteButton";


const UpdateUser = (props) => {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/profile/update/${id}`)
      .then((res) => {
        setUser(res.data);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const updateProduct = () => {
    axios
      .patch(`http://localhost:8000/api/products/edit/${id}`,user)
      .then((res) => {
        console.log(res);
        navigate("/products");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Update a Product</h1>
      <label htmlFor="">name</label>
      <input type="text" value={name} />
      {
      loaded && <ProductForm  
      initialTitle={user.title} 
      initialPrice={user.price} 
      initialDescription={user.description} 
        onSubmitProp={updateProduct}  
      />
    }
    <DeleteButton productId ={id} successCallback ={() => navigate("/products")}/>
      </div>
  );
};
export default UpdateUser;