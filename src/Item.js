class Item {
    constructor (blueprint) {
        this._attributes = {
            power: 0,
            defense: 0,
            critRate: 5,
            critMult: 2,
            ...blueprint.attributes
        }
        this._effects = blueprint.effects
        this._type = blueprint.type
    }

    get attributes () {
        return this._attributes
    }

    get type () {
        return this._type
    }

    get effects () {
        return this._effects
    }
}

module.exports = Item
