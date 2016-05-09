var request = require('request'),
	serviceId = 'serviceId',
	accountId = 'accountId',
	name = 'accountName',
	email = 'userEmail',
	action = 'actionName',
	module = 'application';

request.post('https://sdr.totango.com/pixel.gif/?sdr_s=' + serviceId + '&sdr_o=' + accountId + '&sdr_odn=' + name + '&sdr_u=' + email + '&sdr_a=' + action + '&sdr_m=' + module, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body)
  }
})