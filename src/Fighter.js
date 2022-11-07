class Fighter {
    constructor () {
        this._attributes = {
            power: 1,
            evade: 1,
            defense: 1,
            hit: 1,
            effectiveness: 6
        }
        /**
         * @type {Item}
         * @private
         */
        this._weapon = null

    }

    get weapon () {
        return this._weapon
    }

    set weapon (w) {
        this._weapon = w
    }

    get attributes () {
        return this._attributes
    }

    getEnhancement () {
        return 0
    }
}

module.exports = Fighter
