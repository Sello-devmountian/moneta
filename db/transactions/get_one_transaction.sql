select * 
from moneta_transactions t
join moneta_customer_orders o on t.t_id = o.t_id
join moneta_customers c on c.c_id = t.c_id
where o.t_id = ${t_id}