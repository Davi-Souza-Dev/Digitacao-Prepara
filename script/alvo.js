//Classe do alvo
class Alvo {
  constructor(
    container,
    letras,
    larguraContainer,
    alturaContainer,
    veloDesaparecer,
    arrayLetra,
    arrayAlvos
  ) {
    //  Definindo propriedades básicas
    this.tam = Math.floor(Math.random() * 150) + 100;
    this.X = Math.floor(Math.random() * (larguraContainer - this.tam));
    this.Y = Math.floor(Math.random() * (alturaContainer - this.tam));
    this.letra = letras[Math.floor(Math.random() * letras.length)];
    this.id = Date.now() + "_" + Math.floor(Math.random() * 10000);
    this.arrayAlvos = arrayAlvos;
    this.arrayLetra = arrayLetra;
    this.box = container;
    this.valor = 10;
    this.veloDesaparecer = veloDesaparecer;
    this.temporizador;
  }

  desenhar = () => {
    const div = document.createElement("div");
    div.setAttribute("class", "alvo");
    div.setAttribute("id", this.id);
    div.setAttribute(
      "style",
      `top:${this.Y}px;left:${this.X}px;width:${this.tam}px;height:${this.tam}px`
    );

    const letra = document.createElement("p");
    letra.setAttribute("class", "letra");
    letra.innerHTML = this.letra;
    div.appendChild(letra);

    this.box.appendChild(div);
  };

  remover = () => {
    let index = this.arrayLetra.indexOf(this.letra);
    this.arrayLetra.splice(index,1);
    this.arrayAlvos.splice(index,1);
    document.getElementById(`${this.id}`).remove();
  };

  temporizador=(criado)=>{
    if(criado){
      this.temp = setTimeout(() => {
        this.remover();
      }, this.veloDesaparecer);
    }
  }

  delTemporizador = () =>{
    clearTimeout(this.temp);
  }

  atArrayLetra=()=>{
    return this.arrayLetra;
  }

  atArrayAlvos=()=>{
    return this.arrayAlvos;
  }

}

export default Alvo;
