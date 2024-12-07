# ベースイメージ
FROM node:22-alpine

# 作業ディレクトリを設定
WORKDIR /app

# 必要なファイルをコピー
 COPY package*.json ./

# 依存関係をインストール
 RUN npm install

# アプリケーションコードをコピー
COPY . .

# ポートを公開
EXPOSE 3000

# 開発モードで起動
 CMD ["npm", "run", "dev"]