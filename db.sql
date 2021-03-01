-- Table: public.url

-- DROP TABLE public.url;

CREATE TABLE public.url
(
    expire_date date NOT NULL,
    id bigint NOT NULL,
    url text COLLATE pg_catalog."default" NOT NULL,
    "urlShort" text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT url_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.url
    OWNER to postgres;