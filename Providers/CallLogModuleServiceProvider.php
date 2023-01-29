<?php

namespace Modules\CallLogModule\Providers;

use Config;
use Eventy;
use Helper;
use Illuminate\Support\ServiceProvider;
use Module;
use Modules\CallLogModule\Console\SyncICS;
use Modules\CallLogModule\Entities\Calendar;
use Modules\CallLogModule\Entities\CalendarItem;
use Modules\CallLogModule\External\ICal\ICal;
use View;

class CallLogModuleServiceProvider extends ServiceProvider {
	/**
	 * Indicates if loading of the provider is deferred.
	 *
	 * @var bool
	 */
	protected $defer = false;

	/**
	 * Boot the application events.
	 *
	 * @return void
	 */
	public function boot() {
		$this->registerConfig();
		$this->registerViews();
		// $this->registerCommands();
		$this->loadMigrationsFrom( __DIR__ . '/../Database/Migrations' );
		$this->hooks();
		$this->loadViewsFrom(__DIR__.'/../Resources/views', 'CallLogModule');

		\Eventy::addAction('conversation.after_prev_convs', function($customer, $conversation, $mailbox) {


            echo \View::make('CallLogModule::partials/sidebar')->render();
        }, -1, 3);

	}

	/**
	 * Register config.
	 *
	 * @return void
	 */
	protected function registerConfig() {
		$this->publishes( [
			__DIR__ . '/../Config/config.php' => config_path( 'CallLogmodule.php' ),
		], 'config' );
		$this->mergeConfigFrom(
			__DIR__ . '/../Config/config.php', 'CallLogmodule'
		);
	}

	/**
	 * Register views.
	 *
	 * @return void
	 */
	public function registerViews() {
		$viewPath = resource_path( 'views/modules/CallLogmodule' );

		$sourcePath = __DIR__ . '/../Resources/views';

		$this->publishes( [
			$sourcePath => $viewPath,
		], 'views' );

		$this->loadViewsFrom( array_merge( array_map( function ( $path ) {
			return $path . '/modules/CallLogmodule';
		}, Config::get( 'view.paths' ) ), [ $sourcePath ] ), 'calendar' );
	}


	/**
	 * Module hooks.
	 */
	public function hooks() {


		$this->registerSettings();
	}

	private function registerSettings() {
		// Add item to settings sections.
		Eventy::addFilter( 'settings.sections', function ( $sections ) {
			$sections['calendar'] = [ 'title' => __( 'Call Logs' ), 'icon' => 'phone', 'order' => 200 ];

			return $sections;
		}, 15 );

	
	
	}

	/**
	 * Register the service provider.
	 *
	 * @return void
	 */
	public function register() {
		$this->registerTranslations();
	}

	/**
	 * Register translations.
	 *
	 * @return void
	 */
	public function registerTranslations() {
		$this->loadJsonTranslationsFrom( __DIR__ . '/../Resources/lang' );
	}

	/**
	 * Get the services provided by the provider.
	 *
	 * @return array
	 */
	public function provides() {
		return [];
	}


}
