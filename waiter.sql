create table days(
	id serial not null primary key,
    day text
);

create table waiters (
	id serial not null primary key,
    waiter text
);

create table shift (
    id serial not null primary key,
    waiter_id int,
    dayid int,
    foreign key (waiter_id) references waiters(id),
    foreign key (dayid) references days(id)
);

insert into days(day) values('Monday');
insert into days(day) values('Tuesday');
insert into days(day) values('Wednesday');
insert into days(day) values('Thursday');
insert into days(day) values('Friday');
insert into days(day) values('Saturday');
insert into days(day) values('Sunday');