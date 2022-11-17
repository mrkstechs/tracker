TRUNCATE users, habits, goals, tracker RESTART IDENTITY;

INSERT INTO users (email, firstName, lastName, username, password)
VALUES
('test1@gmail.com', 'Test1', 'Tester', 'test1', '$2b$12$/UqRatUKrAkGrduQp5XmP.I3Gb6szpR/V/lAHiZSZ4c/GyNbmtZMW'),
('test2@gmail.com', 'Test2', 'Tester', 'test2', '$2b$12$5Jj91KP/f9wm0kNxsNL4nOPdsPRlKNF4xm0M3lOnCLT.wNgs/UUTG');

INSERT INTO habits (habit, recommended_daily_goal, recommended_weekly_goal)
VALUES
('Sleep', '8 hours', '56 hours'),
('Exercise', '0.5 hours', '3 hours'),
('Water', '3 litres', '56 litres');

INSERT INTO goals (user_id, habit_id, daily_goal, weekly_goal, goal_units)
VALUES
(1, 1, 8, 56, 'hours'),
(1, 2, 1, 4, 'hours'),
(1, 3, 3, 56, 'litres');

INSERT INTO tracker (habit_id, habit_daily_value, date, user_id)
VALUES
(1,8,'2022-11-7', 1),
(1,7,'2022-11-8', 1),
(1,8,'2022-11-9', 1),
(1,8,'2022-11-10', 1),
(1,9,'2022-11-11', 1),
(1,5,'2022-11-12', 1),
(1,8,'2022-11-13', 1),
(1,7,'2022-11-14', 1),
(2,2,'2022-11-7', 1),
(2,1,'2022-11-8', 1),
(2,2,'2022-11-9', 1),
(2,0,'2022-11-10', 1),
(2,1,'2022-11-11', 1),
(2,2,'2022-11-12', 1),
(2,0,'2022-11-13', 1),
(2,1,'2022-11-14', 1),
(3,4,'2022-11-7', 1),
(3,3,'2022-11-8', 1),
(3,3,'2022-11-9', 1),
(3,3,'2022-11-10', 1),
(3,2,'2022-11-11', 1),
(3,4,'2022-11-12', 1),
(3,3,'2022-11-13', 1),
(3,2,'2022-11-14', 1);