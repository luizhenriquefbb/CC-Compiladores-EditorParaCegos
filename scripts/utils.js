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
        }while(!confirm("Do you want understand?"));
    }
}

export var utils = new Utils();

