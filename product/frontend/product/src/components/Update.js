import { useEffect } from "react";
import { useState } from "react";

function Update() {
    const [isEnabled, setIsEnabled] = useState(false);
    const [productName, setProductName] = useState("");
    const [productPrice, setproductPrice] = useState("");
    const [productCompanyName, setproductCompanyName] = useState("");
    const [productCareSupportEmail, setproductCareSupportEmail] = useState("");
    const [product, setProduct] = useState([]);
    const [msg, setMsg] = useState("");

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
    }, [])

    const handleList = () => {
        fetch("http://localhost:8080/product/retrieve")
            .then((response) => response.json())
            .then((response) => {
                // console.log(response);
                setProduct(response);
            })
    }

    const isChecked = (event) => {
        if (event.target.checked) {
            setIsEnabled(true);
        } else {
            setIsEnabled(false);
        }
    }

    const saveProduct = (id) => {
        fetch("http://localhost:8080/product/save", {
            method: 'put',
            body: JSON.stringify({
                id,
                productName,
                productPrice,
                productCompanyName,
                productCareSupportEmail
            })
        }).then((response) => response.json())
            .then((response) => {
                setMsg(response);
                fetch("http://localhost:8080/product/retrieve")
                    .then((response) => response.json())
                    .then((response) => {
                        // console.log(response);
                        setProduct(response);
                    })
            })
    }

    return (
        <div className="container">
            <h1>Update</h1>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={isChecked} />
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Edit</label>
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Company</th>
                        <th>Support Email</th>
                        <th>Save Product</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td><input type="text" disabled={!isEnabled} defaultValue={item.productName} onChange={updateProductName}></input></td>
                                <td><input type="number" disabled={!isEnabled} defaultValue={item.productPrice} onChange={updateProductPrice}></input></td>
                                <td><input type="text" disabled={!isEnabled} defaultValue={item.productCompanyName} onChange={updateCompanyName}></input></td>
                                <td><input type="email" disabled={!isEnabled} defaultValue={item.productContactInfo} onChange={updateCareSupportEmail}></input></td>
                                <td><button disabled={!isEnabled} onClick={() => { saveProduct(item.id) }}>Save</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <h6><span className="placeholder col-12 bg-danger">{msg.success}</span></h6>
        </div>
    );
}

export default Update;