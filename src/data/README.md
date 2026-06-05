# Cómo editar proyectos y experiencia

Editá `projects.json` y `experience.json` directamente. Sin tocar código.

---

## projects.json

### `category` — filtra en los botones de la sección
| Valor | Botón visible |
|-------|--------------|
| `"frontend"` | Frontend |
| `"backend"` | Backend |
| `"fullstack"` | Full Stack |
| `"hardware"` | Hardware / IoT |

### `tags[].labelKey` — etiquetas de color en la card
| Valor | Muestra |
|-------|---------|
| `"proj.uiux"` | Concepto UI/UX / UI/UX Concept |
| `"proj.frontend"` | Frontend |
| `"proj.hardware"` | Hardware/IoT |
| `"proj.utility"` | Utilidad / Utility |
| `"proj.ds"` | Ciencia de Datos / Data Science |
| `"proj.energy"` | Energía / Energy |

### `tags[].color` — color del punto de la etiqueta
Cualquier clase Tailwind de fondo. Ejemplos:
- `"bg-secondary"` → verde/teal
- `"bg-primary-container"` → cyan
- `"bg-[#7318ff]"` → violeta
- `"bg-[#ff6b35]"` → naranja

### `links[].type` — controla el estilo del botón
| Valor | Estilo |
|-------|--------|
| `"demo"` | Botón cyan destacado |
| `"repo"` | Botón neutro |
| `"research"` | Botón secundario |

### `links[].labelKey` — texto del botón
| Valor | Muestra |
|-------|---------|
| `"proj.demo"` | Demo |
| `"proj.repo"` | Repositorio / Repository |
| `"proj.research"` | Investigación / Research |

### `links[].icon` — ícono del botón
| Valor | Ícono |
|-------|-------|
| `"ExternalLink"` | → enlace externo |
| `"Github"` | GitHub logo |
| `"FlaskConical"` | matraz (investigación) |

---

## games.json

| Campo | Descripción |
|-------|-------------|
| `id` | Identificador único (string, sin espacios) |
| `name` | Nombre del juego en la UI |
| `url` | URL del juego — se carga en iframe |
| `preview` | Miniatura para el selector (800px ancho recomendado) |
| `gif` | Fondo animado del placeholder (1200px ancho recomendado) |
| `stack` | Tecnologías mostradas debajo del nombre |

```json
{
  "id": "mi-juego",
  "name": "Mi Juego",
  "url": "https://keevh.github.io/mi-juego/",
  "preview": "https://mi-imagen.com/preview.jpg",
  "gif": "https://mi-imagen.com/preview-wide.jpg",
  "stack": "HTML5 Canvas · JS"
}
```

> El selector de juegos solo aparece cuando hay **más de uno** en el array.

---

## experience.json

### `type` — ícono y color de la entrada
| Valor | Ícono | Color |
|-------|-------|-------|
| `"edu"` | birrete (educación) | teal |
| `"exp"` | maletín (trabajo) | cyan |

---

## Ejemplo completo — proyecto nuevo

```json
{
  "id": "mi-proyecto",
  "category": "fullstack",
  "image": "https://mi-imagen.com/foto.jpg",
  "gallery": [
    "https://mi-imagen.com/foto.jpg",
    "https://mi-imagen.com/foto2.jpg"
  ],
  "tags": [
    { "labelKey": "proj.frontend", "color": "bg-primary-container" },
    { "labelKey": "proj.utility",  "color": "bg-secondary" }
  ],
  "links": [
    { "type": "demo", "url": "https://mi-demo.com", "labelKey": "proj.demo", "icon": "ExternalLink" },
    { "type": "repo", "url": "https://github.com/keevh/mi-proyecto", "labelKey": "proj.repo", "icon": "Github" }
  ],
  "i18n": {
    "es": {
      "title": "Mi Proyecto",
      "desc": "Descripción corta del proyecto.",
      "highlights": [
        "Problema: Lo que resuelve este proyecto",
        "Solución: Cómo lo resuelve",
        "Resultado: Qué logró"
      ]
    },
    "en": {
      "title": "My Project",
      "desc": "Short project description.",
      "highlights": [
        "Problem: What this project solves",
        "Solution: How it solves it",
        "Result: What it achieved"
      ]
    }
  }
}
```

## Ejemplo completo — entrada de experiencia

```json
{
  "id": 4,
  "type": "exp",
  "place": "Empresa XYZ",
  "period": "2024 - Presente",
  "i18n": {
    "es": {
      "title": "Desarrollador Frontend",
      "desc": "Descripción del rol y responsabilidades."
    },
    "en": {
      "title": "Frontend Developer",
      "desc": "Role description and responsibilities."
    }
  }
}
```
