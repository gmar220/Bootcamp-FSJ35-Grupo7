#Instrucciones para que docker genere la imagen correctamente (y su contenedor)

#Instala alpine (Linux base) con node vas a poder ejecutar este archivo
FROM node:22-alpine

#Carpeta del contenedor que va a tener este proyecto
WORKDIR /app

#Copiar los ARCHIVOS
COPY package.json package-lock.json ./

#Instalar las dependencias para este proyecto
#Run ejecuta un comando antes de Levantar el contenedor
RUN npm ci 

#Copiar los archivos
COPY . .

#Comando que se va a ejecutar al levantar el contenedor
CMD ["npm","run","test"]


