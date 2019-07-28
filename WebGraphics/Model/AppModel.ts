class AppModel {
    private models: MolekulaModel[];
    private bb: boolean[];

    constructor() {
        this.models = [];
    }

    public get Molekulas(): MolekulaModel[] {
        return this.models;
    }

    public set Molekulas(value: MolekulaModel[]) {
        this.models = value;
        //Raise update event
    }
}