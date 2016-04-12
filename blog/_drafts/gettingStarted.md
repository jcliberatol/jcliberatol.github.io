---
layout : post
title : Getting Started with Javascript, HTML and css for non web programmers.
---

### Web programming

This post pretends to give a guide to start in HTML , js and css for non web programmers.
In the web, generally sites are made of a index.html file, which is the main html file of
an application. Through the tutorial we are going to have 3 kinds of files

Este post pretende dar una guia para empezar en HTML , Javascript y CSS para programadores que no estan acostumbrados a la web.







/**
Juan Camilo Liberato Luna
      Contacto : jcliberatol@unal.edu.co / 3193686868 / 3165000 ext 10874
Perfil Profesional

Ingeniero de Sistemas y Computacion de la Universidad Nacional de Colombia, especialista en el desarrollo de software numérico para la calibración de modelos estadísticos, capaz de desarrollar infraestructuras de análisis de datos, integrando múltiples tecnologías para crear aplicaciones de datos extrayendo conocimiento a partir de los datos. Tengo amplio conocimiento de Front-end, puedo desarrollar visualizaciones de datos en 3D/2D y aplicaciones HTML5 modernas y escalables.

Mi conocimiento tecnico se centra alrededor de R, C++ y Javascript, he sido el desarrollador lider de la libreria de R IRTpp .

Me encanta trabajar en equipos donde con un alto nivel de independencia pueda contribuir a mejorar la eficiencia del equipo como un todo, soy orientado a objetivos, me encanta optimizar constantemente mi flujo de trabajo y el de mis compañeros construyendo herramientas que automaticen lo posible para ser más eficientes en equipo. Conozco y aplico metodologias agiles como SCRUM y extreme programming. Me interesa la interaccion entre la ingenieria de software y el negocio y trabajo por que las metas del negocio sean reflejadas de manera fiable en el flujo de trabajo.

• Vea mi portafolio de Software Libre en Github


Educaciòn Formal
Universidad Nacional de Colombia Ingeniería de Sistemas y Computación Febrero de 2009 a Agosto de 2015
Tesis : Computer Adaptive Testing , An Implementation for web servers and web browsers with Item Response Theory.

Construi un sistema que se apoyaba de la libreria IRTpp (R) y el framework OpenCPU para construir una API RESTful para acceder al paquete desde aplicaciones web, Tambien construi una aplicacion web que permitia crear items y tests en el contexto de la teoria de respuesta al item , su administracion y calibracion con un algoritmo online que se adapta a las habilidades del estudiante.


Liceo Samario Bachiller Comercial Graduado en Diciembre de 2008



Experiencia Profesional

Linden Learning SAS
Enero de 2016 - Actual Front-end Developer
Mi rol de desarrollo front-end se mezcla con mi conocimiento de tecnologia en la educacion y pasion por la visualizacion, Actualmente realizo algunos proyectos como:
  Sellability-Hubbard college sales platform : SPA en HTML5 , localizada en 5 idiomas. Integrada a Metacog. (Backbone, handlebars)
  Pearson STEM simulations : Simulaciones Webgl de fisica en 2D y 3D para Pearson Education. (threejs)


Universidad Nacional de Colombia , Grupo de Investigaciòn SICS.
Agosto de 2012 - Noviembre de 2015 Desarrollador e Investigador.
Enfocado en llevar el paquete IRTpp para Teoria de respuesta al item desde la teoria hasta una implementacion en R y C++ para el CRAN. Mis labores en el cargo fueron :
  * Gestionar un flujo de trabajo basado en git , para coordinar distintos repositorios de codigo en los que contribuian estadisticos y desarrolladores.
  * Integrar diferentes modulos de la libreria , utilizando fuertemente interfaces entre R y c++.
  * Analizar, mejorar e implementar algoritmos numericos principalmente enfocados en optimizacion derivados de los algoritmos EM , BFGS , NearPD , Quasi-newton , montecarlo, asi como algoritmos generados en el grupo de investigacion.
  * Diseñar , implementar y mejorar iterativamente una arquitectura de aplicacion numerica expuesta como libreria de R.
  * Configurar el despliegue de el paquete a multiples sistemas operativos (linux, OSx y Windows), y asegurar compatibilidad en la libreria entera y su documentacion.
  * Crear, implementar y administrar protocolos y sistemas para la documentacion , pruebas del codigo y integracion continua y integrarlas al flujo del equipo de trabajo.
  * Desarrollar codigo en R para toda la libreria y hacer code reviews con el equipo para analizar el desempeño del codigo.
  * Escribir suites de pruebas para grandes cantidades de datos (100's de GB) haciendo interfaz a MongoDB como base de datos.
  * Escribir la infraestructura de analisis de las pruebas para bondad de ajuste y visualizaciones para generar los reportes (ggplot2 , knitr y Rmarkdown).


Proyectos

Visual Math (2015)

Se implemento una libreria 3D en Javascript usando WEBGL y Katex para la creacion de contenido 3D relacionado a la visualizacion en matematicas, se desarrollo un curso de operaciones matriciales y transformaciones en 3D para ayudar al curso de computacion grafica del programa de ingenieria de sistemas y computacion (UNAL)
Tecnologia : threejs, katex, meteorjs, handlebarsjs, semanticui

Dascire (2015)

Emprendimiento que pretende apoyarse en la MIRT(Teoria de respuesta al item multidimensional) y infraestructuras modernas en Javascript/R (HTML / node.js / OpenCPU) para aplicaciones de datos que proveen aprendizaje adaptativo en los colegios y universidades. , Participante en el VilCap Education Forum Colombia 2015.
Tecnologia : d3, OpenCPU, R ,katex, meteorjs, semanticui

PyOS (2015)

Emulador de consola compartida para enviar comandos UNIX a un cluster beowulf que arranca desde una sola instancia centOS y propaga el sistema operativo mediante un boot por red.
Tecnologia : python / centOS 7

Analisis de los meandros del rio Magdalena en la Dorada, Caldas (2012 - 2015)

Se realizo un analisis primero desde la perspectiva de las GIS / simulacion con agentes y luego desde el analisis numerico y los metodos de elementos finitos para simular el caudal del rio magdalena en la costa del municipio de la Dorada, Caldas, el rio actualmente amenaza el municipio y ha causado multiples inundaciones, la geomorfologia del sitio es especial y la simulacion numerica es de gran ayuda para comprender como mitigar desastres y emprender estrategias de migracion hacia el futuro.
Tecnologia : grass GIS, blue kenue, sysyphe ,python / FORTRAN , Mathematica, Landsat7 / Agustin Codazzi imagery. / Netlogo

Caso de estudio : Operaciones de cobertura de riesgo realizadas por ECOPETROL (2014)

Se realizo un caso de estudio en el que analizando el suministro del petroleo a nivel mundial y el precio del activo de la empresa colombiana en diferentes mercados se determinaron estrategias basadas en la ingenieria financiera para cubrir la empresa y reducir los efectos de la volatilidad del precio del petroleo para cumplir los objetivos de cobertura financiera.
Tecnologia : Wolfram Mathematica

Financial Sentiment analysis with twitter (2013)

Se implemento una aplicacion que alimentada del stream de twitter buscaba twitts relacionados con algun activo de la bolsa (NYSE, NASDAQ y BVC) , y mediante un modelo bayesiano trataba de correlacionar el sentimiento del twitt con el precio del activo
Tecnologia : pytweet , numpy, python

Crawlun (2013)
Analisis de nodos de la pagina web de la Universidad Nacional de Colombia , se usaron crawlers para extraer informacion de interes y correr algunos algoritmos de grafos como pagerank en el grafo.
Tecnologia : Java / crawler4j


relational-tai (2012)
Proyecto en conjunto con profesores del Distrito de Bogota para desarrollar una aplicacion web que mediante teoria de respuesta al item permitiera hacer tests adaptativos a los estudiantes. El alcance del proyecto era de operaciones matematicas basicas.
Tecnologia : HTML / Javascript

Analisis de sentimiento en reviews de peliculas IMDB (2010)
Proyecto en el que se analizo la base de datos de reviews de IMDB, para hacer un ranking del sentimiento en un diccionario de palabras basado en las estrellas otorgadas en el review.
Tecnologia: WEKA



Habilidades y Conocimientos
• Idiomas : Español (Nativo) , Inglès C1(Effective Operational Proficiency)
• Lenguajes de Programación : R / C ++ / Javascript / Mathematica / HTML5 / Python
• Frameworks / Librerias :
    Javascript : Backbone.js / Three.js / Meteorjs / d3js / OpenCPU
    R : dplyr /ggplot2 / OpenCPU (http API) / Rcpp / testthat (testing) / IRTpp / Roxygen (documentacion) / rmongodb / FactoMiner , entre otros.
    Python : django / tweepy / numpy
• Modelado de Datos : MongoDB (NoSQL) / MySQL
• DevOPS : Linux (Servidores Debian y centOS) / Cloud Computing (Linode / AWS) / Git-Github
• Documentos y Documentacion : Markdown / LaTex / Microsoft Office / Doxygen / Sphinx

Referencias

Sandra Guayambuco.
Matematica, Universidad Nacional, Co-fundadora, Dascire, Especialista en visualizacion de datos.

Francisco Ospina.
Estadistico, Universidad Nacional,  Data Science and Statistics Manager en Algorythm

Cesar Pachon.
Ing. Sistemas, Universidad Nacional, especialista en e-learning, computacion 3D y

Olivier Manette.
Computational Neuro scientist , CNRS (France) , High tech ultralightweight airplane entrepreneur. CUDA expert.

German Hernandez.
Profesor, Ingenieria de Sistemas, Universidad Nacional de Colombia, Director del grupo de investigacion ALGOS

Alvaro Montenegro PhD.
Director, Grupo de Investigacion SICS , Matematico, Universidad Nacional.

Jose Luis Pisa.
Ing. Sistemas, Universidad Nacional , Co-fundador, Dascire, Desarrollador Front-end en la fiscalia general de la nacion.

Cristian Eduardo Sandoval.
Ing. Sistemas, Especialista en optimizacion y c++ , Investigador en algoritmos geneticos.

Juan Carlos Soto
Ing. Sistemas, Geologo, Universidad Nacional, DBA Oracle, experto en GIS.

Julian Liberato.
Ing Sistemas. DBA Oracle con mas de 25 años de experiencia.





1
*/




### Sentandose en los hombros de los gigantes , la necesidad de la tecnologia para la educacion en la nueva era.
