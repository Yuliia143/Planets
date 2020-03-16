export default class Planet {
    constructor(planet){
        this._name = planet.name;
        this._id = planet.id;
        this._population = planet.population;
        this._climate = planet.climate;
        this._terrain = planet.terrain;
        this._residents = planet.residents;
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
    set residents(value){
        this._residents = value;
    }
}