UPDATE moneta_products
SET
    name = ${name},
    p_image = ${p_image},
    price = ${price},
    p_type = ${p_type},
    available = ${available}
WHERE p_id = ${p_id};
SELECT * FROM moneta_products;