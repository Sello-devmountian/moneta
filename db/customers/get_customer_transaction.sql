select * from moneta_transactions t
join moneta_customers c on c.c_id = t.c_id
where c.c_id = $1;