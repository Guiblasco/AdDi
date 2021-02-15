drop database if  exists appDIAD;


create database if not exists appDIAD;
use appDIAD;
create table users(
id_user int auto_increment primary key,
nom_usuari varchar(30),
nom_complet varchar (30),
pass varchar(20),
img_avatar blob
);

create table profes(
id_profe int primary key,
departament varchar(10),
foreign key (id_profe) references users (id_user)
);
create table alumnes(
id_alumne int primary key,
repetidor boolean,
curs int,
foreign key (id_alumne) references users (id_user)
);
create table assignatures(
id_assignatura int auto_increment primary key,
nom_curt varchar (3),
nom_llarg varchar (30),
hores int,
modul varchar (10),
curs int
);
create table docencia(
id_profe int , 
id_alumne int ,
id_assignatura int,
nota float,
foreign key (id_profe) references profes (id_profe),
foreign key (id_alumne) references alumnes (id_alumne),
foreign key (id_assignatura) references assignatures (id_assignatura),
primary key (id_alumne,id_assignatura)
);
create table sms(
id_sms int auto_increment,
emisor int ,
receptor int,
sms varchar (140),
img varchar (100),
foreign key (emisor) references users (id_user),
foreign key (receptor) references users (id_user),
primary key (id_sms, emisor)
);
INSERT INTO `users` (`nom_usuari`,`nom_complet`,`pass`) VALUES 
("Felix","MacKensie Lynch","ZIE02XNL1DK"),
("Tatum","Rhonda Y. Conley","HAB99ZNG4OD"),
("Caesar","Christian U. Pope","PTA04EIB6VJ"),
("Daquan","Channing Munoz","JBU91BJW9EY"),
("Noelani","Jackson Mcdonald","SSH30OBB6AB"),
("Zane","Lewis Gates","FNF64AYZ8ZB");

INSERT INTO profes (id_profe,departament) VALUES 
(1,"dept 1"),
(2,"dept 2");
INSERT INTO alumnes (id_alumne,curs,repetidor) VALUES 
(3,1,false),
(4,1,true),
(5,2,false),
(6,2,true);
INSERT INTO assignatures (nom_curt,nom_llarg,hores,modul,curs) VALUES 
("DI","Disseny d'interfícies",6,"DAM",2),
("LMI","Llenguatge de marques",4,"ASIX",1),
("AD","Acces a dades ",8,"DAM",2),
("PRG","Programació",9,"DAM",1);
INSERT INTO docencia (id_profe,id_alumne,id_assignatura,nota) VALUES
(1,3,1,4),
(1,4,1,8),
(2,5,4,4),
(2,6,3,10); 
