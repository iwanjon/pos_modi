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
                // this.get_user_data();
                // console.log("abc");
                // this.setFocusOnInputField();
                this.user_email = null;




       
            }

            setup() {
                this.inputRef = useRef('inputRef');

            }


            mounted() {
                // Here, we send a task to the event loop that handles
                // the printing of the receipt when the component is mounted.
                // We are doing this because we want the receipt screen to be
                // displayed regardless of what happen to the handleAutoPrint
                // call.
                // setTimeout(async () => await this.handleAutoPrint(), 0);
                // console.log("gorilopa");
                this.get_user_data();
                this.setFocusOnInputField();
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
                    

                    // const inputField = document.querySelector('input');

                    // console.log(this.inputRef, "ref" )
                    // console.log(this.inputRef.el, "ref.el" )
                    // console.log(inputField, "inputField" )

                    this.inputRef.el.focus()

        
                }, 50); // Delay to ensure the page and input field are fully rendered
            }
            

            async get_user_data() {

                // Use a promise to wrap setTimeout
                await new Promise(resolve => setTimeout(resolve, 2000)); // Delay of 2000 milliseconds (2 seconds)
  
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
            

        }
        // ReceiptScreen.template = 'ReceiptScreen';
        // return ReceiptScreen;
    // };

    // Registries.Component.addByExtending(ReceiptScreen, AbstractReceiptScreen);
    Registries.Component.extend(ReceiptScreen, PosModiReceiptScreen);

    return PosModiReceiptScreen;
});
