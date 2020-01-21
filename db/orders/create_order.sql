insert into moneta_customer_orders
(
t_id, c_id,p_id, qty
) values (
(${t_id}), (${c_id}),(${p_id}), (${qty})
 
);
select * from moneta_customer_orders
where t_id = (${t_id});
