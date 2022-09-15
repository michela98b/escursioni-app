import { Place } from "./place.model";

export class Path {
    public id: number;
    public name: string;
    public description: string;
    public duration:string;
    public difficulty:string;
    public start:Place;
    public height: Number;

    constructor(id:number, name:string, description:string, duration:string, difficulty:string, start:Place, height:Number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.difficulty = difficulty;
        this.start = start;
        this.height = height;
    }
  
    public assignJsonToInstance(json:JSON) {
      Object.assign(this, json);
    }
  }