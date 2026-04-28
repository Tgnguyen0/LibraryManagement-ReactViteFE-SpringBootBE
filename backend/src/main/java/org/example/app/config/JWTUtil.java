package org.example.app.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

// Đánh dấu để Spring quản lý, có thể @Autowired ở bất cứ đâu
@Component
public class JWTUtil {

    // Đọc giá trị từ application.properties
    // jwt.secret=mySecretKey123456789012345678901234567890
    @Value("${jwt.secret}")
    private String secret;

    // jwt.expiration=86400000 (24 giờ tính bằng millisecond)
    @Value("${jwt.expiration}")
    private long expiration;

    /**
     * Chuyển chuỗi secret thành khóa mã hóa HMAC-SHA
     * Dùng để ký và xác thực token
     */
    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    /**
     * Tạo token JWT sau khi đăng nhập thành công
     * Ví dụ: generateToken("student", "STUDENT")
     * Trả về: "eyJhbGci...eyJzdWIi...SflKxw"
     */
    public String generateToken(String username, String role) {
        return Jwts.builder()
                .subject(username)        // Lưu username vào token: "student"
                .claim("role", role)      // Lưu role vào token:     "STUDENT"
                .issuedAt(new Date())     // Thời điểm tạo token
                .expiration(new Date(System.currentTimeMillis() + expiration)) // Hết hạn sau 24h
                .signWith(getKey())       // Ký bằng secret key để chống giả mạo
                .compact();              // Xuất ra chuỗi token hoàn chỉnh
    }

    /**
     * Lấy username từ token
     * Ví dụ: getUsername("eyJhbGci...") → "student"
     */
    public String getUsername(String token) {
        return getClaims(token).getSubject();
    }

    /**
     * Lấy role từ token
     * Ví dụ: getRole("eyJhbGci...") → "STUDENT"
     */
    public String getRole(String token) {
        return getClaims(token).get("role", String.class);
    }

    /**
     * Kiểm tra token có hợp lệ không
     * Trả về false nếu:
     *   - Token bị sửa nội dung
     *   - Token hết hạn
     *   - Token dùng sai secret key
     */
    public boolean isValid(String token) {
        try {
            getClaims(token); // Thử parse — nếu lỗi thì token không hợp lệ
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    /**
     * Giải mã token và trả về toàn bộ nội dung bên trong (payload)
     * Payload chứa: username, role, thời gian tạo, thời gian hết hạn
     * Ném JwtException nếu token không hợp lệ
     */
    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())         // Xác thực chữ ký bằng secret key
                .build()
                .parseSignedClaims(token)     // Parse chuỗi token
                .getPayload();               // Lấy nội dung payload
    }
}