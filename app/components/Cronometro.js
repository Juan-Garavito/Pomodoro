import ActuaClase from "https://juan-garavito.github.io/Pomodoro/app/components/ActuaClase.js"


export class Cronometro{
    constructor(obj){
        this.id = document.querySelector(obj.id);
        this.data = obj.data
        this.template = obj.template
    }

    setState(obj){
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                this.data[key] = obj[key];
            }
        }
    }

    getState(){
        return JSON.parse(JSON.stringify(this.data))
    }

  

    start (btnStop = null){
        let ciclo = setInterval(()=>{
            if(this.getState().minActual === 0 && this.getState().segActual === 0){
                clearInterval(ciclo)
                if(this.getState().numBloques == 5 ){
                    this.setState({
                        descanso : !this.getState().descanso,
                        minActual : 2,
                        segActual : 0,
                        numBloques: 0
                    })
                }else{
                    this.setState({
                        descanso : !this.getState().descanso,
                        minActual : !this.getState().descanso ? this.getState().minDescanso : this.getState().minTrabajo,
                        segActual : 0,
                        numBloques: this.getState().descanso ? this.getState().numBloques + 1 : this.getState().numBloques
                    })
                }
                this.cambioEstado()
            }
            else if(this.getState().segActual === 0){
                this.setState({
                    minActual: this.getState().minActual -= 1,
                    segActual: 59
                })
            }else{
                this.setState({
                    segActual:  this.getState().segActual -= 1,
                })
            }

            if(btnStop != null)
                btnStop.onclick = this.stop.bind(null,ciclo)
            
            this.render()
        },1000)

    }

    stop(ciclo){
        console.log(this)
        clearInterval(ciclo)
    }

    cambioEstado(){
        ActuaClase({remove: ["oculto"], add: ["ver"], id: "#btnStart"})
        ActuaClase({remove: ["ver"], add: ["oculto"], id: "#process"})
            if(this.getState().descanso){
                ActuaClase({remove: ["work","sombrawork"], add: ["sombrabreak"], id: ".mCrono"})
                ActuaClase({remove: ["btnStartwork"], add: ["btnStartbreak"], id: "#btnStart"})
                return
            }
            ActuaClase({remove: ["break","sombrabreak"], add: ["sombrawork"], id: ".mCrono"})
            ActuaClase({remove: ["btnStartbreak"], add: ["btnStartwork"], id: "#btnStart"})
    }

    render(){
            this.id.children[0].innerText = this.template(this.data)
            this.id.children[1].innerText = this.data.descanso ? "Break" : "Work"
    }

}