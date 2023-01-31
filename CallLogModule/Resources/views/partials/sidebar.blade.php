


<input type="hidden" class="csrf-token" value="{{ csrf_token() }}" />
<div id="helloWorld">

</div>


@section('javascripts')
{{-- dateimtime picker --}}
@parent


<script type="text/javascript" src="http://localhost:3000/static/js/bundle.js" crossorigin="anonymous"></script>
@endsection

