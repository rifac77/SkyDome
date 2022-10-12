import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, VideoDome, StandardMaterial, VideoTexture} from "@babylonjs/core";

class App {
    constructor() {
        // create the canvas html element and attach it to the webpage
        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);

        // initialize babylon scene and engine
        var engine = new Engine(canvas, true);
        var scene = new Scene(engine);

        // Camera and lights
        var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);

        // Video Dome
        var videoDome: VideoDome = new VideoDome(
            "videoDome",
            ["https://yoda.blob.core.windows.net/videos/uptale360.mp4"],
            {
                resolution: 32,
                clickToPlay: true
            },
            scene
        );
        
        
        // Sphere
        var sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);
        var mat = new StandardMaterial ("mat", scene);
        var videoTexture: VideoTexture = new VideoTexture("video", "https://yoda.blob.core.windows.net/videos/uptale360.mp4", scene, false, false, VideoTexture.TRILINEAR_SAMPLINGMODE,
        {
            autoPlay:true,
            autoUpdateTexture:true
        } );
        mat.diffuseTexture = videoTexture;
	    sphere.material = mat;	
	
	    sphere.rotation.y = Math.PI/3;
	    sphere.rotation.x = 0;
        sphere.rotation.z = Math.PI;

        scene.onPointerUp = () => {
            videoTexture.video.play()
            scene.onPointerUp = null
        }

        // hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
            }
        });

        // run the main render loop
        engine.runRenderLoop(() => {
            scene.render();
        });
    }
}
new App();