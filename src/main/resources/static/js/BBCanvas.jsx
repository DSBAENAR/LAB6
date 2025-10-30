import React from "react"
import BBServiceURL from "./util/functions/BBServiceURL"
function BBCanvas(){
    const [serverstatus,setServerStatus] = React.useState({
        loadingState:'Loading Canvas...'
    })
    const comunicationWS = React.useRef(null)

    const myp5 = React.useRef(null)
    const sketch = function(p){
        let x = 100
        let y = 100
        p.setup = function(){
            p.createCanvas(700,410)
        }

         p.draw = function(){
            if (p.mouseIsPressed){
                p.fill(0, 0, 0)
                p.ellipse(p.mouseX, p.mouseY, 20, 20)
                comunicationWS.current.send(p.mouseX, p.mouseY)
            }

            if (!p.mouseIsPressed){
                p.fill(255,255,255)
            }
        }
    }

   

    React.useEffect(() => {
        myp5.current = new p5(sketch, 'container')
        setServerStatus({loadingState:'Canvas Loaded'})
        comunicationWS.current = new WSBBChannel(BBServiceURL(), (msg) => {
            var obj = JSON.parse(msg)
            console.log("On func call back", msg)
            drawPoint(obj.x, obj.y)
        })
        return () =>{
            console.log("Closing connection...")
            comunicationWS.current.wsocket.close()
        }
    },[])

    function drawPoint(x,y){
        myp5.current.ellipse(x, y, 20, 20)
    }

    

    return(
        <div>
            <h4>Drawing status: {serverstatus.loadingState} </h4>
        </div>
    )
}