# GPET - Guide de Contexte pour Refonte Design

## Objectif

Refaire **tout le design frontend** de l'application GPET en utilisant **uniquement Tailwind CSS 4** (sans NG-ZORRO). Supprimer entierement la dependance `ng-zorro-antd` et reconstruire chaque composant UI avec Tailwind.

---

## Stack Technique

| Technologie | Version | Notes |
|---|---|---|
| Angular | 19.2 | Standalone components, signals, @if/@for |
| Tailwind CSS | 4.2.2 | Compile via `@tailwindcss/cli` depuis `tailwind.css` a la racine |
| FontAwesome | 6.5 | CDN dans index.html |
| TypeScript | 5.7 | Strict mode |
| RxJS | 7.8 | Pour les appels HTTP |

### Build Tailwind

Le fichier source est `tailwind.css` a la racine du projet. Il est compile vers `src/styles.css` :

```bash
npm run tw:build    # Compile une fois
npm run tw:watch    # Watch mode
npm start           # tw:build + ng serve
```

### Theme actuel (tailwind.css)

```css
@import "tailwindcss";

@theme {
  --font-sans: "Poppins", ui-sans-serif, system-ui, sans-serif;
  --color-primary: #1890ff;
  --color-primary-dark: #096dd9;
  --color-primary-light: #40a9ff;
  --color-success: #52c41a;
  --color-warning: #faad14;
  --color-danger: #ff4d4f;
  --color-sidebar: #001529;
  --color-sidebar-light: #002140;
}
```

---

## Architecture du Projet

```
src/app/
├── app.component.ts              # Root - router-outlet
├── app.config.ts                 # Providers (router, httpClient, interceptors, locale FR)
├── app.routes.ts                 # Routes principales
├── shared/
│   ├── auth-store.ts             # State reactif (signals) : user, roles, permissions, token
│   ├── base-http.ts              # Classe de base pour les services HTTP
│   ├── Utils.ts                  # Utilitaire print
│   ├── interceptors/
│   │   ├── auth.interceptor.ts   # Ajoute Bearer token
│   │   └── error.interceptor.ts  # Redirige 403
│   ├── guards/                   # 7 guards fonctionnels (CanActivateFn)
│   └── ui/                       # 14 composants design system
│       ├── icon/                 # <app-icon name="..."/> (FontAwesome)
│       ├── page-header/          # Header gradient avec titre + bouton action
│       ├── stat-card/            # Carte statistique dashboard
│       ├── empty-state/          # Etat vide
│       ├── back-button/          # Bouton retour
│       ├── table-load/           # Spinner de chargement
│       ├── can-delete/           # Modal erreur de suppression
│       ├── not-found/            # Page 404
│       ├── unauthorized/         # Page 403
│       ├── error-server/         # Page 500
│       ├── error-connection/     # Erreur connexion
│       ├── any-permission/       # Aucune permission
│       ├── notification/         # Modal notification
│       └── info-user/            # Info utilisateur
├── models/                       # 26 modeles (classes/interfaces TypeScript)
├── services/                     # 19 services injectables (extends BaseHttp)
├── modules/
│   ├── admin/                    # Layout admin (sidebar + header + router-outlet)
│   │   ├── admin.component.ts
│   │   ├── admin.component.html
│   │   └── admin.routes.ts       # 22 routes lazy-loaded
│   └── professor/                # Layout professeur
│       ├── professor.component.ts
│       ├── professor.component.html
│       └── professor.routes.ts   # 9 routes lazy-loaded
└── pages/                        # 75 composants de pages
    ├── login/                    # Page de connexion
    ├── forgot-password/
    ├── reset-password/
    ├── dashboard/                # Tableau de bord avec stats + chart
    ├── profile/                  # Profil admin
    ├── batiment/                 # CRUD batiments (3 composants)
    ├── salle/                    # CRUD salles (3 composants)
    ├── bank/                     # CRUD banques (3 composants)
    ├── departement/              # CRUD departements (4 composants)
    ├── classe/                   # CRUD classes + EDT (6 composants)
    ├── professeur/               # CRUD professeurs + pages prof (16 composants)
    ├── course/                   # CRUD cours + chapitres/seances/ressources (13 composants)
    ├── user/                     # CRUD utilisateurs (4 composants)
    ├── roles/                    # Gestion roles + permissions (4 composants)
    ├── semester/                 # CRUD semestres (3 composants)
    ├── ue/                       # UE (2 composants)
    ├── ec/                       # EC (3 composants)
    ├── syllabus/                 # CRUD syllabus (3 composants)
    ├── edt/                      # Affichage emploi du temps
    ├── setting/                  # Stub
    └── welcome/                  # Ecran d'accueil
```

