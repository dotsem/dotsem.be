import re
import questionary
from pathlib import Path

def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    return text.strip('-')

def update_projects_metadata(slug: str, languages: list[str]) -> bool:
    metadata_path = Path("src") / "lib" / "projects" / "metadata.ts"
    if not metadata_path.exists():
        print(f"\033[31mError: {metadata_path} not found.\033[0m")
        return False

    with open(metadata_path, 'r', encoding='utf-8') as f:
        content = f.read()

    if f'slug: "{slug}"' in content or f"slug: '{slug}'" in content:
        print(f"\033[33mMetadata entry for '{slug}' already exists in metadata.ts. Skipping...\033[0m")
        return False

    langs_formatted = "[" + ", ".join(f'"{lang}"' for lang in languages) + "]"

    entry_lines = [
        "    {",
        f'        slug: "{slug}",',
        f'        image: "/projects/{slug}/logo.webp",',
        f'        languages: {langs_formatted},',
        '        highlighted: false,',
        '        status: ""',
        "    }"
    ]
    new_entry_str = "\n".join(entry_lines)

    r_idx = content.rfind("];")
    if r_idx == -1:
        print("\033[31mError: Could not find '];' in metadata.ts.\033[0m")
        return False

    prefix = content[:r_idx].rstrip()
    if prefix.endswith("}"):
        prefix = prefix + ","

    suffix = content[r_idx:]
    new_content = prefix + "\n" + new_entry_str + "\n" + suffix

    with open(metadata_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"\033[32mSuccessfully updated {metadata_path}\033[0m")
    return True

def main():
    print("\033[36m--- Content Creator ---\033[0m")

    content_type = questionary.select(
        "What type of content would you like to create?",
        choices=[
            "Blog Post",
            "Project"
        ],
        default="Blog Post"
    ).ask()

    if not content_type:
        return

    type_key = "blog" if content_type == "Blog Post" else "projects"
    template_name = "blog.svx" if type_key == "blog" else "project.svx"

    title = questionary.text("Enter title:").ask()
    if not title:
        print("\033[31mError: Title is required.\033[0m")
        return

    slug = slugify(title)

    languages = []
    if type_key == "projects":
        langs_input = questionary.text("Enter languages (comma-separated, e.g. svelte, ts, tailwind):").ask()
        if langs_input is None:
            return
        if langs_input.strip():
            languages = [l.strip() for l in langs_input.split(",") if l.strip()]


    template_path = Path("template") / template_name
    if not template_path.exists():
        print(f"\033[31mError: Template not found at {template_path}\033[0m")
        return

    with open(template_path, 'r', encoding='utf-8') as f:
        content = f.read()

    content = content.replace("{title}", title).replace("{slug}", slug)

    target_languages = ["en", "nl"]
    created_files = []

    for lang in target_languages:
        target_dir = Path("src") / "content" / type_key / lang
        target_path = target_dir / f"{slug}.svx"

        target_dir.mkdir(parents=True, exist_ok=True)

        if target_path.exists():
            print(f"\033[33mWarning: File already exists at {target_path}. Skipping...\033[0m")
            continue

        with open(target_path, 'w', encoding='utf-8') as f:
            f.write(content)

        created_files.append(target_path)

    target_dir = Path("src") / "lib" / "assets" / type_key / slug
    target_dir.mkdir(parents=True, exist_ok=True)

    if type_key == "projects":
        update_projects_metadata(slug, languages)

    if created_files:
        print("\033[32mSuccessfully created files:\033[0m")
        for f in created_files:
            print(f" - {f}")
    else:
        print("\033[33mNo files were created.\033[0m")

if __name__ == "__main__":
    main()

