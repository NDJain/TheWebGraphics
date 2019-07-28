var MolekulaModel = (function () {
    function MolekulaModel() {
        this.atoms = [];
        this.bonds = [];
    }
    Object.defineProperty(MolekulaModel.prototype, "Atoms", {
        get: function () {
            return this.atoms;
        },
        set: function (value) {
            this.atoms = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MolekulaModel.prototype, "Bonds", {
        get: function () {
            return this.bonds;
        },
        set: function (value) {
            this.bonds = value;
        },
        enumerable: true,
        configurable: true
    });
    MolekulaModel.prototype.GetAtomByID = function (id) {
        for (var i = 0; i < this.atoms.length; i++) {
            if (this.atoms[i].Id === id)
                return this.atoms[i];
        }
        return undefined;
    };
    MolekulaModel.prototype.GetBoundingBox = function () {
        var maxX = -100;
        var maxY = -100;
        var maxZ = -100;
        var minX = 100;
        var minY = 100;
        var minZ = 100;
        for (var i = 0; i < this.atoms.length; i++) {
            if (this.atoms[i].Y <= minY)
                minY = this.atoms[i].Y;
            if (this.atoms[i].Z <= minZ)
                minZ = this.atoms[i].Z;
            if (this.atoms[i].X <= minX)
                minX = this.atoms[i].X;
            if (this.atoms[i].X >= maxX)
                maxX = this.atoms[i].X;
            if (this.atoms[i].Y >= maxY)
                maxY = this.atoms[i].Y;
            if (this.atoms[i].Z >= maxZ)
                maxZ = this.atoms[i].Z;
        }
        var sizeGap = 0.2;
        return new BoundingBox(minX - sizeGap, minY - sizeGap, minZ - sizeGap, maxX + sizeGap, maxY + sizeGap, maxZ + sizeGap);
    };
    return MolekulaModel;
}());
var Atom = (function () {
    function Atom(id, name, x, y, z) {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Object.defineProperty(Atom.prototype, "Id", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Atom.prototype, "Name", {
        get: function () {
            return this.name;
        },
        set: function (value) {
            this.name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Atom.prototype, "X", {
        get: function () {
            return this.x;
        },
        set: function (value) {
            this.x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Atom.prototype, "Y", {
        get: function () {
            return this.y;
        },
        set: function (value) {
            this.y = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Atom.prototype, "Z", {
        get: function () {
            return this.z;
        },
        set: function (value) {
            this.z = value;
        },
        enumerable: true,
        configurable: true
    });
    return Atom;
}());
var Bond = (function () {
    function Bond(id, fromId, toId, bondType) {
        this.id = id;
        this.fromId = fromId;
        this.toId = toId;
        this.bondType = bondType;
    }
    Object.defineProperty(Bond.prototype, "Id", {
        get: function () {
            return this.id;
        },
        set: function (value) {
            this.id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bond.prototype, "FromId", {
        get: function () {
            return this.fromId;
        },
        set: function (value) {
            this.fromId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bond.prototype, "ToId", {
        get: function () {
            return this.toId;
        },
        set: function (value) {
            this.toId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bond.prototype, "Type", {
        get: function () {
            return this.bondType;
        },
        set: function (value) {
            this.bondType = value;
        },
        enumerable: true,
        configurable: true
    });
    return Bond;
}());
var BoundingBox = (function () {
    function BoundingBox(minX, minY, minZ, maxX, maxY, maxZ) {
        this.minX = minX;
        this.maxX = maxX;
        this.maxY = maxY;
        this.maxZ = maxZ;
        this.minY = minY;
        this.minZ = minZ;
    }
    Object.defineProperty(BoundingBox.prototype, "MinX", {
        get: function () {
            return this.minX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoundingBox.prototype, "MinY", {
        get: function () {
            return this.minY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoundingBox.prototype, "MinZ", {
        get: function () {
            return this.minZ;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoundingBox.prototype, "MaxX", {
        get: function () {
            return this.maxX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoundingBox.prototype, "MaxY", {
        get: function () {
            return this.maxY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoundingBox.prototype, "MaxZ", {
        get: function () {
            return this.maxZ;
        },
        enumerable: true,
        configurable: true
    });
    BoundingBox.prototype.GetCenterX = function () {
        return (this.maxX + this.minX) / 2;
    };
    BoundingBox.prototype.GetCenterY = function () {
        return (this.maxY + this.minY) / 2;
    };
    BoundingBox.prototype.GetCenterZ = function () {
        return (this.maxZ + this.minZ) / 2;
    };
    Object.defineProperty(BoundingBox.prototype, "Width", {
        get: function () {
            return this.maxX - this.minX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoundingBox.prototype, "Height", {
        get: function () {
            return this.maxY - this.minY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoundingBox.prototype, "Depth", {
        get: function () {
            return this.maxZ - this.minZ;
        },
        enumerable: true,
        configurable: true
    });
    return BoundingBox;
}());
//# sourceMappingURL=Molekula.js.map