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