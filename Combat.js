var Combat = {

    basicMeleeAttack: function(instigator){
        //TODO test for correct object
        if(Weapons.weapons[instigator.weaponID].weaponStyle === "melee"){
            var im = instigator.getMelee(), hits = [], roll;
            for(var i = 0 ; i < im ; i++){
                roll = Math.random();
                if((value = roll * 100 - instigator.attackChance) > 0){
                    hits.push(value);
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
        var i, hl = hits.length, _damageInflicted = 0;
        for( i = 0 ; i < hl ; i++){
            _damageInflicted += parseInt((hits[i]*damage)/100);
            }
        return {
                'damage': _damageInflicted,
                'message': hits + ' hits for ' + _damageInflicted + ' damage'
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
