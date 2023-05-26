<?php $__env->startComponent('mail::message'); ?>
# Bienvenue sur <b>GPET</b>

Bonjour <?php echo e($user->first_name); ?>

votre adresse a été utilise pour créer un compte sur <b>GPET</b>.
<br>
<?php $__env->startComponent('mail::panel'); ?>
Vos identifiants de connexion sur https://edtses.uidt.sn
- <?php echo e($user->email); ?>

- <?php echo e($password); ?>

<?php echo $__env->renderComponent(); ?>
<br>
<i>Si vous avez reçu message par erreur, merci de nous contacter</i> <br>
Merci,<br>
<?php echo e(config('app.name')); ?>, <i>Administrateur, dame.samb@univ-thies.sn</i>
<?php echo $__env->renderComponent(); ?><?php /**PATH C:\Users\khadykebe\Desktop\SES\gpet\api\resources\views/emails/on-create-user.blade.php ENDPATH**/ ?>