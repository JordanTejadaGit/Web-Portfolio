import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import * as THREE from 'three'
import Camera from './Camera'
import Renderer from './Renderer'
import World from './World/World'
import Resources from "./Utils/Resources"
import sources from './sources'
import Debug from './Utils/Debug.js'
import NavBar from './NavBar'
import Slider from "./Slider"
import Contact from "./Contact"

let instance = null

export default class Experience
{
    constructor(canvas)
    {
        if(instance)
        {
            return instance
        }

        instance = this

        // Global access
        window.experience = this

        // Options
        this.canvas = canvas

        // Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.World = new World()

        // Mouse
        this.mouse = new THREE.Vector2()
        window.addEventListener('mousemove', (event) =>
        {
            this.mouse.x = (event.clientX / this.sizes.width * 2 - 1)
            this.mouse.y = - (event.clientY / this.sizes.height * 2 - 1)
        })

        // Raycaster
        this.raycaster = new THREE.Raycaster()
        this.raycaster.setFromCamera(this.mouse, this.camera.instance)

        this.resources.on('ready', () =>
        {
                this.slider = new Slider();
                this.nav = new NavBar();
                this.contact = new Contact();
        })

        // Sizes resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
        this.World.particles.resize()
        this.World.floor.resize()
    }

    update()
    {
        this.camera.update()
        this.World.update()
        this.renderer.update()
    }
}