@extends('layouts.app')

@section('title', __('Calendar'))
@section('content_class', 'content-full')

@section('content')
    <div class="ljpc_calendar_module">
       hello world
    </div>
@endsection

@section('stylesheets')
    @parent

@endsection

@section('body_bottom')
    @parent
@endsection