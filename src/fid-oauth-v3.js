var FtechFID = function () {
    this.mgr = null;
    this.URL = "https://id-dev.ftech.ai/";
    this.init = (options) => {
      const {
        authority,
        client_id,
        client_secret,
        redirect_uri,
        post_logout_redirect_uri = window.location.origin,
        response_type = "code",
        scope = "openid profile offline_access",
        filterProtocolClaims = true,
        loadUserInfo = true,
        popupWindowFeatures,
        popupWindowTarget,
      } = options;
      this.URL = authority.endsWith("/") ? authority : authority + "/";
      if (!authority || !client_id || !redirect_uri)
        throw new Error(
          "You are missing authority or client_id or client_secret or redirect_uri"
        );
  
      const mgr = new Oidc.UserManager({
        authority,
        client_id,
        // client_secret,
        redirect_uri,
        post_logout_redirect_uri,
        response_type,
        scope,
        filterProtocolClaims,
        loadUserInfo,
        popupWindowFeatures,
        popupWindowTarget,
      });
  
      // assign for popup instance after prepare;
      const _prepare = mgr._popupNavigator.prepare;
      mgr._popupNavigator.prepare = function () {
        return _prepare.apply(this, arguments).then((popup) => {
          mgr.signinPopupInstance = popup;
          return Promise.resolve(popup);
        });
      };
      this.mgr = mgr;
      //mgr.signinRedirect();
    };
    this.login = () => this.mgr && this.mgr.signinRedirect();
    this.getUser = (cb) => {
      try {
        const mgr = this.mgr;
        if (!this.mgr) throw new Error("You are not login!");
        mgr.getUser().then(function (user) {
          var url = this.URL + "connect/userinfo";
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url);
          xhr.onload = function () {
            log(xhr.status, JSON.parse(xhr.responseText));
            cb && cb(xhr.responseText);
          };
          xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
          xhr.send();
        });
      } catch (ex) {
        throw new Error("get user exception");
      }
    };
  
    this.getUserAsync = async () => {
      try {
        const mgr = this.mgr;
        if (!this.mgr) throw new Error("You are not login!");
        const user = await mgr.getUser();
        if (user) {
          const url = this.URL + "connect/userinfo";
          const response = await fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + user.access_token,
            },
          });
          return await response.json();
        }
        return {};
      } catch (ex) {
        throw new Error("get user exception");
      }
    };
  
    this.logout = () => {
      if (!this.mgr) throw new Error("You are not login!");
      this.mgr.signoutRedirect();
    };
  
    this.getIDToken = async () => {
      try {
        const mgr = this.mgr;
        if (!this.mgr) throw new Error("You are not login!");
        const user = await mgr.getUser();
        if (user) return user?.id_token;
      } catch (ex) {}
    };
  
    this.getRefreshToken = async () => {
      try {
        const mgr = this.mgr;
        if (!this.mgr) throw new Error("You are not login!");
        const user = await mgr.getUser();
        if (user) return user?.refresh_token;
      } catch (ex) {}
    };
  
    this.getAccountID = async () => {
      try {
        const mgr = this.mgr;
        if (!this.mgr) throw new Error("You are not login!");
        const user = await mgr.getUser();
        if (user) return user?.profile?.sub;
      } catch (ex) {}
    };
  
    this.callbackLogin = (returnURL) => {
      new Oidc.UserManager({ response_mode: "query" })
        .signinRedirectCallback()
        .then(function () {
          window.location = returnURL;
        })
        .catch(function (e) {
          throw new Error(e);
        });
      // new Oidc.UserManager().signinRedirectCallback().then(function () {
      //     window.location = returnURL;
      // }).catch(function (e) {
      //     throw new Error(e)
      // });
    };
};

window.FtechFID = new FtechFID();
