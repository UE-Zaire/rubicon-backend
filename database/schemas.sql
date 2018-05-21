drop database if exists rubicon;
create database rubicon;
use rubicon;

create table users (
  id int primary key auto_increment not null,
  user_name varchar(30),
  email_id varchar(40),
  added_at timestamp default now()
);

create table histories (
  id int primary key auto_increment not null,
  name varchar(50) not null,
  user int(40),
  nodes text(5000),
  updated_at timestamp default now(),
  added_at timestamp default now(),
  foreign key (user) references users(id) on delete cascade
);

-- create table nodes (
--   id int primary key auto_increment not null,
--   url varchar(100) not null,
--   title varchar(50) not null,
--   history int(20),
--   added_at timestamp default now(),
--   foreign key (history) references histories(id) on delete cascade
-- );

-- create table links (
--   id int primary key auto_increment not null,
--   source int(20),
--   target int(20),
--   history int(20),
--   added_at timestamp default now(),
--   foreign key (source) references nodes(id) on delete cascade,
--   foreign key (target) references nodes(id) on delete cascade,
--   foreign key (history) references histories(id) on delete cascade
-- );

-- insert into histories (name, user) values("Thesis", (select id from users where email = '100006978842653239080'));
-- insert into nodes (url, title, history) values("http://www.medium.com", "medium", (select id from histories where name = "Thesis"));
-- insert into nodes (url, title, history) values("http://www.wikipedia.com", "wikipedia", (select id from histories where name = "Thesis"));  
-- insert into links (source, target, history) values((select id from nodes where title = "wikipedia"), (select id from nodes where title = "medium"), (select id from histories where name = "Thesis"));

-- insert into histories (name, user) values("SoloWeek", (select id from users where email = '100006978842653239080'));
-- insert into nodes (url, title, history) values("http://www.things.com", "things", (select id from histories where name = "SoloWeek"));
-- insert into nodes (url, title, history) values("http://www.objects.com", "objects", (select id from histories where name = "SoloWeek"));  
-- insert into links (source, target, history) values((select id from nodes where title = "things"), (select id from nodes where title = "objects"), (select id from histories where name = "SoloWeek"));




