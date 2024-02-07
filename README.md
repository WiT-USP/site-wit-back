# SITE WOMEN IN TECH BACK-END

Sejam bem vindas. Área dedicada para explicação de como vamos desenvolver esse projeto. Irei separando em sections conforme for sendo necessário.

Sugestão: Leiam o tópico `Um pouco sobre Git:` do documento de `Materiais de estudo Back-end`.

## Rodar o projeto

```
git clone https://github.com/WiT-USP/site-wit-back.git
```

```
npm install
```

```
npm run start:dev
```

Para mais instruções vá para a section do docker

## Facilitadores

Para qume for ajudar a desenvolver o projeto, criei um lib de classes facilitadoras, até o momento tenho mente duas classes para desenvolver, uma que auxília as requisições ao BD e outra que monta as rotas da aplicação de forma automática para nosso projeto.

A biblioteca que centraliza isso é a "gaia".

### GaiaRoutes

Para chmamar basta fazer como nas linhas mostradas aqui:

```
const gaia = new GaiaRouterHelper();

gaia.callRoutes()
```

Esses comandos vão ser suficientes para ler todos as pastas "src/routes" e criar as rotas correspondentes a cada arquivo criado de acordo com nosso parâmetro de padronização de diretórios.

### GaiaDB

Para utilizas do GaiaDb, basta fazer o seguinte no seu arquivo controller.ts:

importações:

```
import { GaiaClientDb, GaiaPoolDb } from "helpers";
```

Declarar fora da classe controller:

```
const pool = new GaiaPoolDb();
```

Dentro:

```
const client = await pool.connect();
```

E criar uma função para escrever sua query, como pode ver na rota de que deixei de exemplo `api/routes/users/{userId}/GET/controller.ts`, tem a função chamada `getUserById()`

E não pode esquecer de finalziar o controller com o `client.release()`.

Há outras funções vindas do GaiaDB, mas isso exploro mais para frente, são casos mais específicos.

## Docker

### Configurando banco container

Para que nâo seja necessário você instalar de fato o Postgres no seu computador vamos já aproveitar que teriamos que usar o docker para configurações de deploy do projeto e iremos utilizalos já no desenvolvimento.

De que forma?

Primeiro passo é instalar o Docker Desktop no seu computador, através do [LINK](https://www.docker.com/products/docker-desktop/).
Próximo passo é criar uma conta, depois disso você pode criar uma imagem do postgres usando o docker, rodando o comando a baixo.

```
docker run --name postgres -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres
```

e depois pode user `docker ps` para saber se seu container foi criado.

Agora você precisa de um SGBD para gerenciar esse banco que está no container Docker, aqui estamos usando o DBeaver, pode fazer download nele [AQUI](https://dbeaver.io/download/).

Para configurar a conexão, basta acrescentar a senha que configurou no script do `docker run ...`, e testar conexão, dando certo, sucesso, podemos ir para a próxima etapa.

Agora você precisa ir no aqruito `src/queries/initialize.sql` e copiar todas as tabelas dali para um script no DBeaver, para poder criar todas as tabelas localmente aí para você desenvolver.

### DEPLOY

Eu imagino os seguintes containers para nossa aplicação:

&#9654; Back-end

&#9654; Front-end

&#9654; BD (Postgres)

&#9654; Nginx (Necessária para acesso de front)

&#9654; Bucket (armazenar imagens)
