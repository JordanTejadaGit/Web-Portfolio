import Experience from "../Experience";
import Box from "./cube";
import Environment from "./Environnment";
import Particles from "./Particles";
import Floor from "./Floor";

// import Fox from './Fox'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.particles = new Particles()
            this.environment = new Environment()
            // this.box = new Box()
            this.floor = new Floor()
        })
    }
    update()
    {
        // if(this.fox)
        //     this.fox.update()
        if(this.particles)
            this.particles.update()
    }
}