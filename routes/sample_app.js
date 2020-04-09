const express = require('express');
const router = express.Router();
const { header, validationResult } = require('express-validator');

const attributes = [
    {"id":"email","description":"User email"},
    {"id":"first_name","description":"First Name"},
    {"id":"last_name","description":"First Name"},
    {"id":"groups","description":"User groups separated by collon (:), typically taken from the LDAP or AD"},
	{"id":"language","description":"Favorite Language"},
    {"id":"host","description":"Application Host"},
  ];

const title = 'Sample Application';
const description = 'This pseudo sample application is used for education purposes. It expects several different attributes';
const doc = 'https://www.okta.com';

let urls = new Map([['/', 'Index'],['/admin', 'Admin Interface'],['/protected', 'Protected Page']]);

router.get(Array.from(urls.keys()),[
  header('email').isEmail(),
  header('first_name').not().isEmpty(),
  header('last_name').not().isEmpty(),
  header('groups').not().isEmpty(),
  header('language').not().isEmpty(),
  header('host').not().isEmpty(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(JSON.stringify(errors.array()));
  }

  res.render('headerApp', 
   {
    title: title +' - '+ urls.get(req.url),
    description: description,
    req: req,
    attributes: attributes,
    errors: { errors: errors.array() },
   }
  );
});

module.exports = router;