import re

with open('print.css', 'r', encoding='utf-8') as f:
    content = f.read()

def repl(m):
    size = float(m.group(1))
    if size <= 9.5:
        new_size = 11
    elif size == 10:
        new_size = 12
    elif size == 20:
        new_size = 24
    else:
        new_size = size
    
    # format float to remove .0
    new_size_str = f'{new_size:g}'
    return f'font-size: {new_size_str}pt;'

content = re.sub(r'font-size:\s*(\d+(?:\.\d+)?)\s*pt;', repl, content)

with open('print.css', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated print.css via Python!")
