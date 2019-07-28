class ScriptPresenter {

    private appModel: AppModel;
    private renderPresenter: RenderPresenter;
    private fileInput: JQuery;
    private scriptsList: JQuery;
    private scripts: any[];

    constructor(appModel: AppModel, renderPresenter: RenderPresenter, fileInput: JQuery, scriptsList: JQuery) {
        var that = this;
        this.appModel = appModel;
        this.renderPresenter = renderPresenter;
        this.fileInput = fileInput;
        this.scriptsList = scriptsList;
        this.scripts = [];

        fileInput.change(function (e) {
            if (fileInput.val() === undefined)
                return;

            var fileLoader = new FileReader();
            fileLoader.onload = function (e) {
                var contents = fileLoader.result;
                var name = fileInput.val();
                var arr = name.split('\\');
                name = arr[arr.length - 1];
                that.scripts.push({ name: name, callback: () => { that.ExecuteScript(contents) } });
                that.scriptsList.scriptslist({
                    scriptsDescriptions: that.scripts
                });
                
            }
            fileLoader.readAsText((<any>(e.target)).files[0]);
        });
    }

    private ExecuteScript(script: string) {
        var appModel = this.appModel;
        var renderPresenter = this.renderPresenter;
        var ReplaceAtoms = this.ReplaceAtoms;

        eval(script);
    }

    private ReplaceAtoms(molekula: MolekulaModel, typeForReplace: string, newType: string)
    {
        for (var i = 0; i < molekula.Atoms.length; i++)
        {
            if (molekula.Atoms[i].Name === typeForReplace)
                molekula.Atoms[i].Name = newType;
        }
    }
}