## Laboratorio Athena Quest


**Objetivo General:**  Aprender a usar los servicios de almacenamiento y análisis de datos en AWS, ya sea Amazon S3 y Amazon Athena para guardar datos y realizar consultas SQL que permitan explorar y analizar información 

![Arquitectura AWS](https://github.com/iscatalan/AthenaQuest/blob/main/Arquitectura%20Athena%20Quest%20(1).png)

**Introducción:**  S3 (Simple Storage Service) es un servicio de almacenamiento que permite guardar objetos de forma segura y escalable. La información se organiza en buckets y cada uno debe tener un nombre único a nivel global, es decir, no puede repetirse en ninguna otra cuenta de AWS del mundo. Además, por seguridad los buckets deben estar configurados para bloquear el acceso público, a menos que haya una necesidad muy específica. Esto evita que los datos sean visibles para cualquier persona y protege la privacidad de la información. 
Athena es un servicio de consulta que permite analizar datos directamente desde Amazon S3 usando SQL. No requiere configurar ni administrar servidores, lo que facilita hacer consultas rápidas y flexibles. Athena es ideal para explorar grandes cantidades de datos almacenados en formato CSV, JSON, Parquet, entre otros


**Tarea 1: Extraer los datos para el trabajo del laboratorio**

- Debes descargar el dataset netflix_titles.csv con temática de películas en Kaggle

Link: https://www.kaggle.com/datasets/shivamb/netflix-shows/data

**Tarea 2: Subir los datos a un bucket S3**

- Debes ir a S3 y buscar el bucket llamado “datos-lab-athena”. Luego seleccionar “Cargar” para subir tu archivo con los datos 

**Tarea 3: Crear un bucket para guardar los resultados de las consultas de Athena**
- Tienes que crear un bucket de uso general, nombrarlo y mantener la configuración de bloqueo de acceso público ya configurada

**Tarea 4: Configurar la ubicación de los resultados de las consultas en Athena**
 
- Debes ir a Athena, escoger “Iniciar el editor de consultas” con la opción “Consulte sus datos con Trino SQL” seleccionada. Esto permitirá analizar los datos que tienes en el bucket S3
- Antes de crear la tabla, debes configurar la ubicación de los resultados de la consulta a S3. Entonces, lo anterior debes conectarlo al bucket que creaste en la tarea 3. Para ello debes seleccionar “Editar ajustes” que aparece en la notificación “Antes de ejecutar la primera…” y seleccionar el bucket

**Tarea 5: Crear tabla en Athena**

- Debes seleccionar crear en donde dice “Tablas y vistas”, luego en la opción de origen de datos tiene que ser la de datos del bucket S3
- Tienes que nombrar tu tabla, después escoger la opción de crear una base de datos. Luego en conjunto de datos seleccionar el bucket “datos-lab-athena” que es donde se encuentran los datos para hacer las consultas en Athena 
- En formato de datos seleccionar tipo de tabla “Apache Hive” y formato de archivo “CSV”
- En los detalles de columna debes nombrar todas las columnas de los datos. Puedes agregarlas de una. Ó seleccionar “Agregar columnas en bloque” y ahí escribir todas en modo <“nombre” + “tipo”,>

  **Ejemplo:** con el dataset de netflix_series se debe colocar: “show_id string, type string, title string, director string, cast string” y así detallar con todas el nombre de las columnas y el tipo
- Finalmente debes seleccionar “Crear tabla”

**Tarea 6: Realizar consultas de tipo SQL en Athena**
- Al costado derecho, donde dice “Datos” elige la base de datos que creaste en la tarea 5 y también debes escoger la tabla a la que se harán las consultas
- Ya configurado lo anterior puedes comenzar a realizar consultas SQL y responder a las siguientes preguntas:
  
  **1.¿Qué títulos fueron lanzados antes del año 2000?** Para responder esto se necesita seleccionar (SELECT) las columnas title y release_year, que tienen el nombre del título y el año en que fue lanzado. Luego     indicar de qué tabla se obtendrá esta información utilizando FROM “nombre tabla”. Y, por último aplicar una condición con WHERE para filtrar los resultados y mostrar solo los que en release_year sea menor al      año 2000

  *Respuesta:*

  SELECT title, release_year
  
  FROM “nombre tabla”
  
  WHERE release_year < 2000

  **2. ¿Cuántos títulos hay en total en la tabla?**

  *Respuesta:*
  
  SELECT COUNT(*) FROM “nombre_tabla”;

  **3.¿Qué títulos fueron lanzados en el año 2021?**

   *Respuesta:*

  SELECT title, release_year
  
  FROM “nombre_tabla”
  
  WHERE release_year = 2021;

  **4. Listar todos los títulos del país 'United States'**

   *Respuesta:*

  SELECT title, country
  
  FROM “nombre_tabla”
  
  WHERE country = 'United States';

  **5. ¿Cuántos títulos son películas (Movie) y cuántos son series (TV Show)?**

  *Respuesta:*

   SELECT type, COUNT(*)
  
  FROM “nombre_tabla”
  
  GROUP BY type;

  **6. ¿Qué títulos tienen la palabra "Love"?**

   *Respuesta:*

   SELECT title
  
  FROM “nombre_tabla”
  
  WHERE title LIKE '%Love%';



- Para eliminar la tabla se utiliza el comando DROP TABLE “nombre tabla”. En el caso de querer eliminar la base de datos se usa DROP DATABASE “nombre base de datos”
