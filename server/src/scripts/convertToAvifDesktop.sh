#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
SOURCE_DIR="$SCRIPT_DIR/../../public/images/streetArts/originals"
DEST_DIR="$SCRIPT_DIR/../../public/images/streetArts/optimized/desktop"

echo "Dossier source : $SOURCE_DIR"
echo "Dossier destination : $DEST_DIR"

if [ ! -d "$DEST_DIR" ]; then
    echo "Erreur : Le dossier de destination n'existe pas."
    exit 1
fi

# Vérifier si ImageMagick est installé
if ! command -v convert &> /dev/null; then
    echo "Erreur : ImageMagick n'est pas installé ou n'est pas dans le PATH."
    echo "Veuillez installer ImageMagick avec : sudo apt-get install imagemagick"
    exit 1
fi

for file in "$SOURCE_DIR"/*.jpg; do
    filename=$(basename -- "$file")
    filename="${filename%.*}"
    
    if convert "$file" -quality 80 "$DEST_DIR/${filename}.avif"; then
        echo "Converti: $file -> $DEST_DIR/${filename}.avif"
    else
        echo "Erreur lors de la conversion de $file"
        exit 1
    fi
done

echo "Conversion terminée!"