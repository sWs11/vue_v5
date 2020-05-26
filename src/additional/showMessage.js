import VueObject from "@/main";

export default function (message, status, title) {
    title = title !== undefined ? title : '';

    switch (status) {
        case 'success':
            VueObject.$toastr.s(message, title);
        break;
        case 'error':
            VueObject.$toastr.e(message);
        break;
        case 'warning':
            VueObject.$toastr.w(message);
        break;
        case 'info':
            VueObject.$toastr.i(message);
        break;
        default:
            VueObject.$toastr.Add({
                name: "DefaultToast", // this is give you ability to use removeByName method
                title: title, // Toast Title
                msg: message, // Toast Message
                clickClose: false, // Click Close Disable
                timeout: 5000, // Remember defaultTimeout is 5 sec.(5000) in this case the toast won't close automatically
                //progressBarValue: 50, // Manually update progress bar value later; null (not 0) is default
                position: "toast-top-right", // Toast Position.
                type: "info", // Toast type,
                progressbar: true,
                // preventDuplicates: true, //Default is false,
                style: { backgroundColor: "rgba(53,53,53,0.85)" } // bind inline style to toast  (check [Vue doc](https://vuejs.org/v2/guide/class-and-style.html#Binding-Inline-Styles) for more examples)
            });
        break;
    }
}