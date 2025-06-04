<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vetement; // Assurez-vous d'importer le modèle Vetement

class ShareController extends Controller
{
    public function generateVetementShareUrl($vetementId)
    {
        $vetement = Vetement::find($vetementId);

        if (!$vetement) {
            return response()->json(['message' => 'Vêtement non trouvé.'], 404);
        }

        // L'URL de base de votre application frontend
        // Assurez-vous que VITE_APP_URL dans votre .env frontend est correct
        // et qu'il y a une route '/vetements/:id' dans votre router React qui peut afficher un vêtement.
        // Si vous utilisez une variable d'environnement Laravel, vous pouvez la définir dans .env
        // Exemple: APP_FRONTEND_URL=http://localhost:5173
        $appFrontendUrl = env('APP_FRONTEND_URL', 'http://localhost:5173'); // Remplacez par votre URL frontend

        // Construire l'URL partageable
        // Cette URL doit pointer vers une page publique de votre application React
        // qui est capable d'afficher un vêtement spécifique sans authentification.
        $shareUrl = "{$appFrontendUrl}/vetements/public/{$vetementId}"; // Exemple: /vetements/public/123

        return response()->json([
            'message' => 'Lien de partage généré avec succès.',
            'share_url' => $shareUrl,
            'vetement_name' => $vetement->name,
        ]);
    }

    // Vous pouvez ajouter d'autres méthodes de partage ici si nécessaire (ex: partager un profil utilisateur)
}