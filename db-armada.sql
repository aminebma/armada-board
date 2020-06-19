--
-- PostgreSQL database dump
--

-- Dumped from database version 11.3
-- Dumped by pg_dump version 11.3

-- Started on 2020-06-19 21:39:56

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
-- TOC entry 197 (class 1259 OID 16490)
-- Name: Chauffeur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Chauffeur" (
    id bigint NOT NULL,
    "Nom" character(50) NOT NULL,
    "Prenom" character(70) NOT NULL,
    "DateNaiss" date NOT NULL,
    "Adresse" character(255) NOT NULL,
    "Sexe" character(1) NOT NULL,
    "Affectation" bigint NOT NULL
);


ALTER TABLE public."Chauffeur" OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 16488)
-- Name: Chauffeur_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Chauffeur_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Chauffeur_id_seq" OWNER TO postgres;

--
-- TOC entry 2890 (class 0 OID 0)
-- Dependencies: 196
-- Name: Chauffeur_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Chauffeur_id_seq" OWNED BY public."Chauffeur".id;


--
-- TOC entry 199 (class 1259 OID 16503)
-- Name: Fichier; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Fichier" (
    id bigint NOT NULL,
    "Contenu" character(1) NOT NULL
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
-- TOC entry 2891 (class 0 OID 0)
-- Dependencies: 198
-- Name: Fichier_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Fichier_id_seq" OWNED BY public."Fichier".id;


--
-- TOC entry 201 (class 1259 OID 16511)
-- Name: Maintenance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Maintenance" (
    id bigint NOT NULL,
    "Niveau" integer NOT NULL,
    "Echelon" integer NOT NULL,
    "Date" date,
    "Vehicule" bigint NOT NULL,
    "Interventions" xml
);


ALTER TABLE public."Maintenance" OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16509)
-- Name: Maintenance_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Maintenance_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Maintenance_id_seq" OWNER TO postgres;

--
-- TOC entry 2892 (class 0 OID 0)
-- Dependencies: 200
-- Name: Maintenance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Maintenance_id_seq" OWNED BY public."Maintenance".id;


--
-- TOC entry 203 (class 1259 OID 16527)
-- Name: Panne; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Panne" (
    id bigint NOT NULL,
    "Vehicule" bigint NOT NULL,
    "Code" character(10) NOT NULL,
    "Type" character(20) NOT NULL
);


ALTER TABLE public."Panne" OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16525)
-- Name: Panne_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Panne_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Panne_id_seq" OWNER TO postgres;

--
-- TOC entry 2893 (class 0 OID 0)
-- Dependencies: 202
-- Name: Panne_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Panne_id_seq" OWNED BY public."Panne".id;


--
-- TOC entry 205 (class 1259 OID 16541)
-- Name: PieceRechange; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PieceRechange" (
    id bigint NOT NULL,
    "Marque" character(20) NOT NULL,
    "Modele" character(20) NOT NULL,
    "Quantite" bigint NOT NULL
);


ALTER TABLE public."PieceRechange" OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16539)
-- Name: PieceRechange_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PieceRechange_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PieceRechange_id_seq" OWNER TO postgres;

--
-- TOC entry 2894 (class 0 OID 0)
-- Dependencies: 204
-- Name: PieceRechange_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PieceRechange_id_seq" OWNED BY public."PieceRechange".id;


--
-- TOC entry 207 (class 1259 OID 16549)
-- Name: PlanningMaintenance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PlanningMaintenance" (
    id bigint NOT NULL,
    "ListeMaintenances" xml NOT NULL
);


ALTER TABLE public."PlanningMaintenance" OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 16547)
-- Name: PlanningMaintenance_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PlanningMaintenance_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PlanningMaintenance_id_seq" OWNER TO postgres;

--
-- TOC entry 2895 (class 0 OID 0)
-- Dependencies: 206
-- Name: PlanningMaintenance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PlanningMaintenance_id_seq" OWNED BY public."PlanningMaintenance".id;


--
-- TOC entry 213 (class 1259 OID 16581)
-- Name: Unite; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Unite" (
    id bigint NOT NULL,
    "Nom" character(50),
    "Classe" character(25) NOT NULL,
    "Affiliation" character(20) NOT NULL,
    "Region" character(15) NOT NULL
);


ALTER TABLE public."Unite" OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16579)
-- Name: Unite_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Unite_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Unite_id_seq" OWNER TO postgres;

--
-- TOC entry 2896 (class 0 OID 0)
-- Dependencies: 212
-- Name: Unite_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Unite_id_seq" OWNED BY public."Unite".id;


--
-- TOC entry 209 (class 1259 OID 16560)
-- Name: Utilisateur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Utilisateur" (
    id bigint NOT NULL,
    "Type" integer,
    "Username" character(50),
    "Password" character(50),
    "Nom" character(50),
    "Prenom" character(70),
    "DateNaiss" date,
    "Adresse" character(255),
    "Sexe" character(1),
    "Affectation" bigint
);


ALTER TABLE public."Utilisateur" OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16558)
-- Name: Utilisateur_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Utilisateur_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Utilisateur_id_seq" OWNER TO postgres;

--
-- TOC entry 2897 (class 0 OID 0)
-- Dependencies: 208
-- Name: Utilisateur_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Utilisateur_id_seq" OWNED BY public."Utilisateur".id;


