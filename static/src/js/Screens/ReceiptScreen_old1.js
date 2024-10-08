odoo.define('pos_modi.PosModiReceiptScreen', function (require) {
    'use strict';

    const { Printer } = require('point_of_sale.Printer');
    const { is_email } = require('web.utils');
    const { useRef, useContext } = owl.hooks;
    const { useErrorHandlers, onChangeOrder } = require('point_of_sale.custom_hooks');
    const Registries = require('point_of_sale.Registries');
    const AbstractReceiptScreen = require('point_of_sale.AbstractReceiptScreen');
    const ReceiptScreen = require('point_of_sale.ReceiptScreen');



    // const PosModiPaymentScreen = (PaymentScreen) =>
    //     class extends PaymentScreen {

    const PosModiReceiptScreen = (ReceiptScreen) => 
        class  extends ReceiptScreen {
            constructor() {
                super(...arguments);
                
                // this.logHelloAfterDelay()
                this.get_user_data();
                console.log("abc");
                this.setFocusOnInputField();
                this.user_email = null;




                // useErrorHandlers();
                // onChangeOrder(null, (newOrder) => newOrder && this.render());
                // this.orderReceipt = useRef('order-receipt');
                // const order = this.currentOrder;
                // const client = order.get_client();


                // console.log(client, "this client")


                // this.orderUiState = useContext(order.uiState.ReceiptScreen);
                // this.orderUiState.inputEmail = this.orderUiState.inputEmail || (client && client.email) || '';
                // this.is_email = is_email;
            }

            setup() {
                this.inputRef = useRef('inputRef');
                // this.isFocused = false;
        
                // Automatically focus the input field when the component mounts
                // onMounted(() => {
                //     if (this.inputRef.el) {
                //         this.inputRef.el.focus();
                //     }
                // });
            }


            mounted() {
                // Here, we send a task to the event loop that handles
                // the printing of the receipt when the component is mounted.
                // We are doing this because we want the receipt screen to be
                // displayed regardless of what happen to the handleAutoPrint
                // call.
                // setTimeout(async () => await this.handleAutoPrint(), 0);
                console.log("gorilopa")
            }





            // async  logHelloAfterDelay() {
            //     // Use a promise to wrap setTimeout
            //     await new Promise(resolve => setTimeout(resolve, 2000)); // Delay of 2000 milliseconds (2 seconds)
            //     console.log("hello");
            //     this.orderUiState.emailSuccessful = true;
            //     // this.orderUiState.emailNotice = this.env._t('Email sent.');
            //     this.render()
            // }

            get get_username(){
                return this.user_email

            }


            setFocusOnInputField() {
                // Use setTimeout to ensure the DOM is fully loaded
                setTimeout(() => {
                    

                    const inputField = document.querySelector('input');

                    console.log(this.inputRef, "ref" )
                    console.log(this.inputRef.el, "ref.el" )
                    console.log(inputField, "inputField" )
                    
                    this.inputRef.el.focus()

                    if (inputField) {
                        // Set focus to the input field
                        inputField.focus();
                    }
                }, 100); // Delay to ensure the page and input field are fully rendered
            }
            

            async get_user_data() {

                // Use a promise to wrap setTimeout
                await new Promise(resolve => setTimeout(resolve, 2000)); // Delay of 2000 milliseconds (2 seconds)
                // let Session = this.env.session;
                // const user = await Session.get_session_info();
                // console.log(user);
                // const order = this.currentOrder;
                // const client = order.get_client();
                // console.log(Session);
                // console.log(client);
                const userId = this.currentOrder.employee.user_id[0];
    
    
    
                try {
                    // Assuming you have the user ID available (e.g., passed as a prop or available globally)
                    // const userId = this.props.userId; // Replace with actual user ID source
        
                    // Make RPC call to fetch user details
                    const user = await this.rpc({
                        model: 'res.users',
                        method: 'read',
                        args: [[userId], ['name', 'email', 'phone']], // Specify fields you want to fetch
                    });
        
                    // Update component state with user data
                    // this.state.user = user[0]; // user is returned as an array
                    console.log(user, "user res");

                    if (user.length == 0){
                        console.log("no user found")
                        return 
                    }

                    if (!user[0].email){
                        console.log("user has no email", user)
                        return 
                    }
                    this.user_email = user[0].email;
                    const printer = new Printer(null, this.env.pos);
                    const receiptString = this.orderReceipt.comp.el.outerHTML;
                    const ticketImage = await printer.htmlToImg(receiptString);
                    const order = this.currentOrder;
                    const client = order.get_client();
                    const orderName = order.get_name();
                    const orderClient = { email: user[0].email, name: client ? client.name : user[0].name };
                    const order_server_id = this.env.pos.validated_orders_name_server_id_map[orderName];
                    if (!order_server_id) {
                        this.showPopup('ErrorPopup', {
                            title: this.env._t('Unsynced order'),
                            body: this.env._t('This order is not yet synced to server. Make sure it is synced then try again.'),
                        });
                        return Promise.reject();
                    }
                    await this.rpc({
                        model: 'pos.order',
                        method: 'action_receipt_to_customer',
                        args: [[order_server_id], orderName, orderClient, ticketImage],
                    });
                    this.orderUiState.emailSuccessful = true;
                    // this.orderUiState.emailNotice = this.env._t('Email sent.');
                    console.log(user, "usero res");
                    this.render()
                    this.setFocusOnInputField()
                    
                    return user;
                } catch (error) {
                    // Handle errors
                    console.log(error, "user error res");
                    // this.state.error = error.message;
                } finally {
                    console.log( "user finaly res");
                    // Set loading to false when done
                    // this.state.loading = false;
                }
    
                // console.log(client.email);
                this.setFocusOnInputField()
                return 
            }
            



            // async onSendEmail() {
            //     if (!is_email(this.orderUiState.inputEmail)) {
            //         this.orderUiState.emailSuccessful = false;
            //         this.orderUiState.emailNotice = this.env._t('Invalid email.');
            //         return;
            //     }
            //     try {
            //         await this._sendReceiptToCustomer();
            //         this.orderUiState.emailSuccessful = true;
            //         this.orderUiState.emailNotice = this.env._t('Email sent.');
            //     } catch (error) {
            //         this.orderUiState.emailSuccessful = false;
            //         this.orderUiState.emailNotice = this.env._t('Sending email failed. Please try again.');
            //     }
            // }
            // get orderAmountPlusTip() {
            //     const order = this.currentOrder;
            //     const orderTotalAmount = order.get_total_with_tax();
            //     const tip_product_id = this.env.pos.config.tip_product_id && this.env.pos.config.tip_product_id[0];
            //     const tipLine = order
            //         .get_orderlines()
            //         .find((line) => tip_product_id && line.product.id === tip_product_id);
            //     const tipAmount = tipLine ? tipLine.get_all_prices().priceWithTax : 0;
            //     const orderAmountStr = this.env.pos.format_currency(orderTotalAmount - tipAmount);
            //     if (!tipAmount) return orderAmountStr;
            //     const tipAmountStr = this.env.pos.format_currency(tipAmount);
            //     return `${orderAmountStr} + ${tipAmountStr} tip`;
            // }
            // get currentOrder() {
            //     return this.env.pos.get_order();
            // }
            // get nextScreen() {
            //     return { name: 'ProductScreen' };
            // }
            // whenClosing() {
            //     this.orderDone();
            // }
            // /**
            //  * This function is called outside the rendering call stack. This way,
            //  * we don't block the displaying of ReceiptScreen when it is mounted; additionally,
            //  * any error that can happen during the printing does not affect the rendering.
            //  */
            // async handleAutoPrint() {
            //     if (this._shouldAutoPrint()) {
            //         const currentOrder = this.currentOrder;
            //         await this.printReceipt();
            //         if (this.currentOrder && this.currentOrder === currentOrder && currentOrder._printed && this._shouldCloseImmediately()) {
            //             this.whenClosing();
            //         }
            //     }
            // }
            // orderDone() {
            //     this.currentOrder.finalize();
            //     const { name, props } = this.nextScreen;
            //     this.showScreen(name, props);
            // }
            // async printReceipt() {
            //     const currentOrder = this.currentOrder;
            //     const isPrinted = await this._printReceipt();
            //     if (isPrinted) {
            //         currentOrder._printed = true;
            //     }
            // }
            // _shouldAutoPrint() {
            //     return this.env.pos.config.iface_print_auto && !this.currentOrder._printed;
            // }
            // _shouldCloseImmediately() {
            //     var invoiced_finalized = this.currentOrder.is_to_invoice() ? this.currentOrder.finalized : true;
            //     return this.env.pos.proxy.printer && this.env.pos.config.iface_print_skip_screen && invoiced_finalized;
            // }
            // async _sendReceiptToCustomer() {
            //     const printer = new Printer(null, this.env.pos);
            //     const receiptString = this.orderReceipt.comp.el.outerHTML;
            //     const ticketImage = await printer.htmlToImg(receiptString);
            //     const order = this.currentOrder;
            //     const client = order.get_client();
            //     const orderName = order.get_name();
            //     const orderClient = { email: this.orderUiState.inputEmail, name: client ? client.name : this.orderUiState.inputEmail };
            //     const order_server_id = this.env.pos.validated_orders_name_server_id_map[orderName];
            //     if (!order_server_id) {
            //         this.showPopup('ErrorPopup', {
            //             title: this.env._t('Unsynced order'),
            //             body: this.env._t('This order is not yet synced to server. Make sure it is synced then try again.'),
            //         });
            //         return Promise.reject();
            //     }
            //     await this.rpc({
            //         model: 'pos.order',
            //         method: 'action_receipt_to_customer',
            //         args: [[order_server_id], orderName, orderClient, ticketImage],
            //     });
            // }
        }
        // ReceiptScreen.template = 'ReceiptScreen';
        // return ReceiptScreen;
    // };

    // Registries.Component.addByExtending(ReceiptScreen, AbstractReceiptScreen);
    Registries.Component.extend(ReceiptScreen, PosModiReceiptScreen);

    return PosModiReceiptScreen;
});
