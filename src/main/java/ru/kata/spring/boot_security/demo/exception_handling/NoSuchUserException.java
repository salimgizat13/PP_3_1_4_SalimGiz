package ru.kata.spring.boot_security.demo.exception_handling;

import java.util.NoSuchElementException;

public class NoSuchUserException extends RuntimeException {


    private String message;
    public NoSuchUserException(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }

}
