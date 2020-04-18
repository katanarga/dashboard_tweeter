Ce projet universitaire consiste à développer un dashboard à partir d'un fichier CSV
contenant des tweets. L'application a été développée en python et en javascript et est conteneurisée avec Docker.

## Installation

### Pré-requis
Installez Docker sur votre machine.

1. Clonez le dépot avec la commande __git clone https://github.com/katanarga/dashboard_tweeter.git__ .

2. Dans le dossier dashboard_tweeter, construisez l'image Docker avec la commande __docker build -t dashboard_twitter .__

3. Démarrez le conteneur avec la commande __docker run -p 8000:8000 -d --name dashboard_twitter dashboard_twitter__. L'application web se lance et est accessible au port 8000.
