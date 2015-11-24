<?php namespace OfferMaker;


use Illuminate\Support\ServiceProvider;

class OfferServiceProvider extends ServiceProvider
{

    /**
     * Register the service provider.
     * @return void
     */
    public function register()
    {
        /*
        $this->app->register('\Intervention\Image\ImageServiceProvider');
        $this->app->register('\SleepingOwl\AdminAuth\AdminAuthServiceProvider');

        $this->app->bind('SleepingOwl\Admin\Repositories\Interfaces\ModelRepositoryInterface', 'SleepingOwl\Admin\Repositories\ModelRepository');
        $this->app->singleton('admin', 'SleepingOwl\Admin\Admin');
        $this->app->bind('admin.router', function () {
            return Admin::instance()->router;
        });
        */
    }

    public function boot()
    {
        if (! $this->app->routesAreCached()) {
            require __DIR__.'/routes.php';
        }

        $this->loadViewsFrom(__DIR__ . '/../views', 'offertmaker');
        $this->mergeConfigFrom(__DIR__ . '/../config/config.php', 'offertmaker');

        $this->publishes([
            __DIR__ . '/../config/config.php' => config_path('offertmaker.php'),
        ], 'config');


        $this->publishes([
            __DIR__ . '/../../public/' => public_path('packages/x-stream/offert-maker/'),
        ], 'assets');

    }
}