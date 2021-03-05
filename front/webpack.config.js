module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData:`@import "./src/assets/scss/style.scss";` 
                // sass 版本 9 中使用 additionalData 版本 8 中使用 prependData  
            }
        }
    }  
} 