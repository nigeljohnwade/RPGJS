function playerCharacter(m,r,s,t,n){
    //stats
    //Test for watch
    //Test again
    //And again
    this.stats = [];
    this.stats.melee = m;
    this.stats.ranged = r;
    this.stats.special = s;
    this.stats.toughness = t;
    //status
    this.wounds = 3;
    this.woundsAt = 3;
    this.woundsInflicted = 0;
    this.status = 'healthy';
    //combat
    this.attackChance = 50;
    this.damage = 1;
    this.defence = 1;
    this.weaponID = null;
    this.armorID = null;
    //items
    this.inventory = new Inventory();
    //demographics
    this.name = n;

    }

playerCharacter.prototype.getMelee = function(){
    return this.stats.melee;
    };

playerCharacter.prototype.getRanged = function(){
    return this.stats.ranged;
    };

playerCharacter.prototype.getSpecial = function(){
    return this.stats.special;
    };

playerCharacter.prototype.getToughness = function(){
    return this.stats.toughness;
    };
    
playerCharacter.prototype.getDamage = function(){
    return (this.getMelee() * this.damage);
    };
    
playerCharacter.prototype.getStatus = function(){
    return {
        'status':this.status,
        'message': this.name + ' is ' + this.status
        };
    };
        
playerCharacter.prototype.getResilience = function(){
    return (this.defence * this.stats.toughness);
    };

playerCharacter.prototype.getHealth = function(){
    return ('Health is ' + parseInt(Math.max(0,this.wounds - this.woundsInflicted)) + '/' + this.wounds);
    };

playerCharacter.prototype.amendStat = function(stat,value){
    //Amend a the specified stat by thegiven value
    this.stats[stat]  = this.stats[stat] + value;
    this.updateStatus();
    };

playerCharacter.prototype.setStat = function(stat,value){
    //Set a given stat to a specified value
    this.stats[stat]  = value;
    };
    
playerCharacter.prototype.amendProperty = function(stat,value){
    this[stat]  = this[stat] + value;
    this.updateStatus();
    };

playerCharacter.prototype.setProperty = function(stat,value){
    this[stat]  = value;
    };
    
playerCharacter.prototype.updateStatus = function(){
    if(this.woundsInflicted > this.wounds){
        return this.die();
        }else if(this.woundsInflicted > 0){
        return this.injured();
        }else{
        return '';
        }
    };

playerCharacter.prototype.die = function(){
    this.status = 'dead';
    return this.name + ' is dead';
    };
    
playerCharacter.prototype.injured = function(){
    this.status = 'injured';
    return this.name + ' is injured';
    };

playerCharacter.prototype.getWeapon = function(){
    return this.name + ' is using ' + Weapons.getWeaponName(this.weaponID);
    };
    
playerCharacter.prototype.setWeapon = function(weaponID){
    for(var i = 0; i < this.inventory.items.Weapons.length; i++){
        if(this.inventory.items.Weapons[i] == weaponID){
            this.weaponID = weaponID;
            this.damage = this.damage * Weapons.getWeaponDamageModifier(weaponID);
            return this.name + ' switches to ' + Weapons.getWeaponName(this.weaponID);
        }
    }
};

playerCharacter.prototype.getAttackType = function(){
    return Weapons.getWeaponType(this.weaponID);
};

playerCharacter.prototype.getArmor = function(){
    return this.name + ' is wearing ' + Armors.getArmorName(this.armorID);
};
    
playerCharacter.prototype.setArmor = function(armorID){
    for(var i = 0; i < this.inventory.items.Armors.length; i++){
        if(this.inventory.items.Armors[i] == armorID){ 
            this.armorID = armorID;
            this.defence = this.defence * Armors.getArmorDamageModifier(armorID);
            return this.name + ' changes into ' + Armors.getArmorName(this.armorID);
        }else{
                return false;
        }
    }
};

playerCharacter.prototype.showCard = function(id){
    div = document.getElementById(id);
    html = '';
    html += '<h1 class="playerCharacter">' + this.name + '</h1>';
    for(var x in this.stats){
        html += '<p class="stat">' + x + ': <span class="value"> ' + this.stats[x] + '</span></p>';
    }
    html += '<p>' + this.getWeapon() + '</p>';
    html += '<p>' + this.getArmor() + '</p>';
    html += '<p>' + this.getHealth() + '</p>';
    html += '<p>' + this.getStatus().message + '</p>';
    div.innerHTML = html;
};
