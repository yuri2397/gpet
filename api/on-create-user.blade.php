@component('mail::message')
# Bienvenue sur <b>GPET</b>

Bonjour {{ $user->first_name }}
votre adresse a été utilise pour créer un compte sur <b>GPET</b>.
<br>
@component('mail::panel')
Vos identifiants de connexion sur {{ $url }}
- {{ $user->email }}
- {{ $password }}
@endcomponent
<br>
<i>Si vous avez reçu message par erreur, merci de nous contacter</i> <br>
Merci,<br>
{{ config('app.name') }}, <i>Administrateur, mor.diaw@univ-thies.sn</i>
@endcomponent