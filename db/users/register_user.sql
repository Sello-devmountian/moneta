INSERT INTO moneta_users (
    username,
    password,
    is_admin
) VALUES (
    ${username},
    ${hash},
    ${is_admin}
)
RETURNING *;