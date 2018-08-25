import { createClass } from "asteroid";


const host = 'http://localhost:5757/admin'
//const host = 'http://ntboao.net/admin'
const meteorHost = 'http://localhost:3000'
//const meteorHost = 'https://ntboao.net'
const websocket = 'ws://localhost:3000/websocket'
//const websocket = 'wss://ntboao.net/websocket'


function getAsteroid() {
    const Asteroid = createClass ();
    const asteroid = new Asteroid ({
        endpoint: websocket
    });
    return asteroid
}



const config = {
    host: host,
    meteorHost: meteorHost,
    loginUrl: `${meteorHost}/methods/loginUser`,
    userUrl: `${meteorHost}/methods/getUserInfo`,
    getAsteroid: getAsteroid,
    // booksUrl:`${host}/weapp/booklist`
}

export default config
