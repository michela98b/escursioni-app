export class Place {
    public id: number;
    public name: string;
    public nation: string;
    public region:string;
    public province:string;
    public latitude:string;
    public longitude:string;
    public address:string;
    public city:string;

    constructor(id:number, name:string, nation:string, region:string, province:string,latitude:string, longitude:string, address:string, city:string,) {
        this.id = id;
        this.name = name;
        this.nation = nation;
        this.region = region;
        this.province = province;
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
        this.city = city;
    }
  
    public assignJsonToInstance(json:JSON) {
      Object.assign(this, json);
    }
  }