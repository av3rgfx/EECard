"""Build a reproducible, self-contained handoff archive using only the stdlib."""
from pathlib import Path
import hashlib
import re
import zipfile

base = Path(__file__).resolve().parent
root = base / "starter"
manifest = root / "MANIFEST.sha256"
archive = base / "avvio-prodotto.zip"
paths = sorted(p for p in root.rglob("*") if p.is_file() and p != manifest)
for path in paths:
    assert not path.is_symlink(), f"Symlink not allowed: {path}"
    relative = path.relative_to(root)
    assert not any(part in {".git", ".openai", "node_modules", "__pycache__"} for part in relative.parts)
    assert not path.name.startswith(".env"), f"Environment file not allowed: {path}"
    if path.suffix == ".md":
        content = path.read_text()
        assert "/home/" not in content and "/tmp/" not in content, f"Machine-specific path: {path}"
        for target in re.findall(r"\[[^\]]+\]\(([^)]+)\)", content):
            if target.startswith(("https://", "http://", "#", "mailto:")):
                continue
            dest = (path.parent / target.split("#")[0]).resolve()
            assert dest.is_relative_to(root), f"External local reference: {path}: {target}"
            assert dest.exists(), f"Missing reference: {path}: {target}"

prompt = (root / "PROMPT_AVVIO.md").read_text()
assert len(prompt) <= 4000, f"Prompt too long: {len(prompt)}"
manifest.write_text("".join(
    f"{hashlib.sha256(path.read_bytes()).hexdigest()}  {path.relative_to(root).as_posix()}\n"
    for path in paths
))
with zipfile.ZipFile(archive, "w", compression=zipfile.ZIP_DEFLATED) as output:
    for path in sorted(paths + [manifest]):
        info = zipfile.ZipInfo(path.relative_to(root).as_posix(), (2026, 10, 16, 0, 0, 0))
        info.compress_type = zipfile.ZIP_DEFLATED
        info.external_attr = 0o100644 << 16
        output.writestr(info, path.read_bytes())
with zipfile.ZipFile(archive) as output:
    assert output.testzip() is None
    assert set(output.namelist()) == {p.relative_to(root).as_posix() for p in paths + [manifest]}
    for path in paths + [manifest]:
        assert output.read(path.relative_to(root).as_posix()) == path.read_bytes()
print(f"OK: {len(paths) + 1} files; internal links; independent references; ZIP matches sources")
print(f"Prompt: {len(prompt)} characters; ZIP: {archive.stat().st_size} bytes")
print(f"ZIP SHA-256: {hashlib.sha256(archive.read_bytes()).hexdigest()}")
