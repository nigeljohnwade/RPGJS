var Combat = {

    basicMeleeAttack: function(instigator){
        //TODO test for correct object
        if(Weapons.weapons[instigator.weaponID].weaponStyle === "melee"){
            var im = instigator.getMelee(), hits = 0;
            for(var i = 0 ; i < im ; i++){
                if(Math.random() * 100 > instigator.attackChance){
                    hits++;
                    }
                }
            var damage = this.inflictDamage(hits, instigator.getDamage()).damage;
            return {
                'damage': damage,
                'message':instigator.getWeapon() + ' to attack and inflicts ' + damage
                }
            }else{
                return{'message': instigator.name + ' is not using a melee weapon'}
                }
        }
    ,basicRangedAttack: function(instigator){
        if(Weapons.weapons[instigator.weaponID].weaponStyle === "ranged"){
            var ir = instigator.getRanged(), hits = 0;
            for(var i = 0 ; i < ir ; i++){
                if(Math.random() * 100 > instigator.attackChance){
                    hits++;
                    }
                }
            var damage = this.inflictDamage(hits, instigator.getDamage()).damage;
            return {
                'damage': damage,
                'message':instigator.getWeapon() + ' to attack and inflicts ' + damage
                }
            }else{
                return{'message': instigator.name + ' is not using a ranged weapon'}
                }
        }
    ,inflictDamage: function(hits, damage){
        var damageInflicted = parseInt(hits*damage);
        return {
            'damage': damageInflicted,
            'message': hits + ' hits for ' + damageInflicted + ' damage'
            }
        }
    ,receiveDamage: function(retaliator,damage){
        damage = damage - retaliator.getResilience();
        var wounds = Math.round(Math.max(damage/retaliator.woundsAt, 0));
        retaliator.amendProperty('woundsInflicted',wounds);
        return {
            'wounds': wounds,
            'message': retaliator.name + ' receives ' + wounds + ' wounds'
            }
        }
    }
