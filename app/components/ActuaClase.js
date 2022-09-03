export default function ActuaClase(obj){
    const {remove, add, id} = obj
    const elemento = document.querySelector(id)
    remove.map((item)=>{
        elemento.classList.remove(item)
    })
    add.map((item)=>{
        elemento.classList.add(item)
    })
}

