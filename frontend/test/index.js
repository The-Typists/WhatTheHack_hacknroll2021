const content = require('fs').readFileSync(__dirname + '/index.html', 'utf8');

const httpServer = require('http').createServer((req, res) => {
  // serve the index.html file
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(content));
  res.end(content);
});

const io = require('socket.io')(httpServer, {
  cors: {
    origin: '*',
  }
});

io.on('connection', socket => {
    // Event Handlers
    socket.on('initialize', (x) => {
        console.log("initalizing")
        max = x
    })
    socket.on('disconnect', () => {
        console.log("Disconnected!")
        clearInterval(id)
    })

    // Logic
    console.log('connect');
    const opp = [0,0,0,0];
    let max = 0;

    id = setInterval(() => {
        if(opp[0] < max) {
            idx = Math.floor(Math.random() * 10)
            opp[0] += idx
            opp[1] += idx
            socket.emit('updatePos', opp)
        }
    },1000)

});




httpServer.listen(2105, () => {
  console.log('go to http://localhost:2105');
});
