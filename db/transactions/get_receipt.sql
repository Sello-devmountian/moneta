SELECT t.t_id, p.price, p.name FROM moneta_transactions t
JOIN moneta_customer_orders co ON t.t_id = co.t_id
JOIN moneta_products p ON co.p_id = p.p_id
WHERE t.t_id = ${t_id};