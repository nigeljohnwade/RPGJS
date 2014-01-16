var Armors = {
    armors: [
        {"armorDamageModifier": 1, "armorName": "Plain Clothes"},
        {"armorDamageModifier": 1.1, "armorName": "Cheap Leather"},
        {"armorDamageModifier": 1.2, "armorName": "Sturdy Leather"},
        {"armorDamageModifier": 1.3, "armorName": "Hardened Leather"},
        {"armorDamageModifier": 1.4, "armorName": "Rigid Linen"}
        ]
    ,getArmorDamageModifier: function(armorID){
        return this.armors[armorID].armorDamageModifier;
    }
    ,getArmorName: function(armorID){
        return this.armors[armorID].armorName;
    }
};
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
                };
        }else{
            //If not the correct weapon return a message
            return{'message': instigator.name + ' is not using a melee weapon'};
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
            };
        }else{
            return{'message': instigator.name + ' is not using a ranged weapon'};
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
                };
        }
    ,receiveDamage: function(retaliator,damage){
        damage = damage - retaliator.getResilience();
        var wounds = Math.round(Math.max(damage/retaliator.woundsAt, 0));
        retaliator.amendProperty('woundsInflicted',wounds);
        return {
            'wounds': wounds,
            'message': retaliator.name + ' receives ' + wounds + ' wounds'
            };
        }
    };

function Inventory(){
    
    this.items = {
        'Weapons':[],
        'Armors':[],
        'Charms':[],
        'Potions':[],
        'Plot':[],
        'Miscellany':[]
    };
    this.itemCount = 0;
    
}

Inventory.prototype.getItem = function(id,itemType){
    return this[itemType].id;
};
    
Inventory.prototype.getItemCount = function(){
    return this.itemCount;
};

Inventory.prototype.addItem = function(item,itemType){
    this.itemCount = this.items[itemType].unshift(item);
};

Inventory.prototype.removeItem = function(item,itemType){
    this[itemType].splice(id,1);
    this.itemCount -= 1;
};
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
    };

nonPlayerCharacter.prototype.getRanged = function(){
    return this.stats.ranged;
    };

nonPlayerCharacter.prototype.getSpecial = function(){
    return this.stats.special;
    };

nonPlayerCharacter.prototype.getToughness = function(){
    return this.stats.toughness;
    };
    
nonPlayerCharacter.prototype.getDamage = function(){
    return (this.getMelee() * this.damage);
    };
    
nonPlayerCharacter.prototype.getStatus = function(){
    return {
        'status':this.status,
        'message': this.name + ' is ' + this.status
        };
};
        
nonPlayerCharacter.prototype.getResilience = function(){
    return (this.defence * this.stats.toughness);
};

nonPlayerCharacter.prototype.getHealth = function(){
    return ('Health is ' + parseInt(Math.max(0,this.wounds - this.woundsInflicted)) + '/' + this.wounds);
};

nonPlayerCharacter.prototype.amendStat = function(stat,value){
    this.stats[stat]  = this.stats[stat] + value;
    this.updateStatus();
};

nonPlayerCharacter.prototype.setStat = function(stat,value){
    this.stats[stat]  = value;
};
    
nonPlayerCharacter.prototype.amendProperty = function(stat,value){
    this[stat]  = this[stat] + value;
    this.updateStatus();
};

nonPlayerCharacter.prototype.setProperty = function(stat,value){
    this[stat]  = value;
};
    
nonPlayerCharacter.prototype.updateStatus = function(){
    if(this.woundsInflicted > this.wounds){
        return this.die();
    }else if(this.woundsInflicted > 0){
        return this.injured();
    }else{
        return '';
    }
};

nonPlayerCharacter.prototype.die = function(){
    this.status = 'dead';
    this.hideCard('opponent');
    return this.name + ' is dead';
};
    
nonPlayerCharacter.prototype.injured = function(){
    this.status = 'injured';
    return this.name + ' is injured';
};

nonPlayerCharacter.prototype.getWeapon = function(){
    return this.name + ' is using ' + weapons.getWeaponName(this.weaponID);
};
    
nonPlayerCharacter.prototype.setWeapon = function(weaponID){
    this.weaponID = weaponID;
    this.damage = this.damage * weapons.getWeaponDamageModifier(weaponID);
    return this.name + ' switches to ' + weapons.getWeaponName(this.weaponID);
};

