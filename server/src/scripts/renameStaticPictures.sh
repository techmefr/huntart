#!/bin/bash

# Définir le répertoire cible
TARGET_DIR="../../public/images/streetArts/originals"

if [ ! -d "$TARGET_DIR" ]; then
  echo "Le répertoire $TARGET_DIR n'existe pas."
  exit 1
fi

cd "$TARGET_DIR" || exit

count=1

for file in *; do
  # Vérifier si le fichier est un fichier régulier
  if [ -f "$file" ]; then
    # Extraire le nom du fichier sans l'extension
    base_name="${file%.*}"
    # Extraire l'extension du fichier
    extension="${file##*.}"
    
    # Créer le nouveau nom de fichier au format sta(i).extension
    new_name="sta$count.$extension"
    
    mv "$file" "$new_name"
    
    ((count++))
  fi
done

echo "Renommage des fichiers terminé."
