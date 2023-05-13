package com.restapi;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class employee {
	
	@Id
	private int id;
	private String name;
	private String email;
	private String mobile;
	private char active;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public char getActive() {
		return active;
	}

	public void setActive(char active) {
		this.active = active;
	}
}