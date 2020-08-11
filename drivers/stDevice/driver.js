'use strict';

const Homey = require( 'homey' );

class STDriver extends Homey.Driver
{

    onInit()
    {
        this.log( 'STDriver has been inited' );

        this.ac_auto_cleaning_mode_action = new Homey.FlowCardAction( 'ac_auto_cleaning_mode_action' );
        this.ac_auto_cleaning_mode_action
            .register()
            .registerRunListener( async ( args, state ) =>
            {
                console.log( "ac_auto_cleaning_mode_action: arg = ", args.ac_auto_cleaning_option, " - state = ", state );
                await args.device.onCapabilityAirConMode( args.ac_auto_cleaning_option, null );
                return await args.device.setCapabilityValue( 'aircon_auto_cleaning_mode', args.ac_auto_cleaning_option ); // Promise<void>
            } )

        this.ac_fan_mode_action = new Homey.FlowCardAction( 'ac_fan_mode_action' );
        this.ac_fan_mode_action
            .register()
            .registerRunListener( async ( args, state ) =>
            {
                console.log( "ac_fan_mode_action: arg = ", args.ac_fan_mode, " - state = ", state );
                await args.device.onCapabilityAirConMode( args.ac_fan_mode, null );
                return await args.device.setCapabilityValue( 'aircon_fan_mode', args.ac_fan_mode ); // Promise<void>
            } )

        this.ac_fan_oscillation_mode_action = new Homey.FlowCardAction( 'ac_fan_oscillation_mode_action' );
        this.ac_fan_oscillation_mode_action
            .register()
            .registerRunListener( async ( args, state ) =>
            {
                console.log( "ac_fan_oscillation_mode_action: arg = ", args.ac_fan_oscillation_mode, " - state = ", state );
                await args.device.onCapabilityAirConMode( args.ac_fan_oscillation_mode, null );
                return await args.device.setCapabilityValue( 'aircon_fan_oscillation_mode', args.ac_fan_oscillation_mode ); // Promise<void>
            } )

        this.ac_lights_action = new Homey.FlowCardAction( 'ac_lights_action' );
        this.ac_lights_action
            .register()
            .registerRunListener( async ( args, state ) =>
            {
                console.log( "ac_lights_action: arg = ", args.ac_lights_option, " - state = ", state );
                if ( args.ac_lights_option == "on" )
                {
                    return await args.device.onCapabilityAc_lights_on( true, null );
                }
                else
                {
                    return await args.device.onCapabilityAc_lights_off( true, null );
                }
            } )

        this.ac_mode_action = new Homey.FlowCardAction( 'ac_mode_action' );
        this.ac_mode_action
            .register()
            .registerRunListener( async ( args, state ) =>
            {
                console.log( "ac_mode_action: arg = ", args.ac_mode, " - state = ", state );
                await args.device.onCapabilityAirConMode( args.ac_mode, null );
                return await args.device.setCapabilityValue( 'aircon_mode', args.ac_mode ); // Promise<void>
            } )

        this.ac_options_action = new Homey.FlowCardAction( 'ac_options_action' );
        this.ac_options_action
            .register()
            .registerRunListener( async ( args, state ) =>
            {
                console.log( "ac_options_action: arg = ", args.ac_option, " - state = ", state );
                await args.device.onCapabilityAirConMode( args.ac_option, null );
                return await args.device.setCapabilityValue( 'aircon_option', args.ac_option ); // Promise<void>
            } )
    }

    // this is the easiest method to overwrite, when only the template 'Drivers-Pairing-System-Views' is being used.
    onPairListDevices( data, callback )
    {
        // Required properties:
        //"data": { "id": "abcd" },

        // Optional properties, these overwrite those specified in app.json:
        // "name": "My Device",
        // "icon": "/my_icon.svg", // relative to: /drivers/<driver_id>/assets/
        // "capabilities": [ "onoff", "dim" ],
        // "capabilitiesOptions: { "onoff": {} },

        // Optional properties, device-specific:
        // "store": { "foo": "bar" },
        // "settings": { "my_setting": "my_value" },

        Homey.app.getDevices().then( function( devices )
        {
            Homey.app.updateLog( devices );
            callback( null, devices );

        } ).catch( function( err )
        {
            callback( new Error( "Connection Failed" + Homey.app.varToString( err ) ), [] );
        } );
    }
}

module.exports = STDriver;