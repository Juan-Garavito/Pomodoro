import ActuaClase from "./components/ActuaClase.js"
import { Cronometro } from "./components/Cronometro.js"

const btnStart = document.querySelector("#btnStart")
const btnProcess = document.querySelector("#process")
const textTarea = document.querySelector("#tarea")
const input = document.querySelector("#input")
const btnAceptar = document.querySelector("#btnAceptar")
const modalCrono = document.querySelector(".mCrono")
const error = document.querySelector(".error")

const audioInicio = new Audio("./assets/music/c-note.mp3")

btnProcess.classList.add("oculto")

const crono = new Cronometro({
    id: ".mCrono",
    data:{
        descanso : null,
        minTrabajo: null,
        minDescanso: null,
        minActual: null,
        segActual: null, 
        numBloques: null
    },
    template: (data)=> `${data.minActual}::${data.segActual}`

});


crono.setState({
    descanso: false,
    minTrabajo:25,
    minDescanso: 5,
    minActual: 25,
    segActual: 0,
    numBloques: 1
})

document.addEventListener("DOMContentLoaded",crono.render.call(crono) )



btnStart.addEventListener("click",()=>{
    audioInicio.play()
    crono.start.call(crono)
    ActuaClase({remove: ["oculto"], add: ["ver"], id: "#process" })
    ActuaClase({remove: ["ver"], add: ["oculto"], id: "#btnStart" })
    if(crono.getState().descanso){
        modalCrono.classList.add("break")
        return
    }
    modalCrono.classList.add("work")
})

btnAceptar.addEventListener("click",()=>{
    if(input.value.trim("") != ""){
        textTarea.innerText = input.value
        ActuaClase({remove: ["mTarea"], add: ["oculto"], id: ".mTarea" })
        modalCrono.style.display = "flex";
        return
    }
    
    error.style.display = "block";
})
