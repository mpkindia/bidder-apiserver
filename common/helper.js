/**
 * Helper methods
 */

const pe = require('parse-error')

/**
 * @param {Promise} promise  
 */
function to(promise) {
    return promise.then(data => {
        return [null, data]
    }).catch(err=>
        [pe(err)]
    )
}


function TE(err_message){ 
    throw new Error(err_message);
}
  
module.exports = {
    to,
    TE,
}

