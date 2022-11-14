TRUNCATE users RESTART IDENTITY;

INSERT INTO users  users (email, firstName, lastName, username, password)
VALUES
('test@gmail.com', 'Test', 'Tester', 'testusername', '');