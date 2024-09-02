
# POS MOD Module


## Description:
This odoo14 Module do some modification in POS module.

Modification describe in Instructions.

this module create for odoo 14 with python 3.9

## Instructions:

1. inherit module POS, disable button Price and Discount via code.
-> productscreen menu

2. inherit module POS, change number +10, +20, +50 to +10.000, +50.000, +100.000
-> paymentscreen menu

3. inherit module POS, automaticaly send email if user already registered and has email. Show email notification.
-> receiptscreen menu

4. inheritlah widget char in form view, onfocus, set background-color: yellow. on form open / loaded, focus to text input.
-> receiptscreen menu (input email)

add this module to custome addons directory and register the addons path to config(example config is provided).

run command example(inside odoo main directory and odoo.conf outside of the odoo main directory)
``` 
    # for running application and import demo data
    python odoo-bin -c ../odoo.conf -u pos_modi  -i base

```
