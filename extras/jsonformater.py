fileO = open('o.txt','r').read()

lines = fileO.split('\n')

print "linhas == " + str(len(lines))


dicionario = {}
for line in lines:
    chave_valor = line.split(' : ')
    try: 
        if not dicionario[str(chave_valor[0]).lower()]:
            dicionario[str(chave_valor[0]).lower()] = [str(chave_valor[1])]
        else:
             dicionario[str(chave_valor[0]).lower()].append(str(chave_valor[1]))
    except IndexError:
        print chave_valor
        import pdb; pdb.set_trace()

    except KeyError:
        dicionario[str(chave_valor[0]).lower()] = [str(chave_valor[1])]

    
fileS = open('a.txt', 'w')
fileS.write(str(dicionario))


import pdb; pdb.set_trace()
