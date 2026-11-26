"""Inserta los parciales compartidos (head, header, footer) en cada página del sitio.

Uso:  python tools/build.py
Cada página marca dónde va cada parcial con:
    <!-- @include header --> ... <!-- @end header -->
Lo que haya entre las marcas se reemplaza por sitio/_parciales/<nombre>.html.
Las páginas siguen abriéndose con doble clic; solo hay que correr esto tras editar un parcial.
"""
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent / "sitio"
PARTS = {p.stem: p.read_text(encoding="utf-8") for p in (ROOT / "_parciales").glob("*.html")}
PATTERN = re.compile(r"(<!-- @include (\w+) -->)(.*?)(\s*<!-- @end \2 -->)", re.S)


def fill(match):
    start, name, _old, end = match.groups()
    if name not in PARTS:
        raise SystemExit(f"Parcial desconocido: {name}")
    return f"{start}\n{PARTS[name].rstrip()}{end}"


for page in sorted(ROOT.glob("*.html")):
    text = page.read_text(encoding="utf-8")
    new, count = PATTERN.subn(fill, text)
    if new != text:
        page.write_text(new, encoding="utf-8")
    print(f"{page.name}: {count} parciales")
