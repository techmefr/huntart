#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
SOURCE_DIR="$SCRIPT_DIR/../../public/images/streetArts/optimized/desktop"
DEST_DIR="$SCRIPT_DIR/../../public/images/streetArts/optimized/mobile"

echo "Dossier source : $SOURCE_DIR"
echo "Dossier destination : $DEST_DIR"

if [ ! -d "$SOURCE_DIR" ]; then
    echo "Erreur : Le dossier source n'existe pas."
    exit 1
fi

if [ ! -d "$DEST_DIR" ]; then
    echo "Erreur : Le dossier de destination n'existe pas."
    exit 1
fi

if ! command -v convert &> /dev/null; then
    echo "Erreur : ImageMagick n'est pas installé ou n'est pas dans le PATH."
    echo "Veuillez installer ImageMagick avec : sudo apt-get install imagemagick"
    exit 1
fi

for file in "$SOURCE_DIR"/*.avif; do
    filename=$(basename -- "$file")
    
    # Obtenir les dimensions de l'image
    dimensions=$(identify -format "%wx%h" "$file")
    width=$(echo $dimensions | cut -d'x' -f1)
    height=$(echo $dimensions | cut -d'x' -f2)
    
    if [ $width -ge $height ]; then
        new_size="400x300"
    else
        new_size="300x400"
    fi
    
    if convert "$file" -resize "$new_size^" -gravity center -extent "$new_size" "$DEST_DIR/$filename"; then
        echo "Redimensionné: $file -> $DEST_DIR/$filename"
    else
        echo "Erreur lors du redimensionnement de $file"
        exit 1
    fi
done

echo "Redimensionnement terminé!"