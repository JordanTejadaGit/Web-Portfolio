import gsap from 'gsap';
import Experience from './Experience';

export default class Slider
{
    constructor()
    {
        const prevBtn = document.querySelector('#prevBtn')
        const nextBtn = document.querySelector('#nextBtn')
        const projects = document.querySelectorAll(".project")
        const git = document.querySelectorAll(".git")
        const clickable = document.querySelectorAll("body");
        this.experience = new Experience();
        this.particles = this.experience.World.particles
        this.resources = this.experience.resources
        this.render = this.experience.renderer

        this.counter = 0
        const size = projects.length

        projects

        // Next Project 
        nextBtn.addEventListener('click', () => {
            if (this.counter + 1 > size - 1) {
                projects[this.counter].classList.remove("fadeIn")
                projects[this.counter].classList.add("fadeOut")
                projects[0].classList.remove("fadeOut")
                projects[0].classList.add("fadeIn")
                git[this.counter].classList.add("stopLink")
                git[0].classList.remove("stopLink")
                clickable[0].classList.add("unclickable")
                clickable[0].classList.remove("unclickable")
                // gsap.fromTo(this.projects[0].position, 
                //     {x: 200}, 
                //     {x: 50, duration: 1.5, ease: "power4"})
                // gsap.fromTo(this.projects[this.counter].position, 
                //         {x: 50}, 
                //         {x: -170, duration: 1.5, ease: "power4"})
                this.transformParticlesSliderNextRestart()
                this.counter = 0
            }
            else {
                projects[this.counter].classList.remove("fadeIn")
                projects[this.counter].classList.add("fadeOut")
                projects[this.counter + 1].classList.remove("fadeOut")
                projects[this.counter + 1].classList.add("fadeIn")
                git[this.counter].classList.add("stopLink")
                git[this.counter + 1].classList.remove("stopLink")
                clickable[0].classList.add("unclickable")
                clickable[0].classList.remove("unclickable")
                // gsap.fromTo(this.projects[this.counter + 1].position, 
                //         {x: 200}, 
                //         {x: 50, duration: 1.5, ease: "power4"})
                // gsap.fromTo(this.projects[this.counter].position, 
                //         {x: 50}, 
                //         {x: -170, duration: 1.5, ease: "power4"})
                this.transformParticlesSliderNext()
                this.counter++
            }
        })

        // Previous Project
        prevBtn.addEventListener('click', () => {
            if (this.counter - 1 < 0) {
                projects[this.counter].classList.remove("fadeIn")
                projects[this.counter].classList.add("fadeOut")
                projects[size - 1].classList.remove("fadeOut")
                projects[size - 1].classList.add("fadeIn")
                git[this.counter].classList.add("stopLink")
                git[size - 1].classList.remove("stopLink")
                clickable[0].classList.add("unclickable")
                clickable[0].classList.remove("unclickable")
                // gsap.fromTo(this.projects[size - 1].position, 
                //     {x: -170}, 
                //     {x: 50, duration: 1.5, ease: "power4"})
                // gsap.fromTo(this.projects[this.counter].position, 
                //     {x: 50}, 
                //     {x: 200, duration: 1.5, ease: "power4"})
                this.transformParticlesSliderPrevRestart(size)
                this.counter = size - 1
            }
            else {
                projects[this.counter].classList.remove("fadeIn")
                projects[this.counter].classList.add("fadeOut")
                projects[this.counter - 1].classList.remove("fadeOut")
                projects[this.counter - 1].classList.add("fadeIn")
                git[this.counter].classList.add("stopLink")
                git[this.counter - 1].classList.remove("stopLink")
                clickable[0].classList.add("unclickable")
                clickable[0].classList.remove("unclickable")
                // gsap.fromTo(this.projects[this.counter - 1].position, 
                //     {x: -170}, 
                //     {x: 50, duration: 1.5, ease: "power4"})
                // gsap.fromTo(this.projects[this.counter].position, 
                //     {x: 50}, 
                //     {x: 200, duration: 1.5, ease: "power4"})
                this.transformParticlesSliderPrev()
                this.counter--
            }
        })



    }
    transformParticlesSliderNext() {
        let project = gsap.timeline()
        project.to(this.particles.material.uniforms.uDistortion, 
            {value: 5, duration: 1, ease: "power2.in"})
        project.to(this.render.parameters, 
            {bloomStrength: 5, duration: 1, ease: "power2.in"}, 0)
        project.to(this.render.parameters, 
            {bloomStrength: 0.15, duration: 1, ease: "power2.out"}, 1)
        project.to(this.particles.material.uniforms.uDistortion, 
            {value: 0, duration: 1, ease: "power2.out"}, 1)
        if(this.particles.material.uniforms.uProgress.value === 0) {
            this.particles.material.uniforms.uTexture.value = this.resources.itemsList[2 + this.counter]
            this.particles.material.uniforms.uTexture2.value = this.resources.itemsList[2 + this.counter + 1]
            project.to(this.particles.material.uniforms.uProgress,
                {value: 1, duration: 1}, 0.5)
        }
        else {
            this.particles.material.uniforms.uTexture.value = this.resources.itemsList[2 + this.counter + 1]
            this.particles.material.uniforms.uTexture2.value = this.resources.itemsList[2 + this.counter]
            project.to(this.particles.material.uniforms.uProgress,
                {value: 0, duration: 1}, 0.5)
        }
    }
    transformParticlesSliderNextRestart() {
        let project = gsap.timeline()
        project.to(this.particles.material.uniforms.uDistortion, 
            {value: 5, duration: 1, ease: "power2.in"})
        project.to(this.render.parameters, 
            {bloomStrength: 5, duration: 1, ease: "power2.in"}, 0)
        project.to(this.render.parameters, 
            {bloomStrength: 0.15, duration: 1, ease: "power2.out"}, 1)
        project.to(this.particles.material.uniforms.uDistortion, 
            {value: 0, duration: 1, ease: "power2.out"}, 1)
        if(this.particles.material.uniforms.uProgress.value === 0) {
            this.particles.material.uniforms.uTexture.value = this.resources.itemsList[2 + this.counter]
            this.particles.material.uniforms.uTexture2.value = this.resources.itemsList[2]
            project.to(this.particles.material.uniforms.uProgress,
                {value: 1, duration: 1}, 0.5)
        }
        else {
            this.particles.material.uniforms.uTexture.value = this.resources.itemsList[2]
            this.particles.material.uniforms.uTexture2.value = this.resources.itemsList[2 + this.counter]
            project.to(this.particles.material.uniforms.uProgress,
                {value: 0, duration: 1}, 0.5)
        }
    }

