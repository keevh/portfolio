# Project asset structure

Store every project asset under `public/projects/<slug>/`.

Expected folders per project:

```txt
public/projects/<slug>/
├── hero/      # Cover image used as the main project image
├── gallery/   # Product screenshots only
└── diagrams/  # Technical diagrams, architecture, schemas
```

Naming rules:

- Use kebab-case file names.
- Keep `gallery/` for product UI only.
- Keep `diagrams/` for technical support media only.
- Prefer descriptive names like `admin-dashboard.png` or `system-architecture.png`.

Current project slugs:

- `bakery`
- `lumen`
- `trimly`
- `alien-monster-hunter`
- `towers-of-hanoi`
