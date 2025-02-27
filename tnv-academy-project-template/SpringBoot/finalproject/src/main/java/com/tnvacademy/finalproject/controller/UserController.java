package com.tnvacademy.finalproject.controller;

import  com.tnvacademy.finalproject.model.User;
import com.tnvacademy.finalproject.service.InvalidPasswordException;
import com.tnvacademy.finalproject.service.InvalidUsernameException;
import  com.tnvacademy.finalproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth/users")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    //CRUD operations (Create Read Update Delete)

    @PostMapping("/")
    public String addUser(@RequestBody User user) {
        try {
            return userService.addUser(user);
        } catch (Exception e) {
            return "Errore nel salvataggio dell'utente";
        }
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") int id) {
        return userService.getUser(id);
    }

    //allUsers - GET
    @GetMapping("/")
    public Iterable<User> allUsers() {
        return userService.allUsers();
    }

    //updateUser - PUT
    @PutMapping("/{id}")
    public String updateUser(@PathVariable("id") int id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    //deleteUser - DELETE
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable("id") int id) {
        return userService.deleteUser(id);
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody User user) {
        try {
            return userService.login(user);
        } catch (InvalidUsernameException e) {
            System.out.println("Incorrect username");
        } catch (InvalidPasswordException e) {
            System.out.println("Incorrect password");
        }
        return null;
    }

    }
