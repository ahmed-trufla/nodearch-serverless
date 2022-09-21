# Serverless Nodearch

POC on using nodearch (core & express) with serverless framework and create 4 endpoints in one lambda


## How to use it

```
npm i
npm run build
npm run dev
```

Base URL:  http://localhost:4000

POST http://localhost:4000/client-management/clients
POST http://localhost:4000/client-management/client/search
GET http://localhost:4000/client-management/clients/:key
PATCH http://localhost:4000/client-management/clients/:key
DELETE http://localhost:4000/client-management/clients/:key