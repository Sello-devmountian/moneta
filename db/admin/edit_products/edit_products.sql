UPDATE moneta_products
SET
    name = ${name},
    p_image = ${p_image},
    price = ${price},
    type = ${type}
WHERE id = ${id};
SELECT * FROM moneta_products;