<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel = "icon" type = "image/png" href="{{ URL::asset('logo.png') }}"/>
 
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="theme-color" content="#FF4646" />
    <title>Login - Kode Koin</title>
 
    <!-- Styles -->
    <link href="{{ asset('css/forgotpassword.css') }}" rel="stylesheet">
</head>
<body>
    <div class="forgotpassword">
        <img src="{{ asset('images/logoimg.png') }}" alt="logo" class="forgotpassword__logo">
        <span class="forgotpassword__header">Setel Ulang Sandi</span>
        <span class="forgotpassword__caption">Lupa password? Masukan alamat email yang telah kamu daftar</span>
        <form class="forgotpassword__form" action="" method="">
            <input required type="email" name="email" class="forgotpassword__input" placeholder="Masukkan email">
            <button type="submit" class="forgotpassword__button">Masukkan</button>
            <a href="/login" class="forgotpassword__back">Kembali</a>
        </form>
    </div>
</body>
</html>