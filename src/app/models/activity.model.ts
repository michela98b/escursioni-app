import { Place } from "./place.model";

export class Activity {
    public id: number;
    public name: string;
    public description: string;
    public duration:string;
    public difficulty:string;
    public place:Place;
    public price: Number;
    public peoples:Number;

    constructor(id:number, name:string, description:string, duration:string, difficulty:string, place:Place, price:Number, peoples:Number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.difficulty = difficulty;
        this.place = place;
        this.price = price;
        this.peoples = peoples
    }
  
    public assignJsonToInstance(json:JSON) {
      Object.assign(this, json);
    }
  }