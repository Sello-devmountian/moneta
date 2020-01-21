update moneta_customers
set (email, phone, first_name, last_name) = ($2, $3, $4, $5)
where c_id = $1
returning *; 