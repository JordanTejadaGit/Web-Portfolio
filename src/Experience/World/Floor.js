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
        this.resources = this.experience.resources
        this.size = this.experience.sizes

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new THREE.CircleGeometry(2000, 2000)
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
        this.material.rotation.x = - Math.PI * 0.5
        this.scene.add(this.material)

        this.materialOpac = new MeshStandardMaterial( {  
            transparent: true,
            opacity: 0.9,
            color: 'black',
            roughness: 1,
            refractionRatio: 0
        })
    }


    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometryOpac, this.materialOpac)
        this.mesh.position.y = -345
        this.mesh.rotation.x = - Math.PI * 0.5
        this.scene.add(this.mesh)
    }
    
}