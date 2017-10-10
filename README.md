# lembrae
A shared memo keeper made with React and Java as a Backend

scrip de alteração:

ALTER TABLE users MODIFY password CHAR(128);

ALTER TABLE users ADD COLUMN salt CHAR(32) AFTER username;
