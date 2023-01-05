const express = require('express');
const http = require('http');
const socket = require('socket.io')
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const socketServer = require('./socket/socketServer');

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = socket(server, {
  cors: {
	origin: '*',
	methods: [ 'GET', 'POST' ]
  }
});

connectDb();

app.use(morgan('tiny'))
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use('/api/auth', require('./routers/auth'));
app.use('/api/users', require('./routers/users'));
app.use('/api/posts', require('./routers/posts'));
app.use('/api/comments', require('./routers/comments'));
app.use('/api/messages', require('./routers/messages'));
app.use('/api/notifications', require('./routers/notifications'));

io.on('connection', socket => {
  socketServer(socket)
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
