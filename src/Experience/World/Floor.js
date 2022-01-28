import Experience from '../Experience'
import * as THREE from 'three'
import { Reflector } from 'three/examples/jsm/objects/Reflector'
import { Material, MeshStandardMaterial } from 'three'

export default class Floor
{
     constructor()
     {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        this.resources = this.experience.resources
        this.size = this.experience.sizes

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('floor')
        }

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new THREE.CircleGeometry(20000, 20000)
        this.geometryOpac = new THREE.CircleGeometry(3000, 3000)
    }

    setMaterial()
    {
        this.material = new Reflector( this.geometry, {  
            clipBias: 0.003,  
            textureWidth:  this.size.width,
            textureHeight: this.size.height,
            color: 0x777777
        })
        this.material.material.opacity = 0.5
        this.material.material.transparent = true
    
        this.material.position.y = -350
        if (this.size.width < this.size.height) {
            this.material.position.y = -251
        }
        this.material.rotation.x = - Math.PI * 0.5
        this.scene.add(this.material)

        this.materialOpac = new MeshStandardMaterial( {  
            transparent: true,
            opacity: 0.9,
            color: 'black',
            roughness: 1,
            refractionRatio: 0
        })

        if(this.debug.active)
        {
            this.debugFolder
                .add(this.material.position, 'x')
                .min(-1000)
                .max(1000)
                .step(1)
                .name("Particle Distortion") 
            this.debugFolder
                .add(this.material.position, 'y')
                .min(-1000)
                .max(1000)
                .step(1)
                .name("Particle Size") 
            this.debugFolder
                .add(this.material.position, 'z')
                .min(-5000)
                .max(5000)
                .step(1)
                .name("Particle Speed") 
        }
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometryOpac, this.materialOpac)
        this.mesh.position.y = -345
        if (this.size.width < this.size.height) {
            this.mesh.position.y = -245
        }
        this.mesh.rotation.x = - Math.PI * 0.5
        this.scene.add(this.mesh)
    }
    
    resize()
    {
        if (this.size.width < this.size.height) {
            this.mesh.position.y = -245
        }
        if (this.size.width < this.size.height) {
            this.material.position.y = -251
        }
    }
}