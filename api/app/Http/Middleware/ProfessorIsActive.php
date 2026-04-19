<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Professor;

class ProfessorIsActive
{
    public function handle(Request $request, Closure $next): Response
    {
        $professor = Professor::find($request->professor_id);
        if ($professor && $professor->is_active == true) {
            return $next($request);
        }
        return response()->json([
            'message' => "Le compte du professeur n'est pas actif. Merci de vérifier son état."
        ], 409);
    }
}
