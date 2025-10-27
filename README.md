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
