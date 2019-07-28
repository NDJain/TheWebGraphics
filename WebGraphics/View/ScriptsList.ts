$.widget("WG.scriptslist", {
    _root: undefined,

    options: {
        scriptsDescriptions: [],
    },

    _create: function () {
        var root = this.element;
        this._root = root;
        this.refreshUI();
    },

    refreshUI: function () {
        this._root.empty();
        for (var i = 0; i < this.options.scriptsDescriptions.length; i++)
        {
            var elementDiv = $("<div></div>").css("display", "flex").css("flex-direction", "row").css("margin-left", 20).css("margin-top", 10).appendTo(this._root);
            var descrDiv = $("<div></div>").width(250).text(this.options.scriptsDescriptions[i].name).appendTo(elementDiv);
            var btn = $("<button>выполнить</button>").appendTo(elementDiv);
            this.subscribeToButton(btn, i);
        }
    },

    subscribeToButton: function (btn, index)
    {
        btn.click(() => { this.options.scriptsDescriptions[index].callback(); });
    },

    _setOptions: function (options) {
        this._super(options);
        this.refreshUI();
    }
    
});




interface JQuery {
    scriptslist(): any;
    scriptslist(options: any): JQuery;
    scriptslist(optionLiteral: string, optionName: string): any;
    scriptslist(optionLiteral: string, options: any): any;
    scriptslist(optionLiteral: string, optionName: string, optionValue: any): JQuery;
}