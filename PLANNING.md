# Planning — Site du Consulat du Bénin au Congo

Référence : https://www.ambassade-benin.ma
Stack : TanStack Start (sans base de données, API tierces) · FR/EN · paiement en ligne · rendez-vous
Durée : ~14 semaines

## Calendrier
| Sem. | Phase | Livrables |
|---|---|---|
| 1 | Cadrage | Validation catalogue services/tarifs/pièces, contenus, charte (couleurs du drapeau, logo), choix du prestataire de paiement, maquettes clés |
| 2 | Fondations | Projet TanStack Start, intégration des API tierces, i18n FR/EN, design system, layout (header, footer, menu mobile) |
| 3-4 | Site vitrine | Accueil, Consulat (mot, biographie, personnel), Juridiction, Réseau, Contact, Aller au Bénin, liens utiles, galerie |
| 4-5 | Actualités | Liste, détail, communiqués défilants, PDF, recherche |
| 5-8 | Services & demandes | Catalogue, formulaire dynamique, upload sécurisé, n° de dossier, e-mails de confirmation |
| 8-9 | Suivi | Page de suivi par n° de dossier, statuts clairs, historique, notifications e-mail (SMS en option) |
| 9-10 | Paiement en ligne | Mobile Money / carte, webhooks, reçus, statut « payé » dans le dossier |
| 10-11 | Rendez-vous | Créneaux, quotas, réservation, confirmation/rappel, annulation |
| 6-12 | Back-office (en parallèle) | Auth/rôles, traitement des demandes, gestion des rendez-vous, CMS (actualités, pages, personnel, services, tarifs), exports |
| 12 | Qualité | Traduction EN complète, SEO, accessibilité, performance, sécurité, protection des données |
| 13 | Recette | Tests E2E, recette avec le consulat, corrections, formation des agents |
| 14 | Mise en production | Domaine `consulat-benin.cg`, hébergement, HTTPS, sauvegardes, monitoring, documentation |

## Jalons
- S1 : cadrage validé
- S4 : démo du site vitrine
- S9 : demande en ligne + suivi fonctionnels
- S11 : paiement + rendez-vous
- S13 : recette terminée
- S14 : mise en ligne

## À valider avec le consulat (semaine 1)
- Catalogue réel des services, tarifs en FCFA, pièces requises, délais
- Juridiction exacte (Congo-Brazzaville ou RDC)
- Prestataire de paiement couvrant le Congo (MTN/Airtel Money, carte)
- Contenus : mot du consul, personnel, photos, horaires

## Risques
- Validation lente des contenus/tarifs → démarrer avec un catalogue provisoire
- Contrat avec l'agrégateur de paiement → lancer la démarche dès S1
- Données personnelles sensibles (passeports, actes) → chiffrement, accès restreint, durée de conservation
- Traduction anglaise → prévoir un relecteur
