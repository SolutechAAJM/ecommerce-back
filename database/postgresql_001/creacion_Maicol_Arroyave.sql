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



select * from module
select * from controller
select * from action


