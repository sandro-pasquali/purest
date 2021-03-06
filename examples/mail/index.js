
var provider = process.argv[2]

if (!provider) {
  throw new Error('Specify provider!')
}

var fs = require('fs')
  , path = require('path')
var mail = require('./mail')

var config = require('./config')
  , app = config.app[provider]
  , user = config.user[provider]
  , image = path.resolve(__dirname, '../../test/fixtures/cat.png')
  , audio = path.resolve(__dirname, '../../test/fixtures/beep.mp3')

var client = mail({provider:provider})

/* Send Data Structure
{
  auth: {user:'', pass:'', apikey:'', subdomain:''},
  data: {
    from:{name:'',email:''},

    // can be array as well
    to:{name:'', email},
    cc:{name:'', email},
    bcc:{name:'', email},

    subject:'',
    html:'',
    text:'',

    attachments:[{name:'', data:''}]
  }
}
*/

client.send({
  auth:{
    // sendgrid
    user:user.user,
    pass:user.pass,
    // mandrill, mailgun
    apikey:user.apikey,
    // mailgun
    domain:user.domain
  },
  from:{name:'Purest', email:'purest@mailinator.com'},
  to:[
    {name:'Liolio1', email:'liolio1@mailinator.com'},
    {name:'Liolio2', email:'liolio2@mailinator.com'}
  ],
  cc:[
    {name:'Liolio3', email:'liolio3@mailinator.com'},
    {name:'Liolio4', email:'liolio4@mailinator.com'}
  ],
  bcc:[
    {name:'Liolio5', email:'liolio5@mailinator.com'},
    {name:'Liolio6', email:'liolio6@mailinator.com'}
  ],
  subject:'Purest is awesome!',
  html:'<h1>True indeed!</h1>',
  text:'True indeed!',
  attachments:[
    {name:'cat.png', data:fs[provider == 'mandrill' ? 'readFileSync' : 'createReadStream'](image)},
    {name:'beep.mp3', data:fs[provider == 'mandrill' ? 'readFileSync' : 'createReadStream'](audio)}
  ]
}, function (err, res, body) {
  if (err) console.log(err)
  console.log(body)
})
