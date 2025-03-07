export default class SiteUser {
  id: string;
  name: string;
  password: string;
  site: string;

  constructor(id: string, name: string, password: string, site: string) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.site = site;
  }
}
