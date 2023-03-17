CREATE TABLE films
(
    id        integer GENERATED ALWAYS AS IDENTITY
        CONSTRAINT films_pk
            PRIMARY KEY,
    film_name text    NOT NULL,
    year      integer NOT NULL
);

ALTER TABLE films
    OWNER TO postgres;

CREATE TABLE genres
(
    id         integer GENERATED ALWAYS AS IDENTITY
        CONSTRAINT genres_pk
            PRIMARY KEY,
    genre_name text NOT NULL
);

ALTER TABLE genres
    OWNER TO postgres;

CREATE TABLE "film-genre"
(
    id       integer GENERATED ALWAYS AS IDENTITY
        CONSTRAINT "film-genre_pk"
            PRIMARY KEY,
    film_id  integer NOT NULL
        CONSTRAINT "film-id___fk"
            REFERENCES films,
    genre_id integer NOT NULL
        CONSTRAINT genre_id___fk
            REFERENCES genres
);

ALTER TABLE "film-genre"
    OWNER TO postgres;

