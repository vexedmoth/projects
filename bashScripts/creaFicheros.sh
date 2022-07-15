#!/bin/bash

#La estructura del script será: ./script9.sh [Nombre del fichero] [extension / tipo de fichero] [Nº veces a crear] [Directorio en el que guardar los ficheros]. 
#Ejemplo: ./script9.sh Ejercicio txt 20 prueba2/ 

#funcion error que teine como parametro un mensaje
error() {
    echo $1 
    exit 1
}

#Comprueba que el número de parámetros sea 4. Si no son 4 parámetros dará error.
if [ $# -ne 4 ]; then
    error "ERROR: El número de parametros posibles son 4. SINTAXIS: $0 [nombre] [extensión] [número] [ruta]" # $0 es el nombre del propio script
    
fi

#Comprueba que el directorio en el que se quieren guardar los ficheros existe. En este caso corresponde al parámetro 4
if [ ! -d $4 ]; then 
    error "ERROR: El directorio no existe"    
fi

#Comprueba que el tercer parámetro (numero de veces a crear) sea mayor que 0 ya que no puede crear obviamente un numero negativo de veces un fichero.
if [ $3 -lt 1 ]; then
    error "ERROR: El número de ficheros no puede ser menor que 1"
fi

#Ahora para crear los ficheros se crea un bucle for. Tenemos que leer el número de veces que queremos imprimirlo (parametro 3)
#Dentro del for, imprime la ruta entera de cada fichero. Tal que asi:_ ./prueba2/Ejercicio1.txt ; ./prueba2/Ejercicio2.txt ; ./prueba2/Ejercicio3.txt ....
for (( i = 1; i <= $3; i++ )); do 
    name="$4/$1$i.$2"
    touch $name
    echo "Fichero $name creado"
done





