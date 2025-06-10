#!/bin/bash
# Harmonize style of final chapters by removing leftover markers
for file in docs/chapitres_finaux/*.md; do
    sed -i \
        -e '/ChatGPT a dit/d' \
        -e '/^#\{1,2\} Analyse/d' \
        -e 's/^\s*[*-] \+//' \
        -e 's/^\s*[0-9]\+\. \+//' \
        -e 's/^\(###\s*\)[0-9]\+\.\s*/\1/' "$file"
done
