(function() {

  function closest(el, fn) {
    return el && (
        fn(el) ? el : closest(el.parentNode, fn)
      );
  }
function jsonToQueryString(json) {
      return '?' + 
          Object.keys(json).map(function(key) {
              return encodeURIComponent(key) + '=' +
                  encodeURIComponent(json[key]);
          }).join('&');
  }
  function xmlHttpRequest(data,cb){
    var request_url = 'https://in-automate.sendinblue.com/p';
    request_url += jsonToQueryString(data)
    var request = new XMLHttpRequest();

    request.open("GET", request_url, true);

    request.onreadystatechange = function(){
      if(request.readyState == 4){
        if(request.status == 200){
          try {
            cb(null,this.response)
          } catch(e){
            cb(e,null);
          }
        }else{
          cb("Please try again later/ Report this error to Sendinblue Team",null);
        }
      }
    }
    request.send(JSON.stringify(data))
  }

  function main() {
    window.onload = function () {

      var key = sendinblue.client_key;
      //get session_id
      getCookie = function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1);
          if (c.indexOf(name) != -1 && c.substring(0, name.length) == name)
            return c.substring(name.length, c.length);
        }
        return "";
      }

      //function to get a random sess id of form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
      function getSessionId(a) {
        // placeholder
        return a           // if the placeholder was passed, return
          ? ((              // a random number from 0 to 15
        a ^            // unless b is 8,
        Math.random()  // in which case
        * 16           // a random number from
        >> a / 4         // 8 to 11
        ).toString(16)) // in hexadecimal
          : (              // or otherwise a concatenated string:
        [1e7] +        // 10000000 +
        -1e3 +         // -1000 +
        -4e3 +         // -4000 +
        -8e3 +         // -80000000 +
        -1e11        // -100000000000,
        ).replace(     // replacing
          /[018]/g,    // zeroes, ones, and eights with
          getSessionId            // random hex digits
        ).concat("."+(new Date().getTime()))
      }

      function getRootDomain(){
        var temp = location.host.split('.').reverse();
        var root_domain = '.' + temp[1] + '.' + temp[0];
        document.cookie = "testing_root_domain=1; domain = " + root_domain + ";expires=Thu, 01 Jan 2970 00:00:00 UTC;path=/";
        if(getCookie("testing_root_domain")=="")
          var root_domain = temp[2] + '.' + temp[1] + '.' + temp[0];
        
        document.cookie = "testing_root_domain=; domain = " + root_domain + ";expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
        return root_domain;
      }
      var old_session_id = getCookie('session_id');
      var sib_cuid = getCookie('sib_cuid');
      var session_id = (sib_cuid || old_session_id);
      var email_id = getCookie('email_id');
      window.sendinblue.init = function () {
        var root_domain = getRootDomain();
        //to be removed
        if (email_id == "Login") {
          email_id = '';
          session_id = '';
          var current_date = new Date();
          //current_date.setHours( current_date.getHours() - 24 );
          current_date.setFullYear(current_date.getFullYear() - 5);
          var expires = "expires=" + current_date.toGMTString();
          document.cookie = "email_id=; domain = " + root_domain + ";" + expires + ";path=/";
          document.cookie = "session_id=; domain = " + root_domain + ";" + expires + ";path=/";
          document.cookie = "sib_cuid=; domain = " + root_domain + ";" + expires + ";path=/";
        }
        var isNewSession = false;
        if (session_id == '') {
            isNewSession = true;
            session_id = getSessionId(); //code to generate unique session_id
        }
        if (sib_cuid == '') {
            var current_date = new Date();
            current_date.setFullYear(current_date.getFullYear() + 5);
            var expires = "expires=" + current_date.toGMTString();
            document.cookie = "sib_cuid=" + session_id + ";domain= " + root_domain + ";" + expires + ";path=/";
        }
        if (old_session_id != '') {
            var current_date = new Date();
            current_date.setFullYear(current_date.getFullYear() - 5);
            var expires = "expires=" + current_date.toGMTString();
            document.cookie = "session_id=; domain = " + root_domain + ";" + expires + ";path=/";
        }
        if (key != '') {
          var iframe = document.createElement('iframe');
          iframe.setAttribute('style', 'display:none');
          iframe.setAttribute('width', '0px');
          iframe.setAttribute('height', '0px');
          iframe.src = ('https:' === document.location.protocol ? 'https://' : 'http://')+'s.sib.im/cookie.html?session_id='+session_id+'&key='+key+'&email_id='+email_id+'&isNewSession='+isNewSession;
          document.body.appendChild(iframe);
        }
      }
      window.sendinblue.init();

      window.sendinblue.track = function (event, data, callback) {
        if (!data) {
          data = {};
        }
        data.sib_name = event;
        data.key = key;
        data.session_id = session_id;
        if(!data.email_id)
          data.email_id = email_id;
        data.sib_type = 'track';
        if (!data.url) {
          data.url = window.location.href;
        }
        xmlHttpRequest(data, function (err, res) {
          if (res) {
            if (res.email_id && email_id == '') {
              window.sendinblue.saveEmailCookie(res.email_id);
            }
            if (typeof callback != 'undefined') {
              callback(null, res);
            }
          }
          else {
            if (typeof callback != 'undefined') {
              callback(err, null)
            }
          }
        });
      }

      window.sendinblue.trackLink = function (links, data, callback) {
        if (!data) {
          data = {};
        }
        if (links && links.constructor !== Array) {
          links = [links];
        }
        //check if the element is link
        data.sib_type = 'trackLink';
        data.key = key;
        data.session_id = session_id;
        if(!data.email_id)
          data.email_id = email_id;
        if (!data.url) {
          data.url = window.location.href;
        }
        links.forEach(function (v) {
          if(v) {
            var href = v.getAttribute('href');
            var jsClosest = closest(v, function (el) {
              if(el && typeof el.tagName != "undefined"){
                return el.tagName.toLowerCase() === 'a';
              }
            });
            if (jsClosest && href) {
              v.addEventListener("click", function(e) {
                data.href = href;
                data.linkid = v.getAttribute('id');
                data.sib_name = v.getAttribute('id');
                e.preventDefault();
                xmlHttpRequest(data, function (err, res) {
                  if (res) {
                    if (res.email_id && email_id == '') {
                      window.sendinblue.saveEmailCookie(res.email_id);
                    }
                    if (typeof callback != 'undefined') {
                      callback(null, res);
                    }
                    if (v.getAttribute('target') !== '_blank') {
                      setTimeout(function () {
                        window.location.href = href;
                      }, 1000);
                    }else {
                      window.open(href);
                    }
                  }
                  else {
                    if (typeof callback != 'undefined') {
                      callback(err, null)
                    }
                    if (v.getAttribute('target') !== '_blank') {
                      setTimeout(function () {
                        window.location.href = href;
                      }, 1000);
                    } else {
                      window.open(href);
                    }
                  }
                });
              })
            }
          }
          else{
              if (typeof callback != 'undefined') {
                      callback(null,'Link not Found');
                    }

          }
        });
      }

      window.sendinblue.page = function (pagename, data, callback) {
        if (!data) {
          data = {};
        }
        data.sib_type = 'page';
        data.key = key;
        data.session_id = session_id;
        if(!data.email_id)
          data.email_id = email_id;
        if (!data.title) {
          data.title = document.title;
        }
        if (pagename && pagename != '') {
          data.sib_name = pagename;
        } else {
          data.sib_name = data.title;
        }
        if (!data.referrer) {
          data.referrer = document.referrer;
        }
        if (!data.path) {
          data.path = window.location.pathname;
        }
        if (!data.url) {
          data.url = window.location.href;
        }
        xmlHttpRequest(data, function (err, res) {
          if (res) {
            if (res.email_id && email_id == '') {
              window.sendinblue.saveEmailCookie(res.email_id);
            }
            if (typeof callback != 'undefined') {
              callback(null, res);
            }
          }
          else {
            if (typeof callback != 'undefined') {
              callback(err, null)
            }
          }
        });
      }

      window.sendinblue.identify = function (em, data, callback) {
        if (!data) {
          data = {};
        }
        /*if (!data.name) {
         data.name = "Contact Created";
         }*/
        //data.id = user;
        data.sib_type = 'identify';
        data.key = key;
        data.session_id = session_id;
        data.email_id = em;
        email_id = data.email_id;

        if (!data.url) {
          data.url = window.location.href;
        }
        //store user email in session cookie
        window.sendinblue.saveEmailCookie(data.email_id);

        xmlHttpRequest(data, function (err, res) {
          if (res) {
            if (res.email_id && email_id == '') {
              window.sendinblue.saveEmailCookie(res.email_id);
            }
            if (typeof callback != 'undefined') {
              callback(null, res);
            }
          }
          else {
            if (typeof callback != 'undefined') {
              callback(err, null)
            }
          }
        });
      }

      window.sendinblue.saveEmailCookie = function (em) {
        var current_date = new Date();
        //current_date.setHours( current_date.getHours() + 24 );
        current_date.setFullYear(current_date.getFullYear() + 5);
        var expires = "expires=" + current_date.toGMTString();
        root_domain = getRootDomain();
        document.cookie = "email_id=" + em + "; domain = " + root_domain + ";" + expires + ";path=/";
      }

      sendinblue.forEach(function (v) {
        setTimeout(function () {
          var x = v[0];
          if(typeof v[3] != 'undefined')
            window.sendinblue[x](v[1],v[2],v[3]);
          else
            window.sendinblue[x](v[1],v[2]);
        }, 2000);
      })
    }
  }
  main();

})();
