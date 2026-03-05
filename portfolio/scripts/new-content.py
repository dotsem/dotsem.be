import os
import re
import questionary
from pathlib import Path

def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    return text.strip('-')

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
    
    template_path = Path("template") / template_name
    if not template_path.exists():
        print(f"\033[31mError: Template not found at {template_path}\033[0m")
        return

    with open(template_path, 'r', encoding='utf-8') as f:
        content = f.read()

    content = content.replace("{title}", title).replace("{slug}", slug)

    languages = ["en", "nl"]
    created_files = []

    for lang in languages:
        target_dir = Path("src") / "content" / type_key / lang
        target_path = target_dir / f"{slug}.svx"

        target_dir.mkdir(parents=True, exist_ok=True)

        if target_path.exists():
            print(f"\033[33mWarning: File already exists at {target_path}. Skipping...\033[0m")
            continue

        with open(target_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        created_files.append(target_path)

    if created_files:
        print("\033[32mSuccessfully created files:\033[0m")
        for f in created_files:
            print(f" - {f}")
    else:
        print("\033[33mNo files were created.\033[0m")

if __name__ == "__main__":
    main()
