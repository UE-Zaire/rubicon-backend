drop database if exists rubicon;
create database rubicon;
use rubicon;

create table users (
  id int primary key auto_increment not null,
  user_name varchar(30),
  email varchar(40),
  added_at timestamp default now()
);

create table nodes (
  id int primary key auto_increment not null,
  url varchar(100) not null,
  title varchar(50) not null,
  history int(20),
  added_at timestamp default now(),
  foreign key (history) references histories(id) on delete cascade
);

create table links (
  id int primary key auto_increment not null,
  source int(20),
  target int(20),
  history int(20),
  added_at timestamp default now(),
  foreign key (source) references nodes(id) on delete cascade,
  foreign key (target) references nodes(id) on delete cascade,
  foreign key (history) references histories(id) on delete cascade
);

create table histories (
  id int primary key auto_increment not null,
  name varchar(50) not null,
  user int(20),
  updated_at timestamp default now(),
  added_at timestamp default now(),
  foreign key (user) references users(id) on delete cascade
);

