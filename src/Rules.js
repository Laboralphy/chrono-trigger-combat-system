const WEAPON_TYPE_NONE = 0
const WEAPON_TYPE_MELEE = 1
const WEAPON_TYPE_RANGED = 2

class Rules {
    rand () {
        return Math.random()
    }

    clamp (x, n1, n2) {
        const nMin = Math.min(n1, n2)
        const nMax = Math.max(n1, n2)
        return Math.min(nMax, Math.max(nMin, x))
    }

    getWeaponType (atk) {
        if (!atk.equipment.weapon) {
            return WEAPON_TYPE_NONE
        }
        switch (atk.equipment.weapon.type) {
            case 'weapon/melee': {
                return WEAPON_TYPE_MELEE
            }

            case 'weapon/ranged': {
                return WEAPON_TYPE_RANGED
            }
        }
        throw new Error('invalid weapon type')
    }

    hits (atk, def) {
        const h = atk.attributes.hit >= def.attributes.evade
            ? 1
            : atk.attributes.hit / def.attributes.evade
        return h >= this.rand()
    }

    getBaseAtkMeleePower (atk) {
       return (atk.attributes.power * 12 + atk.equipment.weapon.attributes.power * 5) * atk.attributes.effectiveness / 18
    }

    getBaseAtkRangedPower (atk) {
        return (atk.attributes.hit * 8 + atk.equipment.weapon.attributes.power * 8) * atk.attributes.effectiveness / 18
    }

    getBaseAtkLeveledPower (atk) {
        return (atk.attributes.power * 16 + atk.attributes.level * atk.attributes.level / 5) * atk.attributes.effectiveness / 20
    }

    getBaseAtkPower (atk) {
        switch (this.getWeaponType(atk)) {
            case WEAPON_TYPE_NONE: {
                return this.getBaseAtkLeveledPower(atk)
            }

            case WEAPON_TYPE_MELEE: {
                return this.getBaseAtkMeleePower(atk)
            }

            case WEAPON_TYPE_RANGED: {
                return this.getBaseAtkRangedPower(atk)
            }
        }
    }

    getRandomMeleeVariationRange (atk) {
        return atk.attributes.power / 3
    }

    getRandomRangedVariationRange (atk) {
        return atk.hit * 77 / 256
    }

    getRandomLeveledVariationRange (atk) {
        return atk.level / 3
    }

    getEnhancedBase (base, atk) {
        return base + (base * atk.getEnhancement())
    }

    getDefenseMultiplier (def) {
        return 256 - def.attributes.defense
    }

    getRandomVariationRange (atk) {
        switch (this.getWeaponType(atk)) {
            case WEAPON_TYPE_NONE: {
                return this.getRandomLeveledVariationRange(atk)
            }

            case WEAPON_TYPE_MELEE: {
                return this.getRandomMeleeVariationRange(atk)
            }

            case WEAPON_TYPE_RANGED: {
                return this.getRandomRangedVariationRange(atk)
            }
        }
    }

    getSemiFinalDamage (base, atk, def) {
        const range = this.getRandomVariationRange(atk)
        return Math.max(
            1,
            base * this.getDefenseMultiplier(def) / 256 + Math.min(255, this.rand() * range)
        )
    }

    isCriticalHit (atk) {
        const r = this.rand()
        if (atk.equipment.weapon) {
            return r < (atk.equipment.weapon.attributes.critRate / 100)
        } else {
            return r < (5 / 100)
        }
    }

    modifyCriticalDamage (damage, atk) {
        return atk.equipment.weapon
            ? damage * atk.equipment.weapon.attributes.critMult
            : damage
    }

    doAttack (atk, def) {
        if (this.hits(atk, def)) {
            const nBase = this.getBaseAtkPower(atk)
            const nEnhBase = this.getEnhancedBase(nBase, atk)
            const nSFDamage = this.getSemiFinalDamage(nEnhBase, atk, def)
            const bCrit = this.isCriticalHit()
            const nFinalDamage = bCrit ? this.modifyCriticalDamage(nSFDamage, atk) : nSFDamage
            const nClampedDamage = Math.floor(this.clamp(nFinalDamage, 1, Infinity))
            return {
                hit: true,
                critical: bCrit,
                damage: nClampedDamage
            }
        }
    }
}

module.exports = Rules
