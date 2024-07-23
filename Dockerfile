# 베이스 이미지로 Node.js를 사용합니다.
FROM node:14

# 앱 디렉토리를 생성하고 설정합니다.
WORKDIR /usr/src/app

# 앱의 종속성을 설치합니다.
# 패키지.json과 package-lock.json 파일을 복사합니다.
COPY package*.json ./

# npm을 사용하여 종속성을 설치합니다.
RUN npm install

# 앱 소스 코드를 복사합니다.
COPY . .

# 앱이 3000 포트를 사용하도록 설정합니다.
EXPOSE 3000

# 앱 실행 명령어를 설정합니다.
CMD ["npm", "run", "start"]
