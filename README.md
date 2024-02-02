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
const gaia = new GaiaRoutes()

gaia.createAllRoutes()
```

Esses comandos vão ser suficientes para ler todos as pastas "src/routes" e criar as rotas correspondentes a cada arquivo criado de acordo com nosso parâmetro de padronização de diretórios.

### GaiaDB

Desenvolcvimento iniciado.

- [x] Conexão com banco local bem sucedida
- [x] Get de infos do BD
- [] Criar classe para auxiliar na criação de diferentes conexões com o BD
- [] Facilitador de query
