package com.restapi;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class Controller {
	
	@Autowired
	private EmployeeRepo repo;
	
	@PostMapping("/addUser")
	public boolean addEmp(@RequestBody employee obj) {
		repo.save(obj);
		return true;
	}
	
	@GetMapping("/getUser/{id}")
	public Optional<employee> getUser(@PathVariable("id") int id) {
		return repo.findById(id);
	}
	
	@GetMapping("/getUsers")
	public List<employee> getUsers() {
		return repo.findAll(); 
	}
	
	@DeleteMapping("/delUser/{id}")
	public void delUser(@PathVariable("id") int id) {
		repo.deleteById(id);
	}
	
	@DeleteMapping("/delUsers")
	public void delUsers() {
		repo.deleteAll();
	}
	
	@PutMapping("/upUser/{id}")
	public void upUser(@PathVariable("id") int id, @RequestBody employee obj) {
		Optional<employee> optional = repo.findById(id);
		employee emp = optional.get();
		emp.setName(obj.getName());
		emp.setEmail(obj.getEmail());
		emp.setMobile(obj.getMobile());
		emp.setActive(obj.getActive());
		repo.save(emp);
	}
}
