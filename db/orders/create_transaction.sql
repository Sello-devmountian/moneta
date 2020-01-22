insert into moneta_transactions
(
 c_id, total, paid
) values (
 ${c_id}, ${total}, TRUE
)
returning *;