insert into moneta_customer_orders
(
t_id, c_id,p_id, qty
) values (
(${t_id}), (${c_id}),(${p_id}), (${qty})
 
);
select * 
from moneta_customer_orders o
join moneta_products p on p.p_id = o.p_id
where o.t_id = (${t_id});
