import Experience from "./Experience";
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('camera')
        }

        this.setInstance()
        // this.setControls()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1,
            5000
        )
        this.instance.position.set(-850, 0, 2500)
        if (this.sizes.width < this.sizes.height){
            this.instance.position.set(0, -300, 2500)
        }
        this.scene.add(this.instance)
        // this.instanceHelper = new THREE.CameraHelper(this.instance)
        // this.scene.add(this.instanceHelper)

        if(this.debug.active)
        {
            this.debugFolder
                .add(this.instance.position, 'x')
                .min(-2000)
                .max(2000)
                .step(1)
                .name("Camera X") 
            this.debugFolder
                .add(this.instance.position, 'y')
                .min(-2000)
                .max(2000)
                .step(1)
                .name("Camera Y") 
            this.debugFolder
                .add(this.instance.position, 'z')
                .min(0)
                .max(5000)
                .step(1)
                .name("Camera Z") 
        }
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
        if (this.sizes.width < this.sizes.height){
            this.instance.position.set(0, -300, 2500)
        }
        else {
            this.instance.position.set(-850, 0, 2500)
        }
    }

    update()
    {
        // this.controls.update()
    }
}