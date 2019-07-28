declare var THREE: any;




//function DrawCyl(number: a

window.onload = () => {
    var appModel = new AppModel();
    $("#renderDiv").scenerenderer();
    $("#scriptsList").scriptslist();
    var renderPresenter = new RenderPresenter(appModel, $("#renderDiv"));
    var fileLoadPresenter = new FileLoadPresenter(appModel, renderPresenter, $("#modelImport"));
    var scriptPresenter = new ScriptPresenter(appModel, renderPresenter, $("#scriptImport"), $("#scriptsList"));

 

    $("#clearBtn").click(function (arg) {
        $("#modelImport").val(undefined);
        $("#infoDiv").hide();
        appModel.Molekulas = [];
        renderPresenter.RenderAll();
    });

    $("#bboxBtn").click(function (arg) {
        renderPresenter.RenderBB = !renderPresenter.RenderBB;
    });

    $("#renderDiv").mousemove(function (arg) {
        $("#renderDiv").scenerenderer("processMouseMove", arg);
    });

    $("#renderDiv").click(function (arg) {
        $("#renderDiv").scenerenderer("processClick", arg);
    });

};