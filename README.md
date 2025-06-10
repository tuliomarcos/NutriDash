# NutriDash

Uma interface web moderna e responsiva para nutricionistas visualizarem, criarem e acompanharem planos alimentares de pacientes.

## ✨ Funcionalidades Principais

- **Listagem de Pacientes**: Grid responsivo com todos os pacientes cadastrados.
- **Detalhes do Paciente**: Visualização do perfil do paciente e seu histórico de planos alimentares.
- **Filtro de Histórico**: Filtre os planos alimentares por data.
- **Visualização de Plano Detalhada**: Funcionalidade de expandir/recolher para ver os detalhes de cada plano no histórico.
- **Criação de Planos Alimentares**: Formulário dinâmico em um modal para adicionar/remover refeições e alimentos.
- **KPIs Dinâmicos**: Cards que exibem o total de calorias e macronutrientes do plano mais recente, atualizados a cada 30 segundos.
- **Tema Claro/Escuro**: Interface com tema dual (light/dark) com persistência no `localStorage` para uma melhor experiência do usuário.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com um stack moderno e robusto, focado em performance, escalabilidade e qualidade de código.

| Categoria                   | Tecnologia                                                                      |
| :-------------------------- | :------------------------------------------------------------------------------ |
| **Framework Principal**     | [Vue.js](https://vuejs.org/) (v3) com Composition API                           |
| **Linguagem**               | [TypeScript](https://www.typescriptlang.org/)                                   |
| **Estilização**             | [Tailwind CSS](https://tailwindcss.com/) (Utility-First)                        |
| **Gerenciamento de Estado** | [Pinia](https://pinia.vuejs.org/)                                               |
| **Roteamento**              | [Vue Router](https://router.vuejs.org/)                                         |
| **Ferramenta de Build**     | [Vite](https://vitejs.dev/)                                                     |
| **Testes Unitários**        | [Vitest](https://vitest.dev/) + [Vue Test Utils](https://test-utils.vuejs.org/) |
| **Qualidade de Código**     | [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)                |
| **API Mockada**             | [json-server](https://github.com/typicode/json-server)                          |

---

## 🚀 Como Rodar o Projeto

Para executar o NutriDash em seu ambiente local, siga os passos abaixo.

### Pré-requisitos

- **Node.js**: `v18.x` ou superior.
- **NPM** ou **Yarn**: Gerenciador de pacotes de sua preferência.

### Instalação

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/seu-usuario/nutridash.git](https://github.com/seu-usuario/nutridash.git)
    ```

2.  **Navegue até a pasta do projeto:**

    ```bash
    cd nutridash
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

### Executando

A aplicação requer dois processos rodando simultaneamente em terminais separados: o **servidor da API mockada** e o **servidor de desenvolvimento do Vite**.

1.  **Inicie a API mockada:**
    O `json-server` irá servir os dados do arquivo `db.json` na porta 3001.

    ```bash
    npm run api
    ```

    _(Este comando executa `json-server --watch db.json --port 3001`)_

2.  **Inicie a aplicação front-end:**
    O Vite irá compilar o projeto e o servirá na porta 5173 (ou outra porta disponível).

    ```bash
    npm run dev
    ```

Após executar ambos os comandos, acesse [http://localhost:5173](http://localhost:5173) no seu navegador para ver a aplicação em funcionamento.

---

## 🧪 Testes

O projeto utiliza **Vitest** para testes unitários e de componentes, com o objetivo de garantir a qualidade e a estabilidade do código.

Para executar os testes, utilize os seguintes comandos:

- **Rodar todos os testes no modo watch:**
  ```bash
  npm run test
  ```

---
