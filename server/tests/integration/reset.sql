TRUNCATE users, habits, goals, tracker RESTART IDENTITY;

INSERT INTO users (email, firstName, lastName, username, password)
VALUES
('test1@gmail.com', 'Test1', 'Tester', 'test1', '$2b$12$WBnUyP4wl83las2hJtiikOQ6OmoRA2UwJ9.PtW1uv62CSJYMsVrs.'),
('test2@gmail.com', 'Test2', 'Tester', 'test2', '');