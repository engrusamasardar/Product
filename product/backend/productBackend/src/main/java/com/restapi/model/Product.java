package com.restapi.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import org.springframework.stereotype.Component;

@Component
@Entity(name = "product")
public class Product {
	
	@Id
	@Column(name = "productId")
	private int id;
	
	@Column(name = "productName")
	private String productName;
	
	@Column(name = "productCompanyName")
	private String productCompanyName;
	
	@Column(name = "productPrice")
	private double productPrice;
	
	@Column(name = "productContactInfo")
	private String productContactInfo;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getProductCompanyName() {
		return productCompanyName;
	}

	public void setProductCompanyName(String productCompanyName) {
		this.productCompanyName = productCompanyName;
	}

	public double getProductPrice() {
		return productPrice;
	}

	public void setProductPrice(double productPrice) {
		this.productPrice = productPrice;
	}

	public String getProductContactInfo() {
		return productContactInfo;
	}

	public void setProductContactInfo(String productContactInfo) {
		this.productContactInfo = productContactInfo;
	}

	@Override
	public String toString() {
		return "Product [id=" + id + ", productName=" + productName + ", productCompanyName=" + productCompanyName
				+ ", productPrice=" + productPrice + ", productContactInfo=" + productContactInfo + "]";
	}
	
	
}
