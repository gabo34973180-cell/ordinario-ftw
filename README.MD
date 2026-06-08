Estos son losz promt que ocupe para la generacion de los archivos completos xml 

1. Prompt para la generación de usuarios.xml

    "Actúa como un ingeniero de datos. Necesito generar un archivo de prueba llamado usuarios.xml para una simulación de red social universitaria llamada RedUV. El archivo debe contener exactamente 30 registros de usuarios basados en nombres comunes de estudiantes y profesores reales de la comunidad de la FEI (Facultad de Estadística e Informática).

    Cada nodo <usuario> debe incluir de manera estricta las siguientes etiquetas con información coherente y realista: <nombre>, <matricula> (utilizando el formato oficial de la Universidad Veracruzana que inicia con 'zS'), <password>, <imagen> (con la nomenclatura exacta ../imagenes/[nombre_usuario].jpg) y <imagenportada> (con la nomenclatura ../imagenes/[nombre_usuario]portada.jpg).

    Adicionalmente, las estructuras de las etiquetas <seguidores> y <seguidos> deben contener sub-nodos cruzados con los nombres de los mismos usuarios creados en este entorno para simular una base de datos con integridad referencial lógica."

2. Prompt para la generación de publicaciones.xml

    "Actúa como un desarrollador backend. Tomando como base la lista de los 30 usuarios creados previamente para la plataforma RedUV, genera un archivo estructurado llamado publicaciones.xml que contenga un total de 40 publicaciones extensas y coherentes con el contexto universitario de Xalapa (exámenes de la FEI, laboratorios de redes, proyectos integradores y distros de Linux).

    Cada nodo <publicacion> debe contar con un atributo único id (desde p1 hasta p40) y contener las etiquetas: <usuario>, <descripcion>, <fecha>, <imagen> (respetando estrictamente el formato secuencial ../imagenes/publicacion[Número].jpg).

    Para enriquecer la experiencia de usuario (UX) en la fase de pruebas del frontend, cada publicación debe incluir de manera densa entre 10 y 15 sub-nodos de <meencanta> y entre 10 y 15 bloques completos de <comentario> (con las sub-etiquetas <cmtusuario> y <texto>), asegurando que todos los nombres de los interactores pertenezcan de forma estricta a la base de datos de usuarios inicial."

3. Prompt para la generación de grupos.xml

    "Actúa como arquitecto de software. Genera un archivo llamado grupos.xml para modelar la sección de comunidades de la RedUV. El archivo debe registrar exactamente 6 grupos temáticos alineados con la interfaz (por ejemplo: 'FEI', 'Linuxeros', 'Windows se no actualizo', 'Comedor FEI', 'Hardware e Intercambio Académico' y 'Comunidad UX').

    El diseño del esquema debe incluir las etiquetas <nombre>, <descripcion> y <imagengrupo> (con la nomenclatura ../imagenes/grupo[1-6].jpg). El nodo <miembros> debe listar las matrículas reales en formato 'zS' de los usuarios previamente definidos.

    Cada grupo debe integrar un nodo de <publicaciones> internas con la estructura completa de posts independientes: <titulo>, <usuario>, <contenido>, <imagen-pg> (con la nomenclatura simplificada ../imagenes/pg_grupo[NúmeroGrupo]_[NúmeroPublicación].jpg), <fecha>, <reacciones> y <comentarios>, manteniendo la consistencia de datos con los interactores de la red social."

4. Prompt para la generación de notificaciones.xml

    "Actúa como un especialista en interacción humano-computadora. Necesito un archivo llamado notificaciones.xml para comprobar el correcto funcionamiento del panel flotante de alertas de la RedUV. El archivo debe contener un historial lógico de 15 notificaciones dirigidas principalmente al usuario de prueba 'Juan' y otros miembros de la comunidad.

    Cada nodo <notificacion> debe poseer un atributo único id y las etiquetas internas <usuario> (quien genera la acción), <tipo> (restringido a los estados de interacción: 'Me Encanta', 'Comentario' o 'Nuevo Seguidor'), <fecha> y <leida> (manejando estados booleanos booleanos 'true' o 'false'). Las acciones descritas deben coincidir con las actividades registradas en el flujo de publicaciones y grupos para simular un sistema en tiempo real estructurado de forma consistente."