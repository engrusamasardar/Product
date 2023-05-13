package com.restapi.controller;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restapi.model.Product;
import com.restapi.productrepointerface.ProductRepoInterface;

@RestController
@RequestMapping("/product")
@CrossOrigin
public class ProductController {

	@Autowired
	private ProductRepoInterface productImpl;

	private JSONObject json = null;

	@Autowired
	private Product product;

	@PostMapping(value = "/insert", produces = MediaType.APPLICATION_JSON_VALUE)
	public String insertProduct(@RequestBody String newProduct) {
		json = new JSONObject(newProduct);
		product.setProductName(json.getString("productName"));
		product.setProductPrice(json.getDouble("productPrice"));
		product.setProductCompanyName(json.getString("productCompanyName"));
		product.setProductContactInfo(json.getString("productCareSupportEmail"));
		json.clear();
		try {
			productImpl.save(product);
			json.put("success", "Product Inserted Successfuly");
			return json.toString();
		} catch (Exception e) {
			json.put("fail", "Product Insertion Failed");
			return json.toString();
		}
	}

	@GetMapping(value = "/retrieve", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Product> getProduct() {
		List<Product> productList = productImpl.findAll();
		if (productList != null) {
			return productList;
		}
		return productList;
	}

	@DeleteMapping(value = "/delete")
	public String deleteProduct(@RequestBody String productId) {
		json = new JSONObject(productId);
		int id = json.getInt("id");
		try {
			productImpl.deleteById(id);
			json.put("success", "Product Deleted Successfuly");
			return json.toString();
		} catch (Exception e) {
			json.put("fail", "Product Deletion Failed");
			return json.toString();
		}
	}

	@PutMapping(value = "/save")
	public String saveProduct(@RequestBody String updateProduct) {
		json = new JSONObject(updateProduct);
		product.setId(json.getInt("productId"));
		product.setProductName(json.getString("productName"));
		product.setProductPrice(json.getDouble("productPrice"));
		product.setProductCompanyName(json.getString("productCompanyName"));
		product.setProductContactInfo(json.getString("productCareSupportEmail"));
		productImpl.update(product.getId(), product.getProductName(), product.getProductPrice(),
				product.getProductCompanyName(), product.getProductContactInfo());
		json.clear();
		json.put("success", "Product Updation successful");
		return json.toString();
	}

	@GetMapping(value = "/response", produces = MediaType.APPLICATION_JSON_VALUE)
	public String testing() {
		json = new JSONObject();
		json.put("response", "Application is Running");
		return json.toString();
	}

}