nonPlayerCharacter.prototype.getArmor = function(){
    return this.name + ' is wearing ' + Armors.getArmorName(this.armorID);
};
    
nonPlayerCharacter.prototype.setArmor = function(armorID){
    this.armorID = armorID;
    this.defence = this.defence * Armors.getArmorDamageModifier(armorID);
    return this.name + ' changes into ' + Armors.getArmorName(this.armorID);
};

nonPlayerCharacter.prototype.showCard = function(id){
    var div = document.getElementById(id);
    var html = '';
    html += '<h1 class="nonPlayerCharacter">' + this.name + '</h1>';
    for(var x in this.stats){
        html += '<p class="stat">' + x + ': <span class="value"> ' + this.stats[x] + '</span></p>';
    }
    html += '<p>' + this.getWeapon() + '</p>';
    html += '<p>' + this.getArmor() + '</p>';
    html += '<p>' + this.getHealth() + '</p>';
    html += '<p>' + this.getStatus().message + '</p>';
    div.innerHTML = html;
};

nonPlayerCharacter.prototype.hideCard = function(id){
    var div = document.getElementById(id);
    var html = '';
    div.innerHTML = html;
    var button = document.getElementById('basicMeleeAttack_badGuy');
    button.innerText = 'Back to map';
    button.onclick = backToMap;
};

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
    return this.name + ' is using ' + weapons.getWeaponName(this.weaponID);
    };
    
playerCharacter.prototype.setWeapon = function(weaponID){
    for(var i = 0; i < this.inventory.items.Weapons.length; i++){
        if(this.inventory.items.Weapons[i] === weaponID){
            this.weaponID = weaponID;
            this.damage = this.damage * weapons.getWeaponDamageModifier(weaponID);
            return this.name + ' switches to ' + weapons.getWeaponName(this.weaponID);
        }
    }
};

playerCharacter.prototype.getAttackType = function(){
    return weapons.getWeaponType(this.weaponID);
};

playerCharacter.prototype.getArmor = function(){
    return this.name + ' is wearing ' + Armors.getArmorName(this.armorID);
};
    
playerCharacter.prototype.setArmor = function(armorID){
    for(var i = 0; i < this.inventory.items.Armors.length; i++){
        if(this.inventory.items.Armors[i] === armorID){ 
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

function rpgConsole(id){

    this.content = [];
    this.writeCount = 0;
    this.id = id;
    this.output = '';
    
    }

rpgConsole.prototype.log = function(theClass,theString){
    this.writeCount = this.content.unshift({"theClass": theClass, "theText": theString});
    var outputTemplate = '<p class="{theClass}">{theText}</p>';
    for(var a in this.content[0]){
        outputTemplate = outputTemplate.replace('{' + a + '}',this.content[0][a]);
        }
    this.output = outputTemplate + this.output;
    };

rpgConsole.prototype.display = function(){
    document.getElementById(this.id).innerHTML = this.output;
    };
timer = function(timeOut,step,callback){
    
    this.t = 0;
    this.elapsed = 0;
    this.timeString = '';
    this.timeOut = timeOut || 0;
    this.step = step || 1000;
    this.callback = callback || null;
    this.identifier = null;

};

timer.prototype.updateTimer = function(){
    this.elapsed = (new Date().getTime()) - this.t;
    if(this.elapsed > this.timeOut){
        this.elapsed = null;
        clearInterval(this.identifier);
        this.timedOut();
    }
};

timer.prototype.timedOut = function(){
    this.t = null;
    if(this.callback !== null){
        this.callback.call(this);
    }
};

timer.prototype.startTimer = function(){
    this.t = new Date().getTime();
    this.identifier = setInterval(timer.prototype.updateTimer,this.step);
};
    
timer.prototype.getTimerElapsed = function(){
    return this.elapsed;
};
    
timer.prototype.getTimeString = function(){
    this.elapsed = new Date(new Date().getTime() - this.t);
    this.timeString = (this.elapsed.getMinutes() > 0) ? this.elapsed.getMinutes() + ':' : '00:';
    //use padding or some better js?
    this.timeString +=  (this.elapsed.getSeconds() < 10) ? '0' + this.elapsed.getSeconds() : this.elapsed.getSeconds();
    return this.timeString;
};
    
