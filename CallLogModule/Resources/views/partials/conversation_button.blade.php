<span class="conv-add-to-calendar conv-action glyphicon glyphicon-calendar" data-toggle="tooltip"
      data-placement="bottom" title="{{ __("Add to calendar") }}" aria-label="{{ __("Add to calendar") }}"
      role="button"></span>
<script src="{{Module::getPublicPath( 'CallLogmodule' ) . '/js/jquery-3.6.0.min.js'}}"></script>
<script src="{{Module::getPublicPath( 'CallLogmodule' ) . '/js/moment-with-locales.min.js'}}"></script>
<script>moment.locale('{{Helper::getRealAppLocale()}}');</script>
<script src="{{Module::getPublicPath( 'CallLogmodule' ) . '/js/calendar-conversation.js'}}"></script>
