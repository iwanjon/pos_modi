odoo.define('pos_modi.NewNumberBufferu', function(require) {
    'use strict';

//     const { Component } = owl;
//     const { EventBus } = owl.core;
//     const { onMounted, onWillUnmount, useExternalListener } = owl.hooks;
//     const { useListener } = require('web.custom_hooks');
//     const { parse } = require( 'web.field_utils');
//     const { BarcodeEvents } = require('barcodes.BarcodeEvents');
//     const { _t } = require('web.core');
    const ClassRegistry = require('point_of_sale.ClassRegistry');

    const NewNumberBuffer  = require('pos_modi.NewNumberBuffer');
    const Registries = require('point_of_sale.Registries');

//     // const INPUT_KEYS = new Set(
//     //     ['Delete', 'Backspace', '+1', '+2', '+5', '+10', '+20', '+50'].concat('0123456789+-.,'.split(''))
//     // );
//     // const CONTROL_KEYS = new Set(['Enter', 'Esc']);
//     // const ALLOWED_KEYS = new Set([...INPUT_KEYS, ...CONTROL_KEYS]);
//     // const getDefaultConfig = () => ({
//     //     decimalPoint: false,
//     //     triggerAtEnter: false,
//     //     triggerAtEsc: false,
//     //     triggerAtInput: false,
//     //     nonKeyboardInputEvent: false,
//     //     useWithBarcode: false,
//     // });

//     // const NumberBuffer = require('point_of_sale.NumberBuffer');


//     const INPUT_KEYS = new Set(
//         ['Delete', 'Backspace', '+1', '+2', '+5', '+10', '+20', '+50', '+10000', '+20000', '+50000'].concat('0123456789+-.,'.split(''))
//     );
//     const CONTROL_KEYS = new Set(['Enter', 'Esc']);
//     let  ALLOWED_KEYS = new Set([...INPUT_KEYS, ...CONTROL_KEYS]);


    const classreg = new ClassRegistry();

    const NewNumberBufferu = (NewNumberBuffer) => 
    class extends NewNumberBuffer {
    // class NewNumberBufferu extends EventBus {
        constructor() {
            super();
            console.log("kingkong")
   
        }



       
    }
    Registries.add(NewNumberBufferu)
    Registries.extend(NewNumberBuffer, NewNumberBufferu)

    return NewNumberBufferu;
});
