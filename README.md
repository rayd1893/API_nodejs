# API con NodeJS 💻
Ejemplo de como crear un API a través de un archivo plano (CSV).

### Instalaciones 💽
---

1. Instalar NodeJS

```bash
$ sudo apt install npm
```

2. Instalación de paquetes con npm

```bash
$ npm install csv-parser
$ npm install express --save
$ npm install method-override
```

### Ejecución ▶️
---

```bash
$ node read_file_csv.js
```

### Rutas 📌

En su navegador favorito puede probar las siguientes rutas:

1. Saludo del API 
http://localhost:3000/

2. Obtener la cantidad de casos confirmados totales por país
http://localhost:3000/countries_confirmed

3. Obtener listado de países y provincias filtrando por rangos de casos activos.
http://localhost:3000/countries_active?min=1000&max=2000



### Author 🙋
---

<a href="https://github.com/rayd1893/">Rayd Trujillo</a>



