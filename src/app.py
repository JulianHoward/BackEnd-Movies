from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
# Configuración de la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost/flaskmovies'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Configuración de CORS
CORS(app)

db = SQLAlchemy(app)
ma = Marshmallow(app)

# Definición del modelo Movie
class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(500))
    poster = db.Column(db.String(255))  # Cambiado a String para contener URL
    rating = db.Column(db.Float)
    genre = db.Column(db.String(100))
    releaseDate = db.Column(db.Date)
    synopsis = db.Column(db.String(1000))

    def __init__(self, name, poster, rating, genre, releaseDate, synopsis):
        self.name = name
        self.poster = poster
        self.rating = rating
        self.genre = genre
        self.releaseDate = releaseDate
        self.synopsis = synopsis

# Creación de la tabla si no existe
with app.app_context():
    db.create_all()

# Serializador de Movie
class MovieSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'poster', 'rating', 'genre', 'releaseDate', 'synopsis')

# Instancia del serializador
movie_schema = MovieSchema()
movies_schema = MovieSchema(many=True)

@app.route('/movies', methods=['GET'])
def get_movies():
    all_movies = Movie.query.all()
    result = movies_schema.dump(all_movies)
    return jsonify(result)

@app.route('/movies/<id>', methods=['GET'])
def get_movie(id):
    movie = Movie.query.get(id)
    return movie_schema.jsonify(movie)

@app.route('/create/movie', methods=['POST'])
def create_movie():
    name = request.json['name']
    rating = request.json['rating']
    genre = request.json['genre']
    releaseDate = request.json['releaseDate']
    synopsis = request.json['synopsis']
    
    # Obtener la URL de la imagen de la solicitud JSON
    poster_url = request.json['poster']
    
    # Crear una nueva instancia de Movie con la URL de la imagen
    new_movie = Movie(name, poster_url, rating, genre, releaseDate, synopsis)
    
    # Agregar la nueva película a la base de datos
    db.session.add(new_movie)
    db.session.commit()

    # Devolver la nueva película como respuesta
    return movie_schema.jsonify(new_movie)

@app.route('/update/movie/<id>', methods=['PUT'])
def update_movie(id):
    movie = Movie.query.get(id)

    name = request.json['name']
    poster = request.json['poster']
    rating = request.json['rating']
    genre = request.json['genre']
    releaseDate = request.json['releaseDate']
    synopsis = request.json['synopsis']

    movie.name = name
    movie.poster = poster
    movie.rating = rating
    movie.genre = genre
    movie.releaseDate = releaseDate
    movie.synopsis = synopsis

    db.session.commit()

    return movie_schema.jsonify(movie)

@app.route('/delete/movie/<id>', methods=['DELETE'])
def delete_movie(id):
    movie = Movie.query.get(id)
    db.session.delete(movie)
    db.session.commit()

    return jsonify('Movie deleted correctly')

if __name__ == '__main__':
    app.run(debug=True)
