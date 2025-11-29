# --- ESTÁGIO 1: Build --- (Usanddo Node.js 18 Alpine)
FROM node:20-alpine AS builder

WORKDIR /app

# Copia arquivos de dependências e instala
COPY package.json ./
RUN npm install --legacy-peer-deps

# Copia todo o código fonte e faz o build (O vite gera a pasta 'dist')
COPY . .
RUN npm run build

# --- ESTÁGIO 2: Produção (Usando Nginx) ---
FROM nginx:alpine

# Remove o arquivo de configuração padrão do Nginx e copia o personalizado
RUN rm /etc/nginx/conf.d/default.conf
# Copia o arquivo de configuração customizado do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copia os arquivos buildados do estágio anterior para o diretório padrão do Nginx
COPY  --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx em primeiro plano
CMD ["nginx", "-g", "deamon off;"]