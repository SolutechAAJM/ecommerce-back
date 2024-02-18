-- database: pgsql
-- Software: Ecommerce Solutech
-- Database version: 1.0.0
-- Date: 17/02/2024
-- Writer: maicol.alvarez

--First Module "Permissions"


--Making table modules for create permisions 
CREATE TABLE public.module (
    id serial primary key not null,
    name varchar(30) NOT NULL,
    permision_name text NOT NULL,
    description text
);


--Making table controller for create permision

CREATE TABLE public.controller (
    id serial primary key not null,
    idmodule integer NOT NULL,
    name character varying(50) NOT NULL,
    description text,
    permision_name text,
    active boolean DEFAULT true NOT NULL,
	foreign key (idmodule) references public.module(id)
);

--making table action for controller permisiions into the software system 


CREATE TABLE public.action (
    id serial primary key  NOT NULL,
    idcontroller integer NOT NULL,
    name character varying(250) NOT NULL,
    permision_name text NOT NULL,
    description text,
    active boolean DEFAULT true NOT NULL,
    editable boolean DEFAULT false NOT NULL,
    foreign key (idcontroller) references public.controller(id)
);	

INSERT INTO module 
(
	name, permision_name, description
)
values 
(
'Auth', 'Auth Permisions', 'This is the authentication module'
);

INSERT INTO controller 
(
	idmodule, name, description, permision_name, active 
)
values 
(
   1, 'authpermissions', 'This is the controller for authetication permises', 'authpermissions', true
);


INSERT INTO action 
(
	idcontroller, name, description, permision_name, active, editable
)
values 
(
   1, 'loginpermisions', 'This is the controller for login permises', 'loginpermisions', true, true
);


----------------------------------------- Second Module Users -------------------------------------------

-- Making table user for save users into system database

CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  fullname VARCHAR(50),
  email VARCHAR(30),
  password VARCHAR(30),
  role varchar(40),
	createdAt date,
	address varchar(50),
	phone varchar(20),
	creditPoints int,
	isActive bool
);


----------------------------------------------------- Third Module: Products ----------------------------------------------------

create table public.category (
	id serial primary key not null,
	name character varying(30) not null,
	description text,
	active boolean default true not null
);

INSERT INTO public.category (name, description, active)
VALUES 
('Categoria ejemplo', 'Esta es una categoría de ejemplo', true);


create table public.type (
	id serial primary key not null,
	name character varying(30) not null,
	description text,
	active boolean default true not null
);
INSERT INTO public.type (name, description, active)
VALUES 
('Tipo ejemplo', 'Este es un tipo de producto de ejemplo', true);


create table public.product 
(
	id serial primary key not null,
	name character varying(100) not null,
	description text, 
	price float not null,
	stock int not null,
	characteristics text,
	is_offer boolean default false not null,
	date_creation timestamp not null,
	last_modify timestamp,
	id_type int,
	id_category int,
	id_last_modifier int,
	foreign key (id_type) references type(id),
	foreign key (id_category) references category(id),
	foreign key (id_last_modifier) references "user"(id)
);


INSERT INTO public.product (name, description, price, stock, characteristics, is_offer, date_creation, id_type, id_category, id_last_modifier)
VALUES 
('Producto de ejemplo',
 'Este es un producto de ejemplo',
 25.99,
 100, 
 '{properties: {Color: Rojo, Tamaño: Pequeño, talla: "xl"}, version: 2.0}', 
 false, 
 CURRENT_TIMESTAMP,
 1,
 1,
 1);

delete from product
-- Created tables now
select * from module
select * from controller
select * from action
select * from "user"
select * from category
select * from type
select * from product


