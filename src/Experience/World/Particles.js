import Experience from '../Experience.js'
import * as THREE from 'three'
import vertexShader from '../Shader/vertex.glsl'
import fragmentShader from '../Shader/fragment.glsl'
import gsap from 'gsap'

 export default class Particles 
 {
     constructor() {
        this.experience = new Experience
        this.navBar = this.experience.nav
        this.time = this.experience.time
        this.renderer = this.experience.renderer
        this.size = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.mouse = this.experience.mouse
        this.raycaster = this.experience.raycaster
        this.currentIntersect = null
        this.materialArray = []
        this.meshArray = []
        this.pageDist = [1, 0, 1, 0, 0, 0, 0]


        this.isPlaying = true;
        

        this.parameters = {
            count: 20000,
            size: 0.005
        }

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('particles')
        }

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
     }

     setGeometry() {
         this.geometry = new THREE.PlaneBufferGeometry(480, 270, 480, 270);
     }

     setMaterial() {
        //  for (let i = 0; i < 4; i++ ) {
        //     this.material = new THREE.ShaderMaterial({
        //         vertexShader: vertexShader,
        //         fragmentShader: fragmentShader,
        //         uniforms: {
        //         uTime: { type: "f", value: 0},
        //         uSpeed: {value: 0.0005},
        //         uTexture: { value: this.resources.itemsList[0]},
        //         uTexture2: { value: this.resources.itemsList[i]},
        //         uProgress: { value: 0},
        //         uDistortion: { value: 1.25},
        //         uHide: { value: 0.0},
        //         uBloomStrength: { value: this.parameters.bloomStrength},
        //         uSize: {value: 0.0 * this.renderer.instance.getPixelRatio()}
        //         }
        //     })
        //     this.materialArray.push(this.material)

        // }
        this.material = new THREE.ShaderMaterial({
            precision: 'lowp',
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
            uTime: { type: "f", value: 0},
            uSpeed: {value: 0.0005},
            uTexture: { value: this.resources.itemsList[0]},
            uTexture2: { value: this.resources.itemsList[1]},
            uProgress: { value: 0},
            uDistortion: { value: 1},
            uBloomStrength: { value: this.parameters.bloomStrength},
            uSize: {value: 0.0 * this.renderer.instance.getPixelRatio()}
            }
        })
        this.renderer.instance.getContext().getExtension('OES_standard_derivatives')
        this.materialArray.push(this.material)
         


        if(this.debug.active)
        {
            this.debugFolder
                .add(this.material.uniforms.uDistortion, 'value')
                .min(0)
                .max(3)
                .step(0.01)
                .name("Particle Distortion") 
            this.debugFolder
                .add(this.material.uniforms.uSize, 'value')
                .min(0)
                .max(10)
                .step(0.01)
                .name("Particle Size") 
            this.debugFolder
                .add(this.material.uniforms.uSpeed, 'value')
                .min(0)
                .max(0.001)
                .step(0.00000001)
                .name("Particle Speed") 
        }

        this.prevDist = this.material.uniforms.uDistortion.value
    }

     setMesh() {
        // for (let i = 0; i < this.materialArray.length; i++ ) {
        //     if(i != 0) {
        //         this.materialArray[i].uniforms.uHide.value = 1.0
        //     }
        //     this.mesh = new THREE.Points(this.geometry, this.materialArray[i])
        //     this.scene.add(this.mesh)
        //     this.meshArray.push(this.mesh)
        // }

        this.mesh = new THREE.Points(this.geometry, this.material)
            this.scene.add(this.mesh)
            this.meshArray.push(this.mesh)
            this.renderer.instance.getContext().getExtension('OES_standard_derivatives')
            this.mesh.material.extensions = {
                derivatives: true
            }
     }

    //  grabItem() {
    //      this.resources.items.
    //  }
     resize() {
         this.material.uniforms.uSize.value = 0.0 * this.renderer.instance.getPixelRatio()
     }

     update() {

        // for(let i = 0; i < 4; i++) {
        //     this.meshArray[i].material.uniforms.uTime.value = this.time.elapsed
        // }

        this.material.uniforms.uTime.value = this.time.elapsed

        this.navBar = this.experience.nav

         this.raycaster.setFromCamera(this.mouse, this.camera.instance)
         const intersects = this.raycaster.intersectObjects(this.meshArray)
         const prevDist = this.material.uniforms.uDistortion.value
         
        if(intersects.length) 
        {
            if(!this.currentIntersect)
            {
                this.prevDist = this.material.uniforms.uDistortion.value
                const timeline = gsap.timeline()
                timeline.to(this.material.uniforms.uDistortion, 
                    {value: 2, duration: 0.3, ease: "power2.in"})
                timeline.to(this.renderer.parameters, 
                    {bloomStrength: 0.5, duration: 0.3, ease: "power2.in"}, 0)
            }
            this.currentIntersect = intersects[0]
            
        }
        else
        {
            if(this.currentIntersect)
            {
                const timeline = gsap.timeline()
                timeline.to(this.material.uniforms.uDistortion, 
                    {value: this.pageDist[this.navBar.currentPage], duration: 0.5, ease: "power2.out"})
                timeline.to(this.renderer.parameters, 
                    {bloomStrength: 0, duration: 0.5}, 0)
            }
            this.currentIntersect = null
        }
         
     }
 }