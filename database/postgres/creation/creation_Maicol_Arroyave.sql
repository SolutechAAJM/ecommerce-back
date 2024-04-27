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
    permisionName text NOT NULL,
    description text
);


--Making table controller for create permision

CREATE TABLE public.controller (
    id serial primary key not null,
    idModule integer NOT NULL,
    name character varying(50) NOT NULL,
    description text,
    permisionName text,
    active boolean DEFAULT true NOT NULL,
	foreign key (idmodule) references public.module(id)
);

--making table action for controller permisiions into the software system 


CREATE TABLE public.action (
    id serial primary key  NOT NULL,
    idController integer NOT NULL,
    name character varying(250) NOT NULL,
    permisionName text NOT NULL,
    description text,
    active boolean DEFAULT true NOT NULL,
    editable boolean DEFAULT false NOT NULL,
    foreign key (idController) references public.controller(id)
);	


----------------------------------------- Second Module Users -------------------------------------------

-- Making table user for save users into system database

CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  fullName VARCHAR(50) NOT NULL,
  email VARCHAR(30) NOT NULL,
  password VARCHAR(30) NOT NULL,
  role varchar(40) NOT NULL,
	createdAt timestamp NOT NULL,
	address varchar(50) NOT NULL,
	phone varchar(20) NOT NULL,
	creditPoints int NOT NULL,
	isActive bool NOT NULL
);


----------------------------------------------------- Third Module: Products ----------------------------------------------------

create table public.category (
	id serial primary key not null,
	name character varying(30) not null,
	description text,
	active boolean default true not null
);


create table public.type (
	id serial primary key not null,
	name character varying(30) not null,
	description text,
	active boolean default true not null
);

create table public.product 
(
	id serial primary key not null,
	name character varying(100) not null,
	description text, 
	price float not null,
	stock int not null,
	characteristics text,
	isOffer boolean default false not null,
	dateCreation timestamp not null,
	lastModify timestamp,
	idType int,
	idCategory int,
	idLastModifier int,
	foreign key (idType) references type(id),
	foreign key (idCategory) references category(id),
	foreign key (idLastModifier) references "user"(id)
);



------------------------------------------- fourth Module: BUYS ------------------------------------------

-- Making table for save the posibles orders status 

create table public.orderstatus
(
	id serial primary key not null,
	name character varying(50) not null,
	description text
);


------- Making tables what save orders into database -

create table "order" 
(
	id serial primary key not null, 
	orderDate timestamp,
	addressShipment text,
	description text,
	idSpitful int not null,
	idUser int not null,
	idOrderStatus int not null,
	foreign key (idSpitful) references "user" (id),
	foreign key (idUser) references "user" (id),
	foreign key (idOrderStatus) references orderstatus(id)
);

create table public.orderdetails
(
	id serial primary key not null,
	idOrder int not null,
	idProduct int not null,
	unitPrice float,
	quantity decimal (3,2),
	discount float,
	foreign key (idOrder) references "order"(id),
	foreign key (idProduct) references product(id)
	
);


-- insertions queries


INSERT INTO module 
(
	name, permisionName, description
)
values 
(
'Auth', 'Auth Permisions', 'This is the authentication module'
);

INSERT INTO controller 
(
	idmodule, name, description, permisionName, active 
)
values 
(
   1, 'authpermissions', 'This is the controller for authetication permises', 'authpermissions', true
);


INSERT INTO action 
(
	idController, name, description, permisionName, active, editable
)
values 
(
   1, 'loginpermisions', 'This is the controller for login permises', 'loginpermisions', true, true
);




-- insert into "user" (fullName, email, password, role, createdAt, address, phone, creditPoints, isActive)
-- values
-- ('Maicol Arroyave', 'maicolaroyave10@gmail.com', 'mmdmsmdsm20002sd', 'Admin', '2023-12-01', 'Carrera 77 #20-12', '31223232', 100, true  ),
-- ('Maicol Arroyave', 'maicolaroyave10@gmail.com', 'mmdmsmdsm20002sd', 'Admin', '2023-12-01', 'Carrera 77 #20-12', '31223232', 100, true  );


INSERT INTO public.category (name, description, active)
VALUES 
('Categoria ejemplo', 'Esta es una categoría de ejemplo', true);



INSERT INTO public.type (name, description, active)
VALUES 
('Tipo ejemplo', 'Este es un tipo de producto de ejemplo', true);



-- INSERT INTO public.product (name, description, price, stock, characteristics, isOffer, dateCreation, idType, idCategory, idLastModifier)
-- VALUES 
-- ('Producto de ejemplo',
--  'Este es un producto de ejemplo',
--  25.99,
--  100, 
--  '{properties: {Color: Rojo, Tamaño: Pequeño, talla: "xl"}, version: 2.0}', 
--  false, 
--  CURRENT_TIMESTAMP,
--  1,
--  1,
--  1);


-- insert into "order" (orderDate, addressShipment, description, idSpitful, idUser, idOrderStatus)
-- values
-- ('2024-12-1', 'Carrera 77 #88a- 79', 'Piso 1', 1, 2, 1);


-- insert into orderdetails (idOrder, idProduct, unitPrice, quantity, discount )
-- values
-- (1, 1, 9100, 2, 0.20 );



-- -- Created tables now
-- select * from module
-- select * from controller
-- select * from action
-- select * from "user"
-- select * from category
-- select * from type
-- select * from product
-- select * from orderstatus
-- select * from "order"
-- select * from orderdetails


---- here we can remove tables from database with this same orden ----

-- drop table action
-- drop table controller
-- drop table module
-- drop table orderdetails
-- drop table product
-- drop table type
-- drop table category
-- drop table "order"
-- drop table orderstatus
-- drop table "user"



