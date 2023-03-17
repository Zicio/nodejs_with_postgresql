CREATE TABLE public.films
(
    id        integer GENERATED ALWAYS AS IDENTITY
        CONSTRAINT films_pk
            PRIMARY KEY,
    film_name text       NOT NULL,
    year      varchar(4) NOT NULL
);

ALTER TABLE public.films
    OWNER TO postgres;

CREATE TABLE public.genres
(
    id         integer GENERATED ALWAYS AS IDENTITY
        CONSTRAINT genres_pk
            PRIMARY KEY,
    genre_name text NOT NULL
);

ALTER TABLE public.genres
    OWNER TO postgres;

CREATE TABLE public."film-genre"
(
    id       integer GENERATED ALWAYS AS IDENTITY
        CONSTRAINT "film-genre_pk"
            PRIMARY KEY,
    film_id  integer NOT NULL
        CONSTRAINT "film-id___fk"
            REFERENCES public.films,
    genre_id integer NOT NULL
        CONSTRAINT genre_id___fk
            REFERENCES public.genres
);

ALTER TABLE public."film-genre"
    OWNER TO postgres;
