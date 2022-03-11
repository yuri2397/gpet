import { Permission } from 'src/app/models/permission';
import { Role } from './../models/role';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Day } from '../models/day';
import { Departement } from '../models/departement';
import { environment as env } from 'src/environments/environment';
import { GestionRole } from './gestion-role';

export class BaseHttp  extends GestionRole{
  private _host = env.host;
  private _api = env.api;
  protected _baseUrl!: string;
  private _super_admin = 'super admin';
  private _editeur = 'chef de département';
  private _secretaire = 'editeur';
  private _admin = 'admin';
  protected httpClient!: HttpClient;
  public DAYS: Day[] = [
    {id: 1, name: "Lundi"},
    {id: 2, name: "Mardi"},
    {id: 3, name: "Mercredi"},
    {id: 4, name: "Jeudi"},
    {id: 5, name: "Vendredi"},
    {id: 6, name: "Samedi"},
  ];

  _canDeleteErreurs!: string[];
  _canDeleteSubTitle!: string;
  _canDeleteTitle!: string;

  constructor() {
    super();
  }

  isLogIn(): boolean {
    return this.getToken() == null ? false : true;
  }

  checkLocalData(): boolean {
    return this.getRoles() && this.getUser() && this.getToken() ? true : false;
  }

  get authorizationHeaders() {
    return {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Bearer ' + this.getToken(),
    };
  }

  get canDeleteErreurs() {
    return this._canDeleteErreurs;
  }

  get canDeleteSubTitle() {
    return this._canDeleteSubTitle;
  }

  get canDeleteTitle() {
    return this._canDeleteTitle;
  }

  set canDeleteErreurs(value: string[]) {
    this._canDeleteErreurs = value;
  }

  set canDeleteSubTitle(value: string) {
    this._canDeleteSubTitle = value;
  }

  set canDeleteTitle(value: string) {
    this._canDeleteTitle = value;
  }

  findSelectableList(tables: string[]) {
    return this.http.post<any>(this.api + 'selectable', tables, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  get http() {
    return this.httpClient;
  }

  set http(http) {
    this.httpClient = http;
  }

  isAdmin(): boolean {
    let test = false;
    this.getRoles().forEach(r => {
        if(r.name == this.admin){
          test = true;
        }
    });

    return test;
  }

  isCD(): boolean {
    let test = false;
    this.getRoles().forEach(r => {
        if(r.name == this.editeur){
          test = true;
        }
    });

    return test;
  }

  isSuperAdmin(): boolean {
    let test = false;
    this.getRoles().forEach(r => {
        if(r.name == this.super_admin){
          test = true;
        }
    });
    return test;
  }

  isEditeur(): boolean {
    let test = false;
    this.getRoles().forEach(r => {
        if(r.name == this.editeur){
          test = true;
        }
    });

    return test;
  }

  get super_admin() {
    return this._super_admin;
  }

  get editeur() {
    return this._editeur;
  }

  get admin(){
    return this._admin;
  }

  get secretaire(){
    return this._secretaire;
  }

  get endPoint() {
    return this.api + this.baseUrl;
  }

  get endPointWithSlash(){
    return this.api + this.baseUrl + "/";
  }

  get guestHeaders() {
    return {
      accept: 'application/json',
      'content-type': 'application/json',
    };
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  getRoles(): Role[] {
    return JSON.parse(sessionStorage.getItem('roles')!) as Role[];
  }

  getPermissions(): Permission[]{
    return JSON.parse(sessionStorage.getItem('permissions')!) as Role[];
  }

  get baseUrl(): string {
    return this._baseUrl;
  }

  set baseUrl(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  getUser(): User {
    return JSON.parse(sessionStorage.getItem('user')!);
  }

  departementId(): number{
    return this.getUser().departement.id;
  }

  departement(): Departement{
    return this.getUser().departement;
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  setUser(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  setRoles(roles: Role[]) {
    sessionStorage.removeItem("roles");
    sessionStorage.setItem('roles', JSON.stringify(roles));
  }

  setPermissions(p: Permission[]) {
    sessionStorage.removeItem("permissions");
    sessionStorage.setItem('permissions', JSON.stringify(p));
  }

  setDepartement(departement: Departement){
    sessionStorage.setItem('departement', JSON.stringify(departement));
  }

  get api(): string {
    return this._api;
  }

  get host(): string {
    return this._host;
  }

  hasRole(role: Role): boolean {
    return this.getRoles().some((x) => x.name === role.name);
  }

}
