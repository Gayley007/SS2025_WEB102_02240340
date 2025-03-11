const http = require("http");

//Sample array to store data of students(consider it a database)
const students = [
    {id: 1, name: "Tshering", age: 17} ,
    {id: 2, name: "Chimi", age: 15}
];

const server = http.createServer((req, res) => { 
    res.setHeader(`Content-Type`, `application/json`);
    if (req.method === `GET` && req.url === `/`){
        res.writeHead(200, { "Content-Type": "text/plain"});
        res.end("Welcome To API!");
    }
    else if (req.method === `GET` && req.url === `/students`){
        res.writeHead(200);
        res.end(JSON.stringify(students));
    }
    else{
        res.writeHead(404);
        res.end(JSON.stringify({error:"Route not found"}));
    }
});

server.listen(3000, () => {
    console.log(`Server is running at http://localhost:3000`);
});