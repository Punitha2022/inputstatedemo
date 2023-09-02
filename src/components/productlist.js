import React, { useEffect, useState } from "react";
import http from "../http-common";
import ProductService from "../services/productservice";
import Search from "./search";
import { Link } from "react-router-dom";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";
function ProductList() {
 // let [username, setUsername] = useState("");
  let [authorities, setAuthorities] = useState([]);
  let [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  let jwtToken=localStorage.getItem('token')
  useEffect(() => {
   // setUsername(localStorage.getItem("username"));
    setAuthorities(localStorage.getItem("authorities"));
    getAllProducts();
  }, []);

  function getAllProducts() {
    let jwtToken=localStorage.getItem('token')
    ProductService.getAllProducts(jwtToken)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((e) => {
        alert(e.message);
        console.log(e);
      });
  }
  products = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  };
  const deleteProduct = (id,userData) => {
    if (window.confirm("Do you want to delete this product")) {
      ProductService.deleteProduct(id)
        .then((response) => {
          console.log(response.status);
          alert("product deleted successfully");
          getAllProducts();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <>
      Search <input type="text" name="search" onChange={handleChange}></input>
      <br></br>
      <table
        className="table table-striped"
        style={{ border: "1px black solid" }}
      >
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => {
            return (
              <tr key={p.id}>
                <td>
                  <img
                    src={"../images/" + `${p.id}` + ".jpg"}
                    height={"40px"}
                    width={"40px"}
                    alt="Product image"
                  ></img>
                </td>
                <td>
                  <Link to={`/viewproduct/${p.id}`}>{p.name}</Link>
                </td>
                <td>{p.price}</td>
                <td>{p.quantity}</td>
                {authorities === "Admin" ? (
                  <td>
                    <Link to={`/edit/${p.id}`} className="btn btn-primary">
                      <BsFillPencilFill></BsFillPencilFill> update
                    </Link>
                  </td>
                ) : (
                  ""
                )}
                {authorities === "Admin" ? (
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteProduct(p.id);
                      }}
                    >
                      <BsFillTrash3Fill></BsFillTrash3Fill>Remove
                    </button>
                  </td>
                ) : (
                  ""
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export default ProductList;
