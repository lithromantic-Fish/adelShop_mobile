<template>
<div id="aa">

</div>
</template>

<script>
    export default {
        data() {
            return {
                payPage: ""
            }
        },
        mounted() {
            
            this.payPage = this.$route.query.payHtml
            console.log(" this.payPage ", this.payPage);
            console.log(" this.payPage ", typeof(this.payPage));
           var aa = document.getElementById('aa')
           aa.innerHTML = this.payPage
           document.forms[0].submit();
           console.log('docimgewg',document);
           
        }
    }
</script>

<style>

</style>
