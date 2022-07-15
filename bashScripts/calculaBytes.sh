#!/bin/bash



# Comprueba si existe el directorio como parámetro

if [ ! -d $1 ]; then 
    echo "ERROR: El directorio no existe"
    exit 1 
fi



# Almacena nombres de los ficheros del directorio en la variable "names"

names=`ls $1`




# Recorre cada fichero para saber lo que ocupa (for in) y posteriormente hacer un sumatorio (total)

total=0

for f in $names; do
    filePath="$1/$f" # Asigna la ruta de cada fichero
    bytes=`ls -l $filePath | cut -d " " -f 5` #Aplica ls -l de cada ruta de cada fichero y la salida la pasa por un pipe en donde solo se queda con los bytes
    echo "Fichero $filePath ocupa $bytes bytes"
    (( total += $bytes))
done

echo -e "\nTOTAL: $total bytes"


