import Experience from "./Experience";
import * as THREE from "three"
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.parameters = {
            exposure: 1.5,
            bloomStrength: 0.2,
            bloomThreshold: 0,
            bloomRadius: 0
        }

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('render')
        }

        this.setInstance()
        this.addPost()
    }

    setInstance()
    {
        this.instance = new THREE.WebGL1Renderer({
            canvas: this.canvas,
            antialias: true,
            powerPreference: 'high-performance'

        })

        this.instance.physicallyCorrectLights = true
        // this.instance.outputEncoding = THREE.sRGBEncoding
        this.instance.toneMapping = THREE.ReinhardToneMapping
        this.instance.setClearColor(0x000000, 1)
        this.instance.toneMappingExposure = Math.pow(this.parameters.exposure, 4)
        // this.instance.setClearColor('#211d20')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
        this.instance.shadowMap.autoUpdate = false
        this.instance.shadowMap.needsUpdate = true

        if(this.debug.active)
        {
            this.debugFolder
                .add(this.parameters, 'exposure')
                .min(0)
                .max(2)
                .step(0.01)
                .name("Exposure") 
        }
    }

    addPost() 
    {
        this.renderScene = new RenderPass( this.scene, this.camera.instance)
         this.bloomPass = new UnrealBloomPass( new THREE.Vector2(this.sizes.width, this.sizes.height), 1.5, 0.4, 0.85);
         this.bloomPass.threshold = this.parameters.bloomThreshold
         this.bloomPass.strength = this.parameters.bloomStrength
         this.bloomPass.radius = this.parameters.bloomRadius

         this.composer = new EffectComposer (this.instance)
         this.composer.addPass( this.renderScene)
         this.composer.addPass(this.bloomPass)

         if(this.debug.active)
        {
            this.debugFolder
                .add(this.parameters, 'bloomStrength')
                .min(0)
                .max(5)
                .step(0.001)
                .name("Bloom Strength") 
        }
    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
        this.composer.setSize(this.sizes.width, this.sizes.height)
    }

    update()
    {
        // this.instance.render(this.scene, this.camera.instance)
        this.bloomPass.strength = this.parameters.bloomStrength
        this.instance.toneMappingExposure = this.parameters.exposure
        this.composer.render()
    }
}