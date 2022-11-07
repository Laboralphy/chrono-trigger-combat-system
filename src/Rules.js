class Rules {
    rand () {
        return Math.random()
    }

    hits (atk, def) {
        const h = atk.attributes.hit >= def.attributes.evade
            ? 1
            : atk.attributes.hit / def.attributes.evade
        return h >= this.rand()
    }

    getBaseAtkMeleePower (atk) {
       return (atk.attributes.power * 12 + atk.weapon.attributes.power * 5) * atk.attributes.effectiveness / 18
    }

    getBaseAtkRangedPower (atk) {
        return (atk.attributes.hit * 8 + atk.weapon.attributes.power * 8) * atk.attributes.effectiveness / 18
    }

    getBaseAtkLevelPower (atk) {
        return (atk.attributes.power * 16 + atk.attributes.level * atk.attributes.level / 5) * atk.attributes.effectiveness / 20
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
        if (!atk.weapon) {
            return this.getRandomLeveledVariationRange(atk)
        }
        switch (atk.weapon.type) {
            case 'weapon/melee': {
                return this.getRandomMeleeVariationRange(atk)
            }

            case 'weapon/ranged': {
                return this.getRandomRangedVariationRange(atk)
            }
        }
        throw new Error('unknown weapon type')
    }

    getSemiFinalDamage (base, atk, def) {
        const range = this.getRandomVariationRange(atk)
        return Math.max(
            1,
            base * this.getDefenseMultiplier(def) / 256 + Math.min(255, this.rand() * range)
        )
    }

    getCriticalHit (damage, atk) {
        const r = this.rand()
        if (atk.weapon) {
            return r < (atk.weapon.attributes.critRate / 100)
                ? damage * atk.weapon.attributes.critMult
                : damage
        } else {
            return r < (5 / 100)
                ? damage * 2
                : damage
        }
    }
}
