const http = require('http');
const fs = require('fs');
const path = require('path');


// созднаем сервер 

const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log('Server request');
    // console.log(req.url, req.method);

    res.setHeader('Content-Type', 'text/html');

    const createPath = (page) => path.resolve(__dirname, 'Views', `${page}.html`);

    let basePath = '';

    switch (req.url) {
        case '/':
        case '/home':
        case '/index.html':
            basePath = createPath('index'); //делаем перехо на страницу index
            res.statusCode = 200; //добовляем статус 
            break;
        case '/about-us':
            res.statusCode = 301; //добовляем статус и делаем редирект на какуе-ту страницу
            res.setHeader('Location', '/contacts')// делаем редирект
            res.end();
            break;
        case '/contacts':
            basePath = createPath('contacts');
            res.statusCode = 200; //добовляем статус 
            break;
        default:
            basePath = createPath('error');
            res.statusCode = 404; //добовляем статус ошибки

            break;
    }

    fs.readFile(basePath, (err, data) => {
        if (err) {
            console.log(err);
            res.statusCode = 500; //добовляем статус ошибки
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    })



    // const data = JSON.stringify([
    //     { name: 'Tommy', age: 35 },
    //     { name: 'Arthur', age: 40 }
    // ])
    // res.end(data)
})


server.listen(PORT, 'localhost', (error) => {
    error ? log.error(error) : console.log(`listening port${PORT} `);
})