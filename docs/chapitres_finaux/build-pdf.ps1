# build-pdf.ps1
# Script PowerShell pour générer le PDF stylé avec Pandoc

$pandoc = "pandoc"
$dir = "docs/chapitres_finaux"
$cover = "$dir/cover.md"
$toc = "$dir/toc.md"
$book = "$dir/compiled_book.md"
$template = "$dir/template-umbranexus.tex"
$out = "$dir/Umbranexus-livre.pdf"

# Générer la table des matières dynamique (optionnel, à compléter dans le script JS)
# $chapters = Get-ChildItem "$dir/chapitre_??.md" | Sort-Object Name | ForEach-Object { "- [$_]($_)" }
# Set-Content $toc ("# Table des matières`n`n" + ($chapters -join "`n"))

# Commande Pandoc
$pandocArgs = @(
    $cover, $toc, $book,
    "--pdf-engine=xelatex",
    "--template=$template",
    "--toc",
    "--toc-depth=2",
    "-V mainfont=EB Garamond",
    "-V geometry:margin=2.5cm",
    "-o", $out
)

Write-Host "Génération du PDF..."
& $pandoc @pandocArgs
Write-Host "PDF généré : $out"
