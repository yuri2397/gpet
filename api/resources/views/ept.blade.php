@extends('layouts.app')


@section('content')
<div class="center container">
    <div id="presentionEPT" style="width: 100% !important;">
        <div class="card card-body text-center">
            <div>
                <span>REPUBLIQUE DU SENEGAL <br>
                    Un Peuple Un But Une Foi</span>
            </div>
            <img src="{{asset('img/logo.jpg')}}" class="logo" alt="UIDT">
            <span class="text-center">
                UNITÉ DE FORMATION ET DE RECHERCHE <br>
                EN SCIENCES ET TECHNOLOGIES <br>
                {{ $departement}} - {{ $classe }}
            </span> {{ date('d M Y') }}
        </div>
        <div>
            <table class="table table-light border border-raduis">
                <thead class="card-body" style="border-bottom: none">
                    <tr>
                        <th class="text-center">LUNDI</th>
                        <th class="text-center">MARDI</th>
                        <th class="text-center">MERCREDI</th>
                        <th class="text-center">JEUDI</th>
                        <th class="text-center">VENDREDI</th>
                        <th class="text-center">SAMEDI</th>
                    </tr>
                </thead>
                <tbody>

                    @if (count($ept) != 0)
                    @foreach ($ept as $item)
                    <td>

                        @if (count($item["data"]) != 0)

                        @foreach ($item["data"] as $row)
                        <div class="card border m-3 card-body text-center m-1">
                            {{ $row->course->name }} <br>
                            <hr>   
                            <div class="d-flex align-items-center justify-content-between">
                                <div>{{ $row->start }}</div>
                                <div>À</div>
                                <div>{{ $row->end }}</div>
                            </div>
                            <hr>
                            <div class="bold d-flex align-items-center justify-content-between">
                                <div>
                                    Prof
                                </div>
                                <div>
                                    {{ $row->course->professor->last_name }}
                                </div>
                            </div>
                        </div>

                        @endforeach
                        @else
                        <div class="card border m-3 card-body text-center m-1">
                            LIBRE
                        </div>
                        @endif
                    </td>

                    @endforeach
                    @endif


                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection
