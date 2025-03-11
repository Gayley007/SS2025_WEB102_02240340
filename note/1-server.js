// import built in http to create server
const http = require("http");

//CREATING SERVER
const server = http.createServer((req, res) => { //req-request , res-response

//REQUEST AND RESPONSE
    console.log(`Received request: ${req.method} ${req.url}`); //console.log = print
    res.writeHead(200, { "Content-Type": "application/json"}); //header
    res.end(JSON.stringify({message:"Hello, World!!"}));
});

//START THE SERVER
//define port number
const PORT = 3000; //port-connections end point
//start
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})

//RUN SERVER
//in terminal run node filename.js