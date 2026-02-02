# 🏢 Sistema de Gestão de Beneficiários (Mini-RPPS)

> Um sistema Full Stack completo para gerenciamento de beneficiários, demonstrando operações CRUD, validações de negócio e integração entre .NET 8 e React.

## 💻 Sobre o Projeto

Este projeto foi desenvolvido como um desafio técnico para demonstrar competências em desenvolvimento Full Stack. O objetivo é simular um módulo de um **Regime Próprio de Previdência Social (RPPS)**, permitindo o cadastro, visualização, edição e exclusão de beneficiários.

O sistema foi arquitetado focando em boas práticas, como separação de responsabilidades, tipagem estática no Frontend e uso de ORM no Backend.

---

## 🚀 Tecnologias Utilizadas

### **Backend (.NET 8)**
* **C# / .NET 8:** Utilizando a versão mais recente e performática do framework.
* **Entity Framework Core:** Abordagem *Code-First* para modelagem do banco de dados.
* **PostgreSQL:** Banco de dados relacional robusto.
* **Swagger/OpenAPI:** Documentação e testes interativos da API.
* **Npgsql:** Provider para conexão eficiente entre .NET e Postgres.

### **Frontend (React)**
* **React + Vite:** Para uma aplicação rápida e otimizada.
* **TypeScript:** Garantindo segurança de tipos e redução de erros em tempo de execução.
* **Axios:** Para consumo de APIs HTTP.
* **CSS Puro:** Estilização limpa e responsiva.

---

## ⚙️ Funcionalidades

* ✅ **CRUD Completo:** Criação, Leitura, Atualização e Exclusão de beneficiários.
* ✅ **Validação de Regra de Negócio:** Bloqueio de cadastro de datas de nascimento futuras.
* ✅ **Formatação Brasileira:** Tratamento visual de datas (DD/MM/AAAA) e máscaras.
* ✅ **Tipagem Forte:** Uso de `DateOnly` no Backend para mapeamento correto com o banco `DATE` do Postgres.
* ✅ **Integração Segura:** Configuração de CORS para comunicação entre portas distintas (5166 e 5173).

---

## 📹 Demonstração

[VÍDEOS DEMONSTRATIVOS](https://drive.google.com/drive/folders/1qE-EXc5GjTAwuHnYpk39vP5hPog4yL0M?usp=sharing)

---

## 🔧 Como Rodar o Projeto

### Pré-requisitos
* .NET 8 SDK
* Node.js & NPM
* PostgreSQL instalado e rodando

### 1. Configurando o Banco de Dados
Certifique-se de que o PostgreSQL está rodando e configure a *Connection String* no arquivo `appsettings.json` da API:
```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=desafio_agenda;Username=postgres;Password=sua_senha"
}
```
### 2. Rodando o Backend (API)
# Entre na pasta da API
cd DesafioAgenda.API

# Restaure as dependências
dotnet restore

# Rode o projeto (O EF Core criará o banco automaticamente se configurado)
dotnet run

A API estará disponível em: http://localhost:5166 O Swagger estará em: http://localhost:5166/swagger

### 3.Rodando o Frontend (Web)# Em outro terminal, entre na pasta Web
cd DesafioAgenda.Web

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev

O site estará disponível em: http://localhost:5173

