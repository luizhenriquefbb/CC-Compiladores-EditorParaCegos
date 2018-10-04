export function msgError(err){
    var errono =  err.errno;
    switch(errono) {
      case 1045:
          return  "Acesso negado !!";
          break;
      case 1215:
          return  "Falha na associacao de chave extrangeira!!";
          break;
      case 1062:
          return  "Entrada duplicada, chave do registro ja existente!!";
          break;
      case 1065:
          return  "Comando executado está vazio!!";
          break;
      case 1053:
          return  "Server Interrompido durante o progresso!!";
          break;
      case 1048: 
          return  "Coluna especifica do registro nao pode ser NULL!!";
          break;
      case 1040:
          return  "Excesso de Conexoes a base de dados!!";
          break;
      case 1105: 
          return  "Erro desconhecido na base de dados!!";
          break;
      case 1172: 
          return  "Resultado obtido consite em mais de registro!!";
          break;
      case 1184: 
          return  "Conexao avortada!!";
          break;
      case 1216:
          return  "Nao eh possivel criar ou alterar chave inexistente de"+
          " uma tabela pai em uma tabela interna!!";
          break;
      case 1217:
          return  "Nao eh possivel deletar ou alterar chave inexistente de"+
          " uma tabela pai que esta sendo utilizada em tabela interna!!";
          break;
      case 1242:
          return  "Resultado obtido da subquery consite em mais de registro!!";
          break;        
      case 1291:
          return  "Alguma coluna com valor duplicado!!";
          break;
      case 1317: 
          return  "Execucao do comando interrompido!!";
          break;
      case 1348: 
          return  "Alguma coluna do registro inalteravel!!";
          break;
      case 1451:
          return  "Nao eh possivel deletar ou alterar chave inexistente de"+
          " uma tabela pai que esta sendo utilizada em tabela interna!!";
          break;
      case 1452: 
          return "Nao eh possivel criar ou alterar chave inexistente de"+
          " uma tabela pai em uma tabela interna!!";
          break;
      case 2000 - 3000:
          return  "Problema com a conexao com a base de dados!!";
          break;
      case 1586:
          return  "Entrada Duplicada, registro ja existente";
          break;
      default:
          return  ;
    }
  }