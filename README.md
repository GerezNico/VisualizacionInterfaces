# VisualizacionInterfaces

Proyecto de interfaces con Bootstrap y SCSS.

Propósito: incluir el CSS compilado para que colaboradores puedan abrir la web localmente sin pasos extra.

Archivos importantes:
- `index.html` — página principal
- `scss/custom.scss` — fuente SCSS editable
- `css/custom.css` — CSS compilado (incluido en el repo para conveniencia)
- `img/` — imágenes del proyecto

Instalación y desarrollo (opcional):
1. Clonar el repo:

```powershell
git clone https://github.com/GerezNico/VisualizacionInterfaces.git
cd VisualizacionInterfaces
```

2. Instalar dependencias (para editar SCSS):

```powershell
npm install
```

3. Compilar SCSS a CSS (si vas a cambiar estilos):

```powershell
npm run sass
# o para watch
npm run sass:watch
```

Nota para colaboradores:
- El archivo `css/custom.css` está incluido para que puedas abrir `index.html` directamente sin compilar.
- Si editas `scss/custom.scss`, recuerda compilar y subir el CSS o avisar a quien administra el repo.

Política sobre node_modules:
- `node_modules/` está en `.gitignore` y NO se sube al repositorio.
- Si clonas el proyecto y quieres trabajar con SCSS, ejecuta `npm install`.

Contacto:
- Propietario del repo: @GerezNico
