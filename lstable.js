    var LSTable = function(table) {
        this.idKey = table + "-id";
        this.idVal = 1;
        this.table = table;
        this.storage = window.localStorage;
        this._initID();
    };

    LSTable.prototype = {

        // privare
        _initID: function() {
            var id = this._getItem(this.idKey);
            if (id) {
                this.idVal = Number(id) + 1;
            }
        },

        _incrID: function() {
            this._setItem(this.idKey, this.idVal);
            this.idVal++;
        },

        _setItem: function(key, value) {
            this.storage.setItem(key, value);
        },

        _getItem: function(key) {
            return this.storage.getItem(key);
        },

        _removeItem: function(key) {
            this.storage.removeItem(key);
        },

        // element should be simple type which can compared by =
        _compareObj: function(a, b) {
            for (var k in a) {
                if (!b[k]) {
                    return false;
                }
                if (a[k] != b[k]) {
                    return false;
                }
            }
            return true;
        },

        _getKey: function() {
            return this.table + "-";
        },

        // public
        // an auto increment id will be added to this object
        save: function(obj) {
            obj.id = this.idVal;
            var key = this._getKey() + this.idVal;

            this._setItem(key, JSON.stringify(obj));
            this._incrID();

            return obj.id;
        },

        // 
        get: function(obj) {
            var list = [];
            var key = this._getKey();

            for (var i = 1; i < this.idVal; i++) {
                var result = JSON.parse(this._getItem(key + i));
                if(result) {
                    if(obj) {
                        if(this._compareObj(obj, result)) {
                            list.push(result);
                        }
                    } else {
                        list.push(result);
                    }
                    
                }
            }

            return list;
        },

        // if id exist, specific row will be deleted
        remove: function(obj) {
            if(obj.id) {
                this._removeItem(this._getKey() + obj.id);
            } else {
                var list = this.get(obj);
                for (var i = 0; i < list.length; i++) {
                    var id = list[i].id;
                    this._removeItem(this._getKey() + id);
                }
            } 
        },

        // id is necessary
        update: function(obj) {
            if(!obj.id) {
                console.log("element 'id' is necessary for this function");
                return;
            }
            var key = this._getKey() + obj.id;
            
            var temp = JSON.parse(this._getItem(key));

            for (var k in obj) {
                temp[k] = obj[k];
            }
            
            this._setItem(key, JSON.stringify(temp));
        },
    };