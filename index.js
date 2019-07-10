//jshint esversion:6
//jshint esversion:8
require('dotenv').config();
const soap = require('soap');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const soapRequest = require('easy-soap-request');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

let num = 826120011;
const quotaType = 1202;
const endPoint = process.env.ENDPOINT;
const head = process.env.HEAD;
// example data

const url = `${endPoint}/services/ManSubQuotaMgrService.ManSubQuotaMgrServiceSoap12Port/`;
const headers = {
  'user-agent': 'sampleTest',
  'Content-Type': 'text/xml;charset=UTF-8',
  'soapAction': `${endPoint}/services/ManSubQuotaMgrService?wsdl`
};
const xml = `<soap:Envelope ${head}">
   <soap:Header/>
   <soap:Body>
       <man:QuerySubQuotaRequestMsg>
         <RequestHeader>
            <com:CommandId>QuerySubQuota</com:CommandId>
            <com:Version>1</com:Version>
            <com:TransactionId>Null</com:TransactionId>
            <com:SequenceId>1</com:SequenceId>
            <com:RequestType>Event</com:RequestType>
            <com:SerialNo>333560f40007</com:SerialNo>
         </RequestHeader>
         <QuerySubQuotaRequest>
            <man1:Msisdn>${num}</man1:Msisdn>
            <man1:QuotaType>${quotaType}</man1:QuotaType>
         </QuerySubQuotaRequest>
      </man:QuerySubQuotaRequestMsg>
   </soap:Body>
</soap:Envelope>`;


app.get("/", function(req, res) {

console.log(endPoint);
console.log(head);

  // usage of module

  (async () => {
    const { response } = await soapRequest(url, headers, xml, 120000); // Optional timeout parameter(milliseconds)
    const { body, statusCode } = response;
    console.log(headers);
    console.log(body);
    console.log(statusCode);
  })();


  res.render("home");

});


app.listen(3000, function() {
      console.log("Server started on port 3000");
    });
