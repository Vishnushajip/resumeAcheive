
with open('c:/Projects/resume.io.web/src/app/(dashboard)/dashboard/output/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()
    print(f"Braces: {{: {content.count('{')}, }}: {content.count('}')}")
    print(f"Parens: (: {content.count('(')}, ): {content.count(')')}")
    print(f"Angle: <: {content.count('<')}, >: {content.count('>')}")
