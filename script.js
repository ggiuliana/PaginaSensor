
console.log("NARD");

// connection option
const options = {
  		clean: true, // retain session
      connectTimeout: 4000, // Timeout period
      // Authentication information
      clientId: 'emqx_test',
      username: '',
      password: '',
}

// Connect string, and specify the connection method by the protocol
// ws Unencrypted WebSocket connection
// wss Encrypted WebSocket connection
// mqtt Unencrypted TCP connection
// mqtts Encrypted TCP connection
// wxs WeChat applet connection
// alis Alipay applet connection
const connectUrl = 'mqtt://10.0.3.201:8083/mqtt'
const client = mqtt.connect(connectUrl, options)

client.on("connect", () => {
  console.log("Conectado");
  client.subscribe("rfid");
  client.subscribe("dat");
});

client.on('reconnect', (error) => {
    console.log('reconnecting:', error)
})

client.on('error', (error) => {
    console.log('Connection failed:', error)
})

client.on('message', (topic, message) => {
  console.log('receive message:', topic, message.toString())
  if(topic == "rfid"){
    if(message.toString() == "aprobado"){
      aprobado = true;
      console.log("aprobeti")
      document.getElementById('titulo_estado').textContent = 'Acceso concedido';
      document.getElementById('acceso_estado').textContent = 'Esperando datos';
      document.getElementById('titulo_estado').style.color = 'green';
      document.getElementById('acceso_estado').style.color = 'white';
    }
    else if(message.toString() == "denegado"){
      aprobado = false;
      document.getElementById('titulo_estado').textContent = 'Acceso denegado';
      document.getElementById('acceso_estado').textContent = 'No se pueden recibir datos';
      document.getElementById('titulo_estado').style.color = 'red';
      document.getElementById('acceso_estado').style.color = 'red';
    }  
  }
  else{
    if(aprobado){
      console.log(message.toString)
      document.getElementById('acceso_estado').textContent = message.toString(); 
      document.getElementById('acceso_estado').style.color = 'green';
    }
  }
  
})