--
-- TOC entry 211 (class 1259 OID 16573)
-- Name: Vehicule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Vehicule" (
    id bigint NOT NULL,
    "Type" character(50) NOT NULL,
    "Marque" character(50) NOT NULL,
    "Modele" character(50) NOT NULL,
    "Matricule_interne" character(20) NOT NULL,
    "Matricule_externe" character(20) NOT NULL,
    "Affectation" bigint NOT NULL
);


ALTER TABLE public."Vehicule" OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16571)
-- Name: Vehicule_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Vehicule_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Vehicule_id_seq" OWNER TO postgres;

--
-- TOC entry 2898 (class 0 OID 0)
-- Dependencies: 210
-- Name: Vehicule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Vehicule_id_seq" OWNED BY public."Vehicule".id;


--
-- TOC entry 2735 (class 2604 OID 16493)
-- Name: Chauffeur id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Chauffeur" ALTER COLUMN id SET DEFAULT nextval('public."Chauffeur_id_seq"'::regclass);


--
-- TOC entry 2736 (class 2604 OID 16506)
-- Name: Fichier id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Fichier" ALTER COLUMN id SET DEFAULT nextval('public."Fichier_id_seq"'::regclass);


--
-- TOC entry 2737 (class 2604 OID 16514)
-- Name: Maintenance id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Maintenance" ALTER COLUMN id SET DEFAULT nextval('public."Maintenance_id_seq"'::regclass);


--
-- TOC entry 2738 (class 2604 OID 16530)
-- Name: Panne id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Panne" ALTER COLUMN id SET DEFAULT nextval('public."Panne_id_seq"'::regclass);


--
-- TOC entry 2739 (class 2604 OID 16544)
-- Name: PieceRechange id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PieceRechange" ALTER COLUMN id SET DEFAULT nextval('public."PieceRechange_id_seq"'::regclass);


--
-- TOC entry 2740 (class 2604 OID 16552)
-- Name: PlanningMaintenance id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PlanningMaintenance" ALTER COLUMN id SET DEFAULT nextval('public."PlanningMaintenance_id_seq"'::regclass);


--
-- TOC entry 2743 (class 2604 OID 16584)
-- Name: Unite id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Unite" ALTER COLUMN id SET DEFAULT nextval('public."Unite_id_seq"'::regclass);


--
-- TOC entry 2741 (class 2604 OID 16563)
-- Name: Utilisateur id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Utilisateur" ALTER COLUMN id SET DEFAULT nextval('public."Utilisateur_id_seq"'::regclass);


--
-- TOC entry 2742 (class 2604 OID 16576)
-- Name: Vehicule id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Vehicule" ALTER COLUMN id SET DEFAULT nextval('public."Vehicule_id_seq"'::regclass);


--
-- TOC entry 2745 (class 2606 OID 16495)
-- Name: Chauffeur Chauffeur_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Chauffeur"
    ADD CONSTRAINT "Chauffeur_pkey" PRIMARY KEY (id);


--
-- TOC entry 2747 (class 2606 OID 16508)
-- Name: Fichier Fichier_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Fichier"
    ADD CONSTRAINT "Fichier_id" PRIMARY KEY (id);


--
-- TOC entry 2749 (class 2606 OID 16519)
-- Name: Maintenance Maintenance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Maintenance"
    ADD CONSTRAINT "Maintenance_pkey" PRIMARY KEY (id);


--
-- TOC entry 2751 (class 2606 OID 16532)
-- Name: Panne Panne_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Panne"
    ADD CONSTRAINT "Panne_pkey" PRIMARY KEY (id);


--
-- TOC entry 2753 (class 2606 OID 16546)
-- Name: PieceRechange PieceRechange_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PieceRechange"
    ADD CONSTRAINT "PieceRechange_pkey" PRIMARY KEY (id);


--
-- TOC entry 2755 (class 2606 OID 16557)
-- Name: PlanningMaintenance PlanningMaintenance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PlanningMaintenance"
    ADD CONSTRAINT "PlanningMaintenance_pkey" PRIMARY KEY (id);


--
-- TOC entry 2761 (class 2606 OID 16586)
-- Name: Unite Unite_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Unite"
    ADD CONSTRAINT "Unite_pkey" PRIMARY KEY (id);


--
-- TOC entry 2757 (class 2606 OID 16565)
-- Name: Utilisateur Utilisateur_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Utilisateur"
    ADD CONSTRAINT "Utilisateur_pkey" PRIMARY KEY (id);


--
-- TOC entry 2759 (class 2606 OID 16578)
-- Name: Vehicule Vehicule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Vehicule"
    ADD CONSTRAINT "Vehicule_pkey" PRIMARY KEY (id);


--
-- TOC entry 2762 (class 2606 OID 16592)
-- Name: Chauffeur Chauffeur_Affectation_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Chauffeur"
    ADD CONSTRAINT "Chauffeur_Affectation_fkey" FOREIGN KEY ("Affectation") REFERENCES public."Unite"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2763 (class 2606 OID 16587)
-- Name: Utilisateur Utilisateur_Affectation_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Utilisateur"
    ADD CONSTRAINT "Utilisateur_Affectation_fkey" FOREIGN KEY ("Affectation") REFERENCES public."Unite"(id) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2020-06-19 21:39:57

--
-- PostgreSQL database dump complete
--

