<template>
    <div>
        <div class="modal" ref="modal">
            <div class="modal-content">
               <slot></slot>
            </div>
            <div class="modal-footer">
                <button 
                    v-if="showDecline"
                    @click="onDeclineClick"
                    class="modal-close waves-effect waves-red btn-flat"
                >
                    {{ declineText }}
                </button>
                <button 
                    v-if="showAccept"
                    @click="onAcceptClick"
                    class="modal-close waves-effect waves-green btn-flat"
                >
                    {{ acceptText }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import * as M from 'materialize-css';

export default {
    props: {
        showDecline: {
            type: Boolean,
            default: false,
            required: false
        },
        declineText: {
            type: String,
            default: 'Decline',
            required: false
        },
        showAccept: {
            type: Boolean,
            default: true,
            required: false
        },
        acceptText: {
            type: String,
            default: 'Accept',
            required: false
        }
    },

    data() {
        return {
            modal: null
        }
    },

    methods: {
        onAcceptClick() {
            this.$emit('acceptClick');
        },

        onDeclineClick() {
            this.$emit('declineClick');
        },

        open() {
            this.modal.open();
        }
    },

    mounted() {
        const $modal = this.$refs.modal;
        this.modal = M.Modal.init($modal);
    }
}
</script>
