# Selecciona la imagen base, en este caso, una imagen de node
FROM node:18.15-alpine

# Ejecuta un comando en la imagen base
USER node

#Crear la ruta desde donde se va a correr el contenedor
RUN mkdir -p /home/node/app

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /home/node/app

# Copia todos los archivos de la aplicación
COPY --chown=node . .

# Ejecuta la variable de entorno 
ENV NODE_OPTIONS="--max-old-space-size=8192"

# Instala las dependencias
RUN yarn install

# Copia el contenido de tu proyecto en el contenedor
COPY . .

# Construye la aplicación
RUN yarn build

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 3000

#Ejecuta el comando para que se ejecute la aplicación
CMD ["yarn", "start"]