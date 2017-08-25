/* global bootbox  */

export const alert = message => bootbox.alert({ message, backdrop: true, size: 'small' })

export const confirm = message => new Promise(resolve => bootbox.confirm(message, resolve))
