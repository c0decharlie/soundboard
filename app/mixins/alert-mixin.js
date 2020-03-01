import * as Materialize from 'materialize-css';

export default {
    data() {
        return {
            displayLength: 5000,
            alertClasses: {
                error: 'red darken-1',
                success: 'green lighten-2'
            }   
        }
    },

    methods: {
        showAlert({ content, type, displayLength }) {
            Materialize.toast({ 
                html: content,
                classes: this.alertClasses[type],
                displayLength: displayLength || this.displayLength,
            });
        }
    }
}
