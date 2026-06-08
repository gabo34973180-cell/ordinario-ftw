import os
import requests

# Crear la carpeta de imágenes si no existe
carpeta_destino = "../imagenes"
if not os.path.exists(carpeta_destino):
    os.makedirs(carpeta_destino)

# Listas oficiales de nombres para RedUV
usuarios = [
    "juan", "erenjaeger", "daniel_48689", "jorge_548", "sebas_773", "angel_4897", 
    "cris_834", "mar_4897", "max_477", "matias_486", "josue_34", "carlos_iglesias", 
    "rene_hernandez", "marianita_chuchita", "alejandro_gomez", "fernanda_ruiz", "lu_morales", 
    "camila_torres", "rodrigo_perez", "valeria_silva", "diego_herrera", "natalia_cruz", 
    "ricardo_mendez", "sofia_castro", "gabriel_maldonado", "javier_luna", "elena_vazquez", 
    "mauricio_flores", "diana_patricio", "arturo_jimenez"
]

grupos = ["grupo1", "grupo2", "grupo3", "grupo4", "grupo5", "grupo6"]

imagenes_internas_grupos = ["pg_grupo1_2", "pg_grupo3_1", "pg_grupo5_1"]

def descargar_imagen(url, nombre_archivo):
    ruta_completa = os.path.join(carpeta_destino, f"{nombre_archivo}.jpg")
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            with open(ruta_completa, 'wb') as f:
                f.write(response.content)
            print(f"Descargada con éxito: {nombre_archivo}.jpg")
        else:
            print(f"Error al descargar {nombre_archivo}: Código {response.status_code}")
    except Exception as e:
        print(f"Fallo en la conexión para {nombre_archivo}: {e}")

print("=== INICIANDO DESCARGA DE IMÁGENES PARA REDUV ===")

# 1. Descargar Fotos de Perfil (Retratos usando un banco de imágenes de prueba)
for index, user in enumerate(usuarios):
    url_perfil = f"https://picsum.photos/id/{10 + index}/300/300"
    descargar_imagen(url_perfil, user)

# 2. Descargar Fotos de Portada (Paisajes horizontales utilizando variaciones estables)
for index, user in enumerate(usuarios):
    url_portada = f"https://picsum.photos/id/{50 + index}/1200/400"
    descargar_imagen(url_portada, f"{user}portada")

# 3. Descargar Imágenes de Publicaciones del Feed (40 imágenes variadas)
for i in range(1, 41):
    url_pub = f"https://picsum.photos/id/{100 + i}/800/600"
    descargar_imagen(url_pub, f"publicacion{i}")

# 4. Descargar Logos de los Grupos (Imágenes cuadradas temáticas)
for index, grupo in enumerate(grupos):
    url_grupo = f"https://picsum.photos/id/{200 + index}/400/400"
    descargar_imagen(url_grupo, grupo)

# 5. Descargar Imágenes específicas internas de los Grupos
for index, img_grupo in enumerate(imagenes_internas_grupos):
    url_interna = f"https://picsum.photos/id/{210 + index}/800/600"
    descargar_imagen(url_interna, img_grupo)

print("=== PROCESO TERMINADO: Revisa la carpeta '../imagenes' ===")