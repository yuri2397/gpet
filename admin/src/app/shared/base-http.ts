import { Role } from './../models/role';
import { User } from "../models/user";

export class BaseHttp {
  private _host = "http://127.0.0.1:8000/";
  private _api = "http://127.0.0.1:8000/api/";
  protected _baseUrl!: string;
  private _super_admin = "super admin";
  private _editeur = "editeur";
  constructor() {}

  isLogIn(): boolean {
    return this.getToken() == null ? false : true;
  }

  get authorizationHeaders() {
    return {
      accept: "application/json",
      "content-type": "application/json",
      authorization: "Bearer " + this.getToken(),
    };
  }

  isAdmin():boolean{
    let role: string = this.getRoles()[0].name;
    if(role == this._super_admin){
      return true;
    }
    return false;
  }

  isEditeur(): boolean{
    let role: string = this.getRoles()[0].name;
    if(role == this._editeur){
      return true;
    }
    return false;
  }

  get guestHeaders() {
    return {
      accept: "application/json",
      "content-type": "application/json",
    };
  }

  getToken() {
    return sessionStorage.getItem("token");
  }

  getRoles(): Role[] {
    return JSON.parse(sessionStorage.getItem("roles")!) as Role[];
  }

  get baseUrl(): string {
    return this._baseUrl;
  }

  set baseUrl(baseUrl: string){
    this._baseUrl = baseUrl;
  }

  getUser() {
    return sessionStorage.getItem("user");
  }

  setToken(token: string) {
    sessionStorage.setItem("token", token);
  }

  setUser(user: User) {
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  setRoles(roles: Role[]) {
    sessionStorage.setItem("roles", JSON.stringify(roles));
  }

  get api(): string {
    return this._api;
  }

  get host(): string {
    return this._host;
  }

  hasRole(role: Role): boolean{
    return this.getRoles().some((x) => x.name === role.name);
  }


  clone(item: any){
    throw new Error("Method clone unimplemented.");
  }
}
