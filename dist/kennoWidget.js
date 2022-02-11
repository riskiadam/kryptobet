; (function (ns) {

    ns.Loaded = 0;
    //ns.RulesLoaded = 0;
    ns.assets = ns.assets || { 'js': {}, 'css': {} };
    ns.Lang = 'en';

    var _packages = {};

    ns._baseUrl = 'https://services.testnisite.com:8103/RNGWidgetContent/magicwin/template-v2/';
	
    ns._serviceUrl = 'https://services.testnisite.com:8103/RngWidget/RNG_API.svc/';

	ns.WidgetKey = '6653F6B6-771C-40B6-A1FE-016A502DA96D';

    var wsMagicUri = "wss://testnisite.com:4649/MagicWin";
     
	ns.assetIdSequence = ns.assetIdSequence || 1;
    ns.widgetIdSequence = ns.widgetIdSequence || 1;

    function CreatePackeges(Lang) {
        var version = Date.now().toString();
        var pack = {
            "MagicWin": {
                "js":
                    ["js\/magicwin-v2.js?v=" + version,
                        "js\/tmpMagicWin.js?v=" + version,
                        "js\/jquery.min.js?v=" + version,
                        "../txt/?lang=" + Lang, "../txt/?lang=" + Lang + "&page=rules"],
                "css": ["css\/magicwin-v2.css?v=" + version,
                    "css\/tmpMagicWin.css?v=" + version,
                    "css\/extra.css?v=" + version,
                    "css\/skinNightMode.css?v=" + version,
					"css\/specPartner.css?v=" + version]
            },
            
        };

        return pack;
    }

    function getAssetUrls(package, assetType) {
        var assets = [];
        var parts = package.assetType;
        for (var i = 1; i <= parts.length; ++i) {
            var path = parts.slice(0, i).join('.');
            if (_packages.hasOwnProperty(path)) {
                assets = assets.concat(_packages[path][assetType]);
            }
        }
        return assets;
    }

    function injectJSAssets(package, callback) {
        var scriptUrls = package.js;
        var scriptCount = scriptUrls.length;

        // check if there are any JS assets to load
        if (scriptCount == 0) {
            if (callback) callback();
            return;
        }

        for (var i = 0; i < scriptUrls.length; ++i) {
            // inject each JS file and notify caller when all scripts are downloaded and run
            injectScript(package, scriptUrls[i], function () {
                if (--scriptCount == 0 && callback) {
                    callback();
                }
            });
        }
    }

    function injectCSSAssets(package) {
        var styleSheetUrls = package.css;
        for (var i = 0; i < styleSheetUrls.length; ++i) {
            // check if the dependency is already loaded
            var url = ns._baseUrl + styleSheetUrls[i];
            var asset = ns.assets.css[url];

            if (!asset) {
                // prevent further loading of this asset by creating an entry for it
                asset = ns.assets.css[url] = constructAsset('css', url);

                // no onload event available, thus no callback
                var head = document.getElementsByTagName('head')[0];
                var l = document.createElement('link');

                l.id = asset.id;
                l.type = 'text/css';
                l.rel = 'stylesheet';
                l.href = url;
                
                head.appendChild(l);
                asset.loaded = true;
            }
            // addReference(asset, package);
        }
    }

  
    function injectScript(package, url, callback) {
        var asset = ns.assets.js[url];
        if (asset) {
            // track the reference
            // addReference(asset, package);
            // the dependency is either already loaded or is loading
            if (asset.loaded) {
                if (callback) callback();
            }
            else {
                asset.callbacks.push(callback);
            }
            return;
        }

        asset = ns.assets.js[url] = constructAsset('js', url);
        asset.callbacks.push(callback);
        // addReference(asset, package);

        // Add JavaScript file to the DOM
        var head = document.getElementsByTagName('head')[0];
        var s = document.createElement('script');

        s.id = asset.id;
        s.type = 'text/javascript';
        s.src = ns._baseUrl + url;
        s.async = false;

        head.appendChild(s);

        var readyCallback = function () {
            var state = s.readyState;
            if (!asset.loaded && (!state || /loaded|complete/.test(state))) {
                asset.loaded = true;
                for (var i = 0; i < asset.callbacks.length; ++i) {
                    if (asset.callbacks[i]) asset.callbacks[i]();
                }
                asset.callbacks = [];
                s.onreadystatechange = s.onload = null;
            }
        };

        if (s.addEventListener) {
            s.addEventListener('load', readyCallback, false);
        } else if (s.readyState) {
            s.onreadystatechange = readyCallback;
        }
    }

    function injectAssets(package, callback) {
        // Add CSS assets for package
        injectCSSAssets(package);
        // Add JavaScript assets for package
        injectJSAssets(package, function () {
            // Initialize SRLive and invoke caller's callback method
            // initSRLive();
            if (callback) {
                callback();
            }
        });
    }

    function constructWidgetId() {
        return 'web-' + 'magicwin' + '-' + (ns.widgetIdSequence++);
    }
    function constructAssetId() {
        return 'web-asset-' + 'magicwin' + '-' + (ns.assetIdSequence++);
    }
    function constructAsset(assetType, url) {
        return {
            id: constructAssetId(),
            url: url,
            type: assetType,
            loaded: false,
            callbacks: []
        };
    }


    ns.addWidget = function (SetUp) {
        _packages = CreatePackeges(SetUp.lang);
        // var id = 0;
        //ns.widgets[id] = null;
        if (ns.Loaded == 0) {
            injectAssets(_packages.MagicWin, function () {
                //console.log('Game loader is initialized.');
                SetUp.UserToken = SetUp.UserToken || "";
                MagicLoad.generateLayOut(SetUp.container, SetUp.lang, SetUp.options.game || "LuckySix", wsMagicUri, ns._baseUrl, SetUp.UserToken, ns._serviceUrl, ns.WidgetKey, SetUp);
                ns.Loaded = 1;
                SetUp.onLoad();
            });
        } else {
            console.log('Game loader is already initialized.');

        }

        return true;
    }

    //ako se naknadno pokušava postaviti usertoken

    ns.SetUserToken = function (SetUp) {
        if (ns.Loaded == 0) {
            console.log('Game loader is not initialized.');
            return false;
        }

        SetUp.UserToken = SetUp.UserToken || "";
        if (SetUp.UserToken.length > 0) {
            MagicLoad.SetUserToken(SetUp.UserToken);
            return true;
        } else {
            console.log('Please insert userToken.');
            return false;
        }
    }

    //ns.LoadRules = function (SetUp) {
    //    _packages = CreatePackeges(SetUp.lang);
    //    if (ns.RulesLoaded == 0) {
    //        injectAssets(_packages.MagicWinRules, function () {
    //            console.log('Game rules is initialized.');

    //            ns.RulesLoaded = 1;
    //            SetUp.onLoad();
    //        });
    //    }
    //};


}(window.MagicGames = window.MagicGames || {}));

