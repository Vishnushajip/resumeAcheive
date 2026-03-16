
import re

with open('src/app/(dashboard)/dashboard/output/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Remove string literals
text = re.sub(r'\"[^\"]*\"', '""', text)
text = re.sub(r'\'[^\']*\'', "''", text)

# Remove comments
text = re.sub(r'/\*.*?\*/', '', text, flags=re.DOTALL)
text = re.sub(r'//.*', '', text)

# Remove arrow functions and comparisons
text = text.replace('=>', '  ')
text = text.replace('>=', '  ')
text = text.replace('<=', '  ')
text = text.replace('->', '  ')

print(f"Braces: {{: {text.count('{')}, }}: {text.count('}')}")
print(f"Parens: (: {text.count('(')}, ): {text.count(')')}")
print(f"Angle: <: {text.count('<')}, >: {text.count('>')}")

stack = []
for i, char in enumerate(text):
    if char == '<':
        # Check if it's a tag start
        if i + 1 < len(text) and (text[i+1].isalpha() or text[i+1] == '/' or text[i+1] == '>'):
            stack.append(i)
    elif char == '>':
        if stack:
            stack.pop()
        else:
            print(f"Unmatched > at position {i}")
            # print surrounding text
            start = max(0, i-40)
            end = min(len(text), i+40)
            print(f"Context: {text[start:end]}")

if stack:
    print(f"Unmatched < at positions {stack}")
