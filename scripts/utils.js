class Utils{
    constructor(){
        console.log("Criando classe Utils");
        
    }

    printAndSpeek(str){
        console.log(str);
        responsiveVoice.speak(str);
        
    }
}

export var utils = new Utils();

