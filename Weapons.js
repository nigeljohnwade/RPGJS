var Weapons = {
    
    weapons: [
        {"weaponDamageModifier": 1, "weaponName": "Bare Hands", "weaponStyle": "melee"},
        {"weaponDamageModifier": 1.2, "weaponName": "Cheap One Handed Blade", "weaponStyle": "melee"},
        {"weaponDamageModifier": 1.2, "weaponName": "Cheap One Handed Axe", "weaponStyle": "melee"},
        {"weaponDamageModifier": 1.4, "weaponName": "One Handed Blade", "weaponStyle": "melee"},
        {"weaponDamageModifier": 1.4, "weaponName": "One Handed Axe", "weaponStyle": "melee"},
        {"weaponDamageModifier": 1, "weaponName": "Improvised Thrown Missiles", "weaponStyle": "ranged"},
        {"weaponDamageModifier": 1.2, "weaponName": "Cheap Shortbow", "weaponStyle": "ranged"},
        {"weaponDamageModifier": 1.3, "weaponName": "Cheap Crossbow", "weaponStyle": "ranged"},
        {"weaponDamageModifier": 1.4, "weaponName": "Sturdy Longbow", "weaponStyle": "ranged"},
        {"weaponDamageModifier": 1.5, "weaponName": "Fine Recurve Composite Bow", "weaponStyle": "ranged"}
        ],
    getWeaponDamageModifier: function(weaponID){
        return this.weapons[weaponID].weaponDamageModifier;
    },
    getWeaponName: function(weaponID){
        return this.weapons[weaponID].weaponName;
    },
    getWeaponType: function(weaponID){
        return this.weapons[weaponID].weaponStyle;
    }

};