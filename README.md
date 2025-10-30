# Cree la estructura básica del proyecto.

1. Cree un controlador Web que le permitirá cargar la configuración mínima
Web-MVC

```java
package com.bbapp.bbapstarter.controller;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class Status {

    @RequestMapping("/status")
    public ResponseEntity<?> status() {
        String time = LocalDateTime.now()
            .atZone(ZoneId.of("UTC-5"))
            .format(DateTimeFormatter.ofPattern("dd-MM-YYYY HH:mm:ss"));
        return ResponseEntity.ok(Map.of(
            "status", "Greetings from SpringBoot the time is " + time  
        ));
    }
}
```

2. Cree un index html en la siguiente localización: /src/main/resources/static

![alt text](/readme/img/image.png)

3. Corra la clase que acabamos de crear y su servidor debe iniciar la ejecución

```bash
 .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/

 :: Spring Boot ::                (v3.5.7)

2025-10-27T16:02:36.306-05:00  INFO 92359 --- [bbapstarter] [           main] c.b.bbapstarter.BbapstarterApplication   : Starting BbapstarterApplication using Java 17.0.12 with PID 92359 (/Users/dsbaenar/development/WSLAB6/bbapstarter/target/classes started by dsbaenar in /Users/dsbaenar/development/WSLAB6/bbapstarter)
2025-10-27T16:02:36.307-05:00  INFO 92359 --- [bbapstarter] [           main] c.b.bbapstarter.BbapstarterApplication   : No active profile set, falling back to 1 default profile: "default"
2025-10-27T16:02:36.712-05:00  INFO 92359 --- [bbapstarter] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port 8080 (http)
2025-10-27T16:02:36.719-05:00  INFO 92359 --- [bbapstarter] [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2025-10-27T16:02:36.719-05:00  INFO 92359 --- [bbapstarter] [           main] o.apache.catalina.core.StandardEngine    : Starting Servlet engine: [Apache Tomcat/10.1.48]
2025-10-27T16:02:36.743-05:00  INFO 92359 --- [bbapstarter] [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2025-10-27T16:02:36.744-05:00  INFO 92359 --- [bbapstarter] [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 418 ms
2025-10-27T16:02:36.783-05:00  INFO 92359 --- [bbapstarter] [           main] o.s.b.a.w.s.WelcomePageHandlerMapping    : Adding welcome page: class path resource [static/index.html]
2025-10-27T16:02:36.924-05:00  INFO 92359 --- [bbapstarter] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 8080 (http) with context path '/'
2025-10-27T16:02:36.930-05:00  INFO 92359 --- [bbapstarter] [           main] c.b.bbapstarter.BbapstarterApplication   : Started BbapstarterApplication in 0.792 seconds (process running for 0.906)
2025-10-27T16:02:37.771-05:00  INFO 92359 --- [bbapstarter] [nio-8080-exec-1] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring DispatcherServlet 'dispatcherServlet'
2025-10-27T16:02:37.771-05:00  INFO 92359 --- [bbapstarter] [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Initializing Servlet 'dispatcherServlet'
2025-10-27T16:02:37.772-05:00  INFO 92359 --- [bbapstarter] [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Completed initialization in 1 ms
```

4. Verifique que se esté ejecutando accediendo a:
`localhost:8080/status`

![alt text](/readme/img/image1.png)

5. Verifique que el servidor esté entregando elementos estáticos web entrando
a:
`localhost:8080/index.html`
![alt text](/readme/img/image2.png)

## Ahora construimos el cliente Web

El index.html sería. Solo contiene un elemento “div” con identificador root. A Partir
de este elemento construiremos la aplicación. Observe que esta página se encarga
de cargar las librerías necesarias y el único script dónde estarán nuestros
componentes. Observe que solo usaremos un elemento JSX, es decir no usaremos
archivos Js y JSX, esto facilita la depuración y el mantenimiento.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive BB</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.1/p5.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.1/addons/p5.dom.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.1/addons/p5.sound.min.js"></script>
</head>
<body>
    <div id="root"></div>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <script type="text/babel" src="js/BBCanvas.jsx"></script>
    <script type="text/babel" src="js/EditorComponent.jsx"></script>
</body>
</html>
```

## Construyamos el componente ReactJS paso a paso

### Primero construimos una versión simple

En el archivo js/bbComponents.jsx escriba:

```jsx
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<h1>Bienvenido</h1>
);
```

Este componente ya crea una primera versión de la aplicación

### Ahora extendamos una poco y iremos los elementos principales de la interfaz gráfica

```jsx
 function Editor({name}) {
return (
<div>
<h1>Hello, {name}</h1>
<hr/>
<div id="toolstatus"></div>
<hr/>
<div id="container"></div>
<hr/>
<div id="info"></div>
</div>
);
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<Editor name="Daniel"/>
);
```

![alt text](/readme/img/image3.png)

Este elemento ya instancia un componente y muestra las partes principales de la
aplicación. Observe que desde aquí es que estructuramos la pagina es decir si
deseamos cambiar la interfaz cambiaremos los componentes y no las páginas.

### Ahora creemos un componente para representar el canvas del tablero

Copie este código en le mismo archivo de sus componentes

```jsx
function BBCanvas() {
const [svrStatus, setSvrStatus] = React.useState({loadingState: 'Loading Canvas
...'});
const myp5 = React.useRef(null);
const sketch = function (p) {
let x = 100;
let y = 100;
p.setup = function () {
p.createCanvas(700, 410);
}
p.draw = function () {
if (p.mouseIsPressed === true) {
p.fill(0, 0, 0);
p.ellipse(p.mouseX, p.mouseY, 20, 20);
}
if (p.mouseIsPressed === false) {
p.fill(255, 255, 255);
}
}
};
React.useEffect(() => {
myp5.current = new p5(sketch, 'container');
setSvrStatus({loadingState: 'Canvas Loaded'});
}, []);
return(
<div>
</div>);
}
<h4>Drawing status: {svrStatus.loadingState}</h4>
```

Este componente renderiza un estado del canvas y el canvas. Note que el componente necesita dos renderizaciones para estar totalmente operativo. En la primera simplemente se crean los componentes y en la segunda se carga el canvas. El canvas solo se monta cuando ya se realizó una renderización, es decir cuando el método “componentDidMount” del ciclo de vida es llamado.

No olvide cargar este componente en el editor:

```jsx
function Editor( {name}
) {
return (
<div>
<h1>Hello, {name}</h1>
<hr/>
<div id="toolstatus"></div>
<hr/>
<div id="container">
<BBCanvas />
</div>
<hr/>
<div id="info"></div>
</div>
);
}
```

En este momento su cliente ya debe estar funcionando.
