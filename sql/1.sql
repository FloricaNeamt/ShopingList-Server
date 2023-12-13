CREATE TABLE Product (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity VARCHAR(20) NOT NULL,
    place VARCHAR(255) NOT NULL
);

INSERT INTO Product (user_id, name, category, price, quantity, place) VALUES
(3,'mere', 'Fructe', 3.5, '1kg','Raft acasa'),
(4,'ton in ulei', 'Conserve', 15, '200g', 'kaufland');

SELECT * FROM public.product
ORDER BY id ASC 

ALTER TABLE users
ADD token VARCHAR(255) 


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL

);
