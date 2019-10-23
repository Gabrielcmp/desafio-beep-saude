# Top 15 Hacker News Stories

Desafio proposto pela Beep Saude, para construção de um site que liste as 15 Topstories mais recentes do site [HackerNews](https://news.ycombinator.com), utilizando sua [API pública](https://github.com/HackerNews/API)

[Top 15 HackerNews](https://hn-beep-challenge.herokuapp.com/) - Link do projeto

O projeto foi criado utilizando o framework [Vue.js](https://vuejs.org/) e, para servir em produçao, [Express](https://expressjs.com/pt-br/)

## Dependências
[Node.js e npm](https://www.npmjs.com/get-npm)


## Instalação
1 - Clonar o projeto
2 - Instalar dependências locais
```
npm install
```

### Iniciar servidor local
```
npm run serve
```

### Iniciar servidor com Express
1 - Gerar a build atualizada do projeto
```
npm run build
```
2 - Iniciar o servidor
```
npm run start
```

## To Do
- Criar testes automatizados
- Modificar a busca para utilizar também o Topstories
- Fazer a busca retornar em batches e permitir que os resultados sejam exibidos enquanto as requests estão em andamento
- Ajustes de layout e fonte
- adicionar links/filtros para os usuários e datas
