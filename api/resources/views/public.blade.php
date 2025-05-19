<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>UFR-SET UIDT de Thiès</title>
    <link href="css/app.css" rel="stylesheet">
</head>
<body class="py-5">

    <div class="center">
        <img src="img/logo.jpg" width="80">
        <h6>Université Iba Dér Thiam de Thiès</h6>
        <h6 class="bold">UFR SET</h6>
    </div>

    <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            {{-- @foreach ( $all as $key => $classe )
            <div class="carousel-item @if ($key == 0) active @endif ">
                <div id="presentionEPT">
                    <h1 class="text-center my-4">
                        {{ $classe['classe']->departement->name }} - {{ $classe['classe']->name }}
            </h1>
            <table class="table table-bordered table-striped table-striped-columns rounded rounded-4">
                <thead>
                    <tr>
                        @foreach ($days as $day)
                        <th style="width: min-content; min-width: 16em" class="text-center bold h6 py-2">
                            {{ $day['name'] }}
                        </th>
                        @endforeach
                    </tr>
                </thead>
                <tbody>

                    @foreach ($classe['edt'] as $ept)
                    <td class="column">
                        @if (count($ept['data']) != 0)
                        <div>
                            @foreach ($ept['data'] as $row)
                            <div style="width: min-content; min-width: 14em" class="card border shadow border border-1 rounded rounded-2 m-3 p-0 text-center m-1">
                                <div class="card-header">
                                    <span class="bold h6">{{ $row->course->name }}</span>
                                    <br />
                                </div>
                                <div class="card-body px-1 pb-0">
                                    <ul class="text-start h6">
                                        <li>
                                            {{ $row->start }} - {{ $row->end }}
                                        </li>
                                        @if ($row->course->groupe_number != 1)
                                        <li>
                                            Groupe: {{ $row->group }}
                                        </li>
                                        @endif
                                        <li>
                                            {{ $row->salle->name }}
                                        </li>
                                        <li>
                                            {{ $row->course->service->name }}
                                        </li>
                                    </ul>
                                </div>
                                <div class="card-footer">
                                    <span class="bold h6">M. {{ $row->course->professor->last_name }}</span>
                                </div>
                            </div>
                            @endforeach
                        </div>
                        @else
                        <div style="width: min-content; min-width: 14em; height: 10em;" class="card card-body shadow rounded rounded-2 border border-2 m-3 text-center">
                            <div class="card-body d-flex flex-column align-items-center">
                                <img src="img/info.svg" alt="">
                                <br>
                                <span class="bold h5">Aucun cours</span>
                            </div>
                        </div>
                        @endif
                    </td>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
    @endforeach --}}

    @foreach ($images as $key => $image)

    <div class="carousel-item @if ($key == 0) active @endif ">
        <img src="{{ $image }}">
    </div>
    @endforeach

    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
    </div>
    <script src="js/app.js" type="text/javascript"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
</body>
</html>
