select * 
from moneta_transactions t
join moneta_customer_orders o on t.t_id = o.t_id
join moneta_products p on p.p_id = o.p_id
where t.t_id = $1;