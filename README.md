# Modélisation graphe de précédence

## Projet Système d'exploitation L3 Miage

Url du projet : [https://assomasi.org/Tele-Cours-SE.php?page=53](https://assomasi.org/Tele-Cours-SE.php?page=53)

### Objectifs

**Dessiner automatiquement un graphe de précédence à partir d'indications données par l'utilisateur**

Définir comment ces indications sont données, cela peut-être de la manière suivante
```
T1
T2
T3
T1 < T2
T2 < T3
T1 < T3
```

Définir si et alors comment l'utilisateur peut préciser le positionnement de chaque tâche

Ajouter dans le cahier des charges ce qui a été décidé

La première version du cahier des charges devant être rendu dans les 15 prochains jours

Il sera possible de le faire évolué ensuite en fonction ds difficultés rencontrées

Le cahier des charges est ouvert aussi à toutes idées originales

**Produire automatiquement un programme avec des blocs séquentiels {...} et des blocs parallèles Parbegin ... ParEnd**

Exemple avec un sémaphore par flèche :
```
Init( S1, 0 ); Init( S2, 0 );
ParBegin
  { T1; V( S1) }
  { P( S1); T2; V( S2) }
  { P( S2); T3 }
ParEnd
```

Utiliser un nombre minimal de sémaphores

Exemple :
```
{ T1; T2; T3 }
```

### Début du cahier des charges

Dessiner un graphe de précédence d'un système de tâches en prenant en compte les indications de l'utilisateur

Ces indications sont à minima :

- Nom des tâches

- Durée de chaque tâche

- Les relations d'ordre entre les tâches

Le système doit être capable de détecter et supprimer les redondances (exemple T1 < T3) et aussi les éventuelles anomalies (exemple T3 < T1 incompatible avec T1 < T2 et T2 < T3)

Produire automatiquement un programme avec des blocs séquentiels {...} et des blocs parallèles Parbegin ... ParEnd

Utiliser un nombre minimal de sémaphores

En tenant compte des durées indiquées pour chaque tâche, faire une animation selon un algorithme d'ordonnancement montrant l'évolution de l'exécution globale au cours du temps

Cela peut être par le remplissage progressif du carré représentant chaque tâche par une couleur

Si le temps le permet, proposer à l'utilisateur une liste d'algorithme d'ordonnancement avec réquisition

Le projet doit être réaliser en Javascript et utiliser un canvas

 