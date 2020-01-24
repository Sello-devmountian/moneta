insert into moneta_transactions
(
 c_id, total, t_date, paid
) values (
 ${c_id}, ${total}, ${t_date}, TRUE
)
returning *;