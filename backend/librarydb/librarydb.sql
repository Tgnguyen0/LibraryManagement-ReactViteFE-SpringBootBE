CREATE librarydb IF NOT EXISTS; 

CREATE TABLE books (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(150) NOT NULL,
    category VARCHAR(100),
    publisher VARCHAR(150),
    published_year INT,
    quantity INT DEFAULT 0,
    description TEXT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


INSERT INTO books 
(title, author, category, publisher, published_year, quantity, description, image_url)
VALUES
('Clean Code', 'Robert C. Martin', 'Programming', 'Prentice Hall', 2008, 12, 'Sách về viết code sạch và dễ bảo trì', 'https://images-na.ssl-images-amazon.com/images/I/41SH-SvWPxL._SX374_BO1,204,203,200_.jpg'),

('Spring Boot in Action', 'Craig Walls', 'Programming', 'Manning', 2016, 8, 'Hướng dẫn Spring Boot từ cơ bản đến nâng cao', 'https://images-na.ssl-images-amazon.com/images/I/51WIKlio9qL._SX397_BO1,204,203,200_.jpg'),

('React Quickly', 'Azat Mardan', 'Frontend', 'Manning', 2017, 6, 'Học React nhanh chóng cho người mới', 'https://images-na.ssl-images-amazon.com/images/I/51+R2H3vSUL._SX397_BO1,204,203,200_.jpg'),

('Design Patterns', 'Erich Gamma', 'Software Engineering', 'Addison-Wesley', 1994, 5, 'Các mẫu thiết kế phần mềm kinh điển', 'https://images-na.ssl-images-amazon.com/images/I/51szD9HC9pL._SX342_SY445_QL70_ML2_.jpg'),

('The Pragmatic Programmer', 'Andrew Hunt', 'Programming', 'Addison-Wesley', 1999, 10, 'Kinh nghiệm thực tế trong lập trình', 'https://images-na.ssl-images-amazon.com/images/I/41as+WafrFL._SX380_BO1,204,203,200_.jpg'),

('You Don’t Know JS', 'Kyle Simpson', 'JavaScript', 'O''Reilly', 2015, 7, 'Hiểu sâu về JavaScript', 'https://images-na.ssl-images-amazon.com/images/I/81kqrwS1nNL.jpg'),

('Introduction to Algorithms', 'Thomas H. Cormen', 'Algorithms', 'MIT Press', 2009, 4, 'Sách thuật toán kinh điển', 'https://images-na.ssl-images-amazon.com/images/I/41SN7PSz5jL._SX258_BO1,204,203,200_.jpg'),

('Head First Java', 'Kathy Sierra', 'Programming', 'O''Reilly', 2005, 9, 'Học Java theo cách trực quan', 'https://images-na.ssl-images-amazon.com/images/I/51v6ZpFyaFL._SX430_BO1,204,203,200_.jpg'),

('Effective Java', 'Joshua Bloch', 'Programming', 'Addison-Wesley', 2018, 11, 'Best practices khi lập trình Java', 'https://images-na.ssl-images-amazon.com/images/I/41-+6s8YcYL._SX376_BO1,204,203,200_.jpg'),

('Database System Concepts', 'Abraham Silberschatz', 'Database', 'McGraw-Hill', 2010, 3, 'Kiến thức nền tảng về cơ sở dữ liệu', 'https://images-na.ssl-images-amazon.com/images/I/51lH4u7U8NL._SX258_BO1,204,203,200_.jpg');