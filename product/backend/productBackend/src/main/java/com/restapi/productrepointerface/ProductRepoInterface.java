package com.restapi.productrepointerface;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.restapi.model.Product;

@Repository
public interface ProductRepoInterface extends JpaRepository<Product, Integer> {

	@Transactional
	@Modifying
	@Query(value = "UPDATE product as p set p.productName = :name, p.productPrice = :price, p.productCompanyName = :companyName, p.productContactInfo = :contactInfo where p.id = :id")
	public void update(@Param("id") int id, @Param("name") String productName, @Param("price") double productPrice,
			@Param("companyName") String productCompanyName, @Param("contactInfo") String productContactInfo);
}
