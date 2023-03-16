create table films
(
    id integer generated always as identity
        constraint films_pk
            primary key,
    film_name text not null,
    year integer not null
);

alter table films owner to postgres;

create table genres
(
    id integer generated always as identity
        constraint genres_pk
            primary key,
    genre_name text not null
);

alter table genres owner to postgres;

create table "film-genre"
(
    id integer generated always as identity
        constraint "film-genre_pk"
            primary key,
    film_id integer not null
        constraint "film-id___fk"
            references films,
    genre_id integer not null
        constraint genre_id___fk
            references genres
);

alter table "film-genre" owner to postgres;