import { useState } from "react";
import { useEffect } from "react";
import Swal from 'sweetalert2';
import Shelft from "../assests/shelf.jpg"
import Product from "../assests/product.jpg"

function List() {
    const [isEnabled, setIsEnabled] = useState(false);
    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [productPrice, setproductPrice] = useState("");
    const [productCompanyName, setproductCompanyName] = useState("");
    const [productCareSupportEmail, setproductCareSupportEmail] = useState("");
    const [product, setProduct] = useState([]);

    const updateProductName = (event) => {
        setProductName(event.target.value);
    }

    const updateProductPrice = (event) => {
        setproductPrice(event.target.value);
    }

    const updateCompanyName = (event) => {
        setproductCompanyName(event.target.value);
    }

    const updateCareSupportEmail = (event) => {
        setproductCareSupportEmail(event.target.value);
    }

    useEffect(() => {
        handleList();
    }, []);

    const handleList = () => {
        fetch("http://localhost:8080/product/retrieve")
            .then((response) => response.json())
            .then((response) => {
                // console.log(response);
                setProduct(response);
            })
    }

    const deleteProduct = (id) => {
        fetch("http://localhost:8080/product/delete", {
            method: 'delete',
            body: JSON.stringify({
                id
            })
        })
            .then((response) => response.json())
            .then((response) => {
                // console.log(response);
                Swal.fire({
                    icon: 'success',
                    title: response.success,
                })
                fetch("http://localhost:8080/product/retrieve")
                    .then((response) => response.json())
                    .then((response) => {
                        // console.log(response);
                        setProduct(response);
                    })
            });
    }

    const confirmDelete = (id) => {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(id);
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your Product has not deleted',
                    'cancel'
                )
            }
        })
    }

    const confirmEdit = (updateProduct) => {
        let timerInterval
        Swal.fire({
            title: 'Loading...',
            timer: 1000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then(() => {
            setProductId(updateProduct.id);
            setProductName(updateProduct.productName);
            setproductPrice(updateProduct.productPrice);
            setproductCompanyName(updateProduct.productCompanyName);
            setproductCareSupportEmail(updateProduct.productContactInfo);
            setIsEnabled(true);
        })
    }

    const saveProduct = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Update it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch("http://localhost:8080/product/save", {
                    method: 'put',
                    body: JSON.stringify({
                        productId,
                        productName,
                        productPrice,
                        productCompanyName,
                        productCareSupportEmail
                    })
                })
                    .then((response) => response.json())
                    .then((response) => {
                        setProductId("");
                        setProductName("");
                        setproductPrice("");
                        setproductCompanyName("");
                        setproductCareSupportEmail("");
                        setIsEnabled(false);
                        Swal.fire({
                            icon: 'success',
                            title: response.success,
                        })
                        fetch("http://localhost:8080/product/retrieve")
                            .then((response) => response.json())
                            .then((response) => {
                                setProduct(response);
                            })
                    })
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your Product has not updated',
                    'cancel'
                )
            }
        })
    }

    const cancelProduct = () => {
        setProductId("");
        setProductName("");
        setproductPrice("");
        setproductCompanyName("");
        setproductCareSupportEmail("");
        setIsEnabled(false);
    }

    const changeRowColor = (index) => {
        var tbl = document.getElementById("table");
        for (let i = 1; i <= tbl.rows.length; i++) {
            if (i === index) {
                tbl.rows[i].style.cursor = "pointer";
                tbl.rows[i].onmousemove = function () {
                    this.style.backgroundColor = "rgba(0, 150, 0, 0.1)";
                    this.style.color = "#7AA874";
                };
                tbl.rows[i].onmouseout = function () {
                    this.style.backgroundColor = "";
                    this.style.color = "";
                };
                break;
            }
        }
    }

    return (
        <div className="container">
            <div className="card mb-3">
                <img src={Shelft} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h3 className="card-title"><span className="badge text-bg-dark">Edit Product</span></h3>
                    <div className="card">
                        <div className="card-body">
                            <table className="table table-bordered" id="table">
                                <thead className="table-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Company</th>
                                        <th>Support Email</th>
                                        <th>Edit / Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        product.map((item, index) => (
                                            <tr onMouseEnter={() => changeRowColor((index + 1))} key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.productName}</td>
                                                <td>{item.productPrice}</td>
                                                <td>{item.productCompanyName}</td>
                                                <td>{item.productContactInfo}</td>
                                                <td><button type="button" className="btn btn-warning btn-sm" onClick={() => { confirmEdit(item) }} >Edit</button><span> / </span>
                                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => { confirmDelete(item.id) }} >Delete</button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="container" style={{marginTop: "1%"}} hidden={!isEnabled}>
                        <div className="card mb-3" style={{ maxWidth: "100%" }}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={Product} style={{ width: "85%" }} className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title"><span className="badge text-bg-secondary">Edit Product</span></h5>
                                        <div className="row gy-1">
                                            <div className="col-6 col-sm-3">Product ID</div>
                                            <div className="col-6 col-sm-6"><input className="form-control form-control-sm" type="text" value={productId} disabled={true} /></div>

                                            <div className="w-100 d-none d-md-block"></div>

                                            <div className="col-3 col-sm-3">Product Name</div>
                                            <div className="col-6 col-sm-6"><input className="form-control form-control-sm" type="text" value={productName} onChange={updateProductName} disabled={!isEnabled} required /></div>

                                            <div className="w-100 d-none d-md-block"></div>

                                            <div className="col-3 col-sm-3">Product Price</div>
                                            <div className="col-6 col-sm-6"><input className="form-control form-control-sm" type="number" value={productPrice} onChange={updateProductPrice} disabled={!isEnabled} required /></div>

                                            <div className="w-100 d-none d-md-block"></div>

                                            <div className="col-3 col-sm-3">Company Name</div>
                                            <div className="col-6 col-sm-6"><input className="form-control form-control-sm" type="text" value={productCompanyName} onChange={updateCompanyName} disabled={!isEnabled} required /></div>

                                            <div className="w-100 d-none d-md-block"></div>

                                            <div className="col-3 col-sm-3">Company Support Email</div>
                                            <div className="col-6 col-sm-6"><input className="form-control form-control-sm" type="email" value={productCareSupportEmail} onChange={updateCareSupportEmail} disabled={!isEnabled} required /></div>

                                            <div className="w-100 d-none d-md-block"></div>

                                            <div className="col-3 col-sm-3">Save Changes</div>
                                            <div className="col-6 col-sm-4"><button className="btn btn-success btn-sm" disabled={!isEnabled} onClick={saveProduct}>Save</button> <span>  </span>
                                                <button className="btn btn-dark btn-sm" disabled={!isEnabled} onClick={cancelProduct}>Cancel</button></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default List;