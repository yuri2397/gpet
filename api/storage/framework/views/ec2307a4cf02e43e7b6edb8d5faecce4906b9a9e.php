


<?php $__env->startSection('content'); ?>
<div class="center container">
    <div id="presentionEPT" style="width: 100% !important;">
        <div class="d-flex align-items-center">
            <div>
                <img src="<?php echo e(asset('img/logo.jpg')); ?>" class="logo" alt="UIDT">

            </div>
            <div>
                <span class="text-center">
                    UNITÉ DE FORMATION ET DE RECHERCHE <br>
                    EN SCIENCES ET TECHNOLOGIES <br>
                    <?php echo e($departement); ?> - <?php echo e($classe); ?>

                </span> <?php echo e(date('d M Y')); ?>

            </div>
        </div>
        <div class="mt-3">
            <table class="table table-light border border-raduis">
                <thead class="card-body" style="border-bottom: none">
                    <tr>
                        <th class="text-center text-dark">LUNDI</th>
                        <th class="text-center text-dark">MARDI</th>
                        <th class="text-center text-dark">MERCREDI</th>
                        <th class="text-center text-dark">JEUDI</th>
                        <th class="text-center text-dark">VENDREDI</th>
                        <th class="text-center text-dark">SAMEDI</th>
                    </tr>
                </thead>
                <tbody>

                    <?php if(count($ept) != 0): ?>
                        <?php $__currentLoopData = $ept; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $item): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                            <td>

                                <?php if(count($item["data"]) != 0): ?>

                                    <?php $__currentLoopData = $item["data"]; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $row): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                        <div class="card border m-3 text-center m-1">
                                            <div class="card-header">
                                                <?php echo e($row->course->name); ?>

                                            </div>
                                            <div class="card-body p-0">
                                                <div class="d-flex px-3 align-items-center justify-content-between">
                                                    <div>
                                                        <?php echo e(\Carbon\Carbon::createFromFormat('H:i:s',$row->start)->format('h:i')); ?>

                                                    </div>
                                                    <div> - </div>
                                                    <div>
                                                        <?php echo e(\Carbon\Carbon::createFromFormat('H:i:s',$row->end)->format('h:i')); ?>

                                                    </div>
                                                </div>
                                                <div
                                                    class="bold d-flex px-2 align-items-center mt-1 justify-content-between">
                                                    <div>
                                                        Prof
                                                    </div>
                                                    <div>
                                                        <?php echo e($row->course->professor->last_name); ?>

                                                    </div>
                                                </div>
                                                <?php if($row->course->groupe_number != 1): ?>

                                                    <div
                                                        class="bold d-flex px-2 align-items-center justify-content-between">
                                                        <div>
                                                            Groupe
                                                        </div>
                                                        <div>
                                                            <?php echo e($row->group); ?>

                                                        </div>
                                                    </div>
                                                <?php endif; ?>

                                                <?php if($row->salle): ?>
                                                    <div
                                                        class="bold d-flex px-2 align-items-center justify-content-between">
                                                        <div>
                                                            Salle
                                                        </div>
                                                        <div>
                                                            <?php echo e($row->salle->name); ?>

                                                        </div>
                                                    </div>
                                                <?php endif; ?>

                                            </div>
                                            <div class="card-footer">
                                                <?php echo e($row->course->service->name); ?>

                                            </div>
                                        </div>

                                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                                <?php else: ?>
                                    <div class="card border m-3 card-body text-center m-1">
                                        LIBRE
                                    </div>
                                <?php endif; ?>
                            </td>

                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                    <?php endif; ?>


                </tbody>
            </table>
        </div>
    </div>
</div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\Users\khadykebe\Desktop\SES\gpet\api\resources\views/ept.blade.php ENDPATH**/ ?>