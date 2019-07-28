declare var THREE: any;

class MolekulaModel {
    private atoms: Atom[];
    private bonds: Bond[];

    constructor() {
        this.atoms = [];
        this.bonds = [];
    }


    public get Atoms(): Atom[] {
        return this.atoms;
    }

    public set Atoms(value: Atom[]) {
        this.atoms = value;
    }

    public get Bonds(): Bond[] {
        return this.bonds;
    }

    public set Bonds(value: Bond[]) {
        this.bonds = value;
    }

    public GetAtomByID(id: number): Atom {
        for (var i = 0; i < this.atoms.length; i++) {
            if (this.atoms[i].Id === id)
                return this.atoms[i];
        }
        return undefined;
    }

    public GetBoundingBox(): BoundingBox {
        var maxX = -100;
        var maxY = -100;
        var maxZ = -100;
        var minX = 100;
        var minY = 100;
        var minZ = 100;

        for (var i = 0; i < this.atoms.length; i++) {
            if (this.atoms[i].Y <= minY) minY = this.atoms[i].Y;
            if (this.atoms[i].Z <= minZ) minZ = this.atoms[i].Z;
            if (this.atoms[i].X <= minX) minX = this.atoms[i].X;
            if (this.atoms[i].X >= maxX) maxX = this.atoms[i].X;
            if (this.atoms[i].Y >= maxY) maxY = this.atoms[i].Y;
            if (this.atoms[i].Z >= maxZ) maxZ = this.atoms[i].Z;
        }

        var sizeGap = 0.2;
        return new BoundingBox(minX - sizeGap, minY - sizeGap, minZ - sizeGap, maxX + sizeGap, maxY + sizeGap, maxZ + sizeGap);
    }

}

class Atom {
    private id: number;
    private name: string;
    private x: number;
    private y: number;
    private z: number;

    constructor(id: number, name: string, x: number, y: number, z: number) {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public get Id(): number {
        return this.id;
    }

    public get Name(): string {
        return this.name;
    }

    public set Name(value: string) {
        this.name = value;
    }

    public get X(): number {
        return this.x;
    }

    public set X(value: number) {
        this.x = value;
    }

    public get Y(): number {
        return this.y;
    }

    public set Y(value: number) {
        this.y = value;
    }

    public get Z(): number {
        return this.z;
    }

    public set Z(value: number) {
        this.z = value;
    }
}

class Bond {
    private id: number;
    private fromId: number;
    private toId: number;
    private bondType: number;

    constructor(id: number, fromId: number, toId: number, bondType: number) {
        this.id = id;
        this.fromId = fromId;
        this.toId = toId;
        this.bondType = bondType;
    }

    public get Id(): number {
        return this.id;
    }

    public set Id(value: number) {
        this.id = value;
    }

    public get FromId(): number {
        return this.fromId;
    }

    public set FromId(value: number) {
        this.fromId = value;
    }

    public get ToId(): number {
        return this.toId;
    }

    public set ToId(value: number) {
        this.toId = value;
    }

    public get Type(): number {
        return this.bondType;
    }

    public set Type(value: number) {
        this.bondType = value;
    }
}

class BoundingBox {
    private minX: number;
    private minY: number;
    private minZ: number;
    private maxX: number;
    private maxY: number;
    private maxZ: number;

    constructor(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number) {
        this.minX = minX;
        this.maxX = maxX;
        this.maxY = maxY;
        this.maxZ = maxZ;
        this.minY = minY;
        this.minZ = minZ;
    }

    public get MinX(): number {
        return this.minX;
    }

    public get MinY(): number {
        return this.minY;
    }

    public get MinZ(): number {
        return this.minZ;
    }

    public get MaxX(): number {
        return this.maxX;
    }

    public get MaxY(): number {
        return this.maxY;
    }

    public get MaxZ(): number {
        return this.maxZ;
    }

    public GetCenterX(): number {
        return (this.maxX + this.minX) / 2;
    }

    public GetCenterY(): number {
        return (this.maxY + this.minY) / 2;
    }

    public GetCenterZ(): number {
        return (this.maxZ + this.minZ) / 2;
    }

    public get Width(): number {
        return this.maxX - this.minX;
    }

    public get Height(): number {
        return this.maxY - this.minY;
    }

    public get Depth(): number {
        return this.maxZ - this.minZ;
    }


}
