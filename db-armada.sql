PGDMP                         x         	   db-armada    11.3    11.3     0           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            1           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            2           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            3           1262    16393 	   db-armada    DATABASE     �   CREATE DATABASE "db-armada" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'French_France.1252' LC_CTYPE = 'French_France.1252';
    DROP DATABASE "db-armada";
             postgres    false            �            1259    16407 	   Chauffeur    TABLE       CREATE TABLE public."Chauffeur" (
    id bigint NOT NULL,
    "Nom" character(50) NOT NULL,
    "Prenom" character(70) NOT NULL,
    "DateNaiss" date NOT NULL,
    "Adresse" character(255) NOT NULL,
    "Sexe" "char" NOT NULL,
    "Affectation" bigint NOT NULL
);
    DROP TABLE public."Chauffeur";
       public         postgres    false            �            1259    16399    Fichier    TABLE     V   CREATE TABLE public."Fichier" (
    id bigint NOT NULL,
    "Contenu" xml NOT NULL
);
    DROP TABLE public."Fichier";
       public         postgres    false            �            1259    16460    Maintenance    TABLE     �   CREATE TABLE public."Maintenance" (
    id bigint NOT NULL,
    "Niveau" integer NOT NULL,
    "Echelon" integer NOT NULL,
    "Date" date,
    "Vehicule" bigint NOT NULL,
    "Interventions" xml NOT NULL
);
 !   DROP TABLE public."Maintenance";
       public         postgres    false            �            1259    16478    Panne    TABLE     �   CREATE TABLE public."Panne" (
    id bigint NOT NULL,
    "Vehicule" bigint NOT NULL,
    "Code" character(10) NOT NULL,
    "Type" character(20) NOT NULL
);
    DROP TABLE public."Panne";
       public         postgres    false            �            1259    16473    PieceRechange    TABLE     �   CREATE TABLE public."PieceRechange" (
    id bigint NOT NULL,
    "Marque" character(20) NOT NULL,
    "Modele" character(20) NOT NULL,
    "Quantite" integer NOT NULL
);
 #   DROP TABLE public."PieceRechange";
       public         postgres    false            �            1259    16432    PlanningMaintenance    TABLE     l   CREATE TABLE public."PlanningMaintenance" (
    id bigint NOT NULL,
    "ListeMaintenances" xml NOT NULL
);
 )   DROP TABLE public."PlanningMaintenance";
       public         postgres    false            �            1259    16394    Unite    TABLE     �   CREATE TABLE public."Unite" (
    id bigint NOT NULL,
    "Nom" character(50) NOT NULL,
    "Classe" character(25) NOT NULL,
    "Affiliation" character(20) NOT NULL,
    "Region" character(15) NOT NULL
);
    DROP TABLE public."Unite";
       public         postgres    false            �            1259    16417    Utilisateur    TABLE     u  CREATE TABLE public."Utilisateur" (
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
 !   DROP TABLE public."Utilisateur";
       public         postgres    false            �            1259    16440    Vehicule    TABLE     +  CREATE TABLE public."Vehicule" (
    id bigint NOT NULL,
    "Type" character(50) NOT NULL,
    "Marque" character(50) NOT NULL,
    "Modele" character(50) NOT NULL,
    "Matricule_interne" character(20) NOT NULL,
    "Matricule_externe" character(20) NOT NULL,
    "Affectation" bigint NOT NULL
);
    DROP TABLE public."Vehicule";
       public         postgres    false            �
           2606    16411    Chauffeur Chauffeur_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Chauffeur"
    ADD CONSTRAINT "Chauffeur_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."Chauffeur" DROP CONSTRAINT "Chauffeur_pkey";
       public         postgres    false    198            �
           2606    16406    Fichier Fichier_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Fichier"
    ADD CONSTRAINT "Fichier_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Fichier" DROP CONSTRAINT "Fichier_pkey";
       public         postgres    false    197            �
           2606    16467    Maintenance Maintenance_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."Maintenance"
    ADD CONSTRAINT "Maintenance_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."Maintenance" DROP CONSTRAINT "Maintenance_pkey";
       public         postgres    false    202            �
           2606    16482    Panne Panne_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Panne"
    ADD CONSTRAINT "Panne_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Panne" DROP CONSTRAINT "Panne_pkey";
       public         postgres    false    204            �
           2606    16477     PieceRechange PieceRechange_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."PieceRechange"
    ADD CONSTRAINT "PieceRechange_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."PieceRechange" DROP CONSTRAINT "PieceRechange_pkey";
       public         postgres    false    203            �
           2606    16439 ,   PlanningMaintenance PlanningMaintenance_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."PlanningMaintenance"
    ADD CONSTRAINT "PlanningMaintenance_pkey" PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public."PlanningMaintenance" DROP CONSTRAINT "PlanningMaintenance_pkey";
       public         postgres    false    200            �
           2606    16398    Unite Unite_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Unite"
    ADD CONSTRAINT "Unite_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Unite" DROP CONSTRAINT "Unite_pkey";
       public         postgres    false    196            �
           2606    16421    Utilisateur Utilisateur_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."Utilisateur"
    ADD CONSTRAINT "Utilisateur_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."Utilisateur" DROP CONSTRAINT "Utilisateur_pkey";
       public         postgres    false    199            �
           2606    16444    Vehicule Vehicule_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Vehicule"
    ADD CONSTRAINT "Vehicule_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Vehicule" DROP CONSTRAINT "Vehicule_pkey";
       public         postgres    false    201            �
           2606    16450 $   Chauffeur Chauffeur_Affectation_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Chauffeur"
    ADD CONSTRAINT "Chauffeur_Affectation_fkey" FOREIGN KEY ("Affectation") REFERENCES public."Unite"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 R   ALTER TABLE ONLY public."Chauffeur" DROP CONSTRAINT "Chauffeur_Affectation_fkey";
       public       postgres    false    2719    196    198            �
           2606    16468 %   Maintenance Maintenance_Vehicule_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Maintenance"
    ADD CONSTRAINT "Maintenance_Vehicule_fkey" FOREIGN KEY ("Vehicule") REFERENCES public."Vehicule"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 S   ALTER TABLE ONLY public."Maintenance" DROP CONSTRAINT "Maintenance_Vehicule_fkey";
       public       postgres    false    202    2729    201            �
           2606    16483    Panne Panne_Vehicule_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Panne"
    ADD CONSTRAINT "Panne_Vehicule_fkey" FOREIGN KEY ("Vehicule") REFERENCES public."Vehicule"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 G   ALTER TABLE ONLY public."Panne" DROP CONSTRAINT "Panne_Vehicule_fkey";
       public       postgres    false    2729    204    201            �
           2606    16455 (   Utilisateur Utilisateur_Affectation_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Utilisateur"
    ADD CONSTRAINT "Utilisateur_Affectation_fkey" FOREIGN KEY ("Affectation") REFERENCES public."Unite"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 V   ALTER TABLE ONLY public."Utilisateur" DROP CONSTRAINT "Utilisateur_Affectation_fkey";
       public       postgres    false    196    199    2719            �
           2606    16445 "   Vehicule Vehicule_Affectation_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Vehicule"
    ADD CONSTRAINT "Vehicule_Affectation_fkey" FOREIGN KEY ("Affectation") REFERENCES public."Unite"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 P   ALTER TABLE ONLY public."Vehicule" DROP CONSTRAINT "Vehicule_Affectation_fkey";
       public       postgres    false    196    2719    201           