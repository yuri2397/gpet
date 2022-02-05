@component('mail::message')
# Bienvenue sur <b>GPET</b>
Bonjour {{ $user->first_name }}
Vous avez fait une demande de renitialisation de code <b>GPET</b>.
<br>
@component('mail::panel')
Votre code de renitialisation est:
- {{ $code }}
@endcomponent
<br>
<i>Si vous avez reçu message par erreur, merci de nous contacter</i> <br>
Merci,<br>
{{ config('app.name') }}, <i>Administrateur, mor.diaw@univ-thies.sn</i>
@endcomponent
