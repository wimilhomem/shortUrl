
# ShortURl
Api para encurtar e redirecionar url.

 - Stack
 - - TypeScript 
 - - NodeJS
 - - Express
 - - Postgress
 - - Docker
 - - Postman
 
 #### Como utilizar
O endpoint `http://wurl-short.herokuapp.com/encurtador` recebe via post no body, o objeto json:
```javascript
{
	"url":"https://wisereducacao.com/"
}
```
salva a url e retorna:
  ```javascript
  {
    "newUrl":"http://wurl-short.herokuapp.com/sv5l4"
  }
  ```
 ##
<p>Para acessar o link encurtado, acessar o endpoint</p> 

`http://wurl-short.herokuapp.com/sv5l4`

<p>o redirecionamento tem validade de 30 minutos a partir do momento que foi salvo, após expirar, o link retorna 404.</p>


### Documentação Postman

    https://documenter.getpostman.com/view/8962281/TWDfCt1r


## Para executar localmente

`npm i`

### Iniciar o servidor de desenvolvimento

`npm run dev`

### Compilar o projeto

`npm run build`

### Iniciar projeto compilado

`npm start`

## Executar utilizando containers Docker

_Necessário ter o Docker instalado !_

### Criar imagem

`docker-compose build`

### Iniciar servidor de desenvolvimento

`docker-compose up -d`

### Para o servidor

`docker-compose down`

### Criar e iniciar build de produção

`docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up`
