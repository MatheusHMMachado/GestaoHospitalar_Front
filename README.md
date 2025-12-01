# GestaoHospitalar_Front
# React

Um projeto moderno baseado em React que utiliza as mais recentes tecnologias e ferramentas de front-end para a criação de aplicações web responsivas.

# ## 🚀 Recursos

- **React 18** - Versão do React com renderização aprimorada e recursos de concorrência
- **Vite** - Ferramenta de compilação e servidor de desenvolvimento extremamente rápidos
- **Redux Toolkit** - Gerenciamento de estado com configuração simplificada do Redux
- **TailwindCSS** - Framework CSS utilitário com ampla personalização
- **React Router v6** - Roteamento declarativo para aplicações React
- **Visualização de Dados** - D3.js e Recharts integrados para visualização de dados poderosa
- **Gerenciamento de Formulários** - React Hook Form para manipulação eficiente de formulários
- **Animação** - Framer Motion para animações de interface suaves
- **Testes** - Configuração das bibliotecas Jest e React Testing

## 📋 Pré-requisitos

- Node.js (v14.x ou superior)
- npm ou yarn

## 🛠️ Instalação

1. Instale as dependências:

``bash

npm install

# ou

yarn install

```

2. Inicie Servidor de desenvolvimento:

``bash

npm start

# ou

yarn start

```

## 📁 Estrutura do Projeto

```
react_app/
├── public/ # Recursos estáticos
├── src/
│ ├── components/ # Componentes de UI reutilizáveis
│ ├── pages/ # Componentes de página
│ ├── styles/ # Estilos globais e configuração do Tailwind
│ ├── App.jsx # Componente principal da aplicação
│ ├── Routes.jsx # Rotas da aplicação
│ └── index.jsx # Ponto de entrada da aplicação
├── .env # Variáveis ​​de ambiente
├── index.html # HTML template
├── package.json # Dependências e scripts do projeto
├── tailwind.config.js # Configuração CSS do Tailwind
└── vite.config.js # Configuração do Vite
```

```
## 🎨 Estilização

Este projeto utiliza o Tailwind CSS para estilização. A configuração inclui:

- Plugin Forms para estilização de formulários
- Plugin Typography para estilização de texto
- Plugin de proporção para elementos responsivos
- Consultas de contêiner para design responsivo específico de componentes
- Tipografia fluida para texto responsivo
- Utilitários de animação

## 📱 Design Responsivo

O aplicativo foi desenvolvido com design responsivo utilizando breakpoints do Tailwind CSS.

## 📦 Implantação

Para compilar o aplicativo para produção:

```bash
npm run build
```