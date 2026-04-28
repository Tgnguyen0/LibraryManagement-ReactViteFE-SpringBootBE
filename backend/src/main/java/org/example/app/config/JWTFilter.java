package org.example.app.config;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
// OncePerRequestFilter: đảm bảo filter chỉ chạy đúng 1 lần cho mỗi request, không bị chạy lại
public class JWTFilter extends OncePerRequestFilter {

    @Autowired
    private JWTUtil jwtUtil;

    @Override
    //    request  → thông tin request đến (header, URL, body...)
    //    response → thông tin response trả về
    //    chain    → danh sách filter tiếp theo cần chạy
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization"); // Lấy header Authorization từ request:

        // Thêm log
        System.out.println("=== JWT FILTER ===");
        System.out.println("URL   : " + request.getRequestURI());
        System.out.println("Header: " + header);

        if (header != null && header.startsWith("Bearer ")) {
            // Kiểm tra và cắt lấy token:
            // "Bearer eyJhbGci..."
            //         ↑ vị trí 7
            // substring(7) → "eyJhbGci..."
            String token = header.substring(7);
            System.out.println("Valid : " + jwtUtil.isValid(token));

            if (jwtUtil.isValid(token)) {
                String username = jwtUtil.getUsername(token);
                String role     = jwtUtil.getRole(token);

                System.out.println("User  : " + username);
                System.out.println("Role  : " + role);

                var auth = new UsernamePasswordAuthenticationToken(
                        username,                                        // principal — "student"
                        null,                                            // credentials — không cần password
                        List.of(new SimpleGrantedAuthority("ROLE_" + role)) // ["ROLE_STUDENT"]
                );
                // Spring Security dùng prefix ROLE_ để khớp với hasRole("STUDENT") trong SecurityConfig: .hasRole("STUDENT") ← Spring tự hiểu là ROLE_STUDENT
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }

        chain.doFilter(request, response);
    }
}
