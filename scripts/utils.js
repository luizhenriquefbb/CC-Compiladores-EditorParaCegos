class Utils{
    constructor(){
        console.log("Criando classe Utils");
        
    }

    printAndSpeek(str){
        if (str == ''){
            return;
        }
        console.log(str);
        do{
            responsiveVoice.speak(str);
        }while(!confirm("Did you understand?"));
    }
    
    /**
     * Sem confirmação
     * @param {*} str 
     */
    printAndSpeek2(str){
        if (str == ''){
            return;
        }
        console.log(str);
        
        responsiveVoice.speak(str);
        
    }
}

export var utils = new Utils();

