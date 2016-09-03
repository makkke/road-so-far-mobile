files=$(ls | sed 's/\(.*\)\.png/\1/')

for file in $files
do
  cwebp -q 90 "$file.png" -o "$file.webp"
done