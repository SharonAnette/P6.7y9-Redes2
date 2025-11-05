const dgram = require('dgram'); 
const PORT = 8080; 
const HOST = '127.0.0.1'; 
 
const servidor = dgram.createSocket('udp4'); 
 
servidor.on('listening', () => { 
    const address = servidor.address();
    console.log(`Servidor UDP escuchando en ${address.address}:${address.port}`); 
}); 
 
servidor.on('message', (mensaje, rinfo) => { 
    console.log(`Mensaje recibido: ${mensaje} de ${rinfo.address}:${rinfo.port}`); 

    // Responder al cliente (opcional)
    const respuesta = Buffer.from('Mensaje recibido correctamente');
    servidor.send(respuesta, rinfo.port, rinfo.address, (err) => {
        if (err) {
            console.error('Error al enviar la respuesta:', err);
        } else {
            console.log('Respuesta enviada al cliente');
        }
    });
}); 

// Manejador de errores
servidor.on('error', (err) => {
    console.error(`Error en el servidor: ${err.stack}`);
    servidor.close();
});

servidor.bind(PORT, HOST);
