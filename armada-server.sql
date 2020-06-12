--
-- PostgreSQL database cluster dump
--

-- Started on 2020-06-12 16:46:41

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'md5244af1e2823d5eaeeffc42c5096d8260';






\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 11.3
-- Dumped by pg_dump version 11.3

-- Started on 2020-06-12 16:46:42

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

-- Completed on 2020-06-12 16:46:42

--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 11.3
-- Dumped by pg_dump version 11.3

-- Started on 2020-06-12 16:46:42

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

--
-- TOC entry 2867 (class 1262 OID 16393)
-- Name: db-armada; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE "db-armada" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'French_France.1252' LC_CTYPE = 'French_France.1252';


\connect -reuse-previous=on "dbname='db-armada'"

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
-- TOC entry 198 (class 1259 OID 16407)
-- Name: Chauffeur; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Chauffeur" (
    id bigint NOT NULL,
    "Nom" character(50) NOT NULL,
    "Prenom" character(70) NOT NULL,
    "DateNaiss" date NOT NULL,
    "Adresse" character(255) NOT NULL,
    "Sexe" "char" NOT NULL,
    "Affectation" bigint NOT NULL
);


--
-- TOC entry 197 (class 1259 OID 16399)
-- Name: Fichier; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Fichier" (
    id bigint NOT NULL,
    "Contenu" xml NOT NULL
);


--
-- TOC entry 202 (class 1259 OID 16460)
-- Name: Maintenance; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Maintenance" (
    id bigint NOT NULL,
    "Niveau" integer NOT NULL,
    "Echelon" integer NOT NULL,
    "Date" date,
    "Vehicule" bigint NOT NULL,
    "Interventions" xml NOT NULL
);


--
-- TOC entry 204 (class 1259 OID 16478)
-- Name: Panne; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Panne" (
    id bigint NOT NULL,
    "Vehicule" bigint NOT NULL,
    "Code" character(10) NOT NULL,
    "Type" character(20) NOT NULL
);


--
-- TOC entry 203 (class 1259 OID 16473)
-- Name: PieceRechange; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."PieceRechange" (
    id bigint NOT NULL,
    "Marque" character(20) NOT NULL,
    "Modele" character(20) NOT NULL,
    "Quantite" integer NOT NULL
);


--
-- TOC entry 200 (class 1259 OID 16432)
-- Name: PlanningMaintenance; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."PlanningMaintenance" (
    id bigint NOT NULL,
    "ListeMaintenances" xml NOT NULL
);


--
-- TOC entry 196 (class 1259 OID 16394)
-- Name: Unite; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Unite" (
    id bigint NOT NULL,
    "Nom" character(50) NOT NULL,
    "Classe" character(25) NOT NULL,
    "Affiliation" character(20) NOT NULL,
    "Region" character(15) NOT NULL
);


--
-- TOC entry 199 (class 1259 OID 16417)
-- Name: Utilisateur; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Utilisateur" (
    id bigint NOT NULL,
    "Type" integer NOT NULL,
    "Username" character(50) NOT NULL,
    "Password" character(50) NOT NULL,
    "Nom" character(50) NOT NULL,
    "Prenom" character(70) NOT NULL,
    "DateNaiss" date NOT NULL,
    "Adresse" character(255) NOT NULL,
    "Sexe" "char" NOT NULL,
    "Affectation" bigint NOT NULL
);


--
-- TOC entry 201 (class 1259 OID 16440)
-- Name: Vehicule; Type: TABLE; Schema: public; Owner: -
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


--
-- TOC entry 2723 (class 2606 OID 16411)
-- Name: Chauffeur Chauffeur_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Chauffeur"
    ADD CONSTRAINT "Chauffeur_pkey" PRIMARY KEY (id);


--
-- TOC entry 2721 (class 2606 OID 16406)
-- Name: Fichier Fichier_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Fichier"
    ADD CONSTRAINT "Fichier_pkey" PRIMARY KEY (id);


--
-- TOC entry 2731 (class 2606 OID 16467)
-- Name: Maintenance Maintenance_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Maintenance"
    ADD CONSTRAINT "Maintenance_pkey" PRIMARY KEY (id);


--
-- TOC entry 2735 (class 2606 OID 16482)
-- Name: Panne Panne_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Panne"
    ADD CONSTRAINT "Panne_pkey" PRIMARY KEY (id);


--
-- TOC entry 2733 (class 2606 OID 16477)
-- Name: PieceRechange PieceRechange_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PieceRechange"
    ADD CONSTRAINT "PieceRechange_pkey" PRIMARY KEY (id);


--
-- TOC entry 2727 (class 2606 OID 16439)
-- Name: PlanningMaintenance PlanningMaintenance_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PlanningMaintenance"
    ADD CONSTRAINT "PlanningMaintenance_pkey" PRIMARY KEY (id);


--
-- TOC entry 2719 (class 2606 OID 16398)
-- Name: Unite Unite_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Unite"
    ADD CONSTRAINT "Unite_pkey" PRIMARY KEY (id);


--
-- TOC entry 2725 (class 2606 OID 16421)
-- Name: Utilisateur Utilisateur_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Utilisateur"
    ADD CONSTRAINT "Utilisateur_pkey" PRIMARY KEY (id);


--
-- TOC entry 2729 (class 2606 OID 16444)
-- Name: Vehicule Vehicule_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Vehicule"
    ADD CONSTRAINT "Vehicule_pkey" PRIMARY KEY (id);


--
-- TOC entry 2736 (class 2606 OID 16450)
-- Name: Chauffeur Chauffeur_Affectation_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Chauffeur"
    ADD CONSTRAINT "Chauffeur_Affectation_fkey" FOREIGN KEY ("Affectation") REFERENCES public."Unite"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2739 (class 2606 OID 16468)
-- Name: Maintenance Maintenance_Vehicule_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Maintenance"
    ADD CONSTRAINT "Maintenance_Vehicule_fkey" FOREIGN KEY ("Vehicule") REFERENCES public."Vehicule"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2740 (class 2606 OID 16483)
-- Name: Panne Panne_Vehicule_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Panne"
    ADD CONSTRAINT "Panne_Vehicule_fkey" FOREIGN KEY ("Vehicule") REFERENCES public."Vehicule"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2737 (class 2606 OID 16455)
-- Name: Utilisateur Utilisateur_Affectation_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Utilisateur"
    ADD CONSTRAINT "Utilisateur_Affectation_fkey" FOREIGN KEY ("Affectation") REFERENCES public."Unite"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2738 (class 2606 OID 16445)
-- Name: Vehicule Vehicule_Affectation_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Vehicule"
    ADD CONSTRAINT "Vehicule_Affectation_fkey" FOREIGN KEY ("Affectation") REFERENCES public."Unite"(id) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2020-06-12 16:46:43

--
-- PostgreSQL database dump complete
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 11.3
-- Dumped by pg_dump version 11.3

-- Started on 2020-06-12 16:46:43

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

--
-- TOC entry 1 (class 3079 OID 16384)
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- TOC entry 2806 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


-- Completed on 2020-06-12 16:46:44

--
-- PostgreSQL database dump complete
--

-- Completed on 2020-06-12 16:46:44

--
-- PostgreSQL database cluster dump complete
--

