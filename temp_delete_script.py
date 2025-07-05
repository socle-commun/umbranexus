import os
file_to_delete = "D:/workspace/socle-commun/umbranexus/commit_message.txt"
if os.path.exists(file_to_delete):
    os.remove(file_to_delete)
    print(f"Fichier supprimé : {file_to_delete}")
else:
    print(f"Le fichier n'existe pas : {file_to_delete}")