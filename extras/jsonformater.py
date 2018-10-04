fileO = open('o.txt','r').read()

lines = fileO.split('\n')

print "linhas == " + str(len(lines))


dicionario = {}
for line in lines:
    chave_valor = line.split(' : ')
    try: 
        if not dicionario[chave_valor[0]]:
            dicionario[chave_valor[0]] = [chave_valor[1]]
        else:
             dicionario[chave_valor[0]].append(chave_valor[1])
    except IndexError:
        print chave_valor
        import pdb; pdb.set_trace()

    except KeyError:
        dicionario[chave_valor[0]] = [chave_valor[1]]

    
fileS = open('a.txt', 'w')
fileS.write(str(dicionario))


import pdb; pdb.set_trace()
