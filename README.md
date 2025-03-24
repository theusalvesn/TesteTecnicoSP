# Sistema de API RESTful de Cadastro de Usuários e Favoritos de Personagens

## Objetivo

Este projeto tem como objetivo avaliar as habilidades de desenvolvimento de APIs RESTful utilizando **Node.js**. A API permite o cadastro de usuários, autenticação segura via JWT, consumo de uma API externa (Rick and Morty API) e funcionalidades relacionadas a personagens favoritos.

## Funcionalidades Principais

- **Cadastro de usuários**: Endpoint para cadastro de novos usuários com validação de dados.
- **Autenticação de usuários**: Sistema de autenticação usando **JWT** para garantir segurança nas comunicações.
- **Consumo de API Externa**: Integração com a [Rick and Morty API](https://rickandmortyapi.com/documentation/).

- **Limitação de consultas**: Usuários autenticados podem realizar até 10 consultas do nome dos personagens, enquanto não autenticados podem fazer até 3 consultas.

- **Funcionalidades de favoritos**:
  - Favoritar até 3 personagens.
  - Listar personagens favoritados.
  - Atualizar personagem favorito.
  - Remover personagem favorito.
  - Consultar quantos episódios cada personagem favorito aparece.
  - Consultar quantos episódios todos os favoritos aparecem (não duplicando episódios).
- **Tratamento de erros**: Códigos de erro HTTP apropriados para situações de falha.

## Tecnologias Usadas

- **Node.js** (última versão estável)
- **Express.js** (framework para construção da API)
- **JWT (JSON Web Token)** para autenticação
- **Rick and Morty API** para consumo de dados externos
- **TypeScript** 
- **SQlite** - Armazenamento dos dados
## Pré-Requisitos
Antes de rodar o sistema, certifique-se de ter o **Node.js** instalado em sua máquina. Se não tiver, instale a partir de [nodejs.org](https://nodejs.org/).

# Instalação
Clone o repositório para sua máquina:
```bash
https://github.com/theusalvesn/TesteTecnicoSP.git
```
Navegue até o diretório do projeto:

```bash
cd TesteTecnicoSP
```
Instale as dependências:

```bash
npm install
```
Crie um arquivo .env e defina as variáveis de ambiente necessárias, 

```bash
JWT_SECRET = Coloque aqui sua chave
PORT = Coloque aqui sua porta
```
# Inicializar 
Para rodar o projeto, execute npm start e verifique se está rodando !
```bash
npm start 
```
## Testando a API com Postman
Para facilitar os testes da API, você pode importar a coleção do Postman no seu ambiente local.
1. Abra o **Postman**.
2. Clique em **Import** no canto superior esquerdo.
3. Selecione **Upload Files** e escolha o arquivo `TesteTecnico.postman_collectionjson` que está na pasta `raiz` do projeto.
4. Após importar, você poderá testar todas as rotas da API configuradas na coleção.

## Testando em outros ambientes
Caso queira testar em outros ambientes, abaixo está a estrutua das requisições:

### 1. **POST /user/signup** - Criar um novo usuário
- **Body** (JSON):
```json
  {
    "userName": "teste",
    "email": "teste@teste.com",
    "password": "123456"
  }
```

- **Resposta:** Cria um novo usuário com sucesso.

### 2. **POST /user/signin** - Realizar login
```json
   {
      "email": "teste@teste.com",
      "password": "123456"
   }
``` 

- **Resposta:** Retorna um token de autenticação JWT
### 3. ** POST /user/favorites** - Adicionar um personagem aos favoritos
- **Body** (JSON):
```json
  {
    "characterId": 1
  }
``` 
- **Resposta:** Retorna sucesso ao adicionar o personagem aos favoritos.

### 4. **GET /user/favorites** - Listar todos os favoritos
- **Autenticação:** Bearer token no header
- **Resposta:** Retorna a lista de personagens nos favoritos.

### 5. **GET /user/favorites/episodes** - Retorna a contagem de episódios dos favoritos
- **Autenticação:** Bearer token no header
- **Resposta:** Retorna os episódios relacionados aos personagens favoritos.

### 6. **GET /user/favorites/episodes/count** - Contagem de episódios dos favoritos
- **Autenticação:** Bearer token no header
- **Resposta:** Retorna a quantidade total de episódios dos favoritos.

### 7. **PUT /user/favorites** - Atualizar um personagem nos favoritos
**Autenticação:** Bearer token no header
Body (JSON):
```json
{
  "newCharacterId": 2,
  "oldCharacterId": 1
}
```
**Resposta:** Atualiza o personagem favorito.

### 8. **DELETE /user/favorites/:id** - Remover um personagem dos favoritos
- **Autenticação:** Bearer token no header
- **Parâmetro:** id no path (ID do personagem a ser removido)
- **Resposta:** Remove o personagem dos favoritos.

### 9. **GET /characters/search/:name** - Buscar personagens pelo nome
- **Parâmetro:** {name} no path
- **Resposta:** Retorna informações dos personagens que correspondem à busca.

## Banco de Dados 
- Para o armazenamento dos dados é utilizado o SQLite, um banco de dados relacional.
<img src="https://i.ibb.co/Csp9k92L/Captura-de-tela-2025-03-24-175313.png" alt="Imagem Diagrama ">
- Como todas as informações dos personagens sao utlizadas na API do Rick and Morty, é necessario apenas salvar a relação entre o `id` do usuário e o `id` do personagem .






