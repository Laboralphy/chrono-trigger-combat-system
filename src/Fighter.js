class Fighter {
    constructor () {
        this._attributes = {
            power: 1,
            defense: 1,
            hit: 1,
            evade: 1,
            effectiveness: 6,
            level: 1
        }
        /**
         * @type {Object.<string, Item>}
         * @private
         */
        this._equipment = {
            weapon: null,
            armor: null
        }
    }

    get equipment () {
        return this._equipment
    }

    get attributes () {
        return this._attributes
    }

    getEnhancement () {
        return 0
    }
}

module.exports = Fighter
