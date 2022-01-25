import Experience from '../Experience.js'
import * as THREE from 'three'

export default class Box
{
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry() {
        this.geometry = new THREE.BoxBufferGeometry(1, 1, 1)
    }

    setMaterial() {
        this.material = new THREE.MeshStandardMaterial({
            color: 'red'
        })
    }
    
    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }
}