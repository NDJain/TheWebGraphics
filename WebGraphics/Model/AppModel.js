var AppModel = (function () {
    function AppModel() {
        this.models = [];
    }
    Object.defineProperty(AppModel.prototype, "Molekulas", {
        get: function () {
            return this.models;
        },
        set: function (value) {
            this.models = value;
            //Raise update event
        },
        enumerable: true,
        configurable: true
    });
    return AppModel;
}());
//# sourceMappingURL=AppModel.js.map