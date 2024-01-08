# Read the file with words
with open('raw.txt', 'r') as file:
    words = file.readlines()

# Remove newlines and add quotes around each word
words = [f'"{word.strip()}"' for word in words]

# Join the list into a single string with comma separation
js_array = ', '.join(words)

# Format as a JavaScript array
js_code = f'let words = [{js_array}];'

# Output the JavaScript code
print(js_code)

# Optionally, save it to a .js file
with open('words.js', 'w') as file:
    file.write(js_code)
