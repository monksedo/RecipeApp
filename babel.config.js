module.exports = {
   presets: [
      [
         "@babel/preset-env",
         {
            targets: {
               // Browser settings
               "e": "8",
               "last 5 versions"
            },
            useBuiltIns: 'usage'
         }
      ]
   ]
}