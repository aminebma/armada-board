--
-- PostgreSQL database dump
--

-- Dumped from database version 11.3
-- Dumped by pg_dump version 11.3

-- Started on 2020-06-21 19:38:52

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 199 (class 1259 OID 16503)
-- Name: Fichier; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Fichier" (
    id bigint NOT NULL,
    "Contenu" character(1),
    "Url" character varying(150),
    "Nom" character varying(100)
);


ALTER TABLE public."Fichier" OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 16501)
-- Name: Fichier_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Fichier_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Fichier_id_seq" OWNER TO postgres;

--
-- TOC entry 2856 (class 0 OID 0)
-- Dependencies: 198
-- Name: Fichier_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Fichier_id_seq" OWNED BY public."Fichier".id;


--
-- TOC entry 2727 (class 2604 OID 16506)
-- Name: Fichier id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Fichier" ALTER COLUMN id SET DEFAULT nextval('public."Fichier_id_seq"'::regclass);


--
-- TOC entry 2729 (class 2606 OID 16508)
-- Name: Fichier Fichier_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Fichier"
    ADD CONSTRAINT "Fichier_id" PRIMARY KEY (id);


-- Completed on 2020-06-21 19:38:52

--
-- PostgreSQL database dump complete
--

