var RenderPresenter = (function () {
    function RenderPresenter(appModel, renderDiv) {
        var _this = this;
        this.appModel = appModel;
        this.renderDiv = renderDiv;
        this.spheres = [];
        this.rotations = [];
        this.renderBB = false;
        this.RenderAll();
        this.rotations.push({ x: 0, y: 0, deltaX: 0, deltaY: 0 });
        var isMouseDown = false;
        var startX = 0;
        var startY = 0;
        renderDiv.mousedown(function (e) {
            isMouseDown = true;
            startX = e.clientX;
            startY = e.clientY;
        });
        renderDiv.mousemove(function (e) {
            if (isMouseDown) {
                var rotationMatrixXold = new THREE.Matrix4();
                var rotationMatrixYold = new THREE.Matrix4();
                rotationMatrixXold.identity();
                rotationMatrixYold.identity();
                if (_this.rotations[0] !== undefined) {
                    rotationMatrixXold.makeRotationY(-_this.rotations[0].deltaX / 100);
                    rotationMatrixYold.makeRotationX(-_this.rotations[0].deltaY / 100);
                    rotationMatrixYold.multiply(rotationMatrixXold);
                }
                _this.rotations[0].deltaX = e.clientX - startX;
                _this.rotations[0].deltaY = e.clientY - startY;
                var rotationMatrixX = new THREE.Matrix4();
                var rotationMatrixY = new THREE.Matrix4();
                rotationMatrixX.identity();
                rotationMatrixY.identity();
                if (_this.rotations[0] !== undefined) {
                    rotationMatrixX.makeRotationY(_this.rotations[0].deltaX / 100);
                    rotationMatrixY.makeRotationX(_this.rotations[0].deltaY / 100);
                    rotationMatrixX.multiply(rotationMatrixY);
                }
                rotationMatrixYold.multiply(rotationMatrixX);
                //var rotationMatrixXStatic = new THREE.Matrix4();
                //var rotationMatrixYStatic = new THREE.Matrix4();
                //rotationMatrixXStatic.identity();
                //rotationMatrixYStatic.identity();
                //if (this.rotations[0] !== undefined) {
                //rotationMatrixXStatic.makeRotationY(this.rotations[0].x / 100);
                //rotationMatrixYStatic.makeRotationX(this.rotations[0].y / 100);
                //rotationMatrixX.multiply(rotationMatrixY);
                //}
                //rotationMatrixXStatic.multiply(rotationMatrixXold);
                for (var i = 0; i < _this.geometries[0].length; i++) {
                    _this.geometries[0][i].applyMatrix(rotationMatrixYold);
                }
            }
        });
        renderDiv.mouseup(function (e) {
            isMouseDown = false;
            _this.rotations[0].x = _this.rotations[0].x + e.clientX - startX;
            _this.rotations[0].y = _this.rotations[0].y + e.clientY - startY;
            _this.rotations[0].deltaX = 0;
            _this.rotations[0].deltaY = 0;
            //this.RenderAll();
        });
    }
    RenderPresenter.prototype.RenderAll = function () {
        this.spheres = [];
        this.geometries = [];
        var scene = new THREE.Scene();
        this.CreateLight(scene);
        var offsets = [];
        var width = 0;
        var gap = 2;
        for (var i = 0; i < this.appModel.Molekulas.length; i++) {
            width += this.appModel.Molekulas[i].GetBoundingBox().Width;
        }
        width += gap * (this.appModel.Molekulas.length - 1);
        var currentOffset = -width / 2;
        for (var i = 0; i < this.appModel.Molekulas.length; i++) {
            var bbox = this.appModel.Molekulas[i].GetBoundingBox();
            offsets[i] = -bbox.GetCenterX() + currentOffset + bbox.Width / 2;
            currentOffset = currentOffset + bbox.Width + gap;
        }
        for (var i = 0; i < this.appModel.Molekulas.length; i++) {
            this.geometries.push(this.Render(this.appModel.Molekulas[i], offsets[i], scene, i)); //offsets[i]
        }
        this.renderDiv.scenerenderer({ scene: scene, spheres: this.spheres });
    };
    RenderPresenter.prototype.CreateLight = function (scene) {
        var pointLight = new THREE.PointLight("white", 1, 100, 2);
        pointLight.position.set(10, 10, -10);
        scene.add(pointLight);
        var pointLight2 = new THREE.PointLight("white", 1, 100, 2);
        pointLight2.position.set(-10, -10, 10);
        scene.add(pointLight2);
    };
    RenderPresenter.prototype.Render = function (molekula, offset, scene, molekulaIndex) {
        var rotationMatrix = new THREE.Matrix4();
        rotationMatrix.identity();
        if (this.rotations[molekulaIndex] !== undefined) {
        }
        var meshArr = [];
        for (var i = 0; i < molekula.Bonds.length; i++) {
            var bond = molekula.Bonds[i];
            var fromAtom = molekula.GetAtomByID(bond.FromId);
            var toAtom = molekula.GetAtomByID(bond.ToId);
            var direction = new THREE.Vector3(toAtom.X - fromAtom.X, toAtom.Y - fromAtom.Y, toAtom.Z - fromAtom.Z);
            direction.normalize();
            var angle = direction.angleTo(new THREE.Vector3(0, 1, 0));
            var rotationAxis = new THREE.Vector3();
            rotationAxis.crossVectors(new THREE.Vector3(0, 1, 0), direction);
            var rotObjectMatrix = new THREE.Matrix4();
            rotObjectMatrix.makeRotationAxis(rotationAxis.normalize(), angle);
            var height = Math.sqrt((toAtom.X - fromAtom.X) * (toAtom.X - fromAtom.X)
                + (toAtom.Y - fromAtom.Y) * (toAtom.Y - fromAtom.Y)
                + (toAtom.Z - fromAtom.Z) * (toAtom.Z - fromAtom.Z)) / 2;
            if (bond.Type === 1) {
                var cylinderGeometry = new THREE.CylinderGeometry(0.05, 0.05, height, 10, 10, false);
                var color = this.GetColor(fromAtom.Name);
                var color2 = this.GetColor(toAtom.Name);
                var cylinderMaterial = new THREE.MeshPhongMaterial({ color: color });
                var cylinderMaterial2 = new THREE.MeshPhongMaterial({ color: color2 });
                var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
                var cylinder2 = new THREE.Mesh(cylinderGeometry, cylinderMaterial2);
                cylinder.matrix.multiply(rotObjectMatrix);
                cylinder.rotation.setFromRotationMatrix(cylinder.matrix);
                cylinder2.matrix.multiply(rotObjectMatrix);
                cylinder2.rotation.setFromRotationMatrix(cylinder2.matrix);
                cylinder.position.x = (fromAtom.X + (toAtom.X - fromAtom.X) / 4) + offset;
                cylinder.position.y = (fromAtom.Y + (toAtom.Y - fromAtom.Y) / 4);
                cylinder.position.z = (fromAtom.Z + (toAtom.Z - fromAtom.Z) / 4);
                cylinder2.position.x = (fromAtom.X + (toAtom.X - fromAtom.X) * 3 / 4) + offset;
                cylinder2.position.y = (fromAtom.Y + (toAtom.Y - fromAtom.Y) * 3 / 4);
                cylinder2.position.z = (fromAtom.Z + (toAtom.Z - fromAtom.Z) * 3 / 4);
                scene.add(cylinder);
                scene.add(cylinder2);
                meshArr.push(cylinder);
                meshArr.push(cylinder2);
            }
            else if (bond.Type === 2) {
                var cylinderGeometry = new THREE.CylinderGeometry(0.025, 0.025, height, 10, 10, false);
                var color = this.GetColor(fromAtom.Name);
                var color2 = this.GetColor(toAtom.Name);
                var cylinderMaterial = new THREE.MeshPhongMaterial({ color: color });
                var cylinderMaterial2 = new THREE.MeshPhongMaterial({ color: color2 });
                var cylinder11 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
                var cylinder21 = new THREE.Mesh(cylinderGeometry, cylinderMaterial2);
                var cylinder12 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
                var cylinder22 = new THREE.Mesh(cylinderGeometry, cylinderMaterial2);
                cylinder11.matrix.multiply(rotObjectMatrix);
                cylinder11.rotation.setFromRotationMatrix(cylinder11.matrix);
                cylinder21.matrix.multiply(rotObjectMatrix);
                cylinder21.rotation.setFromRotationMatrix(cylinder21.matrix);
                cylinder12.matrix.multiply(rotObjectMatrix);
                cylinder12.rotation.setFromRotationMatrix(cylinder12.matrix);
                cylinder22.matrix.multiply(rotObjectMatrix);
                cylinder22.rotation.setFromRotationMatrix(cylinder22.matrix);
                cylinder11.position.x = (fromAtom.X + (toAtom.X - fromAtom.X) / 4) + offset;
                cylinder11.position.y = (fromAtom.Y + (toAtom.Y - fromAtom.Y) / 4) + 0.04;
                cylinder11.position.z = (fromAtom.Z + (toAtom.Z - fromAtom.Z) / 4);
                cylinder21.position.x = (fromAtom.X + (toAtom.X - fromAtom.X) * 3 / 4) + offset;
                cylinder21.position.y = (fromAtom.Y + (toAtom.Y - fromAtom.Y) * 3 / 4) + 0.04;
                cylinder21.position.z = (fromAtom.Z + (toAtom.Z - fromAtom.Z) * 3 / 4);
                cylinder12.position.x = (fromAtom.X + (toAtom.X - fromAtom.X) / 4) + offset;
                cylinder12.position.y = (fromAtom.Y + (toAtom.Y - fromAtom.Y) / 4) - 0.04;
                cylinder12.position.z = (fromAtom.Z + (toAtom.Z - fromAtom.Z) / 4);
                cylinder22.position.x = (fromAtom.X + (toAtom.X - fromAtom.X) * 3 / 4) + offset;
                cylinder22.position.y = (fromAtom.Y + (toAtom.Y - fromAtom.Y) * 3 / 4) - 0.04;
                cylinder22.position.z = (fromAtom.Z + (toAtom.Z - fromAtom.Z) * 3 / 4);
                scene.add(cylinder11);
                scene.add(cylinder21);
                scene.add(cylinder12);
                scene.add(cylinder22);
                meshArr.push(cylinder11);
                meshArr.push(cylinder21);
                meshArr.push(cylinder12);
                meshArr.push(cylinder22);
            }
        }
        for (var i = 0; i < molekula.Atoms.length; i++) {
            var atom = molekula.Atoms[i];
            var msize = this.GetSize(atom.Name);
            // var sphereGeometry = new THREE.SphereGeometry(msize, 20, 20);
            var sphereGeometry = new THREE.BoxGeometry(msize, msize, msize, 1, 1, 1);
            var color = this.GetColor(atom.Name);
            var sphereMaterial = new THREE.MeshPhongMaterial({ color: color /*, wireframe: true*/ });
            var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            var translationMatrix = new THREE.Matrix4();
            translationMatrix.multiply(rotationMatrix);
            translationMatrix.multiply(new THREE.Matrix4().makeTranslation(atom.X + offset, atom.Y, atom.Z));
            sphere.geometry.applyMatrix(translationMatrix);
            scene.add(sphere);
            meshArr.push(sphere);
            this.spheres.push({ mesh: sphere, data: { name: atom.Name, color: sphere.material.color } });
        }
        if (this.renderBB === true) {
            var bbox = molekula.GetBoundingBox();
            var boundGeom = new THREE.BoxGeometry(bbox.Width, bbox.Height, bbox.Depth, 1, 1, 1);
            var boundMaterial = new THREE.MeshPhongMaterial({ color: "red", wireframe: true });
            var bound = new THREE.Mesh(boundGeom, boundMaterial);
            bound.position.x = bbox.GetCenterX() + offset;
            bound.position.y = bbox.GetCenterY();
            bound.position.z = bbox.GetCenterZ();
            scene.add(bound);
        }
        return meshArr;
        //var combined = this.MergeMeshes(meshArr);
        //scene.add(THREE.Mesh(combined, new THREE.MeshPhongMaterial({ color: "red"/*, wireframe: true*/ })));
    };
    Object.defineProperty(RenderPresenter.prototype, "RenderBB", {
        get: function () {
            return this.renderBB;
        },
        set: function (value) {
            this.renderBB = value;
            this.RenderAll();
        },
        enumerable: true,
        configurable: true
    });
    RenderPresenter.prototype.GetSize = function (name) {
        return 0.2;
    };
    RenderPresenter.prototype.GetColor = function (name) {
        var color = "purple";
        if (name === "N")
            color = "blue";
        else if (name === "O")
            color = "red";
        else if (name === "H")
            color = "white";
        else if (name === "C")
            color = "gray";
        else if (name === "Br")
            color = "brown";
        else if (name === "I")
            color = "darkviolet";
        else if (name === "P")
            color = "orange";
        else if (name === "B")
            color = "beige";
        else if (name === "Cl")
            color = "green";
        else if (name === "F")
            color = "green";
        return color;
    };
    RenderPresenter.prototype.MergeMeshes = function (meshes) {
        var combined = new THREE.Geometry();
        for (var i = 0; i < meshes.length; i++) {
            meshes[i].updateMatrix();
            combined.merge(meshes[i].geometry, meshes[i].matrix);
        }
        return combined;
    };
    return RenderPresenter;
}());
////sphere.position.x = atom.X + offset;
////sphere.position.y = atom.Y;
////sphere.position.z = atom.Z;
////sphere.matrix.multiply(rotationMatrix);
////sphere.rotation.setFromRotationMatrix(sphere.matrix);
//var translationMatrix = new THREE.Matrix4();
//translationMatrix.multiply(rotationMatrix);
//translationMatrix.multiply(new THREE.Matrix4().makeTranslation(atom.X + offset, atom.Y, atom.Z));
////translationMatrix.multiply(rotationMatrix);
////rotationMatrix.multiply(translationMatrix);
//sphere.geometry.applyMatrix(rotationMatrix);
//            //if (this.rotations[molekulaIndex] !== undefined)
//            //{
//            //    sphere.rotation.Y = this.rotations[molekulaIndex].x / 100;
//            //} 
//# sourceMappingURL=RenderPresenter.js.map