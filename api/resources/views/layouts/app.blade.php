<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link href="/css/app.css" rel="stylesheet">
    <title>EDT SERVICE WEB</title>
    
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,300;0,400;0,600;1,800;1,900&display=swap');

        * {
            font-family: "Poppins";
        }

        .border-raduis{
            border-raduis: 10px
        }

        .center {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
        }

        .card {
            border: none !important;
            border-radius: 10px !important;
        }

        .bold {
            font-weight: bold;
            font-size: 16px;
        }

        .bg-color {
            background-color: #41729f;
            color: white;
        }

        .example-boundary {
            width: 400px;
            height: 400px;
            max-width: 100%;
            border: dotted #ccc 2px;
        }

        .logo {
            width: 100px;
            height: 100px;
            margin: auto;
        }

    </style>
</head>

<body>
    @yield('content')
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</body>

</html>
