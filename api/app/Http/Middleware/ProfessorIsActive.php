<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Professor;
use Symfony\Component\HttpFoundation\Response;

class ProfessorIsActive
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $professor = Professor::find($request->professor_id);
        if ($professor && $professor->is_active == true) {
            return $next($request);
        }
        return response([
            "message" => "Le compte du professeur n'est pas actif. Merci de vérifier son état."
        ], Response::HTTP_CONFLICT);
    }
}
