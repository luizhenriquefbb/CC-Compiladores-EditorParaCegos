class Utils{
    constructor(){
        console.log("Criando classe Utils");
        
    }

    printAndSpeek(str){
        if (str == ''){
            return;
        }
        console.log(str);
        responsiveVoice.speak(str);
    }
}

export var utils = new Utils();

