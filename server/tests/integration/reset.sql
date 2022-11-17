TRUNCATE users, habits, goals, tracker RESTART IDENTITY;

INSERT INTO users (email, firstName, lastName, username, password)
VALUES
('test1@gmail.com', 'Test1', 'Tester', 'test1', '$2b$12$/UqRatUKrAkGrduQp5XmP.I3Gb6szpR/V/lAHiZSZ4c/GyNbmtZMW'),
('test2@gmail.com', 'Test2', 'Tester', 'test2', '$2b$12$/UqRatUKrAkGrduQp5XmP.I3Gb6szpR/V/lAHiZSZ4c/GyNbmtZMW');