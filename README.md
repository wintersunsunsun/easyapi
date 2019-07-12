# easyapi

### Install
```
npm install
```

### Generate SSL certification
```
mkdir cert
openssl req -nodes -new -x509 \
-keyout cert/server.key -out cert/server.cert
```
若是在本地端，Common Name 一定要填寫：localhost

### Running
```
PORT=3000 SPORT=3004 DEBUG=easyapi:* npm start
```