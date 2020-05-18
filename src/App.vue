<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>

export default {
  name: 'App', 
  data(){
    return {

    }
  }
}
</script>


<style>
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, font, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, caption {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
}

html{
  height: 100%;
}

body{
  height: 100%;
}

#app{
  padding: 0px;
  margin: 0px;
  height: 100%;

  background-image: url('./assets/bg.png');
}
</style>