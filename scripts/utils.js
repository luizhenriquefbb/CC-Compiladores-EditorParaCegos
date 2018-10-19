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
        // do{
        // }while(!confirm("Did you understand?"));
    }
}

export var utils = new Utils();

