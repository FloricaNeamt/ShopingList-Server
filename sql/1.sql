CREATE TABLE Product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity VARCHAR(20) NOT NULL,
    place VARCHAR(255) NOT NULL
);

INSERT INTO Product (id, name, category, price, quantity, place) VALUES
(13, 'mere', 'Fructe', 3.5, '1kg','Raft acasa'),
(14, 'ton in ulei', 'Conserve', 15, '200g', 'kaufland');

SELECT * FROM public.product
ORDER BY id ASC 