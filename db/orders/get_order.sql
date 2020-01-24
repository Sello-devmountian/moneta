select * from moneta_customer_orders o
join moneta_products p on p.p_id = o.p_id
where o.t_id = $1;