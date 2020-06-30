![Loading awesome armada board logo :D](https://ibb.co/c3xBDx1)

# Armada Board
## Description
Armada Board est une plateforme de gestion de la maintenance préventive d'une flotte de véhicules offrant également un tableau de bord pour les managers.

# Fonctionnalités
## Unité d'affectation
Afin d'identifier les utilisateurs de la plateforme, chaque utilisateur sera affecté à une unité. Les unités sont créées directement au niveau de la base de données lors du déploiement de cette dernière, et ne peuvent pas être manipulées autrement.

Chaque unité dispose des informations suivantes:
- Nom de l'unité 
- Classe de l'unité
- Affiliation de l'unité
- Région de l'unité

## Comptes utilisateurs
### Création d'un compte
La plateforme comporte deux types de comptes :
1. Compte Administrateur
2. Compte Manager

Chaque type dispose de privilèges qui lui sont propres, où seul un administrateur peut créer un compte administrateur ou manager.

Chaque compte contient les informations suivantes:
- Nom d'utilisateur
- Mot de passe
- Nom
- Prénom
- Date de naissance
- Adresse de résidence
- Numéro de téléphone
- Adresse mail
- Sexe
- Identifiant de l'unité d'affectation

### Changement de mot de passe
Un utilisateur peut faire une demande de réinitialisation de son mot de passe en cas d'oubli de ce dernier en choisissant "Mot de passe oublié" au niveau de l'écran de connexion puis en saisissant son nom d'utilisateur. Ceci lui affichera les coordonnées des administrateurs affectés à son unité afin de les contacter.

Seul un administrateur peut modifier les mots de passe des utilisateurs.

### Suppression de compte

Un administrateur possède le privilège de suppression d'un compte utilisateur en saisissant son identifiant.

### Authentification
La connexion se fait au niveau de l'écran de connexion dès l'accès à la plateforme, et ce en saisissant le nom d'utilisateur et le mot de passe associé au compte. L'utilisateur restera alors connecté sauf en cas de suppression des cookies du navigateur.

## Véhicules et chauffeurs
Un administrateur possède la possibilité d'ajouter des véhicules et des chauffeurs à la plateforme, afin d'en exploiter les données de la part des managers.

Lors de l'ajout d'un véhicule, la fiche technique ainsi que le guide constructeur du véhicule concerné doivent être inclus. Chaque véhicule contiendra ensuite les informations suivantes:
- Type du véhicule
- Marque du véhicule
- Modèle du véhicule
- Matricule interne du véhicule
- Matricule externe du véhicule
- Identifiant de l'unité d'affectation

Pour les chauffeurs, l'insertion ressemble à la création d'un compte manager, sans saisir de nom d'utilisateur ou de mot de passe. Un chauffeur aura donc les informations suivantes:
- Nom
- Prénom
- Date de naissance
- Adresse de résidence
- Numéro de téléphone
- Sexe
- Identifiant de l'unité d'affectation

## Maintenances & Maintenance préventive
### Référentiel des maintenances
Armada board possède une base de référence des maintenances par type, niveau et echelon, permettant de classer aisément les maintenances selon leur type.

Seul un administrateur peut manipuler ce référentiel.

### Génération automatique du planning de maintenance
Il est possible pour un manager de générer le planning des prochaines maintenances d'un véhicule.

Pour se faire, il lui faudra sélectionner "Mise à jour du planning" au niveau du volet de maintenances, et d'uploader le carnet de bord du véhicule sous le format Excel (.xlsx)

Le planning ainsi généré prendra en compte 10 types de maintenances:
1. Vidange du moteur
2. Changement de la courroie de distribution
3. Changement des plaquettes de frein
4. Changement du liquide de frein
5. Vidange de la boite à vitesse
6. Changement de l'embrayage
7. Changement des suspensions
8. Changement des pneus
9. Parallélisme
10. Vérification/Changement des ampoules 

Chaque maintenance contient les informations suivantes:
- Type de la maintenance
- Niveau de la maintenance
- Echelon de la maintenance
- Date et heure du début de la maintenance
- Date et heure de la fin de la maintenance
- Identifiant du véhicule concerné
- Identifiant de l'unité d'affectation
- Liste des besoins de la maintenance

Pour générer ce planning, notre algorithme exploite une combinaison de cinq sources de données :
1. Fiche technique du véhicule
2. Guide constructeur du véhicule
3. Carnet de bord du véhicule
4. Référentiel des maintenances
5. Journal des maintenances

### Ajout manuel d'une maintenance
Si les maintenances générées par le planning ne suffisent pas, un manager a la possibilité d'ajouter manuellement une maintenance à partir du calendrier au niveau du volet maintenance. Il lui suffira alors de selectionner une date et d'entrer l'ensemble des informations de la maintenance qu'il souhaite insérer.

### Affichage, Modification & Annulation des maintenances
Un manager peut afficher les détails, modifier ou annuler une maintenance plannifiée. Il lui suffit de se diriger vers la maintenance en question au niveau du calendrier dans le volet maintenance et de la sélectionner. Les informations de la maintenances seront alors affichées et il pourra sélectionner l'action souhaitée.

## Tableau de bord & Reporting
En plus de la gestion de la maintenance préventive, notre plateforme offre un tableau de bord et une interface de reporting permettant d'offrir toutes les informations, statistiques et indicateurs aux décideurs pour les aider à prendre les bonnes décision au bon moment.

Ceci s'organise sous deux volets:
### Tableau de bord
Le tableau de bord regroupe affiche les statistiques les plus importantes directement dans un seul endroit. Idéal pour résumer et évaluer la situation au quotidien.

### Reporting
Le volet reporting contient l'ensemble des indicateurs en détail qu'un manager peut voir. Les indicateurs accessibles sont affichés selon la classe du manager, et il lui suffira d'en sélectionner un pour en générer le rapport qui lui sera affiché à l'écran, avec la possibilité de l'exporter sous format PDF pour une meilleure visualisation. 

Seul un administrateur peut ajouter ou supprimer un rapport.

Chaque rapport doit avoir:
- Un nom
- Un fichier source .jrxml
- Un fichier compilé .jasper

## Fichiers
Un administrateur a la possibilité d'afficher et d'insérer manuellement et individuellement:
- Une fiche technique
- Un guide constructeur
- Un carnet de bord
- Une fiche de controle des couts

Quant aux managers, ils peuvent récupérer ces fichiers, et insérer:
- Carnet de bord (Lors de la génération automatique d'un planning)
- Fiche de controle des couts

# Déploiement
## Installation
Pour déployer le serveur, clonez le repository au sein de votre machine (Positionnez-vous dans le dossier où vous souhaitez cloner le repository)
```git
git clone https://www.github.com/aminebma/armada-board.git
```
Téléchargez ensuite les packages Node.js nécessaires
```bash
npm i
``` 
Une fois que vous aurez fais cela, vous aurez besoin de créer une base de données MongoDB, le nom par défaut doit être db-clinica, mais vous pouvez modifier cela dans les fichiers du dossier "config/".

##Initialisation des variables d'environnement
Le serveur utilise des variables d'environnement afin d'assurer une meilleure sécurité des secrets. 
Ces variables sont:
1. Nom d'utilisateur de l'administrateur de la base de données: armada_db_admin_username
2. Mot de passe de l'administrateur de la base de données: armada_db_admin_password
3. L'addresse ip du serveur: armada_server_ip
4. Le port d'écoute: armada_server_port
5. Votre clé privée pour la génération de json web token
6. L'environnement dans lequel vous déployez ce serveur, peut prendre les valeurs:
    - deveploment
    - production   
    
(Si aucune valeur n'est spécifiée, l'environnement de développement sera considéré).

Sur windows:
```bash
set armada_db_admin_username = votreUsernameAdmin
set armada_db_admin_password = votreMotDepasseAdmin
set NODE_ENV = votreEnvironnement
set armada_server_ip = ip.de.votre.server
set armada_server_port = votrePort
set armada_jwt_pk = votreCléPrivée
```
Sur Linux/Mac
```bash
export armada_db_admin_username = votreUsernameAdmin
export armada_db_admin_password = votreMotDepasseAdmin
export NODE_ENV = votreEnvironnement
export armada_server_ip = ip.de.votre.server
export armada_server_port = votrePort
export armada_jwt_pk = votreCléPrivée
```

## Lancement du serveur
Pour lancer le serveur, il suffit d'exécuter la commande suivante
```bash
node app.js
```

## Endpoints
Voici la liste des endpoints disponibles au niveau du serveur, le corps de la requête correspondant à chaque endpoint est précisé en commentaire au niveau du code.

- Administrateurs
    - /api/admin/chauffeur
        - Type: POST
        - Description: Ajouter un chauffeur à la base de données
    - /api/admin/users
        - Type: POST
        - Description: Ajoute un nouvel utilisateur à la base de données
    - /api/admin/users
        - Type: DELETE
        - Description: Supprime un compte utilisateur de la base de données
    - /api/admin/users
        - Type: PUT
        - Description: Modifie le mot de passe d'un utilisateur    
        
- Comptes
    - /api/accounts/sign-in
        - Type: POST
        - Description: Connexion à la plateforme
    - /api/accounts/reset-password
        - Type: GET
        - Description: Récupérer la liste des administrateur de l'unité d'affectation d'un compte.     

- Véhicules
    - /api/vehicules/
        - Type: GET 
        - Description: Récupérer la liste des véhicules de la base de données
    - /api/vehicules/:id
        - Type: GET
        - Description: Récupérer la liste des véhicules d'une unité donnée
    - /api/vehicules/
        - Type: GET
        - Description: Ajouter un nouveau véhicule à la base de données
        
- Fichiers
    - /api/files/fiche-technique
        - Type: GET
        - Description: Récupère la liste des fiches techniques de la base de données           
    - /api/files/fiche-technique
        - Type: POST
        - Description: Insère une fiche technique dans la base de données            
    - /api/files/fiche-controle-couts
        - Type: GET
        - Description: Récupère la liste des fiches de controle des couts de la base de données       
    - /api/files/fiche-controle-couts
        - Type: POST
        - Description: Insère une fiche de controle des couts dans la base de données            
    - /api/files/carnet-de-bord
        - Type: GET
        - Description: Récupère la liste des carnets de bord de la base de données            
    - /api/files/carnet-de-bord
        - Type: POST
        - Description: Insère un carnet de bord dans la base de données            
    - /api/files/guide-constructeur
        - Type: GET
        - Description: Récupère la liste des guides constructeur de la base de données
    - /api/files/guide-constructeur
        - Type: POST
        - Description: Insère un guide constructeur dans la base de données
        
- Maintenances
    - /api/maintenances/
        - Type: POST
        - Description: Insère une nouvelle maintenance dans la base de données
    - /api/maintenances/
        - Type: PUT
        - Description: Modifie une maintenance existante    
    - /api/maintenances/
        - Type: DELETE
        - Description: Supprime une maintenance de la base de données
    - /api/maintenances/planning
        - Type: GET
        - Description: Récupère le planning des maintenances d'une unité
    - /api/maintenances/planning
        - Type: POST
        - Description: Génère un planning de maintenances pour un véhicule    
         
- Rapports
    - /api/reports/
        - Type: POST
        - Description: Ajouter un rapport à la base de données
    - /api/reports/:name
        - Type: GET
        - Description: Générer un rapport à partir de son nom
    - /api/reports/:name
        - Type: DELETE
        - Description: Supprime un rapport de la base de données
                           
# Contacts   
- Mohamed Amine BENBAKHTA: 
    - [gm_benbakhta@esi.dz](mailto:gm_benbakhta@esi.dz)
    - [LinkedIn](https://www.linkedin.com/in/mohamed-amine-benbakhta)    
- Lotfi Rdjem DARSOUNI: 
    - [gl_darsouni@esi.dz](mailto:gl_darsouni@esi.dz) 
    - [LinkedIn](https://www.linkedin.com/in/lotfi-rdjem-darsouni-250747176)   
- Abdelhak OUCHAR: 
    - [ga_ouchar@esi.dz](mailto:ga_ouchar@esi.dz)
    - [LinkedIn](https://www.linkedin.com/in/abdelhak-ouchar-280145162)
- Sidali FAHAS: 
    - [gs_fahas@esi.dz](mailto:gs_fahas@esi.dz)
    - [LinkedIn](https://www.linkedin.com/in/sidali-fahas-b2b762140)