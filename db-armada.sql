--
-- PostgreSQL database dump
--

-- Dumped from database version 11.3
-- Dumped by pg_dump version 11.3

-- Started on 2020-06-30 17:40:31

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
-- TOC entry 196 (class 1259 OID 16804)
-- Name: chauffeur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chauffeur (
    id bigint NOT NULL,
    nom character varying NOT NULL,
    prenom character varying NOT NULL,
    datenaiss date NOT NULL,
    adresse character varying NOT NULL,
    numTel character varying(14),
    sexe character(1) NOT NULL,
    affectation bigint NOT NULL
);


ALTER TABLE public.chauffeur OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 16810)
-- Name: chauffeur_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chauffeur_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chauffeur_id_seq OWNER TO postgres;

--
-- TOC entry 2876 (class 0 OID 0)
-- Dependencies: 197
-- Name: chauffeur_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chauffeur_id_seq OWNED BY public.chauffeur.id;


--
-- TOC entry 198 (class 1259 OID 16812)
-- Name: fichier; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fichier (
    id bigint NOT NULL,
    type character varying(30) NOT NULL,
    nom character varying(100),
    url character varying(150),
    contenu xml
);


ALTER TABLE public.fichier OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 16815)
-- Name: fichier_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.fichier_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fichier_id_seq OWNER TO postgres;

--
-- TOC entry 2877 (class 0 OID 0)
-- Dependencies: 199
-- Name: fichier_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.fichier_id_seq OWNED BY public.fichier.id;


--
-- TOC entry 200 (class 1259 OID 16817)
-- Name: maintenance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.maintenance (
    id bigint NOT NULL,
    type character varying(150) NOT NULL,
    niveau integer[] NOT NULL,
    echelon integer[] NOT NULL,
    date_debut timestamp(4) without time zone NOT NULL,
    date_fin timestamp without time zone NOT NULL,
    vehicule bigint NOT NULL,
    affectation bigint NOT NULL,
    besoin xml
);


ALTER TABLE public.maintenance OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 16823)
-- Name: maintenance_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.maintenance_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.maintenance_id_seq OWNER TO postgres;

--
-- TOC entry 2878 (class 0 OID 0)
-- Dependencies: 201
-- Name: maintenance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.maintenance_id_seq OWNED BY public.maintenance.id;


--
-- TOC entry 209 (class 1259 OID 16940)
-- Name: ref_maintenance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ref_maintenance (
    id integer NOT NULL,
    type character varying(150) NOT NULL,
    niveau integer[] NOT NULL,
    echelon integer[] NOT NULL
);


ALTER TABLE public.ref_maintenance OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16938)
-- Name: ref_maintenance_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ref_maintenance_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ref_maintenance_id_seq OWNER TO postgres;

--
-- TOC entry 2879 (class 0 OID 0)
-- Dependencies: 208
-- Name: ref_maintenance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ref_maintenance_id_seq OWNED BY public.ref_maintenance.id;


--
-- TOC entry 202 (class 1259 OID 16843)
-- Name: unite; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.unite (
    id bigint NOT NULL,
    nom character varying(50),
    classe character varying(25) NOT NULL,
    affiliation character varying(20) NOT NULL,
    region character varying(15) NOT NULL
);


ALTER TABLE public.unite OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16846)
-- Name: unite_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.unite_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.unite_id_seq OWNER TO postgres;

--
-- TOC entry 2880 (class 0 OID 0)
-- Dependencies: 203
-- Name: unite_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.unite_id_seq OWNED BY public.unite.id;


--
-- TOC entry 204 (class 1259 OID 16848)
-- Name: utilisateur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.utilisateur (
    id bigint NOT NULL,
    type integer,
    username character varying(50),
    password character varying(70),
    nom character varying(50),
    prenom character varying(70),
    datenaiss date,
    adresse character varying(255),
    sexe character(1),
    numtel character varying(14),
    mail character varying(200),
    affectation bigint
);


ALTER TABLE public.utilisateur OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 16851)
-- Name: utilisateur_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.utilisateur_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.utilisateur_id_seq OWNER TO postgres;

--
-- TOC entry 2881 (class 0 OID 0)
-- Dependencies: 205
-- Name: utilisateur_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.utilisateur_id_seq OWNED BY public.utilisateur.id;


