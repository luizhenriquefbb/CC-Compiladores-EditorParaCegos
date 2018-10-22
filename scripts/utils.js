class Utils{
    constructor(){
        console.log("Criando classe Utils");
        this.lastError = '';
        this.repeat = 'Press \'f1\' to repeat'
        
    }

    printAndSpeak(str){
        if (str == ''){
            return;
        }
        console.log(str);
        responsiveVoice.speak(str);
        // do{
        // }while(!confirm("Did you understand?"));
    }
    
    /**
     * Sem confirmação
     * @param {*} str 
     */
    printAndSpeak2(str){
        if (str == ''){
            return;
        }
        console.log(str);
        
        responsiveVoice.speak(str);
        
    }
}

export var utils = new Utils();

