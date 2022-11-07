class Item {
    constructor () {
        this._attributes = {
            power: 0,
            defense: 0,
            critRate: 5,
            critMult: 2
        }
        this._type = 'weapon/melee'
    }

    get attributes () {
        return this._attributes
    }

    get type () {
        return this._type
    }
}

module.exports = Item
