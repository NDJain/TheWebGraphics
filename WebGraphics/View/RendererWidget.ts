$.widget("WG.scenerenderer", {
    _renderer: undefined,
    _camera: undefined,
    _controls: undefined,
    _root: undefined,

    options: {
        scene: undefined,
        spheres: [],
    },

    _create: function () {
        var root = this.element;
        this._root = root;

        var size = {
            width: root.width(),
            height: root.height()
        };

        this._camera = new THREE.PerspectiveCamera(45
            , size.width / size.height, 0.1, 1000);
        var camera = this._camera;

        this._renderer = new THREE.WebGLRenderer();
        var renderer = this._renderer;
        renderer.setSize(size.width, size.height);

        camera.position.x = 10;
        camera.position.y = 10;
        camera.position.z = 10;

        //var pointLight = new THREE.PointLight("white", 1, 100, 2);
        //pointLight.position.set(10, 10, -10);
        //scene.add(pointLight);
        //var pointLight2 = new THREE.PointLight("white", 1, 100, 2);
        //pointLight2.position.set(-10, -10, 10);
        //scene.add(pointLight2);

        root.append(renderer.domElement);

        this._controls = new THREE.OrbitControls(camera, renderer.domElement);
        var controls = this._controls;
        controls.target.set(0, 0, 0);
        controls.update();
        controls.enabled = false;

        setInterval(() => {
            if (this.options.scene !== undefined) {
                renderer.clear();
                renderer.render(this.options.scene, camera);
            } else {
                renderer.clear();
                //TODO: clear screen
            }
        }, 1000 / 30);
    },

    processClick: function (event) {
        var renderer = this._renderer;
        var mouse: any = {};
        var raycaster = new THREE.Raycaster();
        var camera = this._camera;
        mouse.x = (event.offsetX / this._root.width()) * 2 - 1;
        mouse.y = - (event.offsetY / this._root.height()) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        // See if the ray from the camera into the world hits one of our meshes
        var spheres = this.options.spheres;
        $("#infoDiv").hide();
        for (var i = 0; i < spheres.length; i++) {
            var intersects = raycaster.intersectObject(spheres[i].mesh);
            if (intersects.length > 0) {
                $("#infoDiv").show();
                $("#infoDiv").text("это атом " + spheres[i].data.name +"\n"  );
                $("#infoDiv").css("top", event.clientY);
                $("#infoDiv").css("left", event.clientX + 10);

            }
        }


    },

    processMouseMove: function (event) {
        var renderer = this._renderer;
        var mouse: any = {};
        var raycaster = new THREE.Raycaster();
        var camera = this._camera;
        mouse.x = (event.offsetX / this._root.width()) * 2 - 1;
        mouse.y = - (event.offsetY / this._root.height()) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        //$("#infoDiv").show();
        //$("#infoDiv").text("X: " + event.clientX + ", Y: " + event.clientY);
        //$("#infoDiv").css("top", event.clientY);
        //$("#infoDiv").css("left", event.clientX);

        //     // See if the ray from the camera into the world hits one of our meshes
        var spheres = this.options.spheres;
        //     $("#infoDiv").hide();
        for (var i = 0; i < spheres.length; i++) {
            spheres[i].mesh.material.color = spheres[i].data.color;

            var intersects = raycaster.intersectObject(spheres[i].mesh);
            if (intersects.length > 0) {
                spheres[i].mesh.material.color = new THREE.Color( 0.5, 0.5, 0.5);
            }
        }


    }
});




interface JQuery {
    scenerenderer(): any;
    scenerenderer(options: any): JQuery;
    scenerenderer(optionLiteral: string, optionName: string): any;
    scenerenderer(optionLiteral: string, options: any): any;
    scenerenderer(optionLiteral: string, optionName: string, optionValue: any): JQuery;
}