---

## Ce qui doit etre remplace (NG-ZORRO → Tailwind)

### 36 modules NG-ZORRO utilises actuellement

| Module NG-ZORRO | Usage | Remplacement Tailwind suggere |
|---|---|---|
| `NzLayoutModule` (nz-layout, nz-sider, nz-header, nz-content) | Layout principal | Flexbox/Grid Tailwind avec sidebar fixe |
| `NzMenuModule` (nz-menu, nz-menu-item) | Navigation sidebar | `<nav>` + `<ul>/<li>` avec classes Tailwind |
| `NzTableModule` (nz-table) | **Toutes les listes** (le plus utilise) | `<table>` HTML + Tailwind (pagination custom) |
| `NzModalModule` (nz-modal, NzModalService) | Modales create/edit/delete | Composant modal custom Tailwind (overlay + card) |
| `NzDrawerModule` (nz-drawer) | Panneau lateral (creation EC) | Composant drawer custom Tailwind (slide-in) |
| `NzFormModule` (nz-form, nz-form-item, nz-form-control, nz-form-label) | **Tous les formulaires** | `<form>` + `<label>` + `<input>` Tailwind |
| `NzInputModule` (nz-input) | Champs texte | `<input class="...">` Tailwind |
| `NzSelectModule` (nz-select, nz-option) | Selects/dropdowns | `<select>` natif ou composant custom |
| `NzButtonModule` (nz-button) | Boutons partout | `<button class="...">` Tailwind |
| `NzIconModule` (nz-icon) | Icones NG-ZORRO (fleches, edit, delete) | FontAwesome via `<app-icon>` (deja fait) |
| `NzNotificationModule` (NzNotificationService) | Notifications toast | Composant toast custom Tailwind |
| `NzMessageModule` (NzMessageService) | Messages courts | Composant message custom |
| `NzAlertModule` (nz-alert) | Alertes inline | `<div class="..." role="alert">` Tailwind |
| `NzPopconfirmModule` (nz-popconfirm) | Confirmation avant suppression | Composant popover/confirm custom |
| `NzTagModule` (nz-tag) | Tags/badges | `<span class="badge ...">` Tailwind |
| `NzTabsModule` (nz-tabset, nz-tab) | Onglets (classe-show, semester-list, roles) | Composant tabs custom |
| `NzCollapseModule` (nz-collapse, nz-collapse-panel) | Accordeon (EDT) | Composant accordion custom |
| `NzDropDownModule` (nz-dropdown-menu) | Menus deroulants | Composant dropdown custom |
| `NzToolTipModule` (nz-tooltip) | Infobulles | `title` natif ou composant tooltip |
| `NzDividerModule` (nz-divider) | Separateurs | `<hr>` ou `border-t` Tailwind |
| `NzSpinModule` (nz-spin) | Spinner de chargement | Spinner CSS Tailwind (deja fait dans `<app-load>`) |
| `NzResultModule` (nz-result) | Pages d'erreur (404, 403, 500) | Composant result custom |
| `NzPageHeaderModule` (nz-page-header) | En-tetes de pages detail | Composant page-header custom (deja fait) |
| `NzEmptyModule` (nz-empty) | Etat vide | `<app-empty-state>` (deja fait) |
| `NzDatePickerModule` (nz-date-picker) | Selection dates | `<input type="date">` natif + Tailwind |
| `NzTimePickerModule` (nz-time-picker) | Selection heures | `<input type="time">` natif + Tailwind |
| `NzAvatarModule` (nz-avatar) | Avatars | `<img class="rounded-full ...">` |
| `NzCardModule` | Cards | `<div class="bg-white rounded-xl shadow-sm ...">` |
| `NzListModule` | Listes | `<ul>/<li>` Tailwind |
| `NzSkeletonModule` | Skeleton loading | Tailwind skeleton animation |
| `NzTimelineModule` | Chronologie (EDT presentation) | Composant timeline custom |
| `NzStatisticModule` | Stats (jamais utilise en template) | `<app-stat-card>` (deja fait) |
| `NzImageModule` | Galerie images | `<img>` natif |
| `NzAutocompleteModule` | Autocompletion | Composant autocomplete custom |
| `NzUploadModule` (nz-upload) | Upload fichiers | `<input type="file">` natif + Tailwind |
| `NzStepsModule` | Etapes (wizard) | Composant steps custom |

### 58 templates HTML utilisent des elements `nz-*`

---

## Composants de design system a creer

Pour remplacer NG-ZORRO, il faut creer ces composants reutilisables en Tailwind pur :

### Priorite 1 - Critiques (utilises partout)

1. **`AppModalComponent`** - Remplace `nz-modal` / `NzModalService`
   - Overlay + card centree
   - Titre, contenu, footer avec boutons
   - Ouverture/fermeture programmatique
   
2. **`AppTableComponent`** - Remplace `nz-table`
   - Table HTML avec header, body, footer
   - Pagination integree
   - Loading state
   - Tri des colonnes
   
3. **`AppFormFieldComponent`** - Remplace `nz-form-item` / `nz-form-control` / `nz-form-label`
   - Label + input + message d'erreur
   - Support des validations Angular

4. **`AppButtonComponent`** - Remplace `nz-button`
   - Variantes : primary, default, danger, link
   - Etats : loading, disabled
   - Tailles : small, default, large

5. **`AppSelectComponent`** - Remplace `nz-select`
   - Select natif style
   - Ou dropdown custom avec recherche

6. **`AppDrawerComponent`** - Remplace `nz-drawer`
   - Panneau slide-in depuis la droite
   - Overlay

### Priorite 2 - Importants

7. **`AppTabsComponent`** - Remplace `nz-tabset` / `nz-tab`
8. **`AppAlertComponent`** - Remplace `nz-alert`
9. **`AppTagComponent`** - Remplace `nz-tag`
10. **`AppPopconfirmComponent`** - Remplace `nz-popconfirm`
11. **`AppToastService`** - Remplace `NzNotificationService` / `NzMessageService`
12. **`AppDropdownComponent`** - Remplace `nz-dropdown-menu`
13. **`AppCollapseComponent`** - Remplace `nz-collapse` / `nz-collapse-panel`

### Priorite 3 - Specifiques

14. **`AppResultComponent`** - Remplace `nz-result`
15. **`AppTimelineComponent`** - Remplace `nz-timeline`
16. **`AppTooltipDirective`** - Remplace `nz-tooltip`
17. **`AppUploadComponent`** - Remplace `nz-upload`

---

## Modeles de donnees cles

### User
```typescript
class User {
  first_name, last_name, email, avatar, id: number
  departement_id: number, departement: Departement
  roles: Role[], permissions: Permission[]
  professor?: Professor
}
```

### Course (le plus complexe)
```typescript
class Course extends Model<Course> {
  acronym?, name, groupe_number, hours: number
  classe_id, semester_id, service_id, ec_id, professor_id, departement_id
  professor: Professor, departement: Departement, classe: Classe
  ec: EC, semester: Semester, service: Service
  syllabus: Syllabus, media: Media[], evolution: number[]
}
```

### Professor
```typescript
class Professor extends Model<Professor> {
  registration_number, first_name, last_name, email, phone_number
  status, job, cni, born_in, last_degree
  born_at: Date, is_active: boolean
  professor_type: ProfessorType, departement: Departement
  account: Account, courses: Course[], coursesDo: CoursesDo[]
}
```

### Model<T> (base)
```typescript
abstract class Model<T> {
  id: number
  deleted, add, loading, updated, checked, disabled: boolean
  created_at, updated_at: Date
}
```

