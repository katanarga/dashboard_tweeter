Ce projet consiste à développer un dashboard à partir d'un fichier CSV contenant des tweets.
L'application a été développée en python et en javascript et est conteneurisée avec Docker.

## Installation

### Pré-requis
Installez Docker sur votre machine.

## Utilisation
1. Clonez le dépot avec la commande __git clone https://github.com/katanarga/dashboard_tweeter.git__ .

2. Dans le dossier dashboard_tweeter, construisez l'image Docker avec la commande __docker build --build-arg PORT=<XXXX> -t dashboard_twitter .__
en remplacant "<XXXX>" par un numéro de port valide (c'est dans ce port qu'écoutera le serveur).

3. Démarrez le conteneur avec la commande __docker run -p <XXXX>:<XXXX> -d --name dashboard_twitter dashboard_twitter__ en remplacant
"<XXXX>" par le numéro de port que vous avez choisi.
L'application web se lance et est accessible sur un navigateur à l'adresse __http://localhost:<XXXX>__.
  
4. Pour fermer l'application, lancez la commande __docker stop dashboard_twitter__.
