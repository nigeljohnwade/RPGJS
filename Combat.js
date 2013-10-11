var Combat = {

    basicMeleeAttack: function(instigator){
        //test for correct object
        if(Weapons.weapons[instigator.weaponID].weaponStyle === "melee"){
            //im is the number of times to 'roll'
            //_hits is an empty array to hold results of 'rolls' (if any)
            //_roll is to hold the current roll
            //damage is to hold the amount of damage from inflictDamage function (if any)
            var im = instigator.getMelee()
                , _hits = []
                , _roll
                , damage;
            //Loop over the instigator melee attribute times
            for(var i = 0 ; i < im ; i++){
                //Calculate a roll based on a result greater than 0 is a hit
                _roll = Math.random() * 100 - instigator.attackChance;
                if(_roll  > 0){
                    //push successful rolls into hits
                    _hits.push(_roll);
                    }
                }
            //Calculate damage using inflictDamage function
            damage = this.inflictDamage(_hits, instigator.getDamage()).damage;
            //return the damage and a dislpay message
            return {
                'damage': damage,
                'message':instigator.getWeapon() + ' to attack and inflicts ' + damage
                }
        }else{
            //If not the correct weapon return a message
            return{'message': instigator.name + ' is not using a melee weapon'}
        }
    }
    ,basicRangedAttack: function(instigator){
        if(Weapons.weapons[instigator.weaponID].weaponStyle === "ranged"){
            var ir = instigator.getRanged()
                , hits = 0
                , damage;
            for(var i = 0 ; i < ir ; i++){
                if(Math.random() * 100 > instigator.attackChance){
                    hits++;
                }
            }
            damage = this.inflictDamage(hits, instigator.getDamage()).damage;
            return {
                'damage': damage,
                'message':instigator.getWeapon() + ' to attack and inflicts ' + damage
            }
        }else{
            return{'message': instigator.name + ' is not using a ranged weapon'}
        }
    }
    ,inflictDamage: function(hits, damage){
        var i
            , hl = hits.length
            , _damageInflicted = 0;
        //for( i = 0 ; i < hl ; i++){
        //    //This is using the value of te hit to calculate the damage??
        //    _damageInflicted += parseInt((hits[i]*damage)/100);
        //    }
        _damageInflicted = hl * damage;
        return {
                'damage': _damageInflicted,
                'message': hl + ' hits for ' + _damageInflicted + ' damage'
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
