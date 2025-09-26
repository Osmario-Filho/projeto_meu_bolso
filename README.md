Meu Bolso - Gerenciador Financeiro Pessoal 💰
Projeto full-stack de um gerenciador financeiro pessoal, projetado para ajudar usuários a controlar, visualizar e planejar sua vida financeira de forma simples e intuitiva.

✨ Sobre o Projeto
"Meu Bolso" é composto por duas partes principais:

Backend (API): Uma API RESTful robusta e segura desenvolvida com NestJS, responsável por toda a lógica de negócio, autenticação e comunicação com o banco de dados.

Frontend (Cliente): Uma interface de usuário moderna e reativa, construída com React (utilizando Vite), para consumir os dados da API e proporcionar uma experiência de uso fluida.

🚀 Funcionalidades Principais
🔐 Autenticação Segura: Sistema de registro e login baseado em Tokens JWT.

👤 Gerenciamento de Usuários: Cadastro de novos usuários com senhas criptografadas.

💸 CRUD de Transações: Crie, leia, atualize e delete receitas e despesas.

🎨 CRUD de Categorias: Permite que cada usuário crie e gerencie suas próprias categorias personalizadas.

📊 CRUD de Orçamentos (Budgets): Defina limites de gastos mensais por categoria e acompanhe o progresso.

🛠️ Arquitetura e Tecnologias
Backend (API)
Framework: NestJS

Linguagem: TypeScript

ORM: Prisma

Banco de Dados: PostgreSQL

Autenticação: Passport.js (Estratégia passport-jwt)

Validação: class-validator e class-transformer

Frontend (Cliente)
Framework: React

Ferramenta de Build: Vite

Linguagem: TypeScript

Comunicação API: Axios

Gerenciamento de Estado: React Context API / Zustand (planejado)

🏁 Começando
Siga os passos abaixo para configurar e executar o projeto completo em seu ambiente de desenvolvimento.

Pré-requisitos
Node.js (v18 ou superior)

NPM ou Yarn

PostgreSQL rodando localmente ou via Docker.

Instalação e Configuração
Clone o repositório:

Bash

git clone https://seu-repositorio/meu-bolso.git
cd meu-bolso
Configurar o Backend (API):

Bash

# Navegue para a pasta da API

cd meu-bolso-api

# Instale as dependências

npm install

# Crie e configure o arquivo .env a partir do exemplo

cp .env.example .env

# Edite o .env com os dados do seu banco e um JWT_SECRET

# Rode as migrações do Prisma para criar as tabelas no banco

npx prisma migrate dev
Configurar o Frontend (Cliente):

Bash

# Volte para a raiz e navegue para a pasta do front

cd ../meu-bolso-front

# Instale as dependências

npm install

# Opcional: Verifique o arquivo src/services/api.ts para garantir

# que a baseURL aponta para a porta correta da sua API (padrão: http://localhost:3000)

▶️ Rodando a Aplicação
Para rodar a aplicação completa, você precisará de dois terminais abertos simultaneamente.

Terminal 1: Rodando o Backend (API)
Bash

# Navegue até a pasta da API

cd meu-bolso-api

# Inicie o servidor em modo de desenvolvimento

npm run start:dev
🚀 A API estará rodando em http://localhost:3000.

Terminal 2: Rodando o Frontend (Cliente)
Bash

# Navegue até a pasta do front

cd meu-bolso-front

# Inicie o servidor de desenvolvimento do Vite

npm run dev
🖥️ O cliente React estará disponível em http://localhost:5173 (ou outra porta indicada pelo Vite).

🛣️ Roadmap (Próximos Passos)
[ ] Implementar funcionalidade de upload de imagem para comprovantes.

[ ] Integrar com API de OCR (Google Cloud Vision) para extrair dados de notas fiscais.

[ ] Criar endpoints para transações recorrentes (ex: salário, aluguel).

[ ] Desenvolver módulo de metas de economia.

[ ] Adicionar relatórios avançados e exportação para CSV/PDF.

[ ] Implementar documentação da API com Swagger.

📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

👤 Contato
osmarioslfilho@gmail.com

Link do Projeto: https://github.com/Osmario-Filho/meu-bolso
