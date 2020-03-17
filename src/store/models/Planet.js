export default class Planet {
    constructor(planet){
        this._name = planet.name;
        this._id = planet.id;
        this._population = planet.population;
        this._climate = planet.climate;
        this._terrain = planet.terrain;
        this._residents = planet.residents;
        this._img = planet.img;
    }
    get name(){
        return this._name;
    }
    get id(){
        return this._id;
    }
    get population(){
        return this._population;
    }
    get climate(){
        return this._climate;
    }
    get terrain(){
        return this._terrain;
    }
    get residents(){
        return this._residents;
    }
    get img(){
        return this._img;
    }
    set residents(value){
        this._residents = value;
    }
    set img(value){
        this._img = value;
    }
}