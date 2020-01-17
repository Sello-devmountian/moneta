create table moneta_users (
user_id serial primary key,
username varchar(50),
password varchar(250),
is_admin boolean
);

create table moneta_customers (
c_id serial primary key,
email varchar(50),
phone integer,
first_name varchar(30),
last_name varchar(30)
)

create table moneta_transactions (
t_id serial primary key,
c_id int references moneta_customers(c_id),
total decimal,
t_date TIMESTAMP,
    paid boolean
)

create table moneta_products (
p_id serial primary key,
name varchar(50),
p_image text,
price decimal
)

create table moneta_customer_orders (
co_id serial primary key,
t_id int references moneta_transactions(t_id),
c_id int references moneta_customers(c_id),
p_id int references moneta_products(p_id),
qty int
)