    transformParticlesSliderPrev() {
        let project = gsap.timeline()
        project.to(this.particles.material.uniforms.uDistortion, 
            {value: 5, duration: 1, ease: "power2.in"})
        project.to(this.render.parameters, 
            {bloomStrength: 5, duration: 1, ease: "power2.in"}, 0)
        project.to(this.render.parameters, 
            {bloomStrength: 0.15, duration: 1, ease: "power2.out"}, 1)
        project.to(this.particles.material.uniforms.uDistortion, 
            {value: 0, duration: 1, ease: "power2.out"}, 1)
        if(this.particles.material.uniforms.uProgress.value === 0) {
            this.particles.material.uniforms.uTexture.value = this.resources.itemsList[2 + this.counter]
            this.particles.material.uniforms.uTexture2.value = this.resources.itemsList[2 + this.counter - 1]
            project.to(this.particles.material.uniforms.uProgress,
                {value: 1, duration: 1}, 0.5)
        }
        else {
            this.particles.material.uniforms.uTexture.value = this.resources.itemsList[2 + this.counter - 1]
            this.particles.material.uniforms.uTexture2.value = this.resources.itemsList[2 + this.counter]
            project.to(this.particles.material.uniforms.uProgress,
                {value: 0, duration: 1}, 0.5)
        }
    }
    transformParticlesSliderPrevRestart(size) {
        let project = gsap.timeline()
        project.to(this.particles.material.uniforms.uDistortion, 
            {value: 5, duration: 1, ease: "power2.in"})
        project.to(this.render.parameters, 
            {bloomStrength: 5, duration: 1, ease: "power2.in"}, 0)
        project.to(this.render.parameters, 
            {bloomStrength: 0.15, duration: 1, ease: "power2.out"}, 1)
        project.to(this.particles.material.uniforms.uDistortion, 
            {value: 0, duration: 1, ease: "power2.out"}, 1)
        if(this.particles.material.uniforms.uProgress.value === 0) {
            this.particles.material.uniforms.uTexture.value = this.resources.itemsList[2 + this.counter]
            this.particles.material.uniforms.uTexture2.value = this.resources.itemsList[2 + size -1]
            project.to(this.particles.material.uniforms.uProgress,
                {value: 1, duration: 1}, 0.5)
        }
        else {
            this.particles.material.uniforms.uTexture.value = this.resources.itemsList[2 + size - 1]
            this.particles.material.uniforms.uTexture2.value = this.resources.itemsList[2 + this.counter]
            project.to(this.particles.material.uniforms.uProgress,
                {value: 0, duration: 1}, 0.5)
        }
    }

}