import Experience from "./Experience"
import Particles from "./World/Particles"
import gsap from "gsap"

export default class NavBar
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.currentPage = 0;
        this.particles = this.experience.World.particles
        this.render = this.experience.renderer
        this.home = document.querySelector('#home')
        this.about = document.querySelector('#about')
        this.projects = document.querySelector('#projects')
        this.contact = document.querySelector('#contact')
        this.name = document.querySelectorAll(".name")
        this.description = document.querySelectorAll(".description")
        this.projectName = document.querySelectorAll(".projectName")
        this.projectDescription = document.querySelectorAll(".projectDescription")
        this.arrowBtn = document.querySelectorAll(".arrow") 
        this.skills = document.querySelectorAll(".skills")
        this.project = document.querySelectorAll(".project")
        this.movement = [
            {
                x:350,
                y:450
            },
            {
                x:-350,
                y:-200
            },
            {
                x:-350,
                y:450
            },
            {
                x:350,
                y:-200
            },

        ]

        this.home.addEventListener('click', () => {
            this.name[0].classList.remove("fadeOut")
            this.name[0].classList.add("fadeIn")
            this.description[0].classList.remove("fadeIn")
            this.description[0].classList.add("fadeOut")
            this.projectName[0].classList.remove("fadeIn")
            this.projectName[0].classList.add("fadeOut")
            this.project[experience.slider.counter].classList.remove("fadeIn")
            this.project[experience.slider.counter].classList.add("fadeOut")
            this.projectDescription[0].classList.remove("fadeIn")
            this.projectDescription[0].classList.add("fadeOut")
            this.transformParticlesHome()
            this.currentPage = 0
        })

        this.about.addEventListener('click', () => {
            this.name[0].classList.remove("fadeIn")
            this.name[0].classList.add("fadeOut")
            this.description[0].classList.add("fadeIn")
            this.description[0].classList.remove("fadeOut")
            this.projectName[0].classList.remove("fadeIn")
            this.projectName[0].classList.add("fadeOut")
            this.project[experience.slider.counter].classList.remove("fadeIn")
            this.project[experience.slider.counter].classList.add("fadeOut")
            this.projectDescription[0].classList.remove("fadeIn")
            this.projectDescription[0].classList.add("fadeOut")
           this.transformParticlesModel()
           this.currentPage = 1
        })

        this.projects.addEventListener('click', () => {
            this.name[0].classList.remove("fadeIn")
            this.name[0].classList.add("fadeOut")
            this.description[0].classList.remove("fadeIn")
            this.description[0].classList.add("fadeOut")
            this.projectName[0].classList.remove("fadeIn")
            this.projectName[0].classList.add("fadeOut")
            this.project[experience.slider.counter].classList.add("fadeIn")
            this.project[experience.slider.counter].classList.remove("fadeOut")
            this.projectDescription[0].classList.add("fadeIn")
            this.projectDescription[0].classList.remove("fadeOut")
            this.currentPage = 1
        })
    }

    transformParticlesModel(){
        for (let i = 0; i < 4; i++){
            let about = gsap.timeline()
            about.to(this.particles.meshArray[i],
                {opacity: 1, duration: 1, ease: "power2.in"}, 0)
            about.to(this.particles.meshArray[i].material.uniforms.uDistortion, 
                {value: 10, duration: 1, ease: "power2.in"}, 0)
            about.to(this.render.parameters, 
                {bloomStrength: 2, duration: 1, ease: "power2.in"}, 0)
            about.to(this.render.parameters, 
                {bloomStrength: 0.15, duration: 1, ease: "power2.out"}, 1)
            about.to(this.particles.meshArray[i].material.uniforms.uDistortion, 
                {value: 0, duration: 1, ease: "power2.out"}, 1)
            about.to(this.particles.meshArray[i].material.uniforms.uProgress,
                {value: 1, duration: 1}, 0.5)
            about.to(this.particles.meshArray[i].position,
                {x: this.movement[i].x, y: this.movement[i].y, duration: 2}, 0)
            
        }
        

    }
    transformParticlesHome(){

        this.particles.material.uniforms.uTexture.value = this.resources.itemsList[0]
        this.particles.material.uniforms.uTexture2.value = this.resources.itemsList[1]
        let about = gsap.timeline()
            about.to(this.particles.material.uniforms.uDistortion, 
                {value: 10, duration: 1, ease: "power2.in"})
            about.to(this.render.parameters, 
                {bloomStrength: 2, duration: 1, ease: "power2.in"}, 0)
            about.to(this.render.parameters, 
                {bloomStrength: 0.15, duration: 1, ease: "power2.out"}, 1)
            about.to(this.particles.material.uniforms.uDistortion, 
                {value: 1.25, duration: 1, ease: "power2.out"}, 1)
            about.to(this.particles.material.uniforms.uProgress,
                {value: 0, duration: 1}, 0.5)
    }
}