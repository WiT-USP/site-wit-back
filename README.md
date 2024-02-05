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