---

## AuthStore (gestion d'etat)

```typescript
@Injectable({ providedIn: 'root' })
export class AuthStore {
  readonly user = signal<User | null>(...)
  readonly roles = signal<Role[]>(...)
  readonly permissions = signal<Permission[]>(...)
  readonly token = signal<string | null>(...)
  
  readonly isLoggedIn = computed(...)
  readonly isAdmin = computed(...)
  readonly isSuperAdmin = computed(...)
  readonly isProfesseur = computed(...)
  
  setAuth(user, token)    // Login
  updateUser(user)        // Refresh
  clearAuth()             // Logout
  hasPermission(name)     // Check permission
}
```

---

## Services HTTP (pattern)

Tous les services etendent `BaseHttp` :

```typescript
@Injectable({ providedIn: 'root' })
export class SomeService extends BaseHttp {
  protected override _baseUrl = 'endpoint';
  constructor(protected hc: HttpClient) { super(); this.http = hc; }
  
  findAll()      → GET  /api/endpoint
  create(item)   → POST /api/endpoint/create
  edit(item)     → PUT  /api/endpoint/update/:id
  delete(item)   → DELETE /api/endpoint/destroy/:id
  show(item)     → GET  /api/endpoint/show/:id
  search(query)  → GET  /api/endpoint/search/:query
}
```

Les headers d'auth sont geres par l'intercepteur `authInterceptor`.

---

## Environnements

```typescript
// Dev
{ production: false, host: 'http://127.0.0.1:8000/', api: 'http://127.0.0.1:8000/api/' }

// Prod
{ production: true, host: 'https://api-edtset.uidt.sn/', api: 'https://api-edtset.uidt.sn/api/' }
```

---

## Plan de migration suggere

### Phase 1 - Creer les composants UI de base
Creer tous les composants design system Tailwind (modal, table, form-field, button, select, drawer, tabs, etc.) dans `src/app/shared/ui/`.

### Phase 2 - Remplacer le layout
1. Supprimer `NzLayoutModule`, `NzMenuModule`, `NzIconModule`
2. Reconstruire admin.component.html et professor.component.html avec sidebar/header Tailwind pur

### Phase 3 - Pages d'authentification
1. login, forgot-password, reset-password
2. Formulaires avec `AppFormFieldComponent`

### Phase 4 - Pages de listes (CRUD)
Pour chaque module (batiment, salle, bank, departement, professeur, course, user, semester, ue, ec, roles) :
1. Remplacer `nz-table` par `AppTableComponent`
2. Remplacer les modales create/edit par `AppModalComponent`
3. Remplacer `nz-popconfirm` par `AppPopconfirmComponent`

### Phase 5 - Pages de detail (show)
1. departement-show, classe-show (avec EDT), professeur-show, course-show, user-show
2. Remplacer `nz-tabset` par `AppTabsComponent`
3. Remplacer `nz-collapse` par `AppCollapseComponent`
4. Remplacer `nz-timeline` par `AppTimelineComponent`

### Phase 6 - Pages professeur
1. calendar, course-list, course-show, comptabity, profile, resources, securite, pointing

### Phase 7 - Nettoyage
1. Supprimer `ng-zorro-antd` de package.json
2. Supprimer tous les imports `Nz*Module`
3. Supprimer le CSS NG-ZORRO de styles.css
4. Verifier le build final

---

## Regles de design

- **Police** : Poppins (via Google Fonts CDN)
- **Couleur primaire** : `#1890ff` (bleu)
- **Sidebar** : fond `#001529` (bleu tres fonce)
- **Fond pages** : `bg-gray-50`
- **Cards** : `bg-white rounded-xl shadow-sm border border-gray-100`
- **Headers de section** : `bg-gradient-to-r from-primary to-primary-dark` (texte blanc)
- **Boutons** : `rounded-lg` avec variantes primary/default/danger
- **Inputs** : `rounded-lg` avec border gris
- **Icones** : FontAwesome 6.5 via `<app-icon name="..."/>`
- **Responsive** : Mobile-first avec breakpoints `sm`, `md`, `lg`, `xl`
