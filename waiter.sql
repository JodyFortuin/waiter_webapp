create table days(
	Monday text[],
    Tuesday text[],
    Wednesday text[],
    Thursday text[],
    Friday text[],
    Saturday text[],
    Sunday text[]
);

create table waiters (
	id serial not null primary key,
        waiter text
);

/*insert into days(Monday) values('{"Jo", "Jack"}');
update users set greet_count = greet_count + 1 where name = $1
update days set Monday values(+$1);*/
insert into days(Monday) values($1)
