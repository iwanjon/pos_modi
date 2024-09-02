# -*- coding: utf-8 -*-
{
    'name': "pos_modi",

    'summary': """
        Short (1 phrase/line) summary of the module's purpose, used as
        subtitle on modules listing or apps.openerp.com""",

    'description': """
        Long description of module's purpose
    """,

    'author': "My Company",
    'website': "http://www.yourcompany.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/14.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '0.1',

    'qweb': [
        # 'static/src/xml/modd.xml',
        'static/src/xml/Screens/ProductScreen/NumpadWidget.xml',
        'static/src/xml/Screens/PaymentScreen/PaymentScreenNumpad.xml',
        'static/src/xml/Screens/ReceiptScreen/ReceiptScreen.xml',
        # 'static/src/xml/Screens/PaymentScreen/PaymentScreen.xml',
        # 'static/src/xml/Popups/NumberPopup.xml',
    ],
    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
         'views/pos_modi_templates.xml',
        'views/views.xml',
        'views/templates.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
    'depends': ['point_of_sale'],

    # always loaded

    # only loaded in demonstration mode


    'installable': True,
      'application': True,
    'auto_install': False,
    'license': 'LGPL-3',
     'sequence': -100,
}