--
-- TOC entry 206 (class 1259 OID 16853)
-- Name: vehicule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vehicule (
    id bigint NOT NULL,
    type character varying(50) NOT NULL,
    marque character varying(50) NOT NULL,
    modele character varying(50) NOT NULL,
    matricule_interne character varying(20) NOT NULL,
    matricule_externe character varying(20) NOT NULL,
    affectation bigint NOT NULL
);


ALTER TABLE public.vehicule OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 16856)
-- Name: vehicule_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vehicule_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.vehicule_id_seq OWNER TO postgres;

--
-- TOC entry 2882 (class 0 OID 0)
-- Dependencies: 207
-- Name: vehicule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vehicule_id_seq OWNED BY public.vehicule.id;


--
-- TOC entry 2726 (class 2604 OID 16858)
-- Name: chauffeur id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chauffeur ALTER COLUMN id SET DEFAULT nextval('public.chauffeur_id_seq'::regclass);


--
-- TOC entry 2727 (class 2604 OID 16859)
-- Name: fichier id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fichier ALTER COLUMN id SET DEFAULT nextval('public.fichier_id_seq'::regclass);


--
-- TOC entry 2728 (class 2604 OID 16860)
-- Name: maintenance id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maintenance ALTER COLUMN id SET DEFAULT nextval('public.maintenance_id_seq'::regclass);


--
-- TOC entry 2732 (class 2604 OID 16943)
-- Name: ref_maintenance id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ref_maintenance ALTER COLUMN id SET DEFAULT nextval('public.ref_maintenance_id_seq'::regclass);


--
-- TOC entry 2729 (class 2604 OID 16864)
-- Name: unite id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unite ALTER COLUMN id SET DEFAULT nextval('public.unite_id_seq'::regclass);


--
-- TOC entry 2730 (class 2604 OID 16865)
-- Name: utilisateur id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur ALTER COLUMN id SET DEFAULT nextval('public.utilisateur_id_seq'::regclass);


--
-- TOC entry 2731 (class 2604 OID 16866)
-- Name: vehicule id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicule ALTER COLUMN id SET DEFAULT nextval('public.vehicule_id_seq'::regclass);


--
-- TOC entry 2734 (class 2606 OID 16868)
-- Name: chauffeur chauffeur_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chauffeur
    ADD CONSTRAINT chauffeur_pkey PRIMARY KEY (id);


--
-- TOC entry 2736 (class 2606 OID 16870)
-- Name: fichier fichier_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fichier
    ADD CONSTRAINT fichier_id PRIMARY KEY (id);


--
-- TOC entry 2738 (class 2606 OID 16872)
-- Name: maintenance maintenance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maintenance
    ADD CONSTRAINT maintenance_pkey PRIMARY KEY (id);


--
-- TOC entry 2746 (class 2606 OID 16948)
-- Name: ref_maintenance ref_maintenance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ref_maintenance
    ADD CONSTRAINT ref_maintenance_pkey PRIMARY KEY (id);


--
-- TOC entry 2740 (class 2606 OID 16880)
-- Name: unite unite_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unite
    ADD CONSTRAINT unite_pkey PRIMARY KEY (id);


--
-- TOC entry 2742 (class 2606 OID 16882)
-- Name: utilisateur utilisateur_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_pkey PRIMARY KEY (id);


--
-- TOC entry 2744 (class 2606 OID 16884)
-- Name: vehicule vehicule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicule
    ADD CONSTRAINT vehicule_pkey PRIMARY KEY (id);


--
-- TOC entry 2747 (class 2606 OID 16885)
-- Name: chauffeur chauffeur_affectation_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chauffeur
    ADD CONSTRAINT chauffeur_affectation_fkey FOREIGN KEY (affectation) REFERENCES public.unite(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2748 (class 2606 OID 16932)
-- Name: maintenance maintenance_affectation_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maintenance
    ADD CONSTRAINT maintenance_affectation_fkey FOREIGN KEY (affectation) REFERENCES public.unite(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2749 (class 2606 OID 16890)
-- Name: utilisateur utilisateur_affectation_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_affectation_fkey FOREIGN KEY (affectation) REFERENCES public.unite(id) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2020-06-30 17:40:32

--
-- PostgreSQL database dump complete
--

