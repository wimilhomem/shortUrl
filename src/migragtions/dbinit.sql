
CREATE SEQUENCE public.urls_id_seq
    INCREMENT 1
    START 9
    MINVALUE 1
    MAXVALUE 999999999
    CACHE 1;

ALTER SEQUENCE public.urls_id_seq
    OWNER TO postgres;


-- DROP TABLE public.urls;

CREATE TABLE public.urls
(
    id integer NOT NULL DEFAULT nextval('urls_id_seq'::regclass),
    "urlOriginal" character varying COLLATE pg_catalog."default" NOT NULL,
    "codigoUrlCurta" character varying COLLATE pg_catalog."default" NOT NULL,
    "dataExpiracao" timestamp with time zone NOT NULL,
    CONSTRAINT "PK_eaf7bec915960b26aa4988d73b0" PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.urls
    OWNER to postgres;
