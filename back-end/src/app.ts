const express = require('express');
import routerTransaction from "./routes/TransactionRouter";
import routerUser from "./routes/UserRoutes";
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());
app.use(routerTransaction);
app.use(routerUser);

export default app;