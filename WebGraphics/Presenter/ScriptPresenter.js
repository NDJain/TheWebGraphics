var ScriptPresenter = (function () {
    function ScriptPresenter(appModel, renderPresenter, fileInput, scriptsList) {
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
                that.scripts.push({ name: name, callback: function () { that.ExecuteScript(contents); } });
                that.scriptsList.scriptslist({
                    scriptsDescriptions: that.scripts
                });
            };
            fileLoader.readAsText((e.target).files[0]);
        });
    }
    ScriptPresenter.prototype.ExecuteScript = function (script) {
        var appModel = this.appModel;
        var renderPresenter = this.renderPresenter;
        var ReplaceAtoms = this.ReplaceAtoms;
        eval(script);
    };
    ScriptPresenter.prototype.ReplaceAtoms = function (molekula, typeForReplace, newType) {
        for (var i = 0; i < molekula.Atoms.length; i++) {
            if (molekula.Atoms[i].Name === typeForReplace)
                molekula.Atoms[i].Name = newType;
        }
    };
    return ScriptPresenter;
}());
//# sourceMappingURL=ScriptPresenter.js.map