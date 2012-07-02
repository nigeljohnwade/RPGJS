function nonPlayerCharacter(m,r,s,t,n){
    //stats
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
    this.weaponID = 0;
    this.armorID = 0;
    //items
    this.inventory = new Inventory();
    //demographics
    this.name = n;

    }

nonPlayerCharacter.prototype.getMelee = function(){
    return this.stats.melee;
    }

nonPlayerCharacter.prototype.getRanged = function(){
    return this.stats.ranged;
    }

nonPlayerCharacter.prototype.getSpecial = function(){
    return this.stats.special;
    }

nonPlayerCharacter.prototype.getToughness = function(){
    return this.stats.toughness;
    }
    
nonPlayerCharacter.prototype.getDamage = function(){
    return (this.getMelee() * this.damage);
    }
    
nonPlayerCharacter.prototype.getStatus = function(){
    return {
        'status':this.status,
        'message': this.name + ' is ' + this.status
        }
    }
        
nonPlayerCharacter.prototype.getResilience = function(){
    return (this.defence * this.stats.toughness);
    }

nonPlayerCharacter.prototype.getHealth = function(){
    return ('Health is ' + parseInt(Math.max(0,this.wounds - this.woundsInflicted)) + '/' + this.wounds);
    }

nonPlayerCharacter.prototype.amendStat = function(stat,value){
    this.stats[stat]  = this.stats[stat] + value;
    this.updateStatus();
    }

nonPlayerCharacter.prototype.setStat = function(stat,value){
    this.stats[stat]  = value;
    }
    
nonPlayerCharacter.prototype.amendProperty = function(stat,value){
    this[stat]  = this[stat] + value;
    this.updateStatus();
    }

nonPlayerCharacter.prototype.setProperty = function(stat,value){
    this[stat]  = value;
    }
    
nonPlayerCharacter.prototype.updateStatus = function(){
    if(this.woundsInflicted > this.wounds){
        return this.die();
        }else if(this.woundsInflicted > 0){
        return this.injured();
        }else{
        return '';
        }
    }

nonPlayerCharacter.prototype.die = function(){
    this.status = 'dead';
    this.hideCard('opponent');
    return this.name + ' is dead';
    }
    
nonPlayerCharacter.prototype.injured = function(){
    this.status = 'injured';
    return this.name + ' is injured';
    }

nonPlayerCharacter.prototype.getWeapon = function(){
    return this.name + ' is using ' + Weapons.getWeaponName(this.weaponID);
    }
    
nonPlayerCharacter.prototype.setWeapon = function(weaponID){
    this.weaponID = weaponID;
    this.damage = this.damage * Weapons.getWeaponDamageModifier(weaponID);
    return this.name + ' switches to ' + Weapons.getWeaponName(this.weaponID);
    }

nonPlayerCharacter.prototype.getArmor = function(){
    return this.name + ' is wearing ' + Armors.getArmorName(this.armorID);
    }
    
nonPlayerCharacter.prototype.setArmor = function(armorID){
    this.armorID = armorID;
    this.defence = this.defence * Armors.getArmorDamageModifier(armorID);
    return this.name + ' changes into ' + Armors.getArmorName(this.armorID);
    }

nonPlayerCharacter.prototype.showCard = function(id){
    var div = document.getElementById(id);
    var html = '';
    html += '<h1 class="nonPlayerCharacter">' + this.name + '</h1>';
    for(x in this.stats){
        html += '<p class="stat">' + x + ': <span class="value"> ' + this.stats[x] + '</span></p>';
    }
    html += '<p>' + this.getWeapon() + '</p>';
    html += '<p>' + this.getArmor() + '</p>';
    html += '<p>' + this.getHealth() + '</p>';
    html += '<p>' + this.getStatus().message + '</p>';
    div.innerHTML = html;
}

nonPlayerCharacter.prototype.hideCard = function(id){
    var div = document.getElementById(id);
    var html = '';
    div.innerHTML = html;
    var button = document.getElementById('basicMeleeAttack_badGuy');
    button.innerText = 'Back to map';
    button.onclick = backToMap;
}
