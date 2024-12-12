# Documentação de Inicialização do Projeto

Esta documentação guiará você pelos passos necessários para configurar e rodar o projeto em seu ambiente local.

## Passo 1: Rodando as Migrações do Banco de Dados

### 1a. Rodando as migrações dentro do contêiner Docker

1. Acesse a pasta `back-end` do seu projeto.
2. Para rodar as migrações, execute o seguinte comando no terminal:

```bash
docker-compose exec nome-do-container npm run migrate

OU

### 1b. Subindo o contêiner e rodando as migrações manualmente

1. Suba o contêiner com o comando:

```bash
docker-compose up

2. Após subir o contêiner, entre no shell (sh) do contêiner da API com o seguinte comando:

```bash
docker exec -it nome-do-container sh

3. Depois de acessar o shell do contêiner, execute o comando para rodar as migrações:

```bash
npm migration:run
