# BackEnd-Movies
BackEnd desarrollado con Python Flask, SQLAlchemy y MySQL
------------------------------------------------------------------------------------------
Crear un entorno virtual (py -3 -m venv .venv) e instalar todo lo que dice en el archivo requirements.txt
para poder hacer bien los imports en el app.py
Para configurar la conexión con MySQL, corresponde a la línea:
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost/flaskmovies'
Donde "root:root" es nuestro usuario y contraseña y "flaskmovies" es el nombre de la BD.
Debemos activar el entorno virtual con el comando ".venv\Scripts\activate", luego
debemos ejecutar el app.py (python src/app.py) y recién el index.html
