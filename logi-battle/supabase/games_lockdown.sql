-- À exécuter dans l'éditeur SQL Supabase si la base a déjà la politique games_update.
-- Le score d'une salle vit sur l'hôte. Une mise à jour anonyme permettait d'écraser n'importe quelle partie.
DROP POLICY IF EXISTS "games_update" ON public.games;
DROP POLICY IF EXISTS "Activer l'accès anonyme général sur games" ON public.games;
