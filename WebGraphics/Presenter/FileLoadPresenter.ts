class FileLoadPresenter {
    private fileInput: JQuery;
    private appModel: AppModel;
    private renderPresenter: RenderPresenter;

    constructor(appModel: AppModel, renderPresenter: RenderPresenter, fileInput: JQuery) {
        var that = this;

        this.appModel = appModel;
        this.fileInput = fileInput;

        fileInput.change(function (e) {
            if (fileInput.val() === undefined)
                return;

            var fileLoader = new FileReader();
            fileLoader.onload = function (e) {
                var contents = fileLoader.result;
                var molekula = that.ParseMolekula(contents);
                appModel.Molekulas.push(molekula);
                $("#infoDiv").hide();
                renderPresenter.RenderAll();
            };
            fileLoader.readAsText((<any>(e.target)).files[0]);
        });
    }

    private ParseMolekula(contents: string): MolekulaModel {
        var molekula = new MolekulaModel();

        var strings = (<string>contents).split("\n"); 

        var currentBlock = undefined;
        var atoms = 0;
        var bonds = 0;
        for (var i = 0; i < strings.length; i++) {
            var str = strings[i];
            var idx = str.indexOf("@<TRIPOS>");
            if (idx > -1) {
                currentBlock = str;
            }
            else {
                if (currentBlock !== undefined) {
                    if (currentBlock.indexOf("ATOM") > -1) {
                        //Создаем новый атом на основе очередной строчки
                        var data = str.trim().replace(/[\s\t]+/g, ' ').split(' ');
                        molekula.Atoms.push(new Atom(
                            parseInt(data[0]),
                            data[1],
                            parseFloat(data[2]),
                            parseFloat(data[3]),
                            parseFloat(data[4])));
                    } else if (currentBlock.indexOf("BOND") > -1) {
                        //Создаем новую связь на основе очередной строчки
                        var data = str.trim().replace(/[\s\t]+/g, ' ').split(' ');
                        if (data.length < 4)
                            continue;
                        //  console.log(str);
                        // var x = data[3];
                        var y: number;
                        if (data[3] === "ar") {
                            y = 1;
                        } else {
                            y = parseInt(data[3]);
                        }
                        molekula.Bonds.push(new Bond(
                            parseInt(data[0]),
                            parseInt(data[1]),
                            parseInt(data[2]),
                            y));
                        // bonds++;
                    }
                }
            }
        }
        return molekula;
    }
}