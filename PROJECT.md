# GPET - Gestion Pédagogique et des Emplois du Temps

## Apercu du projet

GPET est une application web de gestion universitaire qui permet de gerer les emplois du temps, les enseignants vacataires, les cours, et le traitement des paiements. Le systeme couvre l'ensemble du cycle de vie academique : de la planification des cours jusqu'au suivi des paiements des professeurs.

---

## Stack technique

| Composant | Technologie |
|-----------|-------------|
| **Backend** | Laravel 8.54 (PHP 7.3+) |
| **Frontend** | Angular 19 (TypeScript) |
| **Base de donnees** | MySQL |
| **Authentification** | Laravel Passport (OAuth 2.0) |
| **Autorisation** | Spatie Laravel Permission (roles et permissions) |
| **Gestion de fichiers** | Spatie Media Library |
| **Generation PDF** | DomPDF |
| **Styles frontend** | Tailwind CSS |

---

## Architecture du projet

```
gpet/
├── api/                    # Backend Laravel
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/   # 19 controleurs
│   │   │   └── Middleware/    # 9 middlewares
│   │   ├── Models/            # 26 modeles Eloquent
│   │   ├── Mail/              # Notifications email
│   │   └── Traits/            # Traits partages
│   ├── database/
│   │   ├── migrations/        # 48 migrations
│   │   └── seeders/
│   ├── routes/
│   │   └── api.php            # Definition des routes API
│   └── config/                # Fichiers de configuration
│
├── admin/                  # Frontend Angular
│   ├── src/app/
│   │   ├── pages/             # Modules fonctionnels
│   │   ├── shared/            # Composants partages
│   │   └── core/              # Services et guards
│   └── tailwind.css
```

---

## Modele de donnees

### Entites principales

| Modele | Description |
|--------|-------------|
| `User` | Utilisateurs du systeme avec roles et permissions |
| `Professor` | Enseignants avec matricule, informations bancaires |
| `Departement` | Departements universitaires |
| `Classe` | Classes d'etudiants |
| `Course` | Cours dispenses par les professeurs |
| `Salle` | Salles de cours |
| `Batiment` | Batiments de l'universite |

### Structure academique

| Modele | Description |
|--------|-------------|
| `UE` | Unite d'Enseignement, liee a un semestre |
| `EC` | Element Constitutif d'une UE (avec volume horaire) |
| `Semester` | Semestres academiques |
| `Service` | Services d'enseignement |
| `Bank` | Informations bancaires |
| `Account` | Comptes bancaires des professeurs |

### Emploi du temps

| Modele | Description |
|--------|-------------|
| `TimesTable` | Emplois du temps (cours, salle, jour, horaire) |
| `Day` | Jours de la semaine |
| `Horaire` | Creneaux horaires |
| `EtatSeance` | Etats des seances |

### Contenu pedagogique

| Modele | Description |
|--------|-------------|
| `Syllabus` | Plans de cours |
| `Chapitre` | Chapitres de cours |
| `Ressource` | Ressources et supports (fichiers via Media Library) |
| `Seance` | Seances de cours |

### Suivi et historique

| Modele | Description |
|--------|-------------|
| `CourseStatus` | Statuts des cours (wait, load, pending, etc.) |
| `CourseHistory` | Historique des affectations de cours |
| `CoursesHasProfessors` | Relation many-to-many cours/professeurs |

---

## API - Endpoints principaux

### Authentification (`/user`)

| Methode | Route | Description |
|---------|-------|-------------|
| POST | `/login` | Connexion utilisateur |
| GET | `/logout` | Deconnexion |
| GET | `/profile` | Profil de l'utilisateur connecte |
| POST | `/update-password` | Changement de mot de passe |
| POST | `/forgot-password` | Demande de reinitialisation |
| POST | `/reset-password` | Reinitialisation du mot de passe |

### Gestion des professeurs (`/professeur`)

- CRUD complet
- Gestion du profil et avatar
- Suivi des paiements
- Affectation aux cours
- Acces a l'emploi du temps
- Activation/desactivation de compte

### Gestion des cours (`/course`)

- CRUD complet
- Historique des cours
- Changement de statut
- Traitement des paiements
- Affectation de professeurs
- Recherche

### Emploi du temps (`/ept`)

| Methode | Route | Description |
|---------|-------|-------------|
| CRUD | `/ept` | Gestion des emplois du temps |
| GET | `/ept/ws/{departement}/{classe}` | Web service par departement/classe |
| GET | `/pdf/edt/{id}` | Export PDF de l'emploi du temps |

### Ressources administratives

| Prefixe | Description |
|---------|-------------|
| `/departement` | Departements (avec dashboard et graphiques) |
| `/classe` | Classes |
| `/batiment` | Batiments |
| `/salle` | Salles |
| `/semester` | Semestres |
| `/bank` | Informations bancaires |

### Contenu academique

| Prefixe | Description |
|---------|-------------|
| `/ue` | Unites d'enseignement |
| `/ec` | Elements constitutifs |
| `/chapitre` | Chapitres |
| `/ressource` | Ressources (avec upload de fichiers) |
| `/seance` | Seances |
| `/syllabus` | Syllabi |

### Roles et permissions (`/role`)

- Affectation/revocation de roles aux utilisateurs
- Gestion des permissions

---

## Securite et middleware

| Middleware | Role |
|-----------|------|
| `Authenticate` | Authentification via API guard (Passport) |
| `ProfessorIsActive` | Verifie que le compte professeur est actif |
| `VerifyCsrfToken` | Protection CSRF |
| `TrustHosts` / `TrustProxies` | Configuration de confiance des requetes |

### Roles du systeme

- **Super Admin** : acces complet
- **Admin** : gestion administrative
- **Professeur** : acces limite a ses propres cours et emploi du temps

---

## Fonctionnalites cles

### 1. Gestion des emplois du temps
- Creation et modification des emplois du temps par departement et classe
- Attribution des salles et creneaux horaires
- Export PDF des emplois du temps
- Web service pour consultation

### 2. Gestion des professeurs
- Enregistrement avec matricule et informations bancaires
- Affectation aux cours et suivi des heures
- Gestion des types de professeurs (vacataires, permanents)
- Activation/desactivation des comptes

### 3. Traitement des paiements
- Suivi des paiements par professeur
- Historique des paiements
- Gestion des statuts de cours lies aux paiements
- Association avec les informations bancaires

### 4. Contenu pedagogique
- Gestion des syllabi par cours
- Organisation en chapitres
- Upload et partage de ressources (documents, fichiers)
- Suivi des seances

### 5. Reporting et analytics
- Dashboard par departement avec graphiques
- Historique des affectations de cours
- Rapports de paiements

### 6. Notifications email
- Notification de creation de compte (`SendNewUserMail`)
- Reinitialisation de mot de passe (`SendForgotPasswordMail`)
- Configuration SMTP (Mailtrap en dev)

---

## Configuration et deploiement

### Prerequis
- PHP 7.3+
- MySQL
- Composer
- Node.js et npm (pour le frontend Angular)

### Variables d'environnement (`.env`)
- Connexion base de donnees MySQL
- Configuration SMTP pour les emails
- Cle d'application Laravel
- Configuration Passport (OAuth)
- Configuration CORS (pour le frontend Angular)

### Installation

```bash
# Backend
cd api
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan passport:install

# Frontend
cd admin
npm install
ng serve
```
