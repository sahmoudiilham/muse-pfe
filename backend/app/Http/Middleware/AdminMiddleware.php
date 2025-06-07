<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Vérifie si un utilisateur est connecté ET si cet utilisateur a le rôle 'admin'
        if (!auth()->check() || !auth()->user()->isAdmin()) {
            // Si non, renvoie une réponse d'erreur 403 (Forbidden - Accès Interdit)
            return response()->json(['message' => 'Accès non autorisé. Vous n\'êtes pas administrateur.'], 403);
        }

        
        // Si oui, l'utilisateur est admin, continue la requête
        return $next($request);
    }
}
