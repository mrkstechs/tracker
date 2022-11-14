TRUNCATE users RESTART IDENTITY;

INSERT INTO users  users (email, firstName, lastName, username, password)
VALUES
('test@gmail.com', 'Test', 'Tester', 'testusername', '$2b$12$WBnUyP4wl83las2hJtiikOQ6OmoRA2UwJ9.PtW1uv62CSJYMsVrs.');