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