@extends('layouts.app')


@section('content')
<div class="center container">
    <div id="presentionEPT" style="width: 100% !important;">
        <div class="card card-body text-center">
            <div>
                <span>REPUBLIQUE DU SENEGAL <br>
                    Un Peuple Un But Une Foi</span>
            </div>
            <img src="{{ asset('img/logo.jpg') }}" class="logo" alt="UIDT">
            <span class="text-center">
                UNITÉ DE FORMATION ET DE RECHERCHE <br>
                EN SCIENCES ET TECHNOLOGIES <br>
                {{ $departement }} - {{ $classe }}
            </span> {{ date('d M Y') }}
        </div>
        <div>
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

                    @if(count($ept) != 0)
                        @foreach($ept as $item)
                            <td>

                                @if(count($item["data"]) != 0)

                                    @foreach($item["data"] as $row)
                                        <div class="card border m-3 text-center m-1">
                                            <div class="card-header">
                                                {{ $row->course->name }}
                                            </div>
                                            <div class="card-body p-0">
                                                <div class="d-flex px-3 align-items-center justify-content-between">
                                                    <div>
                                                        {{ \Carbon\Carbon::createFromFormat('H:i:s',$row->start)->format('h:i') }}
                                                    </div>
                                                    <div> - </div>
                                                    <div>
                                                        {{ \Carbon\Carbon::createFromFormat('H:i:s',$row->end)->format('h:i') }}
                                                    </div>
                                                </div>
                                                <hr>
                                                <div
                                                    class="bold d-flex px-2 align-items-center justify-content-between">
                                                    <div>
                                                        Prof
                                                    </div>
                                                    <div>
                                                        {{ $row->course->professor->last_name }}
                                                    </div>
                                                </div>
                                                @if($row->course->groupe_number != 1)

                                                    <div
                                                        class="bold d-flex px-2 align-items-center justify-content-between">
                                                        <div>
                                                            Groupe
                                                        </div>
                                                        <div>
                                                            {{ $row->group }}
                                                        </div>
                                                    </div>
                                                @endif

                                                @if($row->salle)
                                                    <div
                                                        class="bold d-flex px-2 align-items-center justify-content-between">
                                                        <div>
                                                            Salle
                                                        </div>
                                                        <div>
                                                            {{ $row->salle->name }}
                                                        </div>
                                                    </div>
                                                @endif

                                            </div>
                                            <div class="card-footer">
                                                {{ $row->course->service->name }}
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
