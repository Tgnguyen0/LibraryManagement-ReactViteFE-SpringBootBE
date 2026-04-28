//package org.example.app.config;
//
//import org.example.app.models.User;
//import org.example.app.repositories.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Component;
//
//@Component
//public class DataInitializer implements CommandLineRunner {
//
//    @Autowired private UserRepository userRepository;
//    @Autowired private PasswordEncoder passwordEncoder;
//
//    @Override
//    public void run(String... args) {
//        if (userRepository.count() == 0) {
//            User student = new User();
//            student.setUsername("student");
//            student.setPassword(passwordEncoder.encode("123456"));
//            student.setRole("STUDENT");
//
//            User bookkeeper = new User();
//            bookkeeper.setUsername("bookkeeper");
//            bookkeeper.setPassword(passwordEncoder.encode("123456"));
//            bookkeeper.setRole("BOOKKEEPER");
//
//            userRepository.save(student);
//            userRepository.save(bookkeeper);
//
//            System.out.println("✅ Đã tạo user mẫu: student / bookkeeper");
//        }
//    }
//}