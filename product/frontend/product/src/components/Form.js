import { useState } from "react";
import Inventory from "../assests/inventory.jpg";
import Swal from 'sweetalert2';

function Form() {
    const [productName, setProductName] = useState("");
    const [productPrice, setproductPrice] = useState("");
    const [productCompanyName, setproductCompanyName] = useState("");
    const [productCareSupportEmail, setproductCareSupportEmail] = useState("");

    const editableNameField = (event) => {
        setProductName(event.target.value);
    }

    const editableCompanyNameField = (event) => {
        setproductCompanyName(event.target.value);
    }

    const editablePriceField = (event) => {
        setproductPrice(event.target.value);
    }

    const editableEmailField = (event) => {
        setproductCareSupportEmail(event.target.value);
    }

    const clearFeilds = () => {
        setProductName("");
        setproductPrice("");
        setproductCompanyName("");
        setproductCareSupportEmail("");
    }

    const insert = (event) => {
        event.preventDefault();
        fetch("http://localhost:8080/product/insert", {
            method: 'post',
            body: JSON.stringify({
                productName,
                productPrice,
                productCompanyName,
                productCareSupportEmail
            })
        }).then((response) => response.json())
            .then((response) => {
                Swal.fire({
                    icon: 'success',
                    title: response.success,
                  })
            });
        clearFeilds();
    };

    return (
        <>
            <div className="container">
                <div className="card mb-3 my-3">
                    <img src={Inventory} style={{ objectFit: "scale-down"}} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h3 className="card-title"><span className="badge text-bg-dark">Add Product</span></h3>
                        <form onSubmit={insert}>
                            <div className="container">
                                <div className="row gy-1">

                                    <div className="col-3 col-sm-3">Product Name</div>
                                    <div className="col-6 col-sm-4"><input className="form-control form-control-sm" type="text" required placeholder="Please Enter Product Name" maxLength="100" value={productName} onChange={editableNameField} /></div>

                                    <div className="w-100 d-none d-md-block"></div>

                                    <div className="col-3 col-sm-3">Product Price</div>
                                    <div className="col-6 col-sm-4"><input className="form-control form-control-sm" type="number" required placeholder="Please Choose Product Price" value={productPrice} onChange={editablePriceField} /></div>

                                    <div className="w-100 d-none d-md-block"></div>

                                    <div className="col-3 col-sm-3">Product Company Name</div>
                                    <div className="col-6 col-sm-4"><input className="form-control form-control-sm" type="text" required placeholder="Please Enter Product Company Name" maxLength="50" value={productCompanyName} onChange={editableCompanyNameField} /></div>

                                    <div className="w-100 d-none d-md-block"></div>

                                    <div className="col-3 col-sm-3">Company Support Email</div>
                                    <div className="col-6 col-sm-4"><input className="form-control form-control-sm" type="email" required placeholder="Please Enter Product Care Support Email" maxLength="100" value={productCareSupportEmail} onChange={editableEmailField} /></div>

                                    <div className="w-100 d-none d-md-block"></div>

                                    <div className="col-3 col-sm-3">Add Product</div>
                                    <div className="col-6 col-sm-4"><button className="btn btn-success btn-sm" type="submit">Submit</button><span> </span>
                                        <button className="btn btn-dark btn-sm" type="button" onClick={clearFeilds}>Clear</button></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Form;