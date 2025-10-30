function BBServiceURL() {
    return 'ws/localhost:8080/bbService'
}

class WSBBChannel{
    constructor(URL,callback){
        this.URL = URL
        this.wsocket = new WebSocket(URL)
        this.wsocket.onopen = (evt) => this.onOpen(evt)
        this.wsocket.onmessage = (evt) => this.onMessage(evt)
        this.wsocket.onerror = (evt) => this.onError(evt)
        this.receive = callback
    }

    onMessage(evt) {
        console.log("In on message",evt)
        if (evt.data != "Connection established."){
            this.receive(evt.data)
        }
    }

    onError(evt){
        console.log("In on Error", evt)
    }

    send(x,y){
        let msg = '{"x": ' + x + ', "y": ' + y +  "}"
        console.log("sending: ", msg)
        this.wsocket.send(msg)
    }
}