var cachedModules = [];
cachedModules[3183] = {
        exports: {}
    },
    function (e, t) {
        function r(e) {
            var t = "";
            if (process.argv.forEach(function (e, r, n) {
                    ["install-service", "uninstall-service"].indexOf(e) != -1 && (t = e)
                }), t) {
                var r = " -p \"" + o.resolve(i.rootDir + "/server") + "\"",
                    d = o.resolve(__dirname + "/./node_modules/winser/bin/winser");
                n.existsSync(d) || (d = o.resolve(__dirname + "/./../node_modules/winser/bin/winser")), n.existsSync(d) || (d = o.resolve(__dirname + "/./../../node_modules/winser/bin/winser")), d = o.resolve(d), s("node \"" + d + "\"  -r -x -s " + r, function () {
                    "install-service" == t && s("node \"" + d + "\" -i -s -a " + r, function (e, t, r) {
                        e && console.log(e), console.log(t), console.error(r), process.exit()
                    })
                })
            } else e && e()
        }
        var n = require("fs"),
            o = require("path"),
            s = require("child_process").exec,
            i = require("./lib_external/config");
        e.exports = r
    }.call(this, cachedModules[3183], cachedModules[3183].exports), cachedModules[7958] = {
        exports: {}
    },
    function (e, t) {
        "use strict";
        function r(e) {
            var t = (new Date).toLocaleTimeString("en-us", l).split(",");
            return t[0] + t[1] + " - " + e.level + ":    " + e.label + "    " + e.message
        }
        function n() {
            var e = (new Date).toLocaleTimeString("en-us", l).split(",");
            return e[0] + e[1]
        }
        var o = require("winston"),
            s = require("path"),
            i = (require("fs"), require("./lib_external/config")),
            d = require("winston-daily-rotate-file"),
            a = new o.Container,
            u = [],
            c = "2-digit",
            l = {
                day: c,
                month: c,
                year: c,
                hour: c,
                minute: c,
                second: c
            },
            f = s.resolve((i.rootDir || s.resolve(__dirname + "/../")) + "/" + i.logger.logsDir);
        e.exports = function (e) {
            var t = [],
                e = e || "server";
            t.push(new o.transports.Console({
                level: "silly",
                colorize: !0,
                prettyPrint: !0,
                timestamp: n,
                label: e
            })), i.logger.enabled && (i.logger.enableConsoleLog || t.splice(0, 1), t.push(new d({
                datePattern: "dd-MM-yyyy.log",
                level: i.logger.level,
                filename: f + "/file_",
                json: !1,
                maxsize: i.logger.maxsize || 1e6,
                maxFiles: i.logger.maxFiles || 10,
                label: e,
                formatter: r,
                zippedArchive: !1,
                createTree: !0
            }))), u.indexOf(e) == -1 && (a.add(e, {
                transports: t
            }), u.push(e));
            var s = a.get(e);
            return s.exitOnError = !1, s
        }
    }.call(this, cachedModules[7958], cachedModules[7958].exports), cachedModules[9186] = {
        exports: {}
    },
    function (e, t) {
        "use strict";
        function r() {
            var e = this;
            this.cluster = null, this.iter = null, this.getCluster = function () {}, this.setCluster = function (t) {
                e.cluster = t
            }, this.getNextWorkerIdx = function (e, t) {
                var r = {};
                return t + 1 <= e.length ? (r.done = !0, r.worker_idx = 0) : (r.done = !1, r.worker_idx = t + 1), r
            }, this.initIterator = function (e) {
                return 0
            }, this.init = function () {
                function t(e) {
                    r[e] = d.fork(), o.push({
                        idx: e,
                        pid: r[e].process.pid
                    }), i.push(e), r[e].on("exit", function (r, n, s) {
                        a.info("Restarting worker", e), o = c.without(o, c.findWhere(o, {
                            idx: e
                        })), 999 != n && t(e)
                    })
                }
                for (var r = [], o = [], i = [], d = e.cluster, l = n.clustering.instancesCount || u, f = 0; f < l; f++) t(f);
                var p = this.initIterator(i),
                    h = s.createServer({
                        pauseOnConnect: !0
                    }, function (t) {
                        var n = e.getNextWorkerIdx(i, p);
                        n.done && (p = e.initIterator(i));
                        var o = r[n.worker_idx];
                        o.send("sticky-session:connection", t)
                    });
                h.maxConnections = 1 / 0, h.listen(n.server.port), h.on("error", function (e) {
                    switch (e.code) {
                    case "EACCES":
                        a.error(n.server.port + " requires elevated privileges"), process.exit(999);
                        break;
                    case "EADDRINUSE":
                        a.error(n.server.port + " is already in use"), process.exit(999);
                        break;
                    default:
                        throw error
                    }
                })
            }
        }
        var n = require("./lib_external/config"),
            o = require("underscore"),
            s = require("net"),
            i = (require("http"), require("os")),
            d = cachedModules[7958].exports,
            a = d(),
            u = i.cpus().length,
            c = o._;
        e.exports = new r
    }.call(this, cachedModules[9186], cachedModules[9186].exports), cachedModules[1700] = {
        exports: {}
    },
    function (e, t) {
        "use strict";
        function r() {
            var e = this;
            this.app = null, this.getApp = function () {}, this.setApp = function (t) {
                e.app = t
            }, this.init = function () {
                var t = e.app,
                    r = t.listen(0, function () {
                        s.info("Server instance listening on port:%d PID:", n.server.port, process.pid)
                    });
                process.on("message", function (e, t) {
                    "sticky-session:connection" === e && (r.emit("connection", t), t.on("close", function () {}))
                })
            }
        }
        var n = require("./lib_external/config"),
            o = cachedModules[7958].exports,
            s = o();
        e.exports = new r
    }.call(this, cachedModules[1700], cachedModules[1700].exports), cachedModules[8268] = {
        exports: {}
    },
    function (e, t) {
        "use strict";
        function r() {
            this.init = function () {
                n.isMaster ? (o.setCluster(n), o.init()) : s.init()
            }
        }
        var n = require("cluster"),
            o = cachedModules[9186].exports,
            s = cachedModules[1700].exports;
        e.exports = new r
    }.call(this, cachedModules[8268], cachedModules[8268].exports), cachedModules[4524] = {
        exports: {}
    },
    function (e, t) {
        function r(e) {
            var t = decodeURIComponent(i.formatMongoose(e + (a.mongoose.otherNodes ? "," + a.mongoose.otherNodes : ""))),
                r = -1,
                n = d.defer();
            if (l.forEach(function (t, n) {
                    e.indexOf(t.host + ":" + t.port + "/" + t.name) != -1 && (r = n)
                }), r == -1 || r != -1 && !l[r].readyState) {
                c.info("Try to create new connection to: [" + e + "]"), a.mongoose.authEnabled && (t = t.replace("mongodb://", "mongodb://" + a.mongoose.userName + ":" + a.mongoose.password + "@"), t += "?authSource=" + a.mongoose.authDbName);
                var o = s.createConnection(t, f, function (e) {
                    e ? (c.error(e), n.reject(e.message)) : n.resolve(o)
                });
                o.on("error", function (t) {
                    c.error("Error on [" + e + "] database. " + t)
                }), o.once("open", function () {
                    c.info("Mongoose connnection estabilished to " + e)
                }), r == -1 ? l.push(o) : l[r] = o
            } else n.resolve(l[r]);
            return n.promise
        }
        function n(e, t, n) {
            function o(e) {
                return e.models[t] || n(e), e.model(t)
            }
            return e.name ? o(e) : r(e).then(o)
        }
        function o(e, t) {
            return function (r) {
                return n(r, e, t)
            }
        }
        var s = require("mongoose"),
            i = require("mongodb-uri"),
            d = require("q"),
            a = require("./lib_external/config"),
            u = cachedModules[7958].exports,
            c = u();
        s.Promise = d.Promise;
        var l = [],
            f = {
                server: {
                    reconnectTries: Number.MAX_VALUE,
                    reconnectInterval: 5e3
                }
            };
        a.mongoose.replicaEnabled && (f.replset = {
            rs_name: "repo",
            socketOptions: {
                keepAlive: 1,
                connectTimeoutMS: 3e4
            }
        }, f.native_parser = !1, f.slaveOK = !0), e.exports = {
            connections: l,
            getConnection: r,
            registerModel: o,
            masterModel: function (e, t) {
                return function (r) {
                    return n(r && r.name == a.mongoose.masterDbName ? r : a.mongoose.connPrefix + "/" + a.mongoose.masterDbName, e, t)
                }
            }
        }
    }.call(this, cachedModules[4524], cachedModules[4524].exports), cachedModules[8471] = {
        exports: {}
    },
    function (e, t) {
        var r = require("crypto"),
            n = "aes-256-ctr",
            o = "hex";
        e.exports = {
            getRandomSequence: function (e, t) {
                return r.randomBytes(e).toString(t || o)
            },
            createSalt: function (e) {
                return r.randomBytes(e || 128).toString("base64")
            },
            makeHash: function (e, t) {
                var n = r.createHmac("sha1", e);
                return n.update(t).digest("hex")
            },
            encrypt: function (e, t, o) {
                var s = r.createCipher(o || n, t),
                    i = Buffer.concat([s.update(e), s.final()]);
                return i
            },
            decrypt: function (e, t, o) {
                var s = r.createDecipher(o || n, t),
                    i = Buffer.concat([s.update(e), s.final()]);
                return i
            }
        }
    }.call(this, cachedModules[8471], cachedModules[8471].exports), cachedModules[7979] = {
        exports: {}
    },
    function (e, t) {
        function r() {}
        function n(e) {
            var t = o.Schema({
                    name: {
                        type: String
                    },
                    description: {
                        type: String
                    },
                    active: {
                        type: Boolean
                    }
                }, {
                    read: i.mongoose.replSetRead || "nearest"
                }),
                n = e.model("Partner", t);
            n.Init = function (e) {
                e = e || r, n.findOne({
                    name: "InstaBI"
                }).exec(function (t, r) {
                    if (t || r) e(t, r);
                    else {
                        console.log("Init Partners Model");
                        var o = new n({
                            name: "InstaBI",
                            description: "Default InstaBI Partner"
                        });
                        o.save(e)
                    }
                })
            }
        }
        var o = (require("q"), require("mongoose")),
            s = cachedModules[4524].exports,
            i = (cachedModules[8471].exports, require("./lib_external/config"));
        e.exports = s.masterModel("Partner", n)
    }.call(this, cachedModules[7979], cachedModules[7979].exports), cachedModules[4585] = {
        exports: {}
    },
    function (e, t) {
        function r(e) {
            return f[0].test(e.substr(0, 4)) || f[1].test(e)
        }
        function n(e) {
            var t = [];
            return e.indexOf("en") == -1 && t.push(u[0]), u.forEach(function (r) {
                e.indexOf(r.value) != -1 && t.push(r)
            }), t
        }
        var o = (require("./lib_external/config"), {
                dashboard: "dashboard",
                report: "reportbuilder",
                shell: "shell"
            }),
            s = {
                document: "document",
                folder: "folder"
            },
            i = [{
                name: "Site Administrator",
                sn: "admins",
                power: 0
            }, {
                name: "Role Manager",
                sn: "managers",
                power: 1
            }, {
                name: "Data Architect",
                sn: "dataarchitect",
                power: 2
            }, {
                name: "Designer",
                sn: "designers",
                power: 3
            }, {
                name: "Interactor",
                sn: "interactors",
                power: 4
            }, {
                name: "Viewer",
                sn: "viewers",
                power: 100
            }],
            d = [{
                name: "Access/Read",
                enum: 100,
                type: "folder,role,document"
            }, {
                name: "Write",
                enum: 101,
                type: "folder,role"
            }, {
                name: "Manage User",
                enum: 200,
                type: "role"
            }, {
                name: "Manage Folder",
                enum: 201,
                type: "role"
            }, {
                name: "Manage DataSource",
                enum: 202,
                type: "role"
            }, {
                name: "Manage Groups",
                enum: 203,
                type: "role"
            }, {
                name: "Manage DataLoader",
                enum: 204,
                type: "role"
            }, {
                name: "Publisher",
                enum: 205,
                type: "role"
            }, {
                name: "Create Report",
                enum: 300,
                type: "role"
            }, {
                name: "Design Dashboard",
                enum: 301,
                type: "role"
            }, {
                name: "Prepare Data",
                enum: 302,
                type: "role"
            }, {
                name: "Slicer Interaction",
                enum: 304,
                type: "role"
            }, {
                name: "Drill Analysis",
                enum: 305,
                type: "role"
            }, {
                name: "Clear Query",
                enum: 306,
                type: "role"
            }, {
                name: "Hide Show Row/Columns",
                enum: 307,
                type: "role"
            }, {
                name: "Change Report Settings",
                enum: 308,
                type: "role"
            }, {
                name: "Drill Through",
                enum: 401,
                type: "document,role"
            }, {
                name: "Export PDF",
                enum: 402,
                type: "document,role"
            }, {
                name: "Export Excel",
                enum: 403,
                type: "document,role"
            }, {
                name: "Export Image",
                enum: 404,
                type: "document,role"
            }, {
                name: "Export Powerpoint",
                enum: 405,
                type: "document,role"
            }, {
                name: "Export Word",
                enum: 406,
                type: "document,role"
            }, {
                name: "My Folder",
                enum: 500,
                type: "role"
            }],
            a = {
                power0: ["100", "101", "200", "201", "202", "203", "204", "205", "300", "301", "302", "304", "305", "306", "307", "308", "500", "401", "402", "403", "404", "405", "406"],
                power1: ["200", "201", "203"],
                power2: ["100", "101", "202", "204", "205", "300", "301", "302", "304", "305", "306", "307", "308", "401", "402", "403", "404", "405", "406", "500"],
                power3: ["100", "101", "300", "301", "304", "305", "306", "307", "308", "500", "401", "402", "403", "404", "405", "406", "500"],
                power4: ["100", "101", "300", "304", "305", "306", "307", "308", "401", "402", "403", "404", "405", "406", "500"],
                power100: ["100"]
            },
            u = [{
                name: "English",
                value: "en",
                cultures: ["en-GB", "en-US"]
            }, {
                name: decodeURI("%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9"),
                value: "ru",
                cultures: ["ru-RU"]
            }, {
                name: decodeURI("%E4%B8%AD%E6%96%87"),
                value: "zh_CN",
                cultures: ["zh-CN"]
            }],
            c = {
                userName: "Public",
                rolePower: 100
            },
            l = ["startupD", "startupM", "startupT"],
            f = [/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i, /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i];
        e.exports = {
            roles: i,
            permissions: d,
            rolePermissions: a,
            modulesTypeName: o,
            securityStrategy: {
                optimisticMethod: !0,
                publicFolderOptimisticMethod: !1
            },
            documentPermission: {
                permissionsType: [s.document],
                documentType: {
                    dashboard: o.dashboard,
                    report: o.report
                },
                moduleType: {
                    users: "users",
                    groups: "groups"
                },
                defaultPermissionsValues: !0
            },
            folderPermission: {
                permissionsType: [s.folder],
                defaultPermissionsValues: !1
            },
            language: {
                getLanguageObject: n
            },
            publicUser: c,
            defaultStartUpSettings: {
                group: !0,
                personal: !0
            },
            startupObjectNames: l,
            isMobileDevice: r
        }
    }.call(this, cachedModules[4585], cachedModules[4585].exports), cachedModules[8967] = {
        exports: {}
    },
    function (e, t) {
        function r() {
            this.permissions = n.permissions, this.findAll = function () {
                return this.permissions
            }, this.findByName = function (e) {
                var t = this.permissions.filter(function (t) {
                    return t.name == e
                });
                return t.length > 0 ? t[0] : null
            }, this.findByCode = function (e) {
                var t = this.permissions.filter(function (t) {
                    return t.enum == e
                });
                return t.length > 0 ? t[0] : null
            }, this.findByType = function (e) {
                return this.permissions.filter(function (t) {
                    return t.type.indexOf(e) != -1
                })
            }
        }
        var n = cachedModules[4585].exports;
        r.instance = null, r.getInstance = function () {
            return null == this.instance && (this.instance = new r), this.instance
        }, e.exports = r.getInstance()
    }.call(this, cachedModules[8967], cachedModules[8967].exports), cachedModules[1950] = {
        exports: {}
    },
    function (e, t) {
        function r() {}
        function n(e) {
            var t = s.Schema({
                    name: {
                        type: String
                    },
                    enum: {
                        type: String
                    },
                    type: {
                        type: String
                    }
                }, {
                    read: d.mongoose.replSetRead || "nearest"
                }),
                n = a.permissions,
                i = e.model("PermissionList", t);
            i.Init = function (e) {
                e = e || r;
                var t = [],
                    s = [];
                n.forEach(function (e, r) {
                    s.push(e.enum), t.push(i.findOneAndUpdate({
                        enum: e.enum
                    }, {
                        $set: {
                            name: e.name,
                            enum: e.enum,
                            type: e.type
                        }
                    }, {
                        new: !0,
                        upsert: !0
                    }).exec())
                }), i.remove({
                    enum: {
                        $nin: s
                    }
                }, r), o.all(t).then(function (t) {
                    e(null, t)
                })
            }, i.GetNameById = function (e) {
                return i.findById(e).exec()
            }
        }
        var o = require("q"),
            s = require("mongoose"),
            i = cachedModules[4524].exports,
            d = (cachedModules[8471].exports, require("./lib_external/config")),
            a = cachedModules[8967].exports;
        e.exports = {
            masterDB: i.masterModel("PermissionList", n),
            slaveDB: i.registerModel("PermissionList", n)
        }
    }.call(this, cachedModules[1950], cachedModules[1950].exports), cachedModules[5115] = {
        exports: {}
    },
    function (e, t) {
        e.exports = cachedModules[1950].exports.masterDB
    }.call(this, cachedModules[5115], cachedModules[5115].exports), cachedModules[2564] = {
        exports: {}
    },
    function (e, t) {
        function r() {
            this.roles = n.roles, this.findAll = function () {
                return this.roles
            }, this.findByName = function (e) {
                var t = this.roles.filter(function (t) {
                    return t.name == e
                });
                return t.length > 0 ? t[0] : null
            }, this.findByPower = function (e) {
                var t = this.roles.filter(function (t) {
                    return t.power == e
                });
                return t.length > 0 ? t[0] : null
            }, this.getDescription = function (e) {
                var t = [],
                    r = n.rolePermissions["power" + e];
                return r && n.permissions.forEach(function (e) {
                    r.indexOf(e.enum.toString()) != -1 && t.push(e.name)
                }), t.join(",")
            }
        }
        var n = cachedModules[4585].exports;
        r.instance = null, r.getInstance = function () {
            return null == this.instance && (this.instance = new r), this.instance
        }, e.exports = r.getInstance()
    }.call(this, cachedModules[2564], cachedModules[2564].exports), cachedModules[6394] = {
        exports: {}
    },
    function (e, t) {
        function r() {}
        function n(e) {
            var t = s.Schema({
                    name: {
                        type: String
                    },
                    sn: {
                        type: String
                    },
                    power: {
                        type: Number
                    },
                    description: {
                        type: String
                    }
                }, {
                    read: d.mongoose.replSetRead || "nearest"
                }),
                n = a.roles,
                i = e.model("Roles", t);
            i.Init = function (e) {
                e = e || r;
                var t = [],
                    s = [];
                n.forEach(function (e) {
                    s.push(e.power), t.push(i.findOneAndUpdate({
                        power: e.power
                    }, {
                        $set: {
                            name: e.name,
                            sn: e.sn,
                            power: e.power,
                            description: a.getDescription(e.power) || e.name
                        }
                    }, {
                        new: !0,
                        upsert: !0
                    }).exec())
                }), i.remove({
                    power: {
                        $nin: s
                    }
                }, r), o.all(t).then(function (t) {
                    e(null, t)
                }, function (t) {
                    e(t)
                })
            }, i.GetAll = function (e) {
                e = e || r, i.find({}).sort({
                    power: 1
                }).lean().exec(e)
            }, i.GetNameById = function (e) {
                return i.findById(e).exec()
            }, i.GetServerAdminRole = function (e) {
                e = e || r, i.findOne({
                    power: 0
                }).exec(e)
            }, i.GetInteractorAdminRole = function (e) {
                e = e || r, i.findOne({
                    power: 0
                }).exec(e)
            }, i.CheckIsAdminRole = function (e, t) {
                t = t || r, i.findById(e, function (e, r) {
                    if (!e && r) {
                        var n = 0 == r.power;
                        t(null, n, r)
                    } else t(e, !1)
                })
            }
        }
        var o = require("q"),
            s = require("mongoose"),
            i = cachedModules[4524].exports,
            d = (cachedModules[8471].exports, require("./lib_external/config")),
            a = cachedModules[2564].exports;
        e.exports = i.masterModel("Roles", n)
    }.call(this, cachedModules[6394], cachedModules[6394].exports), cachedModules[929] = {
        exports: {}
    },
    function (e, t) {
        function r() {}
        function n(e) {
            var t = o.Schema({
                    partnerId: {
                        type: o.Schema.Types.ObjectId
                    },
                    name: {
                        type: String
                    },
                    description: {
                        type: String
                    },
                    dbPath: {
                        type: String
                    },
                    default: {
                        type: Boolean,
                        default: !1
                    },
                    status: {
                        type: String
                    },
                    adminUserId: {
                        type: o.Schema.Types.ObjectId
                    },
                    disabled: {
                        type: Boolean,
                        default: !1
                    }
                }, {
                    read: i.mongoose.replSetRead || "nearest"
                }),
                n = e.model("Site", t);
            n.Init = function (e, t, o) {
                o = o || r, n.findOne({
                    partnerId: e._id,
                    disabled: !1
                }).exec(function (r, s) {
                    if (r || s) o(r, s);
                    else {
                        console.log("create default site");
                        var i = new n({
                            partnerId: e._id,
                            name: "Default",
                            description: e.name + "\'s default site",
                            adminUserId: t,
                            default: !0,
                            disabled: !1
                        });
                        i.save(o)
                    }
                })
            }
        }
        var o = (require("q"), require("mongoose")),
            s = cachedModules[4524].exports,
            i = (cachedModules[8471].exports, require("./lib_external/config"));
        e.exports = s.masterModel("Site", n)
    }.call(this, cachedModules[929], cachedModules[929].exports), cachedModules[2129] = {
        exports: {}
    },
    function (e, t) {
        function r() {}
        function n(e) {
            return "^" + e.replace(/[-\/\\^$*+?.()|[\]{}]/g, String.fromCharCode(92) + "$&") + "$"
        }
        function o(e) {
            var t = s.Schema({
                firstName: {
                    type: String,
                    default: ""
                },
                lastName: {
                    type: String,
                    default: ""
                },
                userName: {
                    type: String,
                    unique: !0,
                    required: !0
                },
                partnerId: {
                    type: s.Schema.Types.ObjectId
                },
                roleId: {
                    type: s.Schema.Types.ObjectId
                },
                salt: {
                    type: String
                },
                hashed_pwd: {
                    type: String
                },
                blocked: {
                    type: Boolean,
                    default: !1
                },
                dob: {
                    type: Date
                },
                gender: {
                    type: String,
                    default: ""
                },
                email: {
                    type: String
                },
                phone: {
                    type: String,
                    default: ""
                },
                avatar: {
                    type: String,
                    default: null
                },
                sessionId: {
                    type: String
                },
                token: {
                    type: String
                },
                _role: {
                    type: String
                },
                authId: {
                    type: String
                },
                meta: {
                    createdDate: {
                        type: Date,
                        default: Date.now
                    },
                    createdUser: {
                        type: s.Schema.Types.ObjectId
                    }
                }
            }, {
                read: a.mongoose.replSetRead || "nearest"
            });
            t.methods = {
                checkPassword: function (e) {
                    return d.makeHash(this.salt, e) === this.hashed_pwd
                },
                isAdmin: function () {
                    return "superadmin" == this._role || "partner" == this._role
                }
            };
            var o = e.model("User", t);
            o.Init = function (e, t, n) {
                n = n || r;
                var s = d.createSalt(),
                    i = d.makeHash(s, a.defaultInitParams.adminPassword);
                o.findOne({
                    userName: a.defaultInitParams.adminUserName
                }).exec(function (r, d) {
                    if (r || d) n(r, d);
                    else {
                        var u = new o({
                            userName: a.defaultInitParams.adminUserName,
                            firstName: a.defaultInitParams.adminUserName,
                            lastName: "",
                            partnerId: e._id,
                            roleId: t,
                            salt: s,
                            hashed_pwd: i,
                            email: "",
                            phone: "",
                            gender: "",
                            blocked: !1,
                            avatar: null,
                            _role: "superadmin",
                            sessionId: "",
                            meta: {
                                createdDate: new Date
                            }
                        });
                        u.save(n)
                    }
                })
            }, o.InitPublicUser = function (e, t, n) {
                n = n || r;
                var s = u.publicUser.userName,
                    i = d.createSalt(),
                    c = d.makeHash(i, a.defaultInitParams.publicUserPassword);
                o.findOne({
                    userName: s
                }).exec(function (r, d) {
                    if (r || d) n(r, d);
                    else {
                        var a = new o({
                            userName: s,
                            firstName: s,
                            lastName: "",
                            partnerId: e,
                            roleId: t,
                            salt: i,
                            hashed_pwd: c,
                            email: "",
                            phone: "",
                            gender: "",
                            sessionId: "",
                            blocked: !1,
                            avatar: null,
                            meta: {
                                createdDate: new Date
                            }
                        });
                        a.save(n)
                    }
                })
            }, o.getPublicUser = function () {
                return o.findOne({
                    userName: u.publicUser.userName
                }, {
                    partnerId: 0,
                    salt: 0,
                    hashed_pwd: 0
                }).lean().exec()
            }, o.GetNameById = function (e) {
                return o.findById(e).exec()
            }, o.findByUserName = function (e, t) {
                o.findOne({
                    userName: {
                        $regex: n(e),
                        $options: "i"
                    }
                }).exec(t)
            }, o.addUser = function (e, t) {
                o.findOne({
                    userName: {
                        $regex: n(e.userName),
                        $options: "i"
                    }
                }).exec(function (r, n) {
                    if (r || n) return t(err || "User already exists");
                    var s = new o({
                        userName: e.userName || "",
                        firstName: e.firstName,
                        lastName: e.lastName,
                        partnerId: e.partnerId || "",
                        roleId: e.roleId,
                        email: e.email || "",
                        phone: e.phone || "",
                        blocked: !!e.blocked,
                        dob: e.dob,
                        gender: e.gender,
                        avatar: e.avatar || null,
                        _role: e._role || "",
                        sessionId: e.sessionId || "",
                        authId: e.authId,
                        meta: {
                            createdDate: new Date
                        }
                    });
                    if (!e.authId && e.newPwd) {
                        var i = d.createSalt(),
                            a = d.makeHash(i, e.newPwd);
                        s.salt = i, s.hashed_pwd = a
                    }
                    s.save(t)
                })
            }, o.updateUser = function (e, t, r) {
                function n() {
                    if (void 0 != t.userName && (s.userName = t.userName), void 0 != t.firstName && (s.firstName = t.firstName), void 0 != t.lastName && (s.lastName = t.lastName), void 0 != t.email && (s.email = t.email || ""), void 0 != t.phone && (s.phone = t.phone || ""), void 0 != t.blocked && (s.blocked = t.blocked), void 0 != t.dob && (s.dob = t.dob), void 0 != t.gender && (s.gender = t.gender), null != t.avatar && (s.avatar = t.avatar || ""), void 0 != t.partnerId && (s.partnerId = t.partnerId), void 0 != t.roleId && (s.roleId = t.roleId), void 0 != t._role && (s._role = t._role || ""), void 0 != t.sessionId && (s.sessionId = t.sessionId || ""), void 0 != t.authId && (s.authId = t.authId || ""), t.newPwd) {
                        var e = d.createSalt(),
                            r = d.makeHash(e, t.newPwd);
                        s.salt = e, s.hashed_pwd = r
                    }
                }
                var s = {};
                n(), o.findOneAndUpdate({
                    _id: e
                }, {
                    $set: s
                }, {
                    new: !0
                }, function (e, t) {
                    r(e, t, s.roleId)
                })
            }
        }
        var s = (require("q"), require("mongoose")),
            i = cachedModules[4524].exports,
            d = cachedModules[8471].exports,
            a = require("./lib_external/config"),
            u = cachedModules[4585].exports;
        e.exports = i.masterModel("User", o)
    }.call(this, cachedModules[2129], cachedModules[2129].exports), cachedModules[1526] = {
        exports: {}
    },
    function (e, t) {
        function r(e) {
            var t = n.Schema({
                    userId: {
                        type: n.Schema.Types.ObjectId
                    },
                    siteId: {
                        type: n.Schema.Types.ObjectId
                    },
                    roleId: {
                        type: n.Schema.Types.ObjectId
                    }
                }, {
                    read: s.mongoose.replSetRead || "nearest"
                }),
                r = e.model("UsersMap", t);
            r.Init = function (e, t, n, o) {
                r.findOne({
                    userId: e,
                    siteId: t
                }).exec(function (s, i) {
                    if (!i) {
                        var d = new r({
                            userId: e,
                            siteId: t,
                            roleId: n
                        });
                        d.save(o)
                    }
                })
            }, r.findUserSites = function (e, t) {
                r.find({
                    userId: e
                }).exec(t)
            }
        }
        var n = (require("q"), require("mongoose")),
            o = cachedModules[4524].exports,
            s = (cachedModules[8471].exports, require("./lib_external/config"));
        e.exports = o.masterModel("UsersMap", r)
    }.call(this, cachedModules[1526], cachedModules[1526].exports), cachedModules[9118] = {
        exports: {}
    },
    function (e, t) {
        function r(e) {
            var t = n.Schema({
                    userId: i.Types.ObjectId,
                    settingType: String,
                    settingObject: i.Types.Mixed
                }, {
                    read: s.mongoose.replSetRead || "nearest"
                }),
                r = e.model(d, t);
            r.getAllUserSettings = function (e) {
                callback = callback || noop, r.find({
                    userId: e
                }, callback)
            }, r.getSetting = function (e, t, n) {
                n = n || noop, r.findOne({
                    userId: e,
                    settingType: t
                }, n)
            }, r.setSetting = function (e, t, n, o) {
                o = o || noop, r.findOneAndUpdate({
                    userId: e,
                    settingType: t
                }, {
                    userId: e,
                    settingType: t,
                    settingObject: n
                }, {
                    new: !0,
                    upsert: !0
                }, o)
            }
        }
        var n = require("mongoose"),
            o = cachedModules[4524].exports,
            s = require("./lib_external/config"),
            i = n.Schema,
            d = "userSettings";
        e.exports = o.masterModel(d, r)
    }.call(this, cachedModules[9118], cachedModules[9118].exports), cachedModules[3760] = {
        exports: {}
    },
    function (e, t) {
        var r = (require("q"), require("mongoose"), cachedModules[4524].exports, cachedModules[8471].exports, require("./lib_external/config"), cachedModules[7979].exports),
            n = cachedModules[5115].exports,
            o = cachedModules[6394].exports,
            s = cachedModules[929].exports,
            i = cachedModules[2129].exports,
            d = cachedModules[1526].exports,
            a = cachedModules[9118].exports,
            u = {
                UsersMap: d,
                Sites: s,
                Partners: r,
                Users: i,
                PermissionList: n,
                Roles: o,
                UserSettings: a
            };
        e.exports = u
    }.call(this, cachedModules[3760], cachedModules[3760].exports), cachedModules[7746] = {
        exports: {}
    },
    function (e, t) {
        function r() {}
        function n(e) {
            var t = o.Schema({
                    userName: {
                        type: String
                    },
                    firstName: {
                        type: String
                    },
                    lastName: {
                        type: String
                    },
                    email: {
                        type: String
                    },
                    userId: {
                        type: d.Types.ObjectId
                    },
                    roleId: {
                        type: d.Types.ObjectId
                    },
                    isAdmin: {
                        type: Boolean,
                        default: !1
                    },
                    sessionId: {
                        type: String
                    },
                    token: {
                        type: String
                    }
                }, {
                    read: i.mongoose.replSetRead || "nearest"
                }),
                n = e.model("User", t);
            n.GetNameById = function (e) {
                return n.findOne({
                    userId: e
                }).exec()
            }, n.GetUsersByRole = function (e, t) {
                t = t || r, n.find({
                    roleId: e
                }).exec(function (e, r) {
                    if (!e) return t(e, null);
                    var n = r.map(function (e) {
                        return e.userId.toString()
                    });
                    a.Users().then(function (e) {
                        e.find({
                            _id: {
                                $in: n
                            }
                        }, {
                            userName: 1
                        }).lean().exec(t)
                    })
                })
            }, n.GetUserRole = function (e, t) {
                t = t || r, n.findOne({
                    userId: e
                }).exec(t)
            }, n.InitUser = function (e, t, o, s, i) {
                i = i || r, s = s || {
                    userName: e.toString()
                }, n.findOne({
                    userId: e
                }).exec(function (r, d) {
                    if (r) i(r, null);
                    else if (d) i(null, d);
                    else {
                        s.userId = e, s.roleId = t, s.isAdmin = o, s.sessionId = "";
                        var a = new n(s);
                        a.save(function (e, t) {
                            i(e, t)
                        })
                    }
                })
            }, n.ExtendUserInfo = function (e, t, o) {
                o = o || r, n.findOneAndUpdate({
                    userId: e
                }, {
                    $set: t
                }, {
                    new: !0
                }).exec(o)
            }, n.UpdateUser = function (e, t, o) {
                o = o || r, n.findOne({
                    userId: e
                }).exec(function (r, n) {
                    if (r) o(r, null);
                    else if (n) {
                        a.Users().then(function (s) {
                            s.findOneAndUpdate({
                                _id: e
                            }, {
                                $set: t
                            }, {
                                new: !0
                            }, function (e, t) {
                                o(r, t, n.roleId)
                            })
                        })
                    } else o("User not exist", null)
                })
            }, n.UpdateUserInfoFromMaster = function (e, t) {
                t = t || r, a.Roles().then(function (r) {
                    r.GetServerAdminRole(function (o, s) {
                        return o || !s ? t(o || "Admin Role not found") : void a.Users(r.db).findOne({
                            _id: e
                        }, function (r, o) {
                            return r || !o ? t(r || "Not found master user!") : void n.findOneAndUpdate({
                                userId: e
                            }, {
                                $set: {
                                    userName: o.userName,
                                    firstName: o.firstName,
                                    lastName: o.lastName,
                                    email: o.email,
                                    userId: o._id,
                                    roleId: o.roleId,
                                    isAdmin: o.roleId.toString() == s._id.toString(),
                                    sessionId: ""
                                }
                            }, {
                                upsert: !0,
                                new: !0
                            }).exec(function (e, r) {
                                console.log("Updated user from master", e, r.userId, r.userName), t(e, r)
                            })
                        })
                    })
                })
            }, n.UpdateUserRole = function (t, o, s, i, d, u) {
                u = u || r, n.findOneAndUpdate({
                    userId: t
                }, {
                    $set: {
                        roleId: o,
                        isAdmin: s,
                        sessionId: ""
                    }
                }, {
                    new: !0
                }).exec(function (r, n) {
                    r ? u(r, null) : (d(e).InitUserPermission(t, o, i), a.UsersMap().then(function (r) {
                        r.findOneAndUpdate({
                            userId: t,
                            siteId: e.name
                        }, {
                            $set: {
                                roleId: o
                            }
                        }, {
                            upsert: !0
                        }).exec(function (e, t) {})
                    }), u(null, n))
                })
            }, n.InitUserAdminInSite = function (e, t) {
                t = t || r, a.Roles().then(function (r) {
                    r.GetServerAdminRole(function (r, o) {
                        r ? t(r, o) : o ? n.findOneAndUpdate({
                            userId: e
                        }, {
                            $set: {
                                userId: e,
                                roleId: o._id,
                                isAdmin: !0
                            }
                        }, {
                            new: !0,
                            upsert: !0
                        }).exec(t) : t("No admin role", null)
                    })
                })
            }, n.AssignUserAdminRole = function (e, t) {
                t = t || r, a.Roles().then(function (r) {
                    r.GetServerAdminRole(function (r, o) {
                        r ? t(r, null) : o ? n.findOneAndUpdate({
                            userId: e
                        }, {
                            $set: {
                                userId: e,
                                roleId: o._id,
                                isAdmin: !0,
                                sessionId: ""
                            }
                        }, {
                            upsert: !0,
                            new: !0
                        }).exec(t) : t("No admin role", null)
                    })
                })
            }, n.AssignUserWithRole = function (e, t, o) {
                o = o || r, a.Roles().then(function (r) {
                    r.GetServerAdminRole(function (r, s) {
                        return r || !s ? o(r || "Not found admin role", null) : void n.findOneAndUpdate({
                            userId: e
                        }, {
                            $set: {
                                userId: e,
                                roleId: t,
                                isAdmin: s._id.toString() == t,
                                sessionId: ""
                            }
                        }, {
                            upsert: !0,
                            new: !0
                        }).exec(o)
                    })
                })
            }, n.RemoveUser = function (e, t) {
                t = t || r, n.remove({
                    userId: e
                }).exec(t)
            }, n.RemoveUsers = function (e, t) {
                t = t || r;
                var o = e.map(function (e) {
                    return e._id.toString()
                });
                n.remove({
                    userId: {
                        $in: o
                    }
                }).exec().then(function (e) {
                    t(null, o)
                }, t)
            }
        }
        var o = (require("q"), require("mongoose")),
            s = cachedModules[4524].exports,
            i = require("./lib_external/config"),
            d = o.Schema,
            a = cachedModules[3760].exports;
        e.exports = s.registerModel("User", n)
    }.call(this, cachedModules[7746], cachedModules[7746].exports), cachedModules[2049] = {
        exports: {}
    },
    function (e, t) {
        var r = (cachedModules[8471].exports, require("jwt-simple")),
            n = "total secret !@#$%^&*";
        e.exports = {
            createToken: function (e) {
                return r.encode(e, n)
            },
            decodeToken: function (e) {
                try {
                    return r.decode(e, n)
                } catch (e) {
                    return null
                }
            }
        }
    }.call(this, cachedModules[2049], cachedModules[2049].exports), cachedModules[3669] = {
        exports: {}
    },
    function (e, t) {
        function r() {}
        function n(e) {
            var t = s.Schema({
                    name: {
                        type: String
                    },
                    description: {
                        type: String
                    },
                    userIds: [{
                        userId: a.Types.ObjectId
                    }],
                    default: {
                        type: Boolean,
                        default: !1
                    },
                    admins: {
                        type: Boolean,
                        default: !1
                    },
                    settings: {
                        startupM: {
                            docId: {
                                type: a.Types.ObjectId,
                                default: null
                            },
                            type: {
                                type: String,
                                default: null
                            }
                        },
                        startupD: {
                            docId: {
                                type: a.Types.ObjectId,
                                default: null
                            },
                            type: {
                                type: String,
                                default: null
                            }
                        },
                        startupT: {
                            docId: {
                                type: a.Types.ObjectId,
                                default: null
                            },
                            type: {
                                type: String,
                                default: null
                            }
                        }
                    },
                    createdDate: {
                        type: Date,
                        default: Date.now
                    }
                }, {
                    read: d.mongoose.replSetRead || "nearest"
                }),
                n = e.model("Group", t);
            n.InitAdmins = function (e) {
                e = e || r, n.findOneAndUpdate({
                    default: !0,
                    admins: !0
                }, {
                    $set: {
                        name: "Site Administrators",
                        description: "Administrators Group",
                        default: !0,
                        admins: !0
                    }
                }, {
                    upsert: !0,
                    new: !0
                }, e)
            }, n.InitEveryone = function (e) {
                e = e || r, n.findOneAndUpdate({
                    default: !0,
                    admins: !1
                }, {
                    $set: {
                        name: "Everyone",
                        description: "Everyone Group",
                        default: !0,
                        admins: !1
                    }
                }, {
                    new: !0,
                    upsert: !0
                }, e)
            }, n.FindByUserId = function (e, t) {
                t = t || r, n.find({
                    "userIds.userId": e
                }).lean().exec(t)
            }, n.AddUserToDefaultGroup = function (e, t, o) {
                o = o || r, t && n.findOneAndUpdate({
                    default: !0,
                    admins: !0,
                    "userIds.userId": {
                        $nin: [e]
                    }
                }, {
                    $push: {
                        userIds: {
                            userId: e
                        }
                    }
                }, {
                    new: !0
                }).exec(r), n.findOneAndUpdate({
                    default: !0,
                    admins: !1,
                    "userIds.userId": {
                        $nin: [e]
                    }
                }, {
                    $push: {
                        userIds: {
                            userId: e
                        }
                    }
                }, {
                    new: !0
                }).exec(o)
            }, n.AddUserToAdminsGroup = function (e, t) {
                t = t || r, n.findOneAndUpdate({
                    default: !0,
                    admins: !0,
                    "userIds.userId": {
                        $nin: [e]
                    }
                }, {
                    $push: {
                        userIds: {
                            userId: e
                        }
                    }
                }, {
                    new: !0
                }).exec(t)
            }, n.RemoveUserFromAdminGroup = function (e, t) {
                t = t || r, n.findOneAndUpdate({
                    default: !0,
                    admins: !0
                }, {
                    $pull: {
                        userIds: {
                            userId: e
                        }
                    }
                }, {
                    new: !0
                }).exec(t)
            }, n.RemoveUser = function (e, t) {
                t = t || r, n.update({}, {
                    $pull: {
                        userIds: {
                            userId: e
                        }
                    }
                }, {
                    multi: !0
                }).exec(t)
            }, n.RemoveGroups = function (e, t) {
                t = t || r;
                var s = [];
                e.forEach(function (e) {
                    s.push(n.findOneAndRemove({
                        _id: e._id,
                        default: !1
                    }).exec().then(function (t) {
                        return o.resolve(e._id)
                    }, function (e) {
                        return o.resolve("")
                    }))
                }), t(o.all(s))
            }
        }
        var o = require("q"),
            s = require("mongoose"),
            i = cachedModules[4524].exports,
            d = require("./lib_external/config"),
            a = s.Schema;
        e.exports = i.registerModel("Group", n)
    }.call(this, cachedModules[3669], cachedModules[3669].exports), cachedModules[4991] = {
        exports: {}
    },
    function (e, t) {
        function r() {}
        function n(e) {
            var t = s.Schema({
                nodeType: {
                    type: String
                },
                rootFolderId: {
                    type: a.Types.ObjectId
                },
                name: {
                    type: String
                },
                lcName: {
                    type: String
                },
                metaData: [],
                iconUrl: {
                    type: String
                },
                isPersonal: {
                    type: Boolean
                },
                createdDate: {
                    type: Date,
                    default: Date.now
                },
                createdUser: {
                    type: a.Types.ObjectId
                },
                description: {
                    type: String
                },
                lastModifiedData: {
                    type: Date
                }
            }, {
                read: d.mongoose.replSetRead || "nearest"
            });
            t.statics.objectId = function (e) {
                return s.Types.ObjectId(e)
            }, t.pre("save", function (e) {
                this.lcName = this.name.toLowerCase(), e()
            }), t.pre("update", function (e) {
                this.lcName = this.name.toLowerCase(), e()
            });
            var n = e.model("Folder", t);
            n.InitPublicFolder = function (e) {
                e = e || r, n.findOne({
                    createdUser: null,
                    isPersonal: !1,
                    rootFolderId: null
                }).exec(function (t, r) {
                    if (t || r) e(t, r);
                    else {
                        var o = new n({
                            nodeType: "folder",
                            rootFolderId: null,
                            name: "Public",
                            description: "Public Folder",
                            isPersonal: !1,
                            createdDate: new Date
                        });
                        o.save(e)
                    }
                })
            }, n.normalizeNames = function (e) {
                e = e || r, n.find({}).exec(function (t, n) {
                    if (t) return e("Error normalize folders: " + t);
                    var o = 0;
                    n.forEach(function (e, t) {
                        e.name || (e.name = "Folder" + t.toString()), e.name.toLowerCase() != e.lcName && (e.lcName = e.name.toLowerCase(), e.save(r), o++)
                    }), e(null, o)
                })
            }, n.InitMyFolder = function (e, t) {
                t = t || r, n.findOne({
                    createdUser: e,
                    isPersonal: !0,
                    rootFolderId: null
                }, function (r, o) {
                    if (r || o) t(r, o);
                    else {
                        var s = new n({
                            nodeType: "folder",
                            rootFolderId: null,
                            name: "My Folder",
                            description: "My Folder",
                            isPersonal: !0,
                            createdUser: e,
                            createdDate: new Date
                        });
                        s.save(t)
                    }
                })
            }, n.GetParentsWithChildrens = function (t, s, i, d, a) {
                a = a || r, n.find({
                    isPersonal: !1
                }).lean().exec(function (e, r) {
                    if (!e && r.length > 0) {
                        if (!t) return void a(null, u(r));
                        l(s, r).then(function (e) {
                            a(null, u(e))
                        }, function (e) {
                            a(e, null)
                        })
                    } else a(e, null)
                });
                var u = function (e) {
                        var t = e.filter(function (e) {
                                return !!e.nodeType && (void 0 == e.rootFolderId || null == e.rootFolderId)
                            })[0],
                            r = c(e, t),
                            n = t;
                        return n.children = r, n.childrenCount = r.length, n
                    },
                    c = function (e, t) {
                        var r = [],
                            n = e.filter(function (e) {
                                var r = e.rootFolderId || "";
                                return r.toString() == t._id.toString() && !r.isPersonal
                            });
                        return n.forEach(function (t) {
                            var n = c(e, t),
                                o = t;
                            o.children = n, o.childrenCount = n.length, r.push(o)
                        }), r || []
                    },
                    l = function (t, r) {
                        var n = [];
                        return r.forEach(function (r) {
                            n.push(d(e).GetGroupsPermissionByFolder(r._id, t, i).then(function (e) {
                                return {
                                    _id: r._id,
                                    nodeType: r.nodeType,
                                    rootFolderId: r.rootFolderId,
                                    name: r.name,
                                    permission: e || []
                                }
                            }), function (e) {
                                return {
                                    _id: r._id,
                                    nodeType: r.nodeType,
                                    rootFolderId: r.rootFolderId,
                                    name: r.name,
                                    permission: []
                                }
                            })
                        }), o.all(n)
                    }
            }
        }
        var o = require("q"),
            s = require("mongoose"),
            i = cachedModules[4524].exports,
            d = require("./lib_external/config"),
            a = s.Schema;
        cachedModules[3760].exports;
        e.exports = i.registerModel("Folder", n)
    }.call(this, cachedModules[4991], cachedModules[4991].exports), cachedModules[1682] = {
        exports: {}
    },
    function (e, t) {
        function r() {}
        function n(e) {
            var t = (o.Schema({}), o.Schema({
                name: String,
                lcName: String,
                title: String,
                subTitle: String,
                description: String,
                folderId: d.ObjectId,
                parent: String,
                meta: {
                    createdDate: {
                        type: Date,
                        default: Date.now
                    },
                    ownerId: d.ObjectId,
                    lastModifiedDate: Date,
                    modifiedUserId: d.ObjectId
                },
                settings: d.Types.Mixed,
                definition: d.Types.Mixed,
                thumbnail: String,
                version: String
            }, {
                read: i.mongoose.replSetRead || "nearest"
            }));
            t.pre("save", function (e) {
                this.lcName = this.name.toLowerCase(), e()
            }), t.pre("update", function (e) {
                this.lcName = this.name.toLowerCase(), e()
            });
            var n = e.model("Report", t);
            n.normalizeNames = function (e) {
                e = e || r, n.find({}).exec(function (t, n) {
                    if (t) return e("Error normalize dashboards: " + t);
                    var o = 0;
                    n.forEach(function (e, t) {
                        e.name || (e.name = "Report" + t.toString()), e.name.toLowerCase() != e.lcName && (e.lcName = e.name.toLowerCase(), e.save(r), o++)
                    }), e(null, o)
                })
            }
        }
        var o = require("mongoose"),
            s = cachedModules[4524].exports,
            i = require("./lib_external/config"),
            d = o.Schema;
        e.exports = s.registerModel("Report", n)
    }.call(this, cachedModules[1682], cachedModules[1682].exports), cachedModules[5033] = {
        exports: {}
    },
    function (e, t) {
        function r() {}
        function n(e) {
            var t = i.Schema({
                tabId: u.Types.ObjectId,
                controlName: String,
                description: String,
                controlObject: u.Types.Mixed
            }, {
                read: a.mongoose.replSetRead || "nearest",
                minimize: !1
            });
            e.model("DashboardControl", t)
        }
        function o(e) {
            var t = i.Schema({
                dashboardId: u.Types.ObjectId,
                Id: Number,
                tabName: String,
                backgroundColor: String,
                backgroundImage: String,
                imageMode: String,
                isModal: Boolean,
                modalWidth: Number,
                modalHeight: Number,
                tabOrder: {
                    type: Number,
                    default: 1
                },
                isActive: Boolean,
                hideFilterPanel: Boolean,
                filterPanelColor: String,
                description: String
            });
            e.model("DashboardTab", t)
        }
        function s(e) {
            var t = i.Schema({
                dashboardName: String,
                folderId: u.Types.ObjectId,
                description: String,
                thumbnail: String,
                lcName: String,
                settings: {
                    gridSize: Number,
                    switchGrid: Boolean,
                    dataSource: {
                        Id: String,
                        Name: String
                    },
                    cube: {
                        Id: String,
                        Name: String
                    },
                    originalSize: {
                        width: Number,
                        height: Number
                    },
                    canvasSize: {
                        width: Number,
                        height: Number
                    },
                    hideTabs: Boolean,
                    tabsLayout: String,
                    mobileMode: Boolean,
                    mobileWidth: Number,
                    mobileOrientation: String,
                    controlsMapping: String,
                    tabHeadersType: String,
                    aspectRatio: String,
                    autoRefresh: Boolean,
                    refreshTime: Number,
                    backgroundColor: String,
                    backgroundImage: String,
                    tileOptions: {
                        columns: Number,
                        columnWidth: Number,
                        rowHeight: Number,
                        columnTiles: Number,
                        rowTiles: Number,
                        contentPosition: String
                    }
                },
                meta: {
                    description: String,
                    createdDate: {
                        type: Date,
                        default: Date.now
                    },
                    ownerId: u.Types.ObjectId,
                    lastModifiedDate: Date,
                    modifiedUserId: u.Types.ObjectId
                }
            });
            t.pre("save", function (e) {
                this.lcName = this.dashboardName.toLowerCase(), e()
            }), t.pre("update", function (e) {
                this.lcName = this.dashboardName.toLowerCase(), e()
            }), t.statics.objectId = function (e) {
                return i.Types.ObjectId(e)
            };
            var n = e.model("Dashboard", t);
            n.normalizeNames = function (e) {
                e = e || r, n.find({}).exec(function (t, n) {
                    if (t) return e("Error normalize dashboards: " + t);
                    var o = 0;
                    n.forEach(function (e, t) {
                        e.dashboardName || (e.dashboardName = "Dashboard" + t.toString()), e.dashboardName.toLowerCase() != e.lcName && (e.lcName = e.dashboardName.toLowerCase(), e.save(r), o++)
                    }), e(null, o)
                })
            }
        }
        var i = require("mongoose"),
            d = cachedModules[4524].exports,
            a = require("./lib_external/config"),
            u = i.Schema;
        e.exports = {
            dashboard: d.registerModel("Dashboard", s),
            tabs: d.registerModel("DashboardTab", o),
            controls: d.registerModel("DashboardControl", n)
        }
    }.call(this, cachedModules[5033], cachedModules[5033].exports), cachedModules[3174] = {
        exports: {}
    },
    function (e, t) {
        function r() {}
        function n(e) {
            return c.mongoose.connPrefix + "/" + e.toString()
        }
        function o(e, t, o, s) {
            s = s || r, h.UsersMap().then(function (r) {
                r.findOneAndUpdate({
                    userId: e,
                    siteId: t
                }, {
                    $set: {
                        userId: e,
                        siteId: t,
                        roleId: o
                    }
                }, {
                    upsert: !0
                }).exec(function (r, i) {
                    return r ? s(r) : (console.log("connecting to local site:", t), void l(n(t)).then(function (t) {
                        t.AssignUserWithRole(e, o, function (r, n) {
                            return r || !n ? s(r || "Local User not found:" + e) : (console.log("update site info"), f(t.db).AddUserToDefaultGroup(e, n.isAdmin, s), p(t.db).InitMyFolder(e), n.isAdmin || f(t.db).RemoveUserFromAdminGroup(e), console.log("upd user from master", e), void t.UpdateUserInfoFromMaster(e))
                        })
                    }, s))
                })
            }, s)
        }
        function s(e) {
            return "^" + e.replace(/[-\/\\^$*+?.()|[\]{}]/g, String.fromCharCode(92) + "$&") + "$"
        }
        function i(e, t) {
            t = t || r, h.Users().then(function (r) {
                r.findOne({
                    userName: {
                        $regex: s(e.userName),
                        $options: "i"
                    }
                }).lean().exec(function (n, o) {
                    if (n) return t(n, null);
                    if (o) return t(null, o);
                    var o = new r(e);
                    o.save(t)
                })
            }, t)
        }
        function d(e, t) {
            t = t || r, h.Roles().then(function (r) {
                r.findOne({
                    _id: e
                }).lean().exec(t)
            })
        }
        function a(e, t) {
            t = t || r, h.Roles().then(function (r) {
                r.find({
                    _id: {
                        $in: e
                    }
                }).lean().exec(t)
            }, t)
        }
        function u(e) {
            e = e || r, h.Roles().then(function (t) {
                t.GetServerAdminRole(e)
            }, e)
        }
        var c = (require("q"), require("mongoose"), require("./lib_external/config")),
            l = cachedModules[7746].exports,
            f = cachedModules[3669].exports,
            p = cachedModules[4991].exports,
            h = cachedModules[3760].exports,
            m = cachedModules[8471].exports,
            b = function (e, t) {
                t = t || r, h.Sites().then(function (r) {
                    r.findOne({
                        _id: e,
                        disabled: !1
                    }).lean().exec(t)
                }, t)
            },
            v = function (e, t) {
                t = t || r, h.Sites().then(function (r) {
                    r.findOne({
                        name: e,
                        disabled: !1
                    }).lean().exec(t)
                }, t)
            },
            g = function (e, t) {
                t = t || r, h.Sites().then(function (r) {
                    r.findOne({
                        dbPath: e,
                        disabled: !1
                    }).lean().exec(t)
                }, t)
            },
            I = function (e) {
                e = e || r, h.Sites().then(function (t) {
                    t.findOne({
                        default: !0,
                        disabled: !1
                    }).lean().exec(e)
                }, e)
            },
            y = function (e) {
                e = e || r, h.Sites().then(function (t) {
                    t.find({
                        disabled: !1
                    }).sort({
                        name: 1
                    }).lean().exec(e)
                }, e)
            },
            x = function (e, t) {
                t = t || r, h.Sites().then(function (r) {
                    r.find({
                        _id: {
                            $in: e
                        },
                        disabled: !1
                    }).sort({
                        name: 1
                    }).lean().exec(t)
                }, t)
            },
            M = function (e, t) {
                t = t || r, h.UsersMap().then(function (r) {
                    r.find({
                        userId: e
                    }).lean().exec(function (e, n) {
                        if (!e && n.length > 0) {
                            var o = n.map(function (e) {
                                return e.siteId
                            });
                            h.Sites(r.db).find({
                                _id: {
                                    $in: o
                                },
                                disabled: !1
                            }).sort({
                                name: 1
                            }).lean().exec(t)
                        } else t(e, n)
                    })
                }, t)
            },
            S = function (e, t, n) {
                n = n || r, h.Sites().then(function (r) {
                    r.findOneAndUpdate({
                        _id: e,
                        disabled: !1
                    }, {
                        $set: {
                            name: t.name || "",
                            description: t.description || ""
                        }
                    }, {
                        new: !0
                    }).lean().exec(n)
                }, n)
            },
            P = function (e, t) {
                t = t || r;
                var n = e.map(function (e) {
                    return e.id
                });
                h.Sites().then(function (r) {
                    e.forEach(function (e) {
                        t(r.update({
                            _id: {
                                $in: n
                            }
                        }, {
                            disabled: !0
                        }, {
                            new: !0
                        }).lean().exec())
                    })
                }, t)
            },
            N = function (e, t, n) {
                n = n || r, h.Sites().then(function (r) {
                    r.find({
                        name: t.name
                    }).lean().exec(function (t, o) {
                        if (!t && o.length <= 0) {
                            var s = new r({
                                partnerId: e.id,
                                name: s.name,
                                description: e.name,
                                dbPath: s.dbPath,
                                default: !0,
                                disabled: !1
                            });
                            s.save(n)
                        } else n(t, "Site With Same Name Exist!")
                    })
                }, n)
            },
            w = function (e, t, n, o) {
                o = o || r, h.UsersMap().then(function (r) {
                    r.findOneAndUpdate({
                        userId: e,
                        siteId: t
                    }, {
                        $set: {
                            roleId: n
                        }
                    }, {
                        upsert: !0
                    }).exec(o)
                }, o)
            },
            q = function (e, t, n, s) {
                s = s || r, h.Sites().then(function (r) {
                    r.findOne({
                        dbPath: n
                    }).lean().exec(function (r, n) {
                        if (!r && n) {
                            var i = n._id;
                            o(e, i, t, s)
                        }
                    })
                }, s)
            },
            _ = function (e, t, n) {
                n = n || r, h.UsersMap().then(function (r) {
                    r.remove({
                        userId: e,
                        siteId: t
                    }).lean().exec(n)
                }, n)
            },
            O = function (e, t, n) {
                n = n || r, h.Sites().then(function (r) {
                    r.findOne({
                        dbPath: t
                    }).lean().exec(function (t, r) {
                        if (!t && r) {
                            var o = r._id;
                            _(e, o, n)
                        }
                    })
                }, n)
            },
            D = function (e, t) {
                t = t || r, h.Users().then(function (r) {
                    r.findOne({
                        _id: e
                    }).lean().exec(t)
                }, t)
            },
            A = function (e, t) {
                t = t || r, h.Users().then(function (r) {
                    r.findOne({
                        userName: {
                            $regex: s(e),
                            $options: "i"
                        }
                    }).lean().exec(t)
                })
            },
            U = function (e) {
                e = e || r, h.Users().then(function (t) {
                    t.find({}).lean().exec(e)
                }, e)
            },
            T = function (e, t) {
                t = t || r, h.Users().then(function (r) {
                    r.find({
                        _id: {
                            $in: e
                        }
                    }, {
                        hashed_pwd: 0,
                        salt: 0,
                        _role: 0,
                        partnerId: 0,
                        sessionId: 0,
                        meta: 0
                    }).lean().exec(t)
                }, t)
            },
            j = function (e, t) {
                t = t || r, h.UsersMap().then(function (r) {
                    r.find({
                        siteId: e
                    }).lean().exec(function (e, r) {
                        if (!e && r.length > 0) {
                            var n = [];
                            r.forEach(function (e) {
                                n.push(e.userId)
                            }), h.Users().then(function (e) {
                                e.find({
                                    _id: {
                                        $in: n
                                    }
                                }).lean().exec(t)
                            })
                        } else t(e, r)
                    })
                }, t)
            },
            C = function (e, t, n) {
                n = n || r, h.Users().then(function (r) {
                    r.findOneAndUpdate({
                        _id: e
                    }, {
                        $set: t
                    }).lean().exec(n)
                })
            },
            k = function (e, t) {
                t = t || r, h.Users().then(function (r) {
                    r.remove({
                        _id: e
                    }).exec(t)
                }, t)
            },
            E = function (e, t, r) {
                h.Users().then(function (n) {
                    n.findOne({
                        _id: e
                    }).lean().exec(function (e, n) {
                        var o = m.makeHash(n.salt, t);
                        r(o == n.hashed_pwd)
                    })
                }, r)
            },
            R = function (e, t) {
                t = t || r, h.PermissionList().then(function (r) {
                    r.find({
                        type: new RegExp(e, "i")
                    }).lean().exec(t)
                }, t)
            },
            F = function (e, t) {
                t = t || r, h.PermissionList().then(function (r) {
                    r.find({
                        enum: {
                            $in: e
                        }
                    }).lean().exec(t)
                })
            },
            L = function (e, t) {
                t = t || r, h.PermissionList().then(function (r) {
                    r.find({
                        _id: {
                            $in: e
                        }
                    }).lean().exec(t)
                }, t)
            };
        e.exports = {
            Sites: {
                findById: b,
                findByName: v,
                findByDbPath: g,
                findDefaultSite: I,
                findAll: y,
                findByIds: x,
                findSiteBelongToUser: M,
                updateSite: S,
                deleteSites: P,
                createSite: N,
                addUserToSite: o,
                removeUserFromSite: _,
                addUserToSiteByConnection: q,
                removeUserFromSiteByConnection: O
            },
            Users: {
                findById: D,
                findByName: A,
                findAll: U,
                findByIds: T,
                findUserBelongToSite: j,
                addUser: i,
                updateUser: C,
                removeUser: k,
                isPasswordValid: E
            },
            Roles: {
                findById: d,
                findRolesByIds: a,
                getAdminRole: u
            },
            UserMap: {
                findMapItem: function (e, t, n) {
                    n = n || r, h.UsersMap().then(function (r) {
                        r.findOne({
                            userId: e,
                            siteId: t
                        }).exec(n)
                    }, n)
                },
                addUser: function (e, t, n, s) {
                    s = s || r, o(t, e, n, s)
                },
                updateUserRole: function (e, t, n, o) {
                    o = o || r, h.Sites().then(function (r) {
                        r.findOne({
                            _id: n
                        }).lean().exec(function (r, n) {
                            if (!r && n) {
                                var s = n._id;
                                w(e, s, t, o)
                            }
                        })
                    }, o)
                },
                removeUser: function (e, t, o) {
                    o = o || r, h.UsersMap().then(function (r) {
                        r.findOneAndRemove({
                            userId: t,
                            siteId: e
                        }).exec(function (r, s) {
                            r ? o(r) : l(n(e)).then(function (e) {
                                f(e.db).RemoveUser(t), e.RemoveUser(t, o)
                            })
                        })
                    }, o)
                }
            },
            Permission: {
                findByIds: L,
                findByCodes: F,
                findByType: R
            }
        }
    }.call(this, cachedModules[3174], cachedModules[3174].exports), cachedModules[2611] = {
        exports: {}
    },
    function (e, t) {
        function r() {}
        function n(e) {
            function t(e) {
                return d.rolePermissions["power" + e] || []
            }
            var n = o.Schema({
                    power: {
                        type: Number
                    },
                    roleId: {
                        type: a.Types.ObjectId
                    },
                    permissions: [{
                        permissionId: {
                            type: a.Types.ObjectId
                        },
                        enum: {
                            type: String
                        },
                        value: {
                            type: Boolean
                        }
                    }],
                    meta: {
                        lastModifiedDate: {
                            type: Date
                        },
                        modifiedUserId: {
                            type: a.Types.ObjectId
                        }
                    }
                }, {
                    read: i.mongoose.replSetRead || "nearest"
                }),
                s = e.model("RolePermissions", n);
            s.Init = function (e) {
                e = e || r, u.Roles().then(function (r) {
                    r.find({}).exec(function (r, n) {
                        r ? e(r, null) : n.forEach(function (r) {
                            u.PermissionList().then(function (n) {
                                n.find({
                                    type: new RegExp("document|role", "i")
                                }).exec(function (n, o) {
                                    var i = [],
                                        d = t(r.power);
                                    o.forEach(function (e) {
                                        d.indexOf(e.enum) !== -1 && i.push({
                                            permissionId: e._id,
                                            enum: e.enum,
                                            value: !0
                                        })
                                    }), s.findOneAndUpdate({
                                        power: r.power,
                                        roleId: r._id
                                    }, {
                                        $set: {
                                            power: r.power,
                                            roleId: r._id,
                                            permissions: i
                                        }
                                    }, {
                                        new: !0,
                                        upsert: !0
                                    }, e)
                                })
                            })
                        })
                    })
                })
            }, s.GetServerAdminRole = function (e) {
                e = e || r, s.findOne({
                    power: 0
                }).exec(e)
            }, s.CheckIsAdminRole = function (e, t) {
                t = t || r, s.findOne({
                    roleId: e
                }, function (e, r) {
                    if (!e && r) {
                        var n = 0 == r.power;
                        t(null, n)
                    } else t(e, !1)
                })
            }, s.GetRolePermission = function (e, t) {
                t = t || r, s.findOne({
                    roleId: e
                }).exec(function (e, r) {
                    if (e) t(e, null);
                    else {
                        var n = r.permissions.map(function (e) {
                            return e.permissionId.toString()
                        });
                        c.Permission.findByIds(n, function (e, o) {
                            if (e) t(e, null);
                            else {
                                var s = o.map(function (e) {
                                    var t = n.indexOf(e._id.toString());
                                    return {
                                        permissionId: e._id,
                                        value: r.permissions[t].value,
                                        enum: e.enum,
                                        name: e.name
                                    }
                                });
                                t(null, s)
                            }
                        })
                    }
                })
            }, s.UpdateRolePermission = function (t, n, o, i, d) {
                d = d || r, s.findOne({
                    roleId: t
                }).exec(function (t, r) {
                    if (t && d(t, null), 0 == r.power) return void d(null, r);
                    var s = [];
                    r.permissions.forEach(function (e) {
                        e.value = l(e.permissionId, o), e.value || s.push(e.permissionId)
                    }), i(e).UpdateUsersPermissions(n, s, !1), r.save(d)
                })
            }, s.GetSinglePermission = function (e, t, n) {
                n = n || r, s.findOne({
                    roleId: e,
                    "permissions.permissionId": t
                }, {
                    "permissions.$": 1
                }).exec(n)
            };
            var l = function (e, t) {
                var r = "";
                return t.forEach(function (t) {
                    if (e == t.permissionId) return void(r = t.value)
                }), r
            }
        }
        var o = (require("q"), require("mongoose")),
            s = cachedModules[4524].exports,
            i = require("./lib_external/config"),
            d = cachedModules[4585].exports,
            a = o.Schema,
            u = cachedModules[3760].exports,
            c = cachedModules[3174].exports;
        e.exports = s.registerModel("RolePermissions", n)
    }.call(this, cachedModules[2611], cachedModules[2611].exports), cachedModules[8294] = {
        exports: {}
    },
    function (e, t) {
        function r() {}
        function n(e) {
            var t = o.Schema({
                    userId: {
                        type: d.Types.ObjectId
                    },
                    permissions: [{
                        permissionId: {
                            type: d.Types.ObjectId
                        },
                        enum: {
                            type: String
                        },
                        value: {
                            type: Boolean
                        }
                    }],
                    meta: {
                        lastModifiedDate: {
                            type: Date
                        },
                        modifiedUserId: {
                            type: d.Types.ObjectId
                        }
                    }
                }, {
                    read: i.mongoose.replSetRead || "nearest"
                }),
                n = e.model("UserPermissions", t);
            n.Init = function () {}, n.InitUserPermission = function (t, o, s, i) {
                i = i || r, s(e).findOne({
                    roleId: o
                }).lean().exec(function (e, r) {
                    !e && r ? n.findOneAndUpdate({
                        userId: t
                    }, {
                        userId: t,
                        $set: {
                            permissions: r.permissions
                        }
                    }, {
                        new: !0,
                        upsert: !0
                    }).exec(i) : i(e, r)
                })
            }, n.GetUserPermission = function (e, t) {
                t = t || r, n.findOne({
                    userId: e
                }).exec(t)
            }, n.UpdateUsersPermissions = function (e, t, o, s) {
                s = s || r, n.update({
                    userId: {
                        $in: e
                    },
                    "permissions.permissionId": {
                        $in: t
                    }
                }, {
                    $set: {
                        "permissions.$.value": o
                    }
                }, {
                    multi: !0,
                    upsert: !0
                }).exec(s)
            }, n.AssignUserPermission = function (e, t, o) {
                o = o || r, n.findOne({
                    userId: e
                }).exec(function (r, s) {
                    if (r) o(r, null);
                    else if (s) s.permissions = [], t.forEach(function (e) {
                        s.permissions.push({
                            permissionId: e.permissionId,
                            enum: e.enum,
                            value: e.value
                        })
                    }), s.save(o);
                    else {
                        var i = new n({
                            userId: e
                        });
                        t.forEach(function (e) {
                            i.permissions.push({
                                permissionId: e.permissionId,
                                enum: e.enum,
                                value: e.value
                            })
                        }), i.save(o)
                    }
                })
            }, n.GetSinglePermission = function (e, t, o) {
                o = o || r, n.findOne({
                    userId: e,
                    "permissions.permissionId": t
                }, {
                    "permissions.$": 1
                }).exec(o)
            }, n.RemoveUser = function (e, t) {
                t = t || r, n.remove({
                    userId: e
                }).exec(t)
            }
        }
        var o = (require("q"), require("mongoose")),
            s = cachedModules[4524].exports,
            i = require("./lib_external/config"),
            d = o.Schema;
        e.exports = s.registerModel("UserPermissions", n)
    }.call(this, cachedModules[8294], cachedModules[8294].exports), cachedModules[1268] = {
        exports: {}
    },
    function (e, t) {
        function r() {}
        function n(e) {
            var t = s.Schema({
                    groupId: {
                        type: u.Types.ObjectId
                    },
                    folderId: {
                        type: u.Types.ObjectId
                    },
                    permission: [{
                        permissionId: {
                            type: u.Types.ObjectId
                        },
                        enum: {
                            type: String
                        },
                        value: {
                            type: Boolean
                        }
                    }],
                    meta: {
                        lastModifiedDate: {
                            type: Date
                        },
                        modifiedUserId: {
                            type: u.Types.ObjectId
                        }
                    }
                }, {
                    read: d.mongoose.replSetRead || "nearest"
                }),
                n = e.model("FolderPermission", t);
            n.InitPublicFolderPermission = function (e, t, o, s, i) {
                i = i || r, n.findOne({
                    folderId: t
                }).lean().exec(function (r, s) {
                    if (r) i(r, null);
                    else {
                        var d = {
                            type: new RegExp(a.folderPermission.permissionsType.join("|"), "i")
                        };
                        c.PermissionList().then(function (r) {
                            r.find(d).exec(function (r, d) {
                                if (r) i(r, null);
                                else {
                                    var u = [],
                                        c = s && s.permission ? s.permission.map(function (e) {
                                            return e.enum
                                        }) : [];
                                    d.forEach(function (t) {
                                        if (t.type.indexOf(a.folderPermission.permissionsType[0]) != -1) {
                                            var r = c.indexOf(t.enum),
                                                n = {
                                                    permissionId: t._id,
                                                    enum: t.enum,
                                                    value: e
                                                };
                                            r != -1 && (n.value = s.permission[r].value), u.push(n)
                                        }
                                    }), n.findOneAndUpdate({
                                        groupId: o,
                                        folderId: t
                                    }, {
                                        $set: {
                                            groupId: o,
                                            folderId: t,
                                            permission: u
                                        }
                                    }, {
                                        new: !0,
                                        upsert: !0
                                    }, i)
                                }
                            })
                        })
                    }
                })
            }, n.InitEmptyObj = function (e, t) {
                t = t || r;
                var o = {
                    type: new RegExp(a.folderPermission.permissionsType.join("|"), "i")
                };
                e().then(function (e) {
                    e.find(o).exec(function (e, r) {
                        if (e) t(e, null);
                        else {
                            var o = [];
                            r.forEach(function (e) {
                                e.type.indexOf(a.folderPermission.permissionsType[0]) != -1 && o.push({
                                    permissionId: e._id,
                                    enum: e.enum,
                                    value: a.securityStrategy.optimisticMethod
                                })
                            }), n.findOneAndUpdate({
                                groupId: null,
                                folderId: null
                            }, {
                                $set: {
                                    groupId: null,
                                    folderId: null,
                                    permission: o
                                }
                            }, {
                                new: !0,
                                upsert: !0
                            }, t)
                        }
                    })
                })
            }, n.GetSinglePermission = function (e, t, o, s) {
                s = s || r, n.findOne({
                    groupId: e,
                    folderId: t,
                    "permissions.permissionId": o
                }, {
                    "permissions.$": 1
                }).exec(s)
            }, n.GetGroupsPermissionByFolder = function (t, r, s) {
                return r && "" != r ? s(e).findOne({
                    _id: r
                }).exec().then(function (e) {
                    if (e) {
                        var r = [];
                        return r.push(n.findOne({
                            folderId: t,
                            groupId: e._id
                        }).exec().then(function (r) {
                            return r ? {
                                folderId: t,
                                groupId: e._id,
                                permission: r.permission || []
                            } : {}
                        })), o.all(r)
                    }
                    return o.resolve([])
                }, function (e) {
                    return o.resolve([])
                }) : s(e).find().lean().exec().then(function (e) {
                    if (e) {
                        var r = [];
                        return e.forEach(function (e) {
                            r.push(n.findOne({
                                folderId: t,
                                groupId: e._id
                            }).exec().then(function (r) {
                                return !r || r.length < 0 ? {} : {
                                    folderId: t,
                                    groupId: e._id,
                                    permission: r.permission || []
                                }
                            }))
                        }), o.all(r)
                    }
                    return o.resolve([])
                }, function (e) {
                    return o.resolve([])
                })
            }, n.CopyParentFolderPermission = function (t, s, i, d) {
                d = d || r;
                var a = [];
                i(e).find({
                    admins: !1
                }).exec(function (e, r) {
                    if (e && d(e, null), 0 == r.length) d(null, r);
                    else {
                        var i = r.map(function (e) {
                            return e._id.toString()
                        });
                        n.find({
                            folderId: t
                        }).lean().exec(function (e, t) {
                            e && d(e, null), 0 == t.length ? d(null, t) : (t.forEach(function (e) {
                                if (i.indexOf(e.groupId.toString()) != -1) {
                                    e.folderId = s, delete e._id;
                                    var t = new n(e);
                                    a.push(t.save().then(function (e) {
                                        return o.resolve(e)
                                    }, function (e) {
                                        return o.resolve("")
                                    }))
                                }
                            }), o.all(a).then(function (e) {
                                e = e.filter(function (e) {
                                    return "" !== e
                                }), d(null, e)
                            }, function (e) {
                                d(e, null)
                            }))
                        })
                    }
                })
            }
        }
        var o = require("q"),
            s = (require("lodash"), require("mongoose")),
            i = cachedModules[4524].exports,
            d = require("./lib_external/config"),
            a = cachedModules[4585].exports,
            u = s.Schema,
            c = cachedModules[3760].exports;
        e.exports = i.registerModel("FolderPermission", n)
    }.call(this, cachedModules[1268], cachedModules[1268].exports), cachedModules[6996] = {
        exports: {}
    },
    function (e, t) {
        function r() {}
        function n(e) {
            var t = i.Schema({
                    doc: {
                        id: {
                            type: f.Types.ObjectId
                        },
                        type: {
                            type: String
                        }
                    },
                    module: {
                        id: {
                            type: f.Types.ObjectId
                        },
                        type: {
                            type: String
                        }
                    },
                    permissions: [{
                        permissionId: {
                            type: f.Types.ObjectId
                        },
                        enum: {
                            type: String
                        },
                        value: {
                            type: Boolean
                        }
                    }],
                    meta: {
                        lastModifiedDate: {
                            type: Date
                        },
                        modifiedUserId: {
                            type: f.Types.ObjectId
                        }
                    }
                }, {
                    read: a.mongoose.replSetRead || "nearest"
                }),
                n = e.model("DocumentPermission", t);
            n.InitEmptyObj = function (e, t) {
                t = t || r;
                var o = {
                    type: new RegExp(u.documentPermission.permissionsType.join("|"), "i")
                };
                e().then(function (e) {
                    e.find(o).exec(function (e, o) {
                        if (e) return t(e, null);
                        var s = [],
                            i = [];
                        o.forEach(function (e) {
                            i.push(e.enum), e.type.indexOf(u.documentPermission.permissionsType[0]) != -1 && s.push({
                                permissionId: e._id,
                                enum: e.enum,
                                value: u.documentPermission.defaultPermissionsValues
                            })
                        }), n.findOneAndUpdate({
                            "doc.id": null,
                            "doc.type": null,
                            "module.id": null,
                            "module.type": null
                        }, {
                            $set: {
                                doc: {
                                    id: null,
                                    type: null
                                },
                                module: {
                                    id: null,
                                    type: null
                                },
                                permissions: s
                            }
                        }, {
                            upsert: !0,
                            new: !0
                        }).exec(function (e, s) {
                            return e ? t(e) : (n.find({
                                _id: {
                                    $ne: s._id
                                }
                            }, function (e, t) {
                                return e ? console.error("Cannot sync doc permissions", e) : void t.forEach(function (e) {
                                    for (var t = !1, n = 0; n < e.permissions.length; n++) i.indexOf(e.permissions[n].enum) == -1 && (e.permissions.splice(n, 1), n--, t = !0);
                                    var s = e.permissions.map(function (e) {
                                        return e.enum
                                    });
                                    i.forEach(function (r, n) {
                                        s.indexOf(r) == -1 && (e.permissions.push({
                                            permissionId: o[n]._id,
                                            enum: o[n].enum,
                                            value: u.documentPermission.defaultPermissionsValues
                                        }), t = !0)
                                    }), t && e.save(r)
                                })
                            }), void t(null, s))
                        })
                    })
                })
            }, n.Init = function (t, s, i, d) {
                d = d || r, i(e).find({
                    folderId: t
                }).lean().exec(function (e, t) {
                    if (e) d(e, null);
                    else if (0 == t.length) d(null, []);
                    else {
                        var r = [];
                        n.findOne({
                            "doc.id": null,
                            "doc.type": null,
                            "module.id": null,
                            "module.type": null
                        }).lean().exec(function (e, i) {
                            !e && i && t.forEach(function (e) {
                                var t = e.permission.map(function (e) {
                                    return e.value
                                });
                                if (t.indexOf(!0) != -1) {
                                    var d = new n({
                                        doc: {
                                            id: s.id,
                                            type: s.type
                                        },
                                        module: {
                                            id: e.groupId,
                                            type: u.documentPermission.moduleType.groups
                                        },
                                        permissions: i.permissions
                                    });
                                    r.push(d.save().then(function (e) {
                                        return o.resolve(e)
                                    }, function (e) {
                                        return o.resolve("")
                                    }))
                                }
                            })
                        }), o.all(r).then(function (e) {
                            e = e.filter(function (e) {
                                return "" !== e
                            }), d(null, e)
                        }, function (e) {
                            d(e, null)
                        })
                    }
                })
            }, n.ReInit = function (e, t, s) {
                s = s || r, n.find({
                    "module.id": e,
                    "module.type": u.documentPermission.moduleType.groups
                }).exec(function (r, i) {
                    if (r) s(r, null);
                    else {
                        var a = {};
                        a[u.documentPermission.documentType.dashboard] = [], a[u.documentPermission.documentType.report] = [], i.forEach(function (e) {
                            switch (e.doc.type) {
                            case u.documentPermission.documentType.dashboard:
                                a[u.documentPermission.documentType.dashboard].push(e.doc.id.toString());
                                break;
                            case u.documentPermission.documentType.report:
                                a[u.documentPermission.documentType.report].push(e.doc.id.toString())
                            }
                        }), d(t, a, function (t, r) {
                            if (t) s(t, null);
                            else {
                                var i = [];
                                n.findOne({
                                    "doc.id": null,
                                    "doc.type": null,
                                    "module.id": null,
                                    "module.type": null
                                }).lean().exec(function (t, s) {
                                    !t && s && r.forEach(function (t) {
                                        var r = new n({
                                            doc: t,
                                            module: {
                                                id: e,
                                                type: u.documentPermission.moduleType.groups
                                            },
                                            permissions: s.permissions
                                        });
                                        i.push(r.save().then(function (e) {
                                            return o.resolve(e)
                                        }, function (e) {
                                            return o.resolve("")
                                        }))
                                    })
                                }), o.all(i).then(function (e) {
                                    e = e.filter(function (e) {
                                        return "" !== e
                                    }), s(null, e)
                                }, function (e) {
                                    s(e, null)
                                })
                            }
                        })
                    }
                })
            }, n.getEmpty = function (e) {
                n.findOne({
                    "doc.id": null,
                    "doc.type": null,
                    "module.id": null,
                    "module.type": null
                }, e)
            }, n.Add = function (e, t, o) {
                o = o || r, n.findOne({
                    "doc.id": null,
                    "doc.type": null,
                    "module.id": null,
                    "module.type": null
                }).lean().exec(function (r, s) {
                    if (r || !s) o(r, null);
                    else {
                        var i = new n({
                            doc: {
                                id: e.id,
                                type: e.type
                            },
                            module: {
                                id: t.id,
                                type: t.type
                            },
                            permissions: s.permissions
                        });
                        i.save(o)
                    }
                })
            }, n.Update = function (e, t, o, s) {
                s = s || r, n.findOneAndUpdate({
                    "doc.id": e.id,
                    "doc.type": e.type,
                    "module.id": t.id,
                    "module.type": t.type
                }, {
                    "doc.id": e.id,
                    "doc.type": e.type,
                    "module.id": t.id,
                    "module.type": t.type,
                    $set: {
                        permissions: o
                    }
                }, {
                    new: !0,
                    upsert: !0
                }).exec(s)
            }, n.RemoveByDoc = function (e, t) {
                t = t || r, n.findOneAndRemove({
                    "doc.id": e.id,
                    "doc.type": e.type
                }).exec(t)
            }, n.RemoveManyDocs = function (e, t, o) {
                o = o || r, n.findOneAndRemove({
                    "doc.id": {
                        $in: e
                    },
                    "doc.type": t
                }).exec(o)
            }, n.RemoveByModule = function (e, t) {
                t = t || r, n.findOneAndRemove({
                    "module.id": e.id,
                    "module.type": e.type
                }).exec(t)
            }, n.Remove = function (e, t, o) {
                o = o || r, n.findOneAndRemove({
                    "doc.id": e.id,
                    "doc.type": e.type,
                    "module.id": t.id,
                    "module.type": t.type
                }).exec(o)
            };
            var d = function (t, n, i) {
                i = i || r;
                var d = l(e).find({
                        folderId: {
                            $in: t
                        }
                    }).exec().then(function (e) {
                        var t = [];
                        return e.forEach(function (e) {
                            n[u.documentPermission.documentType.dashboard].indexOf(e._id.toString()) == -1 && t.push({
                                type: u.documentPermission.documentType.dashboard,
                                id: e._id
                            })
                        }), o.resolve(t)
                    }, function (e) {
                        return o.resolve("")
                    }),
                    a = c(e).find({
                        folderId: {
                            $in: t
                        }
                    }).exec().then(function (e) {
                        var t = [];
                        return e.forEach(function (e) {
                            n[u.documentPermission.documentType.report].indexOf(e._id.toString()) == -1 && t.push({
                                type: u.documentPermission.documentType.report,
                                id: e._id
                            })
                        }), o.resolve(t)
                    }, function (e) {
                        return o.resolve("")
                    });
                o.all([d, a]).then(function (e) {
                    e = e.filter(function (e) {
                        return "" !== e
                    });
                    var t = s.flatten(e);
                    i(null, t)
                }, function (e) {
                    i(e, null)
                })
            }
        }
        var o = require("q"),
            s = require("lodash"),
            i = require("mongoose"),
            d = cachedModules[4524].exports,
            a = require("./lib_external/config"),
            u = cachedModules[4585].exports,
            c = cachedModules[1682].exports,
            l = cachedModules[5033].exports.dashboard,
            f = i.Schema;
        e.exports = d.registerModel("DocumentPermission", n)
    }.call(this, cachedModules[6996], cachedModules[6996].exports), cachedModules[9038] = {
        exports: {}
    },
    function (e, t) {
        function r(e) {
            var t = i.defer();
            return d(e.dbPath).then(function (r) {
                r.findOne({
                    default: !0,
                    admins: !0,
                    "userIds.userId": e._id
                }, function (e, r) {
                    e ? t.reject(e) : r && r._id ? t.resolve(!0) : t.resolve(!1)
                })
            }), t.promise
        }
        function n(e, t, r) {
            var n = i.defer();
            return a(e.dbPath).then(function (o) {
                o.findOne({
                    roleId: e.roleId
                }, function (e, o) {
                    if (e) return void n.reject();
                    var s = [];
                    o && o.permissions && (s = o.permissions);
                    var i = s.map(function (e) {
                        return e.enum
                    });
                    if (r) {
                        var d = t.some(function (e) {
                            var t = i.indexOf(e.toString());
                            if (t == -1 || 0 == s[t].value) return !0
                        });
                        n.resolve(!d)
                    } else {
                        var a = t.some(function (e) {
                            var t = i.indexOf(e.toString());
                            if (t != -1 && 1 == s[t].value) return !0
                        });
                        n.resolve(a)
                    }
                })
            }), n.promise
        }
        function o(e, t) {
            var r = i.defer(),
                n = [a(e.dbPath).then(function (t) {
                    return t.findOne({
                        roleId: e.roleId
                    }).lean().exec()
                })];
            return i.all(n).then(function (e) {
                var n = e[0],
                    o = [];
                if (o = n && n.permissions ? n.permissions : [], void 0 != t && null != t && t.length > 0) {
                    var s = o.map(function (e) {
                            return e.enum
                        }),
                        i = [];
                    t.forEach(function (e) {
                        var t = s.indexOf(e);
                        i.push({
                            enum: t != -1 ? o[t].enum : "000",
                            value: t != -1 && o[t].value
                        })
                    }), r.resolve(i)
                } else r.resolve(o)
            }, function (e) {
                r.reject(e)
            }), r.promise
        }
        function s(e) {
            var t = i.defer();
            return o(e).then(function (e) {
                t.resolve(e)
            }, function (e) {
                t.reject(e)
            }), t.promise
        }
        var i = require("q"),
            d = (require("lodash"), require("./lib_external/config"), cachedModules[4585].exports, cachedModules[7746].exports, cachedModules[3669].exports),
            a = cachedModules[2611].exports;
        cachedModules[8294].exports;
        e.exports = {
            private: {
                getUserRolePermissionsValues: o
            },
            checkIsAdmin: function (e) {
                return r(e)
            },
            hasRolePermission: n,
            checkUserRolePermission: function (e, t) {
                return o(e, t)
            },
            checkUserRoleWriteAccess: function (e) {
                var t = "101",
                    r = i.defer();
                return s(e).then(function (e) {
                    var n = e.map(function (e) {
                            return e.enum
                        }),
                        o = n.indexOf(t);
                    o != -1 ? r.resolve(e[o].value) : r.resolve(!1)
                }, function (e) {
                    r.reject(e)
                }), r.promise
            },
            checkUserRoleMyFolderAccess: function (e) {
                var t = "500",
                    r = i.defer();
                return s(e).then(function (e) {
                    var n = e.map(function (e) {
                            return e.enum
                        }),
                        o = n.indexOf(t);
                    o != -1 ? r.resolve(e[o].value) : r.resolve(!1)
                }, function (e) {
                    r.reject(e)
                }), r.promise
            },
            getUserRolePermissionsResultSet: function (e) {
                return s(e)
            }
        }
    }.call(this, cachedModules[9038], cachedModules[9038].exports), cachedModules[4631] = {
        exports: {}
    },
    function (e, t) {
        function r(e, t, r) {
            var n = e.dbPath,
                c = e._id,
                l = o.defer(),
                f = o.defer();
            a(n).then(function (e) {
                e.findOne({
                    _id: t
                }).lean().exec(function (r, n) {
                    r ? l.reject(r) : n ? n.isPersonal && n.createdUser.toString() == c ? h(l, e.db) : p(l, c, t, e.db) : l.reject("Folder Not Exist!")
                })
            });
            var p = function (e, t, r, n) {
                    d(n).find({
                        "userIds.userId": t
                    }, "_id").lean().exec(function (t, o) {
                        if (t) e.reject(t);
                        else {
                            var d = o.map(function (e) {
                                return e._id
                            });
                            u(n).find({
                                folderId: r,
                                groupId: {
                                    $in: d
                                }
                            }, "permission").lean().exec(function (t, r) {
                                if (t) e.reject(t);
                                else if (0 == r.length) u(n).findOne({
                                    groupId: null,
                                    folderId: null
                                }).lean().exec(function (t, r) {
                                    t ? e.reject(t) : e.resolve(r.permission)
                                });
                                else {
                                    var o = [],
                                        d = [];
                                    r.forEach(function (e) {
                                        d.push(e.permission)
                                    });
                                    var a = s.groupBy(s.flatten(d), "enum");
                                    for (var c in a) {
                                        var l = {
                                            enum: c,
                                            value: !1
                                        };
                                        i.securityStrategy.optimisticMethod ? l.value = a[c].some(function (e) {
                                            return e.value
                                        }) : l.value = a[c].every(function (e) {
                                            return e.value
                                        }), o.push(l)
                                    }
                                    e.resolve(o)
                                }
                            })
                        }
                    })
                },
                h = function (e, t) {
                    u(t).findOne({
                        groupId: null,
                        folderId: null
                    }).lean().exec(function (t, r) {
                        if (t) e.reject(t);
                        else {
                            var n = r.permission.map(function (e) {
                                return e.value = !0, e
                            });
                            e.resolve(n)
                        }
                    })
                };
            return l.promise.then(function (e) {
                if (void 0 != r && null != r && r.length > 0) {
                    var t = e.map(function (e) {
                            return e.enum
                        }),
                        n = [];
                    r.forEach(function (r) {
                        var o = t.indexOf(r);
                        n.push({
                            enum: o != -1 ? e[o].enum : "000",
                            value: o != -1 && e[o].value
                        })
                    }), f.resolve(n)
                } else f.resolve(e)
            }, function (e) {
                f.reject(e)
            }), f.promise
        }
        function n(e, t) {
            var n = o.defer(),
                s = [];
            return c.getUserRolePermissionsResultSet(e).then(function (o) {
                r(e, t).then(function (e) {
                    var t = e.map(function (e) {
                            return e.enum.toString()
                        }),
                        r = e.some(function (e) {
                            return e.value
                        });
                    o.forEach(function (n) {
                        var o = t.indexOf(n.enum);
                        o != -1 && n.value !== !1 && ("100" == n.enum && r ? n.value = r : n.value = e[o].value), s.push(n)
                    }), n.resolve(s)
                }, function (e) {
                    n.reject(e)
                })
            }, function (e) {
                n.reject(e)
            }), n.promise
        }
        var o = require("q"),
            s = require("lodash"),
            i = (require("./lib_external/config"), cachedModules[4585].exports),
            d = cachedModules[3669].exports,
            a = cachedModules[4991].exports,
            u = cachedModules[1268].exports,
            c = cachedModules[9038].exports;
        e.exports = {
            private: {
                getFolderPermissionsValues: r
            },
            checkFolderAccessibility: function (e, t, n) {
                return r(e, t, n)
            },
            checkFolderReadAccess: function (e, t) {
                var r = ["100", "101"],
                    s = [],
                    i = o.defer();
                return n(e, t).then(function (e) {
                    e.forEach(function (e) {
                        r.indexOf(e.enum) != -1 && s.push(e.value)
                    });
                    var t = s.indexOf(!0);
                    t != -1 ? i.resolve(e[t].value) : i.resolve(!1)
                }, function (e) {
                    i.reject(e)
                }), i.promise
            },
            checkFolderWriteAccess: function (e, t) {
                var r = "101",
                    s = o.defer();
                return n(e, t).then(function (e) {
                    var t = e.map(function (e) {
                            return e.enum
                        }),
                        n = t.indexOf(r);
                    n != -1 ? s.resolve(e[n].value) : s.resolve(!1)
                }, function (e) {
                    s.reject(e)
                }), s.promise
            },
            getFolderPermissionsResultSet: function (e, t) {
                return n(e, t)
            }
        }
    }.call(this, cachedModules[4631], cachedModules[4631].exports), cachedModules[7302] = {
        exports: {}
    },
    function (e, t) {
        function r(e) {
            function t(e, t) {
                var r = [],
                    n = [];
                e.forEach(function (e) {
                    e.module.type == t && r.push(e.permissions)
                });
                var o = a.groupBy(a.flatten(r), "enum");
                for (var s in o) {
                    var i = {
                        enum: s,
                        value: !1
                    };
                    u.securityStrategy.optimisticMethod ? i.value = o[s].some(function (e) {
                        return e.value
                    }) : i.value = o[s].every(function (e) {
                        return e.value
                    }), n.push(i)
                }
                return n
            }
            var r = t(e, u.documentPermission.moduleType.groups),
                n = t(e, u.documentPermission.moduleType.users);
            return n.length > 0 ? n : r
        }
        function n(e, t, n) {
            var o = e.dbPath,
                s = e._id,
                i = function () {
                    var e = d.defer();
                    return c(o).then(function (o) {
                        o.find({
                            "userIds.userId": s
                        }, "_id").lean().exec(function (i, d) {
                            if (i) e.reject(i);
                            else {
                                var a = d.map(function (e) {
                                    return e._id
                                });
                                p(o.db).find({
                                    "doc.id": t,
                                    "doc.type": n,
                                    $or: [{
                                        $and: [{
                                            "module.id": {
                                                $in: a
                                            }
                                        }, {
                                            "module.type": u.documentPermission.moduleType.groups
                                        }]
                                    }, {
                                        $and: [{
                                            "module.id": s
                                        }, {
                                            "module.type": u.documentPermission.moduleType.users
                                        }]
                                    }]
                                }).lean().exec(function (t, n) {
                                    if (t) e.reject(t);
                                    else if (0 == n.length) p(o.db).findOne({
                                        "doc.id": null,
                                        "doc.type": null,
                                        "module.id": null,
                                        "module.type": null
                                    }).lean().exec(function (t, r) {
                                        t ? e.reject(t) : e.resolve(r.permissions)
                                    });
                                    else {
                                        var s = r(n);
                                        e.resolve(s)
                                    }
                                })
                            }
                        })
                    }), e.promise
                };
            return i()
        }
        function o(e, t, r, o) {
            var s = d.defer(),
                i = [];
            return h.getFolderPermissionsResultSet(e, t).then(function (t) {
                n(e, r, o).then(function (e) {
                    var r = e.map(function (e) {
                        return e.enum
                    });
                    t.forEach(function (t) {
                        var n = r.indexOf(t.enum);
                        n != -1 && t.value !== !1 && (t.value = e[n].value), i.push({
                            enum: t.enum,
                            value: t.value
                        })
                    });
                    var n = i.map(function (e) {
                        return e.enum
                    });
                    e.forEach(function (e) {
                        n.indexOf(e.enum) == -1 && i.push(e)
                    }), s.resolve(i)
                }, function (e) {
                    s.reject(e)
                })
            }, function (e) {
                s.reject(e)
            }), s.promise
        }
        function s(e, t, r) {
            var n = d.defer();
            return f(e.dbPath).then(function (s) {
                s.findById(t).lean().exec(function (t, s) {
                    t && n.reject(t), s ? h.checkFolderReadAccess(e, s.folderId).then(function (t) {
                        0 == t ? n.reject("You don\'t have access to the folder") : o(e, s.folderId, s, u.documentPermission.documentType.dashboard).then(function (e) {
                            var t = e.map(function (e) {
                                    return e.enum
                                }),
                                o = [];
                            r.forEach(function (r) {
                                var n = t.indexOf(r.toString());
                                o.push({
                                    value: n != -1 && e[n].value
                                })
                            }), n.resolve(o)
                        }, function (e) {
                            n.reject(e)
                        })
                    }, function (e) {
                        n.reject(e)
                    }) : n.reject("Dashboard not exist")
                })
            }), n.promise
        }
        function i(e, t, r) {
            var n = d.defer();
            return l(e.dbPath).then(function (s) {
                s.findById(t).lean().exec(function (s, i) {
                    s && n.reject(s), i ? h.checkFolderReadAccess(e, i.folderId).then(function (s) {
                        0 == s ? n.reject("You don\'t have access to the folder") : o(e, i.folderId, t, u.documentPermission.documentType.report).then(function (e) {
                            var t = e.map(function (e) {
                                    return e.enum
                                }),
                                o = [];
                            r.forEach(function (r) {
                                var n = t.indexOf(r.toString());
                                o.push({
                                    value: n != -1 && e[n].value
                                })
                            }), n.resolve(o)
                        }, function (e) {
                            n.reject(e)
                        })
                    }, function (e) {
                        n.reject(e)
                    }) : n.reject("Report not exist")
                })
            }), n.promise
        }
        var d = require("q"),
            a = require("lodash"),
            u = (require("./lib_external/config"), cachedModules[4585].exports),
            c = cachedModules[3669].exports,
            l = cachedModules[1682].exports,
            f = cachedModules[5033].exports.dashboard,
            p = cachedModules[6996].exports,
            h = cachedModules[4631].exports;
        e.exports = {
            private: {
                getDocumentPermissionsValues: n
            },
            checkDocumentPermissionsDashboardValues: function (e, t, r) {
                return s(e, t, r)
            },
            checkDocumentPermissionsReportValues: function (e, t, r) {
                return i(e, t, r)
            },
            checkDocumentReadAccess: function (e, t, r, n) {
                var s = "100",
                    i = d.defer();
                return o(e, t, r, n).then(function (e) {
                    var t = e.map(function (e) {
                            return e.enum
                        }),
                        r = t.indexOf(s);
                    r != -1 ? i.resolve(e[r].value) : i.resolve(!1)
                }, function (e) {
                    i.reject(e)
                }), i.promise
            },
            getDocumentPermissionsResultSet: function (e, t, r, n) {
                return o(e, t, r, n)
            }
        }
    }.call(this, cachedModules[7302], cachedModules[7302].exports), cachedModules[1284] = {
        exports: {}
    },
    function (e, t) {
        function r(e) {
            var t = n.Schema({
                groupId: {
                    type: i.Types.ObjectId
                },
                projName: {
                    type: String
                },
                preslicers: {
                    type: i.Types.Mixed
                }
            }, {
                read: s.mongoose.replSetRead || "nearest"
            });
            e.model("DataSourcePreslicer", t)
        }
        var n = require("mongoose"),
            o = cachedModules[4524].exports,
            s = require("./lib_external/config"),
            i = n.Schema;
        e.exports = o.registerModel("DataSourcePreslicer", r)
    }.call(this, cachedModules[1284], cachedModules[1284].exports), cachedModules[7365] = {
        exports: {}
    },
    function (e, t) {
        function r(e) {
            var t = n.Schema({
                projName: {
                    type: String
                },
                groupId: {
                    type: i.Types.ObjectId
                },
                trees: [{
                    Id: {
                        type: String
                    },
                    selected: {
                        type: Boolean
                    }
                }]
            }, {
                read: s.mongoose.replSetRead || "nearest"
            });
            e.model("DataSourcePermission", t)
        }
        var n = require("mongoose"),
            o = cachedModules[4524].exports,
            s = require("./lib_external/config"),
            i = n.Schema;
        e.exports = o.registerModel("DataSourcePermission", r)
    }.call(this, cachedModules[7365], cachedModules[7365].exports), cachedModules[2518] = {
        exports: {}
    },
    function (e, t) {
        var r = require("q"),
            n = require("./lib_external/config"),
            o = cachedModules[3669].exports,
            s = cachedModules[1284].exports,
            i = cachedModules[7365].exports;
        cachedModules[4585].exports;
        e.exports = {
            getPreSlice: function (e, t, i) {
                var d = r.defer();
                return o(e.dbPath).then(function (r) {
                    r.FindByUserId(e._id, function (e, o) {
                        if (e) d.reject(e);
                        else {
                            var a = o ? o.map(function (e) {
                                return e._id.toString()
                            }) : [];
                            s(r.db).findOne({
                                projName: t,
                                "preslicers.groups.id": {
                                    $in: a
                                }
                            }).lean().exec(function (e, t) {
                                if (e) d.reject(e);
                                else {
                                    var r = [];
                                    t && t.preslicers && t.preslicers.forEach(function (e) {
                                        var t = e.groups.some(function (e) {
                                            return a.indexOf(e.id) != -1
                                        });
                                        if (t && e.tree.Id === i) {
                                            var o = null,
                                                s = -1;
                                            r.some(function (t, r) {
                                                if (t.UniqueName == e.hierarchy.UniqueName) return s = r, o = t, !0
                                            }), s == -1 && (o = {
                                                Type: e.hierarchy.Type,
                                                Name: e.hierarchy.Dimension,
                                                UniqueName: e.hierarchy.UniqueName,
                                                List: {
                                                    IsExclude: !1,
                                                    Members: []
                                                }
                                            });
                                            var d = o.List.Members.map(function (e) {
                                                return e.UniqueName
                                            });
                                            n.dataSourcePermissions.preslicerOptimistic ? (o.List.Members = [], e.members.forEach(function (e) {
                                                s != -1 ? d.indexOf(e.UniqueName || e) != -1 && o.List.Members.push({
                                                    Name: e.Name || "",
                                                    UniqueName: e.UniqueName || e
                                                }) : o.List.Members.push({
                                                    Name: e.Name || "",
                                                    UniqueName: e.UniqueName || e
                                                })
                                            })) : e.members.forEach(function (e) {
                                                d.indexOf(e.UniqueName || e) == -1 && o.List.Members.push({
                                                    Name: e.Name || "",
                                                    UniqueName: e.UniqueName || e
                                                })
                                            }), s == -1 && r.push(o)
                                        }
                                    }), d.resolve(r)
                                }
                            })
                        }
                    })
                }), d.promise
            },
            getProjectPermissions: function (e) {
                var t = r.defer();
                return o(e.dbPath).then(function (r) {
                    r.FindByUserId(e._id, function (e, n) {
                        if (e) t.reject(e);
                        else {
                            var o = n ? n.map(function (e) {
                                return e._id.toString()
                            }) : [];
                            i(r.db).distinct("projName", {
                                groupId: {
                                    $in: o
                                }
                            }).exec(function (e, r) {
                                e ? t.reject(e) : t.resolve(r)
                            })
                        }
                    })
                }), t.promise
            },
            getDataSourcePermissions: function (e, t) {
                var s = r.defer();
                return o(e.dbPath).then(function (r) {
                    r.FindByUserId(e._id, function (e, o) {
                        if (e) s.reject(e);
                        else {
                            var d = o ? o.map(function (e) {
                                return e._id.toString()
                            }) : [];
                            i(r.db).find({
                                projName: t,
                                groupId: {
                                    $in: d
                                }
                            }).lean().exec(function (e, t) {
                                if (e) s.reject(e);
                                else {
                                    var r = [],
                                        o = [];
                                    if (t)
                                        if (t.forEach(function (e) {
                                                e.trees.forEach(function (e) {
                                                    e.selected ? r.indexOf(e.Id) == -1 && r.push(e.Id) : o.indexOf(e.Id) == -1 && o.push(e.Id)
                                                })
                                            }), n.dataSourcePermissions.pessimisticDataSourceMerge)
                                            for (var i = 0; i < o.length; i++) {
                                                var d = r.indexOf(o[i]);
                                                d != -1 && r.splice(d, 1)
                                            } else
                                                for (var i = 0; i < r.length; i++) {
                                                    var a = o.indexOf(r[i]);
                                                    a != -1 && o.splice(a, 1)
                                                }
                                    s.resolve({
                                        sel: r,
                                        excl: o
                                    })
                                }
                            })
                        }
                    })
                }), s.promise
            }
        }
    }.call(this, cachedModules[2518], cachedModules[2518].exports), cachedModules[8271] = {
        exports: {}
    },
    function (e, t) {
        function r() {}
        function n(e, t, n, o) {
            o = o || r, v.checkIsAdmin(e).then(function (r) {
                return r ? o(null, !0) : void I.checkDocumentPermissionsReportValues(e, t, n).then(function (e) {
                    var t = !1;
                    t = e.every(function (e) {
                        return e.value
                    }), o(null, t === !0)
                }, function (e) {
                    o(e)
                })
            }, function (e) {
                o(e)
            })
        }
        function o(e, t, n, o) {
            o = o || r, v.checkIsAdmin(e).then(function (r) {
                return r ? o(null, !0) : void I.checkDocumentPermissionsDashboardValues(e, t, n).then(function (e) {
                    var t = e.every(function (e) {
                        return e.value
                    });
                    o(null, t === !0)
                }, function (e) {
                    o(e)
                })
            }, function (e) {
                o(e)
            })
        }
        function s(e, t, n) {
            n = n || r, v.checkIsAdmin(e).then(function (r) {
                return r ? n(null, !0) : void g.checkFolderReadAccess(e, t).then(function (e) {
                    n(null, e === !0)
                }, function (e) {
                    n(e)
                })
            }, function (e) {
                n(e)
            })
        }
        function i(e, t, n) {
            n = n || r, v.checkIsAdmin(e).then(function (r) {
                return r ? n(null, !0) : void g.checkFolderWriteAccess(e, t).then(function (e) {
                    n(null, e === !0)
                }, function (e) {
                    n(e)
                })
            }, function (e) {
                n(e)
            })
        }
        function d(e, t) {
            t = t || r, v.checkIsAdmin(e).then(function (r) {
                return r ? t(null, !0) : void v.checkUserRoleWriteAccess(e).then(function (e) {
                    t(null, e === !0)
                }, function (e) {
                    t(e)
                })
            }, function (e) {
                t(e)
            })
        }
        function a(e, t, n, o) {
            o = o || r, y.getPreSlice(e, t, n).then(function (e) {
                o(null, e)
            }, function (e) {
                o(e)
            })
        }
        function u(e, t, n) {
            n = n || r, y.getDataSourcePermissions(e, t).then(function (e) {
                n(null, e)
            }, function (e) {
                n(e)
            })
        }
        function c(e, t) {
            t = t || r, y.getProjectPermissions(e).then(function (e) {
                t(null, e)
            }, function (e) {
                t(e)
            })
        }
        function l(e) {
            var t = "",
                r = e.indexOf("query/"),
                n = e.indexOf("/", r + 6);
            return r != -1 && n != -1 && (t = decodeURIComponent(e.substr(r + 6, n - r - 6))), t
        }
        function f(e, t, r) {
            if (!t || t < 12) return m.reject("Invalid reportId");
            var o = m.defer();
            return n(e.user, t, r, function (e, t) {
                return e ? o.reject("Get permission error (pReport)" + e) : t ? void o.resolve(t) : o.reject("You don\'t have permission for report! (pReport)")
            }), o.promise
        }
        function p(e, t, r) {
            if (!t || t < 12) return m.reject("Invalid dashboardId");
            var n = m.defer();
            return o(e.user, t, r, function (e, t) {
                return e ? n.reject("Get permission error (pDashboard)" + e) : t ? void n.resolve(t) : n.reject("You don\'t have permission for dashboard! (pDashboard)")
            }), n.promise
        }
        function h(e, t, r) {
            var n = m.defer();
            return v.checkIsAdmin(e.user).then(function (o) {
                return o ? n.resolve(!0) : void v.hasRolePermission(e.user, t, r).then(function (e) {
                    return e ? void n.resolve(!0) : n.reject("You don\'t have role permissions!" + t.join(",") + " (rPermission)")
                }, function (e) {
                    n.reject("Error while resolve role permissions")
                })
            }), n.promise
        }
        var m = require("q"),
            b = (require("lodash"), require("./lib_external/config")),
            v = (cachedModules[4585].exports, cachedModules[7746].exports, cachedModules[3669].exports, cachedModules[4991].exports, cachedModules[1682].exports, cachedModules[5033].exports.dashboard, cachedModules[2611].exports, cachedModules[8294].exports, cachedModules[1268].exports, cachedModules[6996].exports, cachedModules[9038].exports),
            g = cachedModules[4631].exports,
            I = cachedModules[7302].exports,
            y = cachedModules[2518].exports;
        e.exports = {
            checkIsAdmin: function (e) {
                return v.checkIsAdmin(e)
            },
            checkUserRoleMyFolderAccess: function (e) {
                return v.checkUserRoleMyFolderAccess(e)
            },
            checkFolderAccessibility: function (e, t) {
                var r = m.defer();
                return v.checkIsAdmin(e).then(function (n) {
                    return n ? r.resolve(n) : void g.checkFolderAccessibility(e, t).then(function (e) {
                        var t = e.some(function (e) {
                            return e.value
                        });
                        r.resolve(t === !0)
                    }, function (e) {
                        r.reject(e)
                    })
                }, function (e) {
                    r.reject(e)
                }), r.promise
            },
            checkFolderReadAccess: function (e, t) {
                var r = m.defer();
                return v.checkIsAdmin(e).then(function (n) {
                    return n ? r.resolve(n) : void g.checkFolderReadAccess(e, t).then(function (e) {
                        r.resolve(e)
                    }, function (e) {
                        r.reject(e)
                    })
                }, function (e) {
                    r.reject(e)
                }), r.promise
            },
            checkFolderWriteAccess: function (e, t) {
                var r = m.defer();
                return v.checkIsAdmin(e).then(function (n) {
                    return n ? r.resolve(n) : void g.checkFolderWriteAccess(e, t).then(function (e) {
                        r.resolve(e)
                    }, function (e) {
                        r.reject(e)
                    })
                }, function (e) {
                    r.reject(e)
                }), r.promise
            },
            checkDocumentReadAccess: function (e, t, r, n) {
                var o = m.defer();
                return v.checkIsAdmin(e).then(function (s) {
                    return s ? o.resolve(s) : void g.checkFolderReadAccess(e, t).then(function (s) {
                        1 == s ? I.checkDocumentReadAccess(e, t, r, n).then(function (e) {
                            o.resolve(e)
                        }, function (e) {
                            o.reject(e)
                        }) : o.reject("You don\'t have access to the folder")
                    }, function (e) {
                        o.reject(e)
                    })
                }, function (e) {
                    o.reject(e)
                }), o.promise
            },
            checkReportPermission: f,
            checkDashboardPermission: p,
            checkRolePermission: h,
            requireUserRoleWriteAccess: function (e, t, r) {
                d(e.user, function (e, n) {
                    return e ? r("Get permission error (urWrite)" + e) : n ? void r() : t.status(403).send("You don\'t have write permission in role! (urWrite)")
                })
            },
            requireFolderReadAccess: function (e, t, r) {
                var n = e.params.folderId || e.body.folderId;
                return !n || n < 12 ? t.status(400).send("Invalid folderId") : void s(e.user, n, function (e, n) {
                    return e ? r("Get permission error (fRead)" + e) : n ? void r() : t.status(403).send("You don\'t have permission to read Folder! (fRead)")
                })
            },
            requireFolderWriteAccess: function (e, t, r) {
                var n = e.params.folderId;
                return !n || n < 12 ? t.status(400).send("Invalid folderId") : void i(e.user, n, function (e, n) {
                    return e ? r("Get permission error (fWrite)" + e) : n ? void r() : t.status(403).send("You don\'t have permission to write to Folder! (fWrite)")
                })
            },
            requireRolePermissions: function (e, t) {
                return function (r, n, o) {
                    h(r, e, t).then(function (e) {
                        o()
                    }, function (e) {
                        n.status(403).send(e)
                    })
                }
            },
            requirePermissionDashboard: function (e) {
                return function (t, r, n) {
                    var s = t.params.dashboardId;
                    return !s || s < 12 ? r.status(400).send("Invalid dashboardId") : void o(t.user, s, e, function (e, t) {
                        return e ? n("Get permission error (pDashboard)" + e) : t ? void n() : r.status(403).send("You don\'t have permission for dashboard! (pDashboard)")
                    })
                }
            },
            requirePermissionReport: function (e) {
                return function (t, r, n) {
                    f(t, t.params.reportId, e).then(function () {
                        n()
                    }, function (e) {
                        r.status(403).send(e)
                    })
                }
            },
            requireProjectPermissions: function (e, t, r) {
                v.hasRolePermission(e.user, ["200", "202", "205"]).then(function (n) {
                    return n ? r() : (e.originalUrl.indexOf("projects") != -1 && (e.modifyCallback = !0, e.modifyFunction = function (t, r) {
                        return t && t.length ? b.dataSourcePermissions.viewDataSourcesByDefault ? r(null, t) : void c(e.user, function (e, n) {
                            for (var o = 0; o < t.length; o++) n.indexOf(t[o].Name) == -1 && (t.splice(o, 1), o--);
                            r(null, t)
                        }) : r(null, t)
                    }), void(e.body.Query ? c(e.user, function (n, o) {
                        return n ? r("Error get Project Permissions") : o.indexOf(e.body.Query.DataSourceInfo.Name) == -1 ? t.status(403).send("Restricted project name request") : void r()
                    }) : r()))
                }, function (e) {
                    r("Admin rights check error" + e)
                })
            },
            requireDataSourcePermissions: function (e, t, r) {
                v.hasRolePermission(e.user, ["200", "202", "205"]).then(function (n) {
                    n ? r() : (e.originalUrl.indexOf("cubes") != -1 && (e.modifyCallback = !0, e.modifyFunction = function (t, r) {
                        return t && t.length ? void u(e.user, l(e.originalUrl), function (e, n) {
                            if (e) return r("Error while get DataSource Permissions");
                            if (b.dataSourcePermissions.viewDataSourcesByDefault)
                                for (var o = 0; o < t.length; o++) n.excl.indexOf(t[o].Id) != -1 && (t.splice(o, 1), o--);
                            else
                                for (var o = 0; o < t.length; o++) n.sel.indexOf(t[o].Id) == -1 && (t.splice(o, 1), o--);
                            r(null, t)
                        }) : r(null, t)
                    }), e.body.Query ? u(e.user, e.body.Query.DataSourceInfo.Name, function (n, o) {
                        if (n) return r("Error get DataSource Permissions");
                        var s = !b.dataSourcePermissions.viewDataSourcesByDefault;
                        return (s = b.dataSourcePermissions.viewDataSourcesByDefault ? o.excl.indexOf(e.body.Query.CubeInfo.Id) != -1 : o.sel.indexOf(e.body.Query.CubeInfo.Id) == -1) ? t.status(403).send("Restricted cube name request") : void r()
                    }) : r())
                }, function (e) {
                    r("Admin rights check error" + e)
                })
            },
            requirePreSlice: function (e, t, r) {
                v.hasRolePermission(e.user, ["200", "202", "205"]).then(function (t) {
                    return t ? r() : void(e.body.Query ? a(e.user, e.body.Query.DataSourceInfo.Name, e.body.Query.CubeInfo.Id, function (t, n) {
                        return t ? r("Get preSlicer error") : (null != n && n.forEach(function (t) {
                            e.body.Query.FilterAxis.push(t)
                        }), void r())
                    }) : e.body.serverQuery && e.body.serverQuery.Query ? a(e.user, e.body.serverQuery.Query.DataSourceInfo.Name, e.body.serverQuery.Query.CubeInfo.Id, function (t, n) {
                        return t ? r("Get preSlicer error") : (null != n && n.forEach(function (t) {
                            e.body.serverQuery.Query.FilterAxis.push(t)
                        }), void r())
                    }) : r())
                }, function (e) {
                    r("Admin rights check error" + e)
                })
            },
            getUserRolePermissionsResultSet: function (e) {
                var t = m.defer();
                return v.getUserRolePermissionsResultSet(e).then(function (r) {
                    v.checkIsAdmin(e).then(function (e) {
                        if (e) {
                            var n = r.map(function (e) {
                                return e.value = !0, e
                            });
                            t.resolve(n)
                        } else t.resolve(r)
                    }, function (e) {
                        t.reject(e)
                    })
                }, function (e) {
                    t.reject(e)
                }), t.promise
            },
            getFolderPermissionsResultSet: function (e, t) {
                var r = m.defer();
                return g.getFolderPermissionsResultSet(e, t).then(function (t) {
                    v.checkIsAdmin(e).then(function (e) {
                        if (e) {
                            var n = t.map(function (e) {
                                return e.value = !0, e
                            });
                            r.resolve(n)
                        } else r.resolve(t)
                    }, function (e) {
                        r.reject(e)
                    })
                }, function (e) {
                    r.reject(e)
                }), r.promise
            },
            getDocumentPermissionsResultSet: function (e, t, r, n) {
                var o = m.defer();
                return I.getDocumentPermissionsResultSet(e, t, r, n).then(function (t) {
                    v.checkIsAdmin(e).then(function (e) {
                        if (e) {
                            var r = t.map(function (e) {
                                return e.value = !0, e
                            });
                            o.resolve(r)
                        } else o.resolve(t)
                    }, function (e) {
                        o.reject(e)
                    })
                }, function (e) {
                    o.reject(e)
                }), o.promise
            }
        }
    }.call(this, cachedModules[8271], cachedModules[8271].exports), cachedModules[9087] = {
        exports: {}
    },
    function (e, t) {
        function r(e) {
            var t = n.Schema({
                userId: {
                    type: i.Types.ObjectId
                },
                roleId: {
                    type: i.Types.ObjectId
                },
                activityType: {
                    type: String
                },
                objectType: {
                    type: String
                },
                objectName: {
                    type: String
                },
                activityDate: {
                    type: Date,
                    default: Date.now
                }
            }, {
                read: s.mongoose.replSetRead || "nearest"
            });
            e.model("auditLog", t)
        }
        var n = (require("q"), require("mongoose")),
            o = cachedModules[4524].exports,
            s = require("./lib_external/config"),
            i = n.Schema;
        e.exports = o.registerModel("auditLog", r)
    }.call(this, cachedModules[9087], cachedModules[9087].exports), cachedModules[5568] = {
        exports: {}
    },
    function (e, t) {
        function r(e) {
            var t = n.Schema({
                userId: {
                    type: i.Types.ObjectId
                },
                roleId: {
                    type: i.Types.ObjectId
                },
                activityType: {
                    type: String
                },
                objectType: {
                    type: String
                },
                objectName: {
                    type: String
                },
                activityDate: {
                    type: Date,
                    default: Date.now
                }
            }, {
                read: s.mongoose.replSetRead || "nearest"
            });
            e.model("auditLog", t)
        }
        var n = (require("q"), require("mongoose")),
            o = cachedModules[4524].exports,
            s = require("./lib_external/config"),
            i = n.Schema;
        e.exports = o.masterModel("auditLog", r)
    }.call(this, cachedModules[5568], cachedModules[5568].exports), cachedModules[4286] = {
        exports: {}
    },
    function (e, t) {
        function r() {}
        function n(e, t, n, i, a, u) {
            if (u = u || r, !t.userId) {
                var c = "Invalid user Id for log, " + n + " " + a;
                return d.error(c, t), u(c)
            }
            switch (e) {
            case "site":
                if (!t.dbPath) {
                    var c = "Invalid user dbPath for local log";
                    return d.error(c, t), u(c)
                }
                o(t.dbPath).then(function (e) {
                    var r = {
                            userId: t.userId,
                            roleId: t.roleId,
                            activityType: n,
                            objectType: i,
                            objectName: a
                        },
                        o = new e(r);
                    o.save(u)
                });
                break;
            case "master":
                s().then(function (e) {
                    var r = {
                            userId: t.userId,
                            roleId: t.roleId,
                            activityType: n,
                            objectType: i,
                            objectName: a
                        },
                        o = new e(r);
                    o.save(u)
                })
            }
        }
        var o = (require("./lib_external/config"), cachedModules[9087].exports),
            s = cachedModules[5568].exports,
            i = cachedModules[7958].exports,
            d = i();
        e.exports = {
            createLog: n
        }
    }.call(this, cachedModules[4286], cachedModules[4286].exports), cachedModules[4568] = {
        exports: {}
    },
    function (e, t) {
        function r(e, t) {
            var r = e.headers["x-auth-token"] || e.query.access_token || e.query.accessToken;
            if (r) {
                s.authenticate("bearer", {
                    session: !1
                }, function (r, n, s) {
                    if (r) t(!1, r);
                    else if (s && s.payload) {
                        var i = (new Date(s.payload.expiration).getTime() - (new Date).getTime()) / 1e3;
                        i < 0 && -i > o.server.auth.expLifeTime ? t(!1, "Expired") : u.Users().then(function (r) {
                            r.findOne({
                                _id: s.payload.userId
                            }, {
                                sessionId: 1,
                                userName: 1,
                                authId: 1,
                                _role: 1,
                                blocked: 1
                            }, function (r, i) {
                                return r || !i ? t(!1, r || "User not found") : i.blocked ? t(!1, "You were blocked by administrator!") : i.sessionId && i.sessionId == s.payload.sessionId ? o.server.sso.enabled && !i.authId && i.userName.toLowerCase() != p.publicUser.userName.toLowerCase() && "superadmin" != i._role ? t(!1, "Not allowed userName when SSO is enabled. Tried check as: " + i.userName) : (e.user = n && n.userId ? n : {}, void t(!0, s.payload)) : t(!1, "Your session was closed. Please login again.")
                            })
                        })
                    } else t(!1, "Invalid payload")
                })(e)
            } else t(e.isAuthenticated())
        }
        function n(e, t) {
            var r = new Date,
                n = p.isMobileDevice(e.headers["user-agent"] || ""),
                s = n ? o.server.auth.expMobilePeriod : o.server.auth.expPeriod;
            return !n && t && (s = o.server.auth.expRemember), +r.setTime(r.getTime() + 1e3 * s)
        }
        var o = require("./lib_external/config"),
            s = require("passport"),
            i = cachedModules[7746].exports,
            d = cachedModules[2049].exports,
            a = cachedModules[8271].exports,
            u = (cachedModules[3760].exports.Roles, cachedModules[3760].exports),
            c = (cachedModules[2611].exports, {}),
            l = cachedModules[4286].exports,
            f = cachedModules[8471].exports,
            p = cachedModules[4585].exports,
            h = cachedModules[7958].exports,
            m = h("auth");
        e.exports = {
            ssoAuthenticate: function (e, t, r) {
                var s = t;
                u.Users().then(function (t) {
                    t.findByUserName(s.toLowerCase(), function (a, c) {
                        return a ? r(a, !1) : c ? o.server.sso.enabled && !c.authId && "superadmin" != c._role ? r("Not allowed userName when SSO is enabled. Tried sso Login as: " + c.userName) : c.blocked ? r("You were blocked by administrator!") : void u.UsersMap().then(function (s) {
                            s.find({
                                userId: c._id
                            }).exec(function (s, a) {
                                if (s) return r("Error find user sites");
                                if (!a) return r("User map not found");
                                var u = a.map(function (e) {
                                    return e.siteId.toString()
                                });
                                c.sessionId = f.getRandomSequence(32);
                                var p = {
                                    expiration: n(e, !!e.body.remember),
                                    remember: !!e.body.remember,
                                    userName: c.userName,
                                    userId: c._id,
                                    sessionId: c.sessionId
                                };
                                if (e.body.siteId && u.indexOf(e.body.siteId) == -1) return r("Requesting site is invalid/not allowed.");
                                p.siteId = e.body.siteId;
                                var h = d.createToken(p),
                                    m = {
                                        userName: c.userName,
                                        firstName: c.firstName,
                                        lastName: c.lastName,
                                        token: h,
                                        sessionId: c.sessionId
                                    };
                                return l.createLog("master", {
                                    userId: c._id,
                                    roleId: c.roleId || ""
                                }, "Login", "User", "IP:" + (e.headers["x-forwarded-for"] || e.connection.remoteAddress || "...")), t.update({
                                    _id: c._id
                                }, {
                                    $set: {
                                        sessionId: c.sessionId
                                    }
                                }, function () {}), p.siteId && (c.dbPath = o.mongoose.connPrefix + "/" + p.siteId, i(c.dbPath).then(function (t) {
                                    t.findOneAndUpdate({
                                        userId: c._id
                                    }, {
                                        $set: m
                                    }, {
                                        new: !0
                                    }, function (t, r) {
                                        r && (delete m.token, l.createLog("site", c, "Login", "User", "IP:" + (e.headers["x-forwarded-for"] || e.connection.remoteAddress || "...")))
                                    })
                                })), r(null, {
                                    success: !0,
                                    user: m,
                                    accessToken: h
                                })
                            })
                        }, function (e) {
                            return r(e)
                        }) : r("Invalid user name: [" + s + "]")
                    })
                })
            },
            authenticate: function (e, t, r) {
                var n = s.authenticate(o.server.auth.strategy, {
                    session: o.server.auth.session
                }, function (n, s) {
                    return n ? r(n) : s ? s.blocked ? r("You were blocked by administrator!") : void e.logIn(s, function (n) {
                        if (n) return r(n);
                        e.body.remember ? e.session.cookie.maxAge = o.server.auth.expRemember : e.session.cookie.expires = !1;
                        var i = {
                            firstName: s.firstName,
                            lastName: s.lastName,
                            isAdmin: s.isAdmin()
                        };
                        t.status(201).send({
                            success: !0,
                            user: i
                        })
                    }) : r("Invalid User")
                });
                n(e, t, r)
            },
            login: function (e, t, r) {
                var a = function (s, a, c) {
                    return s ? r(s) : a ? a.blocked ? r("You were blocked by administrator!") : void e.logIn(a, function (s) {
                        return s ? r(s) : void u.Roles(a.db).GetNameById(a.roleId).then(function (r) {
                            var s = r.name,
                                u = {
                                    expiration: n(e, !!e.body.remember),
                                    remember: !!e.body.remember,
                                    userName: a.userName,
                                    userId: a._id,
                                    sessionId: a.sessionId,
                                    firstName: a.firstName,
                                    lastName: a.lastName,
                                    email: a.email
                                };
                            if (e.body.siteId && c.indexOf(e.body.siteId) == -1) return t.status(500).send("Requesting site is invalid/not allowed.");
                            u.siteId = e.body.siteId;
                            var f = d.createToken(u),
                                p = {
                                    userName: a.userName,
                                    firstName: a.firstName,
                                    lastName: a.lastName,
                                    token: f,
                                    sessionId: a.sessionId,
                                    email: a.email,
                                    roleId: a.roleId,
                                    roleName: s
                                };
                            l.createLog("master", {
                                userId: a._id,
                                roleId: a.roleId || ""
                            }, "Login", "User", "IP:" + (e.headers["x-forwarded-for"] || e.connection.remoteAddress || "...")), u.siteId ? (a.dbPath = o.mongoose.connPrefix + "/" + u.siteId, i(a.dbPath).then(function (r) {
                                r.findOneAndUpdate({
                                    userId: a._id
                                }, {
                                    $set: p
                                }, {
                                    new: !0
                                }, function (r, n) {
                                    n && (delete p.token, l.createLog("site", {
                                        userId: a._id,
                                        roleId: a.roleId || n.roleId || "",
                                        dbPath: a.dbPath
                                    }, "Login", "User", "IP:" + (e.headers["x-forwarded-for"] || e.connection.remoteAddress || "...")), t.status(201).send({
                                        success: !0,
                                        user: p,
                                        accessToken: f
                                    }))
                                })
                            })) : (delete p.token, t.status(201).send({
                                success: !0,
                                user: p,
                                accessToken: f
                            }))
                        })
                    }) : r("Invalid User name or password")
                };
                s.authenticate("local", {
                    session: !1
                }, a)(e, t, r)
            },
            ssoLogin: function (e, t, r) {
                function s(s) {
                    var s = s;
                    u.Users().then(function (a) {
                        a.findByUserName(s.toLowerCase(), function (c, h) {
                            return c ? r(c, !1) : h ? o.server.sso.enabled && !h.authId && h.userName.toLowerCase() != p.publicUser.userName.toLowerCase() && "superadmin" != h._role ? r("Not allowed userName when SSO is enabled. Tried sso Login as: " + h.userName) : h.blocked ? r("You were blocked by administrator!") : void u.UsersMap().then(function (s) {
                                s.find({
                                    userId: h._id
                                }).exec(function (s, u) {
                                    if (s) return r("Error find user sites");
                                    if (!u) return r("User map not found");
                                    var c = u.map(function (e) {
                                        return e.siteId.toString()
                                    });
                                    h.sessionId = f.getRandomSequence(32);
                                    var p = {
                                        expiration: n(e, !!e.body.remember),
                                        remember: !!e.body.remember,
                                        userName: h.userName,
                                        userId: h._id,
                                        sessionId: h.sessionId
                                    };
                                    if (e.body.siteId && c.indexOf(e.body.siteId) == -1) return t.status(500).send("Requesting site is invalid/not allowed.");
                                    p.siteId = e.body.siteId;
                                    var m = d.createToken(p),
                                        b = {
                                            userName: h.userName,
                                            firstName: h.firstName,
                                            lastName: h.lastName,
                                            token: m,
                                            sessionId: h.sessionId,
                                            email: h.email,
                                            roleId: h.roleId
                                        };
                                    l.createLog("master", {
                                        userId: h._id,
                                        roleId: h.roleId || ""
                                    }, "Login", "User", "IP:" + (e.headers["x-forwarded-for"] || e.connection.remoteAddress || "...")), t.status(201).send({
                                        success: !0,
                                        user: b,
                                        accessToken: m
                                    }), a.update({
                                        _id: h._id
                                    }, {
                                        $set: {
                                            sessionId: h.sessionId
                                        }
                                    }, function () {}), p.siteId && (h.dbPath = o.mongoose.connPrefix + "/" + p.siteId, i(h.dbPath).then(function (t) {
                                        t.findOneAndUpdate({
                                            userId: h._id
                                        }, {
                                            $set: b
                                        }, {
                                            new: !0
                                        }, function (t, r) {
                                            r && (delete b.token, l.createLog("site", h, "Login", "User", "IP:" + (e.headers["x-forwarded-for"] || e.connection.remoteAddress || "...")))
                                        })
                                    }))
                                })
                            }, function (e) {
                                return r(e)
                            }) : r("Invalid user name: [" + s + "]")
                        })
                    })
                }
                var a = null;
                if (!o.server.sso.enabled) return t.status("400").send("SSO is not enabled");
                if (!e.body.userCode) return t.status(500).send("No user code presented");
                try {
                    if (a = d.decodeToken(e.body.userCode), !a || !a.userName) return t.status(500).send("Invalid user code: " + e.body.ssoUser)
                } catch (e) {
                    return t.status(500).send("Unable to decode user code")
                }
                var c = a.userName;
                s(c)
            },
            isAuthenticated: r,
            requireAuth: function (e, t, r) {
                var a = e.headers["x-auth-token"] || e.query.access_token;
                a ? s.authenticate("bearer", {
                    session: !1
                }, function (s, u, f) {
                    if (s) return r(s);
                    if (!u) return m.error("NoUserDataFound", e.url, a), t.status(401).send("No user data found ra");
                    if (f && u.token) {
                        if ((!u.sessionId || f.payload.sessionId != u.sessionId) && u.userName.toLowerCase() != p.publicUser.userName.toLowerCase()) return t.status(401).send("Your session was ended. Please login again.");
                        var h = (new Date(f.payload.expiration).getTime() - (new Date).getTime()) / 1e3;
                        if (h < 0) {
                            if (-h > o.server.auth.expLifeTime) return l.createLog("master", {
                                userId: u._id,
                                roleId: u.roleId || ""
                            }, "sessionTimeOut", "User", "Token expired"), t.status(401).send("Your token is expired!");
                            if ("" == c[u._id] || c[u._id] == f.token) {
                                var b = f.payload,
                                    v = {
                                        remember: b.remember,
                                        expiration: n(e, !!b.remember),
                                        userId: u._id,
                                        userName: u.userName,
                                        siteId: u.siteId,
                                        sessionId: u.sessionId
                                    };
                                return c[u._id] = d.createToken(v), i(u.dbPath).then(function (e) {
                                    e.findOneAndUpdate({
                                        userId: v.userId,
                                        token: u.token
                                    }, {
                                        $set: {
                                            token: c[u._id]
                                        }
                                    }, {
                                        new: !0,
                                        upsert: !0
                                    }, function (e, t) {})
                                }), t.status(412).send({
                                    token: c[u._id],
                                    siteId: u.siteId
                                })
                            }
                            return t.status(412).send({
                                token: c[u._id],
                                siteId: u.siteId
                            })
                        }
                        return c[u._id] != f.token && (c[u._id] = f.token), e.user = u, r()
                    }
                    m.warn("unauth", f, u.token), t.status(401), t.send("You are not authenticated(Bearer)")
                })(e, t) : e.isAuthenticated() ? r() : (t.status(401), t.send("You are not authenticated"))
            },
            validAuthToken: function (e, t, r) {
                var n = e.headers["x-auth-token"] || e.query.access_token;
                n ? s.authenticate("bearer", {
                    session: !1
                }, function (n, o, s) {
                    if (n) return r(n);
                    if (s && s.payload) {
                        var i = (new Date(s.payload.expiration).getTime() - (new Date).getTime()) / 1e3;
                        if (i < 0) return l.createLog("master", {
                            userId: s.payload.userId,
                            roleId: ""
                        }, "sessionTimeOut", "User", "Token expired"), t.status(401).send("Your token is expired!");
                        u.Users().then(function (n) {
                            n.findOne({
                                _id: s.payload.userId
                            }, function (n, o) {
                                return n || !o ? t.status(500).send("Invalid User in token! " + n || "User not found") : o.sessionId && s.payload.sessionId == o.sessionId || !o || o.userName.toLowerCase() == p.publicUser.userName.toLowerCase() ? (e.info = s, o && (e.user = o), r()) : t.status(401).send("Your session was ended. Please login again.")
                            })
                        })
                    } else t.status(401), t.send("You are not authenticated(Bearer)")
                })(e, t) : e.isAuthenticated() ? r() : (t.status(401), t.send("You are not authenticated"))
            },
            requireAdminRights: function (e, t, r) {
                a.checkIsAdmin(e.user).then(function (e) {
                    e ? r() : t.status(403).send("You are not administrator")
                }, function (e) {
                    r(e)
                })
            },
            requireRole: function (e) {
                return function (t, r, n) {
                    t.user ? t.user.roles.indexOf(e) == -1 ? (r.status(403), r.send("You don\'t have role permissions!")) : n() : (r.status(401), r.send("You are not authenticated"))
                }
            },
            logout: function (e, t) {
                e.user && e.user.dbPath ? i(e.user.dbPath).then(function (r) {
                    r.findOneAndUpdate({
                        userId: e.user.userId
                    }, {
                        $set: {
                            token: "",
                            sessionId: ""
                        }
                    }, {
                        new: !0
                    }, function (r, n) {
                        l.createLog("site", e.user, "Logout", "User", e.user.userName), l.createLog("master", e.user, "Logout", "User", e.user.userName), e.logout(), t.redirect("/")
                    })
                }) : (m.error("Unable to logOut from site"), t.status(201).send({
                    success: !1
                }))
            },
            changeSite: function (e, t, r, n) {
                var s = e.info && e.info.token ? e.info.token : e.user ? e.user.token : "",
                    a = d.decodeToken(s);
                if (!a) return t.status(400).send("Invalid token");
                var c = a.siteId;
                c != r._id.toString() && (a.siteId = r._id.toString(), s = d.createToken(a)), u.Users().then(function (n) {
                    n.findOne({
                        _id: a.userId
                    }, {
                        sessionId: 1,
                        userName: 1,
                        authId: 1,
                        _role: 1
                    }, function (n, d) {
                        if (n || !d) return t.status(500).send(n || "User not found");
                        if ((!d.sessionId || d.sessionId != a.sessionId) && d.userName.toLowerCase() != p.publicUser.userName.toLowerCase()) return t.status(401).send("Your session was closed. Please login again.");
                        if (o.server.sso.enabled && !d.authId && d.userName.toLowerCase() != p.publicUser.userName.toLowerCase() && "superadmin" != d._role) return t.status(401).send("Not allowed userName when SSO is enabled. Tried switch as: " + d.userName);
                        var u = o.mongoose.connPrefix + "/" + a.siteId;
                        i(o.mongoose.connPrefix + "/" + a.siteId).then(function (n) {
                            n.findOneAndUpdate({
                                userId: a.userId
                            }, {
                                $set: {
                                    token: s,
                                    sessionId: d.sessionId
                                }
                            }, {
                                new: !0
                            }, function (n, i) {
                                if (n) return t.status(400).send(n);
                                if (!i) return t.status(400).send("No user data found CS");
                                if (i = i.toObject(), i.dbPath = u, i.siteId = a.siteId, e.user = i, c) {
                                    var d = {
                                        userId: i.userId,
                                        roleId: i.roleId,
                                        dbPath: o.mongoose.connPrefix + "/" + c
                                    };
                                    l.createLog("site", d, "Logout", "User", i.userName)
                                }
                                return l.createLog("site", e.user, "Login", "User", "Successfully login to " + r.name + " from " + (e.headers["x-forwarded-for"] || e.connection.remoteAddress)), c != a.siteId ? t.status(412).send({
                                    token: s,
                                    siteId: a.siteId
                                }) : void t.status(201).send(r)
                            })
                        })
                    })
                })
            },
            ensureMasterAdminRole: function (e, t, r) {
                e.user ? u.Users().then(function (n) {
                    n.find({
                        _id: e.user.userId,
                        _role: "superadmin"
                    }, {
                        userName: 1
                    }).exec().then(function (e) {
                        e.length > 0 ? r() : t.status(403).send("Forbidden")
                    }, function (e) {
                        r(e)
                    })
                }) : r("You are not admin")
            },
            ensureSitesManagerRole: function (e, t, r) {
                e.user ? u.Users().then(function (t) {
                    t.find({
                        _id: e.user.userId || e.user._id,
                        _role: "superadmin"
                    }, {
                        userName: 1
                    }).exec().then(function (t) {
                        t.length > 0 ? r() : (e.smError = "Forbidden", r(403))
                    }, function (e) {
                        r(e)
                    })
                }) : r(403)
            }
        }
    }.call(this, cachedModules[4568], cachedModules[4568].exports), cachedModules[3062] = {
        exports: {}
    },
    function (e, t) {
        function r() {}
        function n(e, t, n, o) {
            o = o || r;
            var s = l.defaults({
                    jar: !0
                }),
                i = {
                    method: t.method || "put",
                    headers: {
                        "x-auth-token": e.headers["x-auth-token"]
                    },
                    uri: m + t.action,
                    json: !0,
                    body: n
                };
            p.server.https.enabled && (i.strictSSL = !1), s(i, function (e, t, r) {
                return e ? o(e) : t && 2 == t.statusCode.toString()[0] ? void o(null, r) : o("from licenseService: " + (t ? t.statusCode : "No response") + " " + r)
            })
        }
        function o(e) {
            e = e || r, f.preferUUID = !0, f(e)
        }
        function s(e, t) {
            t = t || r, n(e, {
                method: "get",
                action: "licenseInfo"
            }, {}, t)
        }
        function i(e, t, s) {
            s = s || r, o(function (r, o) {
                return r ? s("Error get server key: " + r) : void n(e, {
                    method: "post",
                    action: "activate"
                }, {
                    licenseKey: t,
                    serverId: o
                }, function (e, t) {
                    return e ? s(e) : t.ok ? void s(null, !0) : s("License not applied: " + JSON.stringify(t))
                })
            })
        }
        function d(e, t) {
            t = t || r, n(e, {
                method: "post",
                action: "activateTrial"
            }, {}, t)
        }
        function a(e, t) {
            return t = t || r, h ? t(null, !0) : void o(function (r, o) {
                return r ? t("Error get server key: " + r) : void n(e, {
                    method: "put",
                    action: "checkLicense"
                }, {
                    serverId: o
                }, t)
            })
        }
        function u(e, t, s) {
            return s = s || r, h ? s(null, !0) : void o(function (r, o) {
                return r ? s("Error get server key: " + r) : void n(e, {
                    method: "put",
                    action: "checkOnAddUser"
                }, {
                    serverId: o,
                    roleId: t
                }, s)
            })
        }
        function c(e, t) {
            return t = t || r, h ? t(null, !0) : void n(e, {
                method: "put",
                action: "checkDataSource"
            }, {}, t)
        }
        var l = (require("q"), require("request")),
            f = require("serial-number"),
            p = require("./lib_external/config"),
            h = !1,
            m = (p.license.service.protocol || (p.server.https.enabled ? "https" : "http")) + "://" + (p.license.service.host || "localhost") + ":" + (p.license.service.port || p.server.port) + "/licenseService/";
        e.exports = {
            getServerId: o,
            getLicenseInfo: s,
            activateLicense: i,
            activateTrial: d,
            checkLicenseValidation: a,
            checkOnAddUser: u,
            checkDataSourceValid: c,
            requireLicenseValidation: function (e, t, r) {
                function n() {
                    t.redirect("/apps/license/index.html")
                }
                return h ? r() : void a(e, function (t, o) {
                    return t ? n() : o ? (e.warningDays = o.warningDays, void r()) : n()
                })
            },
            requireUserLicenseValidation: function (e, t, r) {
                if (h) return r();
                if (!e.body.roleId || e.body.roleId.length < 12) return void t.status(400).send("Invalid roleId");
                var n = e.body.roleId;
                u(e, n, function (e, n) {
                    return e ? t.status(403).send(e) : n ? void r() : t.status(403).send("You exceed the allowed limit of users")
                })
            }
        }
    }.call(this, cachedModules[3062], cachedModules[3062].exports), cachedModules[1220] = {
        exports: {}
    },
    function (e, t) {
        function r(e) {
            return n.randomBytes(Math.ceil(3 * e / 4)).toString("base64").slice(0, e).replace(/\//g, "-").replace(/\+/g, "_")
        }
        var n = require("crypto");
        e.exports = function (e, t, n) {
            var o = e.session._csrf || (e.session._csrf = r(24)),
                s = e.headers["x-xsrf-token"];
            switch (t.cookie("XSRF-TOKEN", o), e.method) {
            case "GET":
            case "HEAD":
            case "OPTIONS":
                break;
            default:
                if (s !== o) return t.status(403).end()
            }
            return n()
        }
    }.call(this, cachedModules[1220], cachedModules[1220].exports), cachedModules[4823] = {
        exports: {}
    },
    function (e, t) {
        e.exports = function (e, t, r) {
            var n = t.send;
            t.send = function (e) {
                var r = t.getHeader("Content-Type");
                return r && r.indexOf("application/json") !== -1 ? (2 === arguments.length && ("number" != typeof e && "number" == typeof arguments[1] ? this.statusCode = arguments[1] : (this.statusCode = e, e = arguments[1])), e = ")]}\',undefined" + e, n.call(t, e)) : void n.apply(t, arguments)
            }, r()
        }
    }.call(this, cachedModules[4823], cachedModules[4823].exports), cachedModules[7777] = {
        exports: {}
    },
    function (e, t) {
        function r(e) {
            return d.createHash("md5").update(e).digest("hex")
        }
        function n(e, t) {
            t.forEach(function (t) {
                var r = d.createHash("md5").update(e[t]).digest("hex"),
                    n = c.rootDir + "/client/" + c.client.rootPath + "/" + c.server.cacheImages.storeFolder + "/" + r;
                a.existsSync(n) || a.writeFile(n, new Buffer.from(e[t].replace(/^data:image\/(png|jpg|jpeg|tiff|gif);base64/gi, ""), "base64").toString("binary"), "binary", function (e) {
                    e && f.error("Error write to file", e)
                }), e[t] = "/apps/" + c.server.cacheImages.storeFolder + "/" + r
            })
        }
        function o(e, t, r) {
            var n = e[t].substr(e[t].lastIndexOf("/") + 1),
                o = u.resolve(c.rootDir + "/client/" + c.client.rootPath) + "/" + c.server.cacheImages.storeFolder + "/" + n;
            a.existsSync(o) ? e[t] = "data:image/gif;base64," + new Buffer.from(a.readFileSync(o)).toString("base64") : r[n] ? e[t] = r[n] : e[t] = ""
        }
        function s(e, t) {
            var r = "/apps/" + c.server.cacheImages.storeFolder + "/";
            for (var n in e) e.hasOwnProperty(n) && ("object" == typeof e[n] ? s(e[n], t) : "string" == typeof e[n] && e[n].indexOf(r) != -1 && o(e, n, t))
        }
        function i() {
            if (c.server.cacheImages.enabled) {
                var e = u.resolve(c.rootDir + "/client/" + c.client.rootPath) + "/" + c.server.cacheImages.storeFolder;
                try {
                    a.statSync(e)
                } catch (t) {
                    a.mkdir(e)
                }
            }
        }
        var d = require("crypto"),
            a = require("fs"),
            u = require("path"),
            c = require("./lib_external/config"),
            l = cachedModules[7958].exports,
            f = l("convertImages");
        e.exports = {
            init: i,
            getObjectImagesHash: function (e, t) {
                for (var n in e) e.hasOwnProperty(n) && ("object" == typeof e[n] ? this.getObjectImagesHash(e[n], t) : "string" == typeof e[n] && e[n].substr(0, 20).indexOf("data:image") != -1 && (t[r(e[n])] = e[n]))
            },
            processObject: function (e) {
                if (c.server.cacheImages.enabled) {
                    var t = [];
                    for (var r in e) e.hasOwnProperty(r) && ("object" == typeof e[r] ? this.processObject(e[r]) : "string" == typeof e[r] && e[r].substr(0, 20).indexOf("data:image") != -1 && t.push(r));
                    t.length > 0 && n(e, t)
                }
            },
            revertFromCache2Image: function (e, t) {
                if (c.server.cacheImages.enabled) {
                    var r = {};
                    t && this.getObjectImagesHash(t, r), s(e, r)
                }
            }
        }
    }.call(this, cachedModules[7777], cachedModules[7777].exports), cachedModules[937] = {
        exports: {}
    },
    function (e, t) {
        function r() {}
        function n(e) {
            function t(e, t) {
                var r = o.defer();
                return u.find({
                    userId: e,
                    gName: t
                }, function (e, t) {
                    return e ? r.reject(e) : void(t && (t.length <= 1 && t.forEach(function (e) {
                        e.gName = "", e.save()
                    }), r.resolve(t)))
                }), r.promise
            }
            function n(e, t) {
                var r = o.defer();
                return u.findOneAndUpdate(e, {
                    gName: t
                }, {
                    new: !0
                }, function (e, t) {
                    return e ? r.reject(e) : void(t && r.resolve(t))
                }), r.promise
            }
            var i = s.Schema({
                    userId: {
                        type: a.Types.ObjectId
                    },
                    doc: {
                        id: {
                            type: a.Types.ObjectId
                        },
                        type: {
                            type: String
                        },
                        displayName: {
                            type: String,
                            default: ""
                        }
                    },
                    gName: {
                        type: String,
                        default: ""
                    },
                    order: {
                        type: Number,
                        default: 0
                    },
                    createdDate: {
                        type: Date,
                        default: Date.now
                    }
                }, {
                    read: d.mongoose.replSetRead || "nearest"
                }),
                u = e.model("FavoriteDocs", i);
            u.check = function (e, t, n) {
                n = n || r;
                var o = {
                    userId: e,
                    "doc.id": t.id,
                    "doc.type": t.type
                };
                u.find(o).lean().exec(n)
            }, u.addOrUpdateDoc = function (e, t, n) {
                n = n || r, u.update({
                    userId: e
                }, {
                    $inc: {
                        order: 1
                    }
                }, {
                    multi: !0
                }, function (r, o) {
                    u.findOneAndUpdate({
                        userId: e,
                        "doc.id": t.id,
                        "doc.type": t.type
                    }, {
                        $set: {
                            userId: e,
                            doc: t
                        }
                    }, {
                        new: !0,
                        upsert: !0
                    }).exec(n)
                })
            }, u.addDocToGroup = function (e, t, s, i, d) {
                d = d || r;
                var a = {
                        userId: e,
                        gName: "",
                        "doc.id": s.id,
                        "doc.type": s.type
                    },
                    u = {
                        userId: e,
                        gName: "",
                        "doc.id": i.id || "",
                        "doc.type": i.type || ""
                    },
                    c = [];
                c.push(n(a, t)), "" != u["doc.id"] && c.push(n(u, t)), o.all(c).then(function (e) {
                    d(null, e)
                }, function (e) {
                    d(e, null)
                })
            }, u.removeDocFromGroup = function (e, n, s, i) {
                i = i || r;
                var d = {
                        userId: e,
                        gName: n,
                        "doc.id": s.id,
                        "doc.type": s.type
                    },
                    a = [],
                    c = function (e) {
                        var t = o.defer();
                        return u.findOneAndUpdate(e, {
                            gName: ""
                        }, {
                            new: !0
                        }, function (e, r) {
                            return e ? t.reject(e) : void t.resolve(r)
                        }), t.promise
                    };
                a.push(c(d)), a.push(t(e, n)), o.all(a).then(function (e) {
                    i(null, e)
                }, function (e) {
                    i(e, null)
                })
            }, u.removeGroupWithDocs = function (e, t, n) {
                n = n || r;
                var o = {
                    userId: e,
                    gName: t
                };
                u.remove(o).exec(n)
            }, u.removeGroupWithoutDocs = function (e, t, n) {
                n = n || r;
                var o = {
                        userId: e,
                        gName: t
                    },
                    s = {
                        gName: ""
                    },
                    i = {
                        multi: !0
                    };
                u.update(o, s, i).exec(n)
            }, u.removeDoc = function (e, n, o) {
                o = o || r;
                var s = {
                    userId: e,
                    "doc.id": n.id,
                    "doc.type": n.type
                };
                u.findOneAndRemove(s).exec(function (r, n) {
                    r ? o(r, null) : (n && n.gName && "" != n.gName && t(e, n.gName), o(null, n))
                })
            }, u.removeDocById = function (e, n) {
                n = n || r;
                var s = u.update({}, {
                    $pull: {
                        doc: {
                            id: e.id,
                            type: e.type
                        }
                    }
                }, {
                    multi: !0,
                    upsert: !0
                }).exec();
                s.then(function (e) {
                    var r = [];
                    return e.forEach(function (e) {
                        "" != e.gName && r.push(t(e.userId, e.gName))
                    }), o.all(r)
                }).then(function (e) {
                    n(null, e)
                }, function (e) {
                    n(e, null)
                })
            }, u.removeDocForAll = function (e, t, n) {
                n = n || r, u.remove({
                    "doc.id": {
                        $in: e
                    },
                    "doc.type": t
                }).exec(n)
            }
        }
        var o = require("q"),
            s = require("mongoose"),
            i = cachedModules[4524].exports,
            d = require("./lib_external/config"),
            a = s.Schema;
        e.exports = i.registerModel("FavoriteDocs", n)
    }.call(this, cachedModules[937], cachedModules[937].exports), cachedModules[5151] = {
        exports: {}
    },
    function (e, t) {
        function r() {}
        function n(e) {
            var t = o.Schema({
                    userId: {
                        type: d.Types.ObjectId
                    },
                    doc: {
                        id: {
                            type: d.Types.ObjectId
                        },
                        type: {
                            type: String
                        }
                    },
                    order: {
                        type: Number,
                        default: 0
                    },
                    createdDate: {
                        type: Date,
                        default: Date.now
                    }
                }, {
                    read: i.mongoose.replSetRead || "nearest"
                }),
                n = e.model("RecentDocs", t);
            n.addOrUpdateDoc = function (e, t, o) {
                o = o || r, n.update({
                    userId: e
                }, {
                    $inc: {
                        order: 1
                    }
                }, {
                    multi: !0
                }, function (r, s) {
                    n.findOneAndUpdate({
                        userId: e,
                        "doc.id": t.id,
                        "doc.type": t.type
                    }, {
                        $set: {
                            userId: e,
                            doc: t,
                            order: 0
                        }
                    }, {
                        new: !0,
                        upsert: !0
                    }).exec(o), n.count(function (e, t) {
                        t > a && n.find({}).sort({
                            _id: 1
                        }).limit(t - a).exec(function (e, t) {
                            if (!e && t) {
                                var r = t.map(function (e) {
                                    return e._id
                                });
                                n.remove({
                                    _id: {
                                        $in: r
                                    }
                                }).exec()
                            }
                        })
                    })
                })
            }, n.removeDoc = function (e, t, o) {
                o = o || r, n.remove({
                    userId: e,
                    "doc.id": t.id,
                    "doc.type": t.type
                }).exec(o)
            }, n.removeDocForAll = function (e, t, o) {
                o = o || r, n.remove({
                    "doc.id": {
                        $in: e
                    },
                    "doc.type": t
                }).exec(o)
            }
        }
        var o = require("mongoose"),
            s = cachedModules[4524].exports,
            i = require("./lib_external/config"),
            d = o.Schema,
            a = 50;
        e.exports = s.registerModel("RecentDocs", n)
    }.call(this, cachedModules[5151], cachedModules[5151].exports), cachedModules[2606] = {
        exports: {}
    },
    function (e, t) {
        function r(e) {
            e.definition = {
                tabs: p.format("/dashboard/%s/tabs", e._id)
            }
        }
        function n(e) {
            e.definition = {
                controls: p.format("/dashboard/%s/tabs/%s/controls", e.dashboardId, e._id)
            }
        }
        function o() {
            return f.resolve(S.rootDir + "/client/" + ("" != S.client.rootPath ? S.client.rootPath + "/" : "") + "dashboard/modules/controls/directives/customControls")
        }
        var s = require("q"),
            i = require("fs"),
            d = cachedModules[7777].exports,
            a = require("fs-extra"),
            u = require("adm-zip"),
            c = require("connect-multiparty"),
            l = c(),
            f = require("path"),
            p = require("util"),
            h = require("serve-static"),
            m = cachedModules[4568].exports,
            b = cachedModules[8271].exports,
            v = cachedModules[5033].exports,
            g = cachedModules[4991].exports,
            I = cachedModules[937].exports,
            y = cachedModules[5151].exports,
            x = cachedModules[6996].exports,
            M = cachedModules[1268].exports,
            S = require("./lib_external/config"),
            P = cachedModules[4585].exports,
            N = cachedModules[4286].exports,
            w = cachedModules[7958].exports,
            q = w("dashboard");
        e.exports = {
            name: "Dashboard",
            startUrl: "/apps/dashboard/index.html",
            iconClass: "fa-dashboard",
            basicRepoPath: "/dashboard",
            statics: {
                authRequired: !0,
                prefix: "/apps/dashboard",
                path: "/dashboard"
            },
            initModule: function (e) {
                function t(e, t, r) {
                    r = r || function () {}, v.dashboard(e).findOne({
                        _id: t
                    }).exec(function (n, o) {
                        if (n) return r("Dashboard find error:" + n);
                        if (!o) return r("Dashboard not found" + t);
                        v.tabs(e).find({
                            dashboardId: t
                        }, function (t, r) {
                            if (t) return q.error("Error find tabs");
                            var n = r.map(function (e) {
                                return e._id
                            });
                            v.controls(e).remove({
                                tabId: {
                                    $in: n
                                }
                            }).exec(), v.tabs(e).remove({
                                _id: {
                                    $in: n
                                }
                            }).exec()
                        });
                        var s = {
                            id: t,
                            type: P.modulesTypeName.dashboard
                        };
                        I(e).removeDocForAll([t], P.modulesTypeName.dashboard, function (e, t) {
                            e && q.error("error find doc in favorite")
                        }), y(e).removeDocForAll([t], P.modulesTypeName.dashboard, function (e, t) {
                            e && q.error("error find doc in recent")
                        }), x(e).RemoveByDoc(s, function (e, t) {
                            e && q.error("error find doc in document permissions")
                        }), o.remove(function (e) {
                            r(null, {
                                success: !0,
                                dashboardName: o.dashboardName
                            })
                        })
                    })
                }
                function c(e) {
                    if (i.existsSync(e)) {
                        i.readdirSync(e).forEach(function (t, r) {
                            var n = e + "/" + t;
                            i.lstatSync(n).isDirectory() ? c(n) : i.unlinkSync(n)
                        });
                        try {
                            return i.rmdirSync(e), !0
                        } catch (e) {
                            return !1
                        }
                    }
                }
                function p(e) {
                    var t = e.body.controlName + "Control",
                        r = e.body.controlName.split(/(?=[A-Z])/);
                    e.body.inheritedFrom = e.body.inheritedFrom || {};
                    var n = "";
                    if (e.body.controlHtmlFile || e.body.controlHtml) n = "/apps/dashboard/modules/controls/directives/customControls/" + t + "/" + t + ".html";
                    else if (e.body.inheritedFrom.controlType) {
                        var s = e.body.inheritedFrom.controlType.split("-").join("");
                        i.existsSync(o() + ("Custom" == e.body.inheritedFrom.category ? "" : "/..") + "/" + s + "/" + s + ".html") && (n = "/apps/dashboard/modules/controls/directives/" + ("Custom" == e.body.inheritedFrom.category ? "customControls/" : "") + s + "/" + s + ".html")
                    }
                    var d = {
                        name: e.body.controlTitle || e.body.name,
                        controlName: e.body.controlName,
                        supportFeatures: e.body.supportFeatures,
                        defaultWidth: e.body.defaultWidth,
                        defaultHeight: e.body.defaultHeight,
                        replaceMethods: e.body.replaceMethods,
                        controlSrcFile: e.body.controlSrcFile,
                        controlHtmlFile: e.body.controlHtmlFile,
                        controlAssetsFile: e.body.controlAssetsFile,
                        controlHtmlTemplate: n,
                        iconClass: e.body.iconClass || (e.body.iconUrl ? null : "image"),
                        iconUrl: e.body.iconClass ? null : e.body.iconUrl,
                        tooltip: e.body.tooltip || "No description",
                        controlType: r.join("-") + "-control",
                        inheritedFrom: e.body.inheritedFrom.controlType || "",
                        category: "Custom"
                    };
                    i.writeFileSync(o() + "/" + t + "/" + t + ".meta.json", JSON.stringify(d)), e.body.controlHtml && i.writeFileSync(o() + "/" + t + "/" + t + ".html", e.body.controlHtml), e.body.controlSrc && i.writeFileSync(o() + "/" + t + "/" + t + ".definition.js", e.body.controlSrc), e.body.controlSrcFile && !e.body.controlSrc && (e.body.controlSrc = i.readFileSync(o() + "/" + t + "/" + t + ".definition.js", "utf8")), e.body.controlAssetsFile || a.removeSync(o() + "/" + t + "/resources", function (e) {
                        return e ? q.error(e) : void q.info("success!")
                    });
                    var u = "(function () {undefinedundefined";
                    if (u += "            \'use strict\';undefinedundefined", u += "        customCtrl.$inject = [\'$scope\', \'$element\', \'$attrs\', \'$injector\', \'$q\', \'$http\', \'$compile\', \'dm.dashboard.controls.settingsFactory\', \'dm.dashboard.controls.controlFactory\'];undefinedundefined", u += "            angularundefinedundefined", u += "                .module(\'dm.dashboard.controls\')undefinedundefined", u += "                //.controller(\'dm.dashboard.controls." + e.body.controlName + "Ctrl\', customCtrlFn)undefinedundefined", u += "                .directive(\'dm.dashboard.controls." + e.body.controlName + "Control\', customDirective);undefinedundefined", u += "            undefinedundefined", u += "        undefinedundefined", u += "undefinedundefined", u += "        function customCtrl($scope, $element, $attrs, $injector, $q, $http, $compile, settingsFactory, controlFactory) {undefinedundefined", u += "             var vm = this;undefinedundefined", u += "             vm.initModel = initModel;undefinedundefined", u += "             vm.run = run;undefinedundefined", u += "        undefinedundefined", u += "             return run();undefinedundefined", u += "undefinedundefined", u += "             function initModel(controlModel, element, settingsFactory, controlFactory) {undefinedundefined", u += "                       var parentCtrl = \'" + (e.body.inheritedFrom.controlType || "") + "\';undefinedundefined", u += "                       var parentInstance = null;undefinedundefined", u += "                    return controlFactory.getControl(parentCtrl, \'" + e.body.inheritedFrom.category + "\').then(function(ctrlFn){undefinedundefined", u += "                       if (ctrlFn) {undefinedundefined", u += "                          parentInstance = $injector.invoke(ctrlFn, {}, {$scope:$scope, $element:$element, $attrs:$attrs});undefinedundefined", u += "                       }undefinedundefined", u += "                       if (parentInstance){undefinedundefined", u += "                           parentInstance.then(function(){undefinedundefined", u += "                                return initCtrl();undefinedundefined", u += "                           });undefinedundefined", u += "                       } else {undefinedundefined", u += "                            return initCtrl();undefinedundefined", u += "                       }undefinedundefined", u += "                         function initCtrl(){ undefinedundefined", u += "                         controlModel.$element = $element;undefinedundefined", u += "                         controlModel.$scope = $scope;undefinedundefined", u += "                         var customDefinitions = " + (e.body.controlSrc || "{};") + "undefinedundefined", u += "                         if (customDefinitions.scripts) {undefinedundefined", u += "                           var deferred = $q.defer();undefinedundefined", u += "                             loadModules(customDefinitions.scripts, function(){ undefinedundefined", u += "                                 runControl();undefinedundefined", u += "                                 deferred.resolve();undefinedundefined", u += "                             });undefinedundefined", u += "                           return deferred.promise;undefinedundefined", u += "                         } else  undefinedundefined", u += "                          runControl(); undefinedundefined", u += "                           undefinedundefined", u += "                         function runControl(){ undefinedundefined", u += "                         var methods = [\'init\', \'resized\', \'stopped\',\'destroy\',\'render\',\'applySettings\'];undefinedundefined", !e.body.replaceMethods) {
                        if (e.body.replaceMethods ? (u += "                         methods.forEach(function(fnName){undefinedundefined", u += "                             if(customDefinitions[fnName]) controlModel[fnName] = customDefinitions[fnName];undefinedundefined", u += "                         });undefinedundefined") : (u += "                       if (parentCtrl){undefinedundefined", u += "                           var ancestor = controlModel[\'ancestor\'+controlModel.controlType] = {};undefinedundefined", u += "                           methods.forEach(function(fnName){undefinedundefined", u += "                             ancestor[fnName] = controlModel[fnName];undefinedundefined", u += "                             if(!!customDefinitions[fnName]) undefinedundefined", u += "                                controlModel[fnName] = function(){undefinedundefined", u += "                                    if (ancestor[fnName])undefinedundefined", u += "                                        ancestor[fnName]();undefinedundefined", u += "                                    customDefinitions[fnName]();undefinedundefined", u += "                                }undefinedundefined", u += "                           });undefinedundefined", u += "                        } else {undefinedundefined", u += "                           methods.forEach(function(fnName){undefinedundefined", u += "                               if(customDefinitions[fnName]) controlModel[fnName] = customDefinitions[fnName];undefinedundefined", u += "                           });undefinedundefined", u += "                        }undefinedundefined"), u += "                         controlModel.supportFeatures = controlModel.supportFeatures||[];undefinedundefined", e.body.supportFeatures && (u += "                         controlModel.supportFeatures.push.apply(controlModel.supportFeatures," + JSON.stringify(e.body.supportFeatures) + ");undefinedundefined"), u += "undefinedundefined", u += "                         if (controlModel.state == \'new\' && $scope.controlModel.location.width == 100 && $scope.controlModel.location.height == 100) {undefinedundefined", u += "                             controlModel.location.width = " + e.body.defaultWidth + "||controlModel.location.width||100;undefinedundefined", u += "                             controlModel.location.height = " + e.body.defaultHeight + "||controlModel.location.height||100;undefinedundefined", u += "                         }undefinedundefined", u += "undefinedundefined", u += "                         //create supporting featuresundefinedundefined", u += "                         settingsFactory.settingsProp(controlModel);undefinedundefined", u += "undefinedundefined", u += "                         var settings = (customDefinitions)?customDefinitions.defaultSettings||{}:{};undefinedundefined", u += "                         $.extend(true, settings, controlModel.settings);undefinedundefined", u += "                         controlModel.settings = settings;undefinedundefined", u += "                         controlModel.applySettings = controlModel.applySettings||function(){};undefinedundefined", u += "                         if (controlModel.init) controlModel.init();undefinedundefined", u += "                         controlModel.events = controlModel.events || [];undefinedundefined", u += "                         if (customDefinitions.events){undefinedundefined", u += "                             customDefinitions.events.forEach(function(event){undefinedundefined", u += "                                controlModel.events.push(event);undefinedundefined", u += "                             });undefinedundefined", u += "                         }undefinedundefined", u += "                         controlModel.menu = controlModel.menu || [];undefinedundefined", u += "                         if (customDefinitions.menu){undefinedundefined", u += "                             customDefinitions.menu.forEach(function(menuItem){undefinedundefined", u += "                                controlModel.menu.push(menuItem);undefinedundefined", u += "                             });undefinedundefined", u += "                         }undefinedundefined", u += "                     }undefinedundefined", u += "undefinedundefined", u += "                       }undefinedundefined", u += "                     });undefinedundefined", u += "             }undefinedundefined", u += "             function run() {undefinedundefined", u += "                return initModel($scope.controlModel, $element, settingsFactory, controlFactory).then(function(){undefinedundefined", u += "                     $scope.controlModel.applySettings();undefinedundefined", u += "                     $scope.controlModel.controlReady($scope.controlModel);undefinedundefined", u += "                 });undefinedundefined", u += "             }undefinedundefined", u += "        }undefinedundefined", u += "undefinedundefined", u += "        window.controlCache = window.controlCache||[];undefinedundefined", u += "        window.controlCache.push({name:\'" + d.controlType + "\', ctrlFn:customCtrl});undefinedundefined", u += "undefinedundefined", u += "        function customDirective() {undefinedundefined", u += "            var directive = {undefinedundefined", e.body.controlHtmlFile || e.body.controlHtml) u += "                templateUrl: \'/apps/dashboard/modules/controls/directives/customControls/" + t + "/" + t + ".html\',undefinedundefined";
                        else if (e.body.inheritedFrom.controlType) {
                            var s = e.body.inheritedFrom.controlType.split("-").join("");
                            if (i.existsSync(o() + ("Custom" == e.body.inheritedFrom.category ? "" : "/..") + "/" + s + "/" + s + ".html")) u += "                templateUrl: \'/apps/dashboard/modules/controls/directives/" + ("Custom" == e.body.inheritedFrom.category ? "customControls/" : "") + s + "/" + s + ".html\',undefinedundefined";
                            else {
                                var c = JSON.parse(i.readFileSync(o() + ("Custom" == e.body.inheritedFrom.category ? "" : "/..") + "/" + s + "/" + s + ".meta.json"));
                                u += c.controlHtmlTemplate ? "                templateUrl: \'" + c.controlHtmlTemplate + "\',undefinedundefined" : "                template:\'<div style=\"width: 100%; height: 100%;border:1px solid black;\"></div>\',undefinedundefined"
                            }
                        } else u += "                template:\'<div style=\"width: 100%; height: 100%;border:1px solid black;\"></div>\',undefinedundefined";
                        u += "                scope: {undefinedundefined", u += "                    controlModel: \'=\'undefinedundefined", u += "                },undefinedundefined", u += "                restrict: \'A\',undefinedundefined", u += "                controller: customCtrlundefinedundefined", u += "            };undefinedundefined", u += "            return directive;undefinedundefined", u += "        }undefinedundefined", u += "})();", i.writeFileSync(o() + "/" + t + "/" + t + ".js", u)
                    }
                }
                return e.use(this.statics.prefix, h(f.resolve(S.rootDir + "/client/" + S.client.rootPath + this.statics.path), S.server.staticContent.enableCaching ? {
                    maxAge: S.server.staticContent.cachePeriod
                } : {})), e.post("/dashboard", m.requireAuth, b.requireUserRoleWriteAccess, function (e, n) {
                    return !e.body.folderId || e.body.folderId.length < 12 ? void n.status(400).send("Invalid folderId") : void g(e.user.dbPath).then(function (o) {
                        o.findById(e.body.folderId).exec(function (i, a) {
                            i && n.status(500).send("Find error:" + i), a ? b.checkFolderWriteAccess(e.user, e.body.folderId).then(function (i) {
                                i ? v.dashboard(o.db).findOne({
                                    folderId: e.body.folderId,
                                    dashboardName: e.body.dashboardName
                                }, function (i, u) {
                                    if (i) return void n.status(500).send("Can\'t find by name: " + e.body.dashboardName);
                                    var c = new v.dashboard(o.db)({
                                        dashboardName: e.body.dashboardName,
                                        folderId: e.body.folderId,
                                        description: e.body.description,
                                        thumbnail: e.body.thumbnail || null,
                                        settings: {
                                            gridSize: e.body.gridSize || 10,
                                            switchGrid: e.body.switchGrid !== !1,
                                            dataSource: e.body.dataSource || null,
                                            cube: e.body.cube || null,
                                            originalSize: e.body.originalSize || {},
                                            canvasSize: e.body.canvasSize || {},
                                            hideTabs: e.body.hideTabs || !1,
                                            tabsLayout: e.body.tabsLayout || "top",
                                            mobileMode: e.body.mobileMode || !1,
                                            mobileWidth: e.body.mobileWidth || 0,
                                            mobileOrientation: e.body.mobileOrientation || "Portrait",
                                            controlsMapping: e.body.controlsMapping || "Free",
                                            tabHeadersType: e.body.tabHeadersType || "Title",
                                            aspectRatio: e.body.aspectRatio || "Stretch",
                                            autoRefresh: e.body.autoRefresh || !1,
                                            refreshTime: e.body.refreshTime || 5,
                                            backgroundColor: e.body.backgroundColor || "white",
                                            backgroundImage: e.body.backgroundImage || "",
                                            tileOptions: e.body.tileOptions || {
                                                columns: 7,
                                                columnWidth: 200,
                                                rowHeight: 150,
                                                columnTiles: 4,
                                                rowTiles: 2,
                                                contentPosition: "Dynamic"
                                            }
                                        },
                                        meta: {
                                            createdDate: new Date,
                                            ownerId: e.user._id
                                        }
                                    });
                                    c.save(function (i, c) {
                                        if (i) return n.status(500).send("Error insert/update" + i);
                                        var l = s.defer();
                                        u ? t(o.db, u._id, function (t, r) {
                                            t && l.reject("Delete error: [" + u._id + "] " + t), N.createLog("site", e.user, "Delete", "Dashboard", "During overwrite " + e.body.dashboardName + " in folder " + a.name), l.resolve()
                                        }) : l.resolve(), l.promise.then(function () {
                                            var t = {
                                                id: c._id,
                                                type: P.modulesTypeName.dashboard
                                            };
                                            y(o.db).addOrUpdateDoc(e.user._id, t), x(o.db).Init(e.body.folderId, t, M), b.getDocumentPermissionsResultSet(e.user, c.folderId, c._id, P.modulesTypeName.dashboard).then(function (t) {
                                                c = c.toObject(), c.permissions = t, r(c), d.processObject(c), N.createLog("site", e.user, "Create", "Dashboard", e.body.dashboardName + " in folder " + a.name), n.status(201).send(c)
                                            }, function (t) {
                                                n.status(500).send("Find error:" + t), N.createLog("site", e.user, "Create", "Dashboard", c.dashboardName + " in folder " + a.name)
                                            })
                                        }, function (e) {
                                            return n.status(500).send(e)
                                        })
                                    })
                                }) : n.status(400).send("You don\'t have write permission to the folder")
                            }, function (e) {
                                n.status(500).send("Find error: " + e)
                            }) : n.status(500).send("Folder does not exist")
                        })
                    })
                }), e.put("/dashboards/folderItems/", m.requireAuth, b.requireFolderReadAccess, function (e, t) {
                    if (!e.body.folderId || e.body.folderId.length < 12) return t.status(400).send("Invalid folder Id to get dashboard" + e.body.folderId);
                    var r = {
                        skipCount: e.body.skipCount || 0,
                        size: e.body.pageSize || 30,
                        num: e.body.pageNum || 1
                    };
                    v.dashboard(e.user.dbPath).then(function (n) {
                        n.find({
                            folderId: e.body.folderId
                        }, {
                            settings: 0
                        }).skip(r.skipCount || r.size * (r.num - 1)).limit(r.size).lean().exec(function (n, o) {
                            if (n) return t.status(500).send("Find folder error:" + n);
                            var i = [];
                            o.forEach(function (t) {
                                i.push(b.getDocumentPermissionsResultSet(e.user, t.folderId, t._id, P.modulesTypeName.dashboard).then(function (e) {
                                    var r = {};
                                    return e.forEach(function (e) {
                                        r[e.enum] = e.value
                                    }), 1 == r[100] ? (d.processObject(t), t.canModify = !!r[101], t) : ""
                                }))
                            }), s.all(i).then(function (e) {
                                e = e.filter(function (e) {
                                    return "" !== e
                                }), t.status(201).send({
                                    page: r,
                                    items: e,
                                    hasMore: e.length == r.size
                                })
                            }, function (e) {
                                t.status(500).send(" Find error:" + e)
                            })
                        })
                    })
                }), e.put("/dashboard/:dashboardId/rename", m.requireAuth, b.requireUserRoleWriteAccess, b.requirePermissionDashboard(["100", "101"]), function (e, t) {
                    return e.params.dashboardId.length < 12 ? t.status(400).send("Dashboard Id is not valid") : e.body.dashboardName ? e.body.folderId ? (q.info("Rename body", e.body), void v.dashboard(e.user.dbPath).then(function (r) {
                        r.findOne({
                            folderId: e.body.folderId,
                            dashboardName: e.body.dashboardName
                        }, function (n, o) {
                            return n ? t.status(500).send("Can\'t get dashboard information!" + n) : o ? t.status(400).send("Dashboard with same name [" + o.dashboardName + "] already exists! Choose another name!") : void r.findOneAndUpdate({
                                _id: r.objectId(e.params.dashboardId)
                            }, {
                                $set: {
                                    dashboardName: e.body.dashboardName
                                }
                            }, function (r, n) {
                                return r ? t.status(500).send("Error update dashboard " + r) : (N.createLog("site", e.user, "Update", "Dashboard", "Rename from [" + n.dashboardName + "] to [" + e.body.dashboardName + "]"), void t.status(201).send({
                                    success: !0
                                }))
                            })
                        })
                    })) : t.status(400).send("Invalid folderId of updating dashboard.") : t.status(400).send("Invalid dashboard name.[" + e.body.dashboardName + "]")
                }), e.put("/dashboard/:folderId/exists", m.requireAuth, b.requireFolderReadAccess, function (e, t) {
                    return e.params.folderId.length < 12 ? void t.status(400).send("Folder Id is not valid") : void v.dashboard(e.user.dbPath).then(function (r) {
                        var n = {};
                        n.folderId = e.params.folderId, n.dashboardName = e.body.dashboardName, e.body.dashboardId && (n._id = {
                            $ne: r.objectId(e.body.dashboardId)
                        }), r.findOne(n, function (e, r) {
                            return e ? void t.status(500).send("Error find dashboard " + e) : void t.status(201).send(!!r)
                        })
                    })
                }), e.put("/dashboard/:dashboardId", m.requireAuth, b.requireUserRoleWriteAccess, b.requirePermissionDashboard(["100", "101"]), function (e, n) {
                    if (e.params.dashboardId.length < 12) return n.status(400).send("Dashboard Id is not valid");
                    if (!e.body.folderId) return n.status(400).send("Folder id is undefined");
                    var o = null;
                    v.dashboard(e.user.dbPath).then(function (s) {
                        e.params.dashboardId && e.params.dashboardId.length > 10 && (o = {
                            _id: s.objectId(e.params.dashboardId)
                        }), s.findOneAndUpdate({
                            _id: s.objectId(e.params.dashboardId)
                        }, {
                            dashboardName: e.body.dashboardName,
                            folderId: e.body.folderId,
                            description: e.body.description || "",
                            thumbnail: e.body.thumbnail || null,
                            settings: {
                                gridSize: e.body.gridSize || 10,
                                switchGrid: e.body.switchGrid !== !1,
                                dataSource: e.body.dataSource || null,
                                cube: e.body.cube || null,
                                originalSize: e.body.originalSize || {},
                                canvasSize: e.body.canvasSize || {},
                                hideTabs: e.body.hideTabs || !1,
                                tabsLayout: e.body.tabsLayout || "top",
                                mobileMode: e.body.mobileMode || !1,
                                mobileWidth: e.body.mobileWidth || 0,
                                mobileOrientation: e.body.mobileOrientation || "Portrait",
                                controlsMapping: e.body.controlsMapping || "Free",
                                tabHeadersType: e.body.tabHeadersType || "Title",
                                aspectRatio: e.body.aspectRatio || "Stretch",
                                autoRefresh: e.body.autoRefresh || !1,
                                backgroundColor: e.body.backgroundColor || "white",
                                backgroundImage: e.body.backgroundImage || "",
                                refreshTime: e.body.refreshTime || 5,
                                tileOptions: e.body.tileOptions || {
                                    columns: 7,
                                    columnWidth: 200,
                                    rowHeight: 150,
                                    columnTiles: 4,
                                    rowTiles: 2,
                                    contentPosition: "Dynamic"
                                }
                            },
                            meta: {
                                lastModifiedDate: new Date,
                                modifiedUserId: e.user._id
                            }
                        }, {
                            new: !0,
                            passRawResult: !0
                        }, function (o, i, a) {
                            return o ? n.status(500).send("Error update dashboard " + o) : i ? (b.getDocumentPermissionsResultSet(e.user, i.folderId, i._id, P.modulesTypeName.dashboard).then(function (t) {
                                i = i.toObject(), r(i), d.processObject(i), i.permissions = t, N.createLog("site", e.user, "Save", "Dashboard", e.body.dashboardName), n.status(201).send(i)
                            }, function (e) {
                                n.status(500).send("Find error:" + e)
                            }), void v.dashboard(s.db).findOne({
                                folderId: e.body.folderId,
                                dashboardName: e.body.dashboardName,
                                _id: {
                                    $ne: e.params.dashboardId
                                }
                            }, function (r, n) {
                                n && n._id.toString() != e.params.dashboardId && t(s.db, n._id, function () {
                                    N.createLog("site", e.user, "Delete", "Dashboard", "Overwrite " + n.dashboardName + "(" + n._id.toString() + ")")
                                })
                            })) : n.status(404).send("Dashboard is not found")
                        })
                    })
                }), e.get("/dashboards", m.requireAuth, m.requireAdminRights, function (e, t) {
                    v.dashboard(e.user.dbPath).then(function (e) {
                        e.find({}).lean().exec(function (e, n) {
                            e ? t.status(500).send(" Find error:" + e) : n ? (n.forEach(function (e) {
                                r(e), d.processObject(e)
                            }), t.status(201).send(n)) : t.status(404).send("Not found")
                        })
                    })
                }), e.get("/dashboard/:dashboardId/exists", m.requireAuth, b.requirePermissionDashboard(["100"]), function (e, t) {
                    return !e.params.dashboardId || e.params.dashboardId.length < 12 ? t.status(400).send("Dashboard Id is not valid") : void v.dashboard(e.user.dbPath).then(function (r) {
                        r.findOne({
                            _id: r.objectId(e.params.dashboardId)
                        }).lean().exec(function (r, n) {
                            return r ? t.status(500).send("Find error:" + r) : n ? void t.status(201).send("OK") : t.status(404).send("Cannot find Dashboard:" + e.params.dashboardId)
                        })
                    })
                }), e.get("/dashboard/:dashboardId", m.requireAuth, b.requirePermissionDashboard(["100"]), function (e, t) {
                    return !e.params.dashboardId || e.params.dashboardId.length < 12 ? t.status(400).send("Dashboard Id is not valid") : void v.dashboard(e.user.dbPath).then(function (n) {
                        n.findOne({
                            _id: n.objectId(e.params.dashboardId)
                        }).lean().exec(function (n, o) {
                            n ? t.status(500).send("Find error:" + n) : o ? b.getDocumentPermissionsResultSet(e.user, o.folderId, e.params.dashboardId, P.modulesTypeName.dashboard).then(function (n) {
                                r(o), d.processObject(o), o.permissions = n, N.createLog("site", e.user, "Open", "Dashboard", o.dashboardName), t.status(201).send(o)
                            }, function (e) {
                                t.status(500).send("Find error:" + e)
                            }) : t.status(404).send("Cannot find Dashboard:" + e.params.dashboardId)
                        })
                    })
                }), e.get("/dashboard/complexDefinition/:dashboardId", m.requireAuth, b.requirePermissionDashboard(["100"]), function (e, t) {
                    return !e.params.dashboardId || e.params.dashboardId.length < 12 ? t.status(400).send("Dashboard Id is not valid") : void v.dashboard(e.user.dbPath).then(function (o) {
                        o.findOne({
                            _id: o.objectId(e.params.dashboardId)
                        }).lean().exec(function (s, i) {
                            return s ? t.status(500).send("Find dashboard error:" + s) : i ? void b.getDocumentPermissionsResultSet(e.user, i.folderId, e.params.dashboardId, P.modulesTypeName.dashboard).then(function (s) {
                                r(i), i.permissions = s, N.createLog("site", e.user, "Open", "Dashboard", i.dashboardName), v.tabs(o.db).find({
                                    dashboardId: e.params.dashboardId
                                }, {
                                    _id: 1,
                                    Id: 1,
                                    tabName: 1,
                                    dashboardId: 1,
                                    isModal: 1,
                                    tabOrder: 1,
                                    isActive: 1
                                }, {
                                    sort: {
                                        tabOrder: 1
                                    }
                                }).lean().exec(function (r, s) {
                                    return r ? t.status(500).send("Find error:" + r) : (s.forEach(function (e) {
                                        e.Controls = [], n(e)
                                    }), i.tabs = s, void v.tabs(o.db).findOne({
                                        _id: s[0]._id,
                                        dashboardId: e.params.dashboardId
                                    }).lean().exec(function (e, r) {
                                        return e ? t.status(500).send("First tab get error:" + e) : (n(r), r.Controls = [], void v.controls(o.db).find({
                                            tabId: r._id
                                        }, {
                                            _id: 1
                                        }, function (e, n) {
                                            if (e) return t.status(500).send("ControlIndexes get error:" + e);
                                            r.controlIndexes = n, s[0] = r;
                                            var a = s.map(function (e) {
                                                return e._id
                                            }).splice(0, 1);
                                            v.controls(o.db).find({
                                                tabId: {
                                                    $in: a
                                                },
                                                "controlObject.settings.FilterProvider": {
                                                    $exists: !0
                                                },
                                                "controlObject.settings.FilterProvider.value.mode": "Global"
                                            }).exec(function (e, r) {
                                                return e ? t.status(500).send("Find error(controls):" + e) : (r.forEach(function (e) {
                                                    var t = a.indexOf(e.tabId);
                                                    t != -1 && i.tabs[t].Controls.push(e)
                                                }), d.processObject(i), void t.status(201).send(i))
                                            })
                                        }))
                                    }))
                                })
                            }, function (e) {
                                t.status(500).send("Find error:" + e)
                            }) : t.status(404).send("Cannot find Dashboard:" + e.params.dashboardId)
                        })
                    })
                }), e.delete("/dashboard/:dashboardId", m.requireAuth, b.requireUserRoleWriteAccess, b.requirePermissionDashboard(["100", "101"]), function (e, r) {
                    return !e.params.dashboardId || e.params.dashboardId.length < 12 ? r.status(400).send("Dashboard Id is not valid") : void v.dashboard(e.user.dbPath).then(function (n) {
                        t(n.db, e.params.dashboardId, function (t, n) {
                            t ? r.status(500).send(t) : (N.createLog("site", e.user, "Delete", "Dashboard", n.dashboardName), r.status(201).send(n))
                        })
                    })
                }), e.get("/dashboard/:dashboardId/tabs/indexes", m.requireAuth, b.requirePermissionDashboard(["100"]), function (e, t) {
                    return !e.params.dashboardId || e.params.dashboardId.length < 12 ? t.status(400).send("Dashboard Id is not valid") : void v.tabs(e.user.dbPath).then(function (r) {
                        r.find({
                            dashboardId: e.params.dashboardId
                        }, {
                            _id: 1,
                            Id: 1,
                            tabName: 1,
                            dashboardId: 1,
                            isModal: 1,
                            hideFilterPanel: 1,
                            filterPanelColor: 1,
                            modalWidth: 1,
                            modalHeight: 1,
                            tabOrder: 1,
                            isActive: 1
                        }, {
                            sort: {
                                tabOrder: 1
                            }
                        }).lean().exec(function (e, r) {
                            e ? t.status(500).send("Find error:" + e) : (r.forEach(function (e) {
                                n(e)
                            }), t.status(201).send(r))
                        })
                    })
                }), e.get("/dashboard/:dashboardId/tabs/globalFilters/:firstTabId", m.requireAuth, b.requirePermissionDashboard(["100"]), function (e, t) {
                    return !e.params.dashboardId || e.params.dashboardId.length < 12 ? t.status(400).send("Dashboard Id is not valid") : !e.params.firstTabId || e.params.firstTabId.length < 12 ? t.status(400).send("FirstTabId is not valid") : void v.tabs(e.user.dbPath).then(function (r) {
                        r.find({
                            _id: {
                                $ne: e.params.firstTabId
                            },
                            dashboardId: e.params.dashboardId
                        }).lean().exec(function (e, n) {
                            if (e) t.status(500).send("Find error:" + e);
                            else {
                                var o = n.map(function (e) {
                                    return e._id
                                });
                                v.controls(r.db).find({
                                    tabId: {
                                        $in: o
                                    },
                                    "controlObject.settings.FilterProvider": {
                                        $exists: !0
                                    },
                                    "controlObject.settings.FilterProvider.value.mode": "Global"
                                }).exec(function (e, r) {
                                    e ? t.status(500).send("Find error(controls):" + e) : (d.processObject(r), t.status(201).send(r))
                                })
                            }
                        })
                    })
                }), e.get("/dashboard/:dashboardId/tabs/:tabId", m.requireAuth, b.requirePermissionDashboard(["100"]), function (e, t) {
                    return !e.params.dashboardId || e.params.dashboardId.length < 12 ? t.status(400).send("Dashboard Id is not valid") : !e.params.tabId || e.params.tabId.length < 12 ? t.status(400).send("Tab Id is not valid") : void v.tabs(e.user.dbPath).then(function (r) {
                        r.findOne({
                            dashboardId: e.params.dashboardId,
                            _id: e.params.tabId
                        }).lean().exec(function (e, r) {
                            e ? t.status(500).send("Find error:" + e) : (n(r), d.processObject(r), t.status(201).send(r))
                        })
                    })
                }), e.get("/dashboard/:dashboardId/tabs", m.requireAuth, b.requirePermissionDashboard(["100"]), function (e, t) {
                    return !e.params.dashboardId || e.params.dashboardId.length < 12 ? t.status(400).send("Dashboard Id is not valid") : void v.tabs(e.user.dbPath).then(function (r) {
                        r.find({
                            dashboardId: e.params.dashboardId
                        }, {}, {
                            sort: {
                                tabOrder: 1
                            }
                        }).lean().exec(function (e, r) {
                            e ? t.status(500).send("Find error:" + e) : (r.forEach(function (e) {
                                n(e), d.processObject(e)
                            }), t.status(201).send(r))
                        })
                    })
                }), e.post("/dashboard/:dashboardId/tabs", m.requireAuth, b.requireUserRoleWriteAccess, b.requirePermissionDashboard(["100", "101"]), function (e, t) {
                    function r(e, r) {
                        var o = new e(r);
                        o.save(function (e, r) {
                            e ? t.status(500).send("Error save tab " + e) : (r = r.toObject(), n(r), d.processObject(r), t.status(201).send(r))
                        })
                    }
                    return !e.params.dashboardId || e.params.dashboardId.length < 12 ? t.status(400).send("Dashboard Id is not valid") : void v.tabs(e.user.dbPath).then(function (n) {
                        var o = {
                            dashboardId: e.params.dashboardId,
                            Id: e.body.Id,
                            tabName: e.body.tabName,
                            dataSource: e.body.dataSource || null,
                            cube: e.body.cube || null,
                            backgroundColor: e.body.backgroundColor || "transparent",
                            backgroundImage: e.body.backgroundImage || "",
                            imageMode: e.body.imageMode || "stretch",
                            isModal: e.body.isModal || !1,
                            modalWidth: e.body.modalWidth || 500,
                            modalHeight: e.body.modalHeight || 400,
                            tabOrder: e.body.tabOrder,
                            description: e.body.description,
                            isActive: e.body.isActive,
                            hideFilterPanel: e.body.hideFilterPanel || !1,
                            filterPanelColor: e.body.filterPanelColor || "transparent"
                        };
                        e.body.originalId ? n.findOne({
                            _id: e.body.originalId
                        }).exec(function (e, s) {
                            return e ? t.status(500).send("Error get original tab " + e) : (s = s ? s.toObject() : {}, d.revertFromCache2Image(o, s), void r(n, o))
                        }) : r(n, o)
                    })
                }), e.put("/dashboard/:dashboardId/tabs/:tabId", m.requireAuth, b.requireUserRoleWriteAccess, b.requirePermissionDashboard(["100", "101"]), function (e, t) {
                    return !e.params.dashboardId || e.params.dashboardId.length < 12 ? t.status(400).send("Dashboard Id is not valid") : !e.params.tabId || e.params.tabId.length < 12 ? t.status(400).send("Tab Id is not valid") : void v.tabs(e.user.dbPath).then(function (r) {
                        r.findOne({
                            dashboardId: e.params.dashboardId,
                            _id: e.params.tabId
                        }, function (o, s) {
                            if (o) return t.status(500).send("Error find tab " + o);
                            if (!s) return t.status(500).send("Tab not found " + e.params.tabId);
                            var i = {
                                dashboardId: e.params.dashboardId,
                                Id: e.body.Id,
                                tabName: e.body.tabName || "",
                                isModal: e.body.isModal || !1,
                                modalWidth: e.body.modalWidth || 500,
                                modalHeight: e.body.modalHeight || 400,
                                tabOrder: e.body.tabOrder || 0,
                                hideFilterPanel: e.body.hideFilterPanel || !1,
                                filterPanelColor: e.body.filterPanelColor || "transparent"
                            };
                            e.body.inited && (i.backgroundColor = e.body.backgroundColor || "transparent", i.backgroundImage = e.body.backgroundImage || "", i.description = e.body.description || "", i.isActive = e.body.isActive, i.imageMode = e.body.imageMode || "stretch"), d.revertFromCache2Image(i, s.toObject()), r.findOneAndUpdate({
                                dashboardId: e.params.dashboardId,
                                _id: e.params.tabId
                            }, i, {
                                new: !0,
                                upsert: !1
                            }, function (e, r) {
                                return e ? void t.status(500).send("Error update tab " + e) : (r && (r = r.toObject(), n(r), d.processObject(r)), void t.status(201).send(r))
                            })
                        })
                    })
                }), e.delete("/dashboard/:dashboardId/tabs/:tabId", m.requireAuth, b.requireUserRoleWriteAccess, b.requirePermissionDashboard(["100", "101"]), function (e, t) {
                    return !e.params.dashboardId || e.params.dashboardId.length < 12 ? t.status(400).send("Dashboard Id is not valid") : !e.params.tabId || e.params.tabId.length < 12 ? t.status(400).send("Tab Id is not valid") : void v.tabs(e.user.dbPath).then(function (r) {
                        r.findOneAndRemove({
                            _id: e.params.tabId,
                            dashboardId: e.params.dashboardId
                        }).exec(function (n, o) {
                            n ? t.status(500).send("Error delete tab:" + n) : (v.controls(r.db).remove({
                                tabId: e.params.tabId
                            }, function () {}), t.status(201).send({
                                success: !0
                            }))
                        })
                    })
                }), e.get("/dashboard/:dashboardId/tabs/:tabId/controls/indexes", m.requireAuth, b.requirePermissionDashboard(["100"]), function (e, t) {
                    return !e.params.dashboardId || e.params.dashboardId.length < 12 ? t.status(400).send("Dashboard Id is not valid") : !e.params.tabId || e.params.tabId.length < 12 ? t.status(400).send("Tab Id is not valid") : void v.dashboard(e.user.dbPath).then(function (r) {
                        r.findOne({
                            _id: e.params.dashboardId
                        }).exec(function (n, o) {
                            if (n) t.status(500).send("Find dashboard err:" + n);
                            else {
                                if (!o) return void t.status(404).send("Can\'t find dashboard by [" + e.params.dashboardId + "]");
                                v.controls(r.db).find({
                                    tabId: e.params.tabId
                                }, {
                                    _id: 1
                                }).exec(function (e, r) {
                                    e ? t.status(500).send("Find error(controls):" + e) : t.status(201).send(r)
                                })
                            }
                        })
                    })
                }), e.get("/dashboard/:dashboardId/tabs/:tabId/controls/:controlId", m.requireAuth, b.requirePermissionDashboard(["100"]), function (e, t) {
                    return !e.params.dashboardId || e.params.dashboardId.length < 12 ? t.status(400).send("Dashboard Id is not valid") : !e.params.tabId || e.params.tabId.length < 12 ? t.status(400).send("Tab Id is not valid") : !e.params.controlId || e.params.controlId.length < 12 ? t.status(400).send("Control Id is not valid") : void v.dashboard(e.user.dbPath).then(function (r) {
                        r.findOne({
                            _id: e.params.dashboardId
                        }).exec(function (n, o) {
                            if (n) t.status(500).send("Find dashboard err:" + n);
                            else {
                                if (!o) return void t.status(404).send("Can\'t find dashboard by [" + e.params.dashboardId + "]");
                                v.controls(r.db).findOne({
                                    tabId: e.params.tabId,
                                    _id: e.params.controlId
                                }).lean().exec(function (e, r) {
                                    e ? t.status(500).send("Find error(controls):" + e) : (d.processObject(r), t.status(201).send(r))
                                })
                            }
                        })
                    })
                }), e.get("/dashboard/:dashboardId/tabs/:tabId/controls", m.requireAuth, b.requirePermissionDashboard(["100"]), function (e, t) {
                    return !e.params.dashboardId || e.params.dashboardId.length < 12 ? t.status(400).send("Dashboard Id is not valid") : !e.params.tabId || e.params.tabId.length < 12 ? t.status(400).send("Tab Id is not valid") : void v.dashboard(e.user.dbPath).then(function (r) {
                        r.findOne({
                            _id: e.params.dashboardId
                        }).exec(function (n, o) {
                            if (n) t.status(500).send("Find dashboard err:" + n);
                            else {
                                if (!o) return void t.status(404).send("Can\'t find dashboard by [" + e.params.dashboardId + "]");
                                v.controls(r.db).find({
                                    tabId: e.params.tabId
                                }).exec(function (e, r) {
                                    e ? t.status(500).send("Find error(controls):" + e) : t.status(201).send(r)
                                })
                            }
                        })
                    })
                }), e.get("/dashboard/:dashboardId/tabs/:tabId/controls/filters/indexes", m.requireAuth, b.requirePermissionDashboard(["100"]), function (e, t) {
                    return !e.params.dashboardId || e.params.dashboardId.length < 12 ? t.status(400).send("Dashboard Id is not valid") : !e.params.tabId || e.params.tabId.length < 12 ? t.status(400).send("Tab Id is not valid") : void v.dashboard(e.user.dbPath).then(function (r) {
                        r.findOne({
                            _id: e.params.dashboardId
                        }).exec(function (n, o) {
                            if (n) t.status(500).send("Find dashboard err:" + n);
                            else {
                                if (!o) return void t.status(404).send("Can\'t find dashboard by [" + e.params.dashboardId + "]");
                                v.controls(r.db).find({
                                    tabId: e.params.tabId,
                                    "controlObject.settings.FilterProvider": {
                                        $exists: !0
                                    },
                                    "controlObject.settings.FilterProvider.value.mode": "Global"
                                }, {
                                    _id: 1
                                }).exec(function (e, r) {
                                    e ? t.status(500).send("Find error(controls):" + e) : t.status(201).send(r)
                                })
                            }
                        })
                    })
                }), e.get("/dashboard/:dashboardId/tabs/:tabId/controls/localFilters/indexes", m.requireAuth, b.requirePermissionDashboard(["100"]), function (e, t) {
                    return !e.params.dashboardId || e.params.dashboardId.length < 12 ? t.status(400).send("Dashboard Id is not valid") : !e.params.tabId || e.params.tabId.length < 12 ? t.status(400).send("Tab Id is not valid") : void v.dashboard(e.user.dbPath).then(function (r) {
                        r.findOne({
                            _id: e.params.dashboardId
                        }).exec(function (n, o) {
                            if (n) t.status(500).send("Find dashboard err:" + n);
                            else {
                                if (!o) return void t.status(404).send("Can\'t find dashboard by [" + e.params.dashboardId + "]");
                                v.controls(r.db).find({
                                    tabId: e.params.tabId,
                                    "controlObject.settings.FilterProvider": {
                                        $exists: !0
                                    },
                                    "controlObject.settings.FilterProvider.value.mode": "Local"
                                }, {
                                    _id: 1
                                }).exec(function (e, r) {
                                    e ? t.status(500).send("Find error(controls):" + e) : t.status(201).send(r)
                                })
                            }
                        })
                    })
                }), e.get("/dashboard/:dashboardId/tabs/:tabId/controls/filters", m.requireAuth, b.requirePermissionDashboard(["100"]), function (e, t) {
                    return !e.params.dashboardId || e.params.dashboardId.length < 12 ? t.status(400).send("Dashboard Id is not valid") : !e.params.tabId || e.params.tabId.length < 12 ? t.status(400).send("Tab Id is not valid") : void v.dashboard(e.user.dbPath).then(function (r) {
                        r.findOne({
                            _id: e.params.dashboardId
                        }).exec(function (n, o) {
                            if (n) t.status(500).send("Find dashboard err:" + n);
                            else {
                                if (!o) return void t.status(404).send("Can\'t find dashboard by [" + e.params.dashboardId + "]");
                                v.controls(r.db).find({
                                    tabId: e.params.tabId,
                                    "controlObject.settings.FilterProvider": {
                                        $exists: !0
                                    }
                                }).exec(function (e, r) {
                                    e ? t.status(500).send("Find error(controls):" + e) : (r && r.forEach(function (e) {
                                        d.processObject(e)
                                    }), t.status(201).send(r))
                                })
                            }
                        })
                    })
                }), e.get("/dashboard/:dashboardId/tabs/:tabId/controls/notFilters/indexes", m.requireAuth, b.requirePermissionDashboard(["100"]), function (e, t) {
                    return !e.params.dashboardId || e.params.dashboardId.length < 12 ? t.status(400).send("Dashboard Id is not valid") : !e.params.tabId || e.params.tabId.length < 12 ? t.status(400).send("Tab Id is not valid") : void v.dashboard(e.user.dbPath).then(function (r) {
                        r.findOne({
                            _id: e.params.dashboardId
                        }).exec(function (n, o) {
                            if (n) t.status(500).send("Find dashboard err:" + n);
                            else {
                                if (!o) return void t.status(404).send("Can\'t find dashboard by [" + e.params.dashboardId + "]");
                                v.controls(r.db).find({
                                    tabId: e.params.tabId,
                                    "controlObject.settings.FilterProvider": {
                                        $exists: !1
                                    }
                                }, {
                                    _id: 1
                                }).exec(function (e, r) {
                                    e ? t.status(500).send("Find error(controls):" + e) : t.status(201).send(r)
                                })
                            }
                        })
                    })
                }), e.get("/dashboard/:dashboardId/tabs/:tabId/controls/notFilters", m.requireAuth, b.requirePermissionDashboard(["100"]), function (e, t) {
                    return !e.params.dashboardId || e.params.dashboardId.length < 12 ? t.status(400).send("Dashboard Id is not valid") : !e.params.tabId || e.params.tabId.length < 12 ? t.status(400).send("Tab Id is not valid") : void v.dashboard(e.user.dbPath).then(function (r) {
                        r.findOne({
                            _id: e.params.dashboardId
                        }).exec(function (n, o) {
                            if (n) t.status(500).send("Find dashboard err:" + n);
                            else {
                                if (!o) return void t.status(404).send("Can\'t find dashboard by [" + e.params.dashboardId + "]");
                                v.controls(r.db).find({
                                    tabId: e.params.tabId,
                                    "controlObject.settings.FilterProvider": {
                                        $exists: !1
                                    }
                                }).exec(function (e, r) {
                                    e ? t.status(500).send("Find error(controls):" + e) : (r && r.forEach(function (e) {
                                        d.processObject(e)
                                    }), t.status(201).send(r))
                                })
                            }
                        })
                    })
                }), e.post("/dashboard/:dashboardId/tabs/:tabId/controls", m.requireAuth, b.requireUserRoleWriteAccess, b.requirePermissionDashboard(["100", "101"]), function (e, t) {
                    function r(e, r) {
                        var n = new e(r);
                        n.save(function (e, r) {
                            e ? t.status(500).send("Error save control" + e) : (r = r.toObject(), d.processObject(r), t.status(201).send(r))
                        })
                    }
                    if (!e.params.dashboardId || e.params.dashboardId.length < 12) return t.status(400).send("Dashboard Id is not valid");
                    if (!e.params.tabId || e.params.tabId.length < 12) return t.status(400).send("Tab Id is not valid");
                    var n = null;
                    e.params.tabId && e.params.tabId.length > 10 && (n = {
                        tabId: e.params.tabId,
                        _id: e.params.controlId
                    }), v.controls(e.user.dbPath).then(function (n) {
                        var o = {
                            tabId: e.params.tabId,
                            controlName: e.body.controlName,
                            description: e.body.description,
                            controlObject: e.body.controlObject
                        };
                        e.body.originalId ? n.findOne({
                            _id: e.body.originalId
                        }, function (e, s) {
                            return e ? t.status(500).send("Error get original controls:" + e) : (s = s ? s.toObject() : {}, d.revertFromCache2Image(o, s), void r(n, o))
                        }) : r(n, o)
                    })
                }), e.put("/dashboard/:dashboardId/tabs/:tabId/fromsavedtab/:savedTabId", m.requireAuth, b.requireUserRoleWriteAccess, b.requirePermissionDashboard(["100", "101"]), function (e, t) {
                    return !e.params.dashboardId || e.params.dashboardId.length < 12 ? t.status(400).send("Dashboard Id is not valid") : !e.params.tabId || e.params.tabId.length < 12 ? t.status(400).send("Tab Id is not valid") : e.params.savedTabId ? void v.tabs(e.user.dbPath).then(function (r) {
                        r.findOne({
                            _id: e.params.savedTabId
                        }, function (n, o) {
                            return n ? void t.status(500).send("Can\'t get saved tab") : void r.findOne({
                                _id: e.params.tabId
                            }, function (n, s) {
                                if (n) return void t.status(500).send("Can\'t get new tab");
                                s.backgroundColor = o.backgroundColor, s.backgroundImage = o.backgroundImage, s.imageMode = o.imageMode, s.modalWidth = o.modalWidth, s.modalHeight = o.modalHeight, s.tabOrder = o.tabOrder, s.filterPanelColor = o.filterPanelColor, s.description = o.description, s.save();
                                var i = v.controls(r.db);
                                i.find({
                                    tabId: e.params.savedTabId
                                }, function (r, n) {
                                    return r ? void t.status(500).send("error save controls form tab: " + e.params.savedTabId + " err:" + r) : (n.forEach(function (t) {
                                        var r = new i({
                                            tabId: e.params.tabId,
                                            controlName: t.controlName,
                                            description: t.description,
                                            controlObject: t.controlObject
                                        });
                                        r.save(function (e, t) {})
                                    }), void t.status(201).send("Copied" + n.length))
                                })
                            })
                        })
                    }) : t.status(400).send("Invalid savedTabId " + e.params.savedTabId)
                }), e.put("/dashboard/:dashboardId/tabs/:tabId/controls/selection", m.requireAuth, b.requirePermissionDashboard(["100"]), function (e, t) {
                    return !e.params.dashboardId || e.params.dashboardId.length < 12 ? t.status(400).send("Dashboard Id is not valid") : !e.params.tabId || e.params.tabId.length < 12 ? t.status(400).send("Tab Id is not valid") : e.body && e.body.controlIds && 0 != e.body.controlIds.length ? void v.dashboard(e.user.dbPath).then(function (r) {
                        r.findOne({
                            _id: e.params.dashboardId
                        }).exec(function (n, o) {
                            if (n) t.status(500).send("Find dashboard err:" + n);
                            else {
                                if (!o) return void t.status(404).send("Can\'t find dashboard by [" + e.params.dashboardId + "]");
                                v.controls(r.db).find({
                                    tabId: e.params.tabId,
                                    _id: {
                                        $in: e.body.controlIds
                                    }
                                }).lean().exec(function (e, r) {
                                    e ? t.status(500).send("Find error(controls):" + e) : (d.processObject(r), t.status(201).send(r))
                                })
                            }
                        })
                    }) : t.status(400).send("Invalid controlIds array")
                }), e.put("/dashboard/:dashboardId/tabs/:tabId/controls/:controlId", m.requireAuth, b.requireUserRoleWriteAccess, b.requirePermissionDashboard(["100", "101"]), function (e, t) {
                    if (!e.params.dashboardId || e.params.dashboardId.length < 12) return t.status(400).send("Dashboard Id is not valid");
                    if (!e.params.tabId || e.params.tabId.length < 12) return t.status(400).send("Tab Id is not valid");
                    if (!e.params.controlId || e.params.controlId.length < 12) return t.status(400).send("Control Id is not valid");
                    var r = null;
                    e.params.tabId && e.params.tabId.length > 10 && (r = {
                        tabId: e.params.tabId,
                        _id: e.params.controlId
                    }), v.controls(e.user.dbPath).then(function (n) {
                        n.findOne(r, function (o, s) {
                            if (o) return t.status(500).send("Error update control" + o);
                            if (!s) return t.status(404).send("Cannot find control [" + e.params.controlId + "]");
                            var i = {
                                tabId: e.params.tabId,
                                controlName: e.body.controlName,
                                description: e.body.description,
                                controlObject: e.body.controlObject
                            };
                            d.revertFromCache2Image(i, s.toObject()), n.findOneAndUpdate(r, i, {
                                new: !0,
                                upsert: !1
                            }).exec(function (r, n) {
                                return r ? void t.status(500).send("Error update control" + r) : void(n ? (n = n.toObject(), d.processObject(n), t.status(201).send(n)) : t.status(404).send("Cannot find control [" + e.params.controlId + "]"))
                            })
                        })
                    })
                }), e.delete("/dashboard/:dashboardId/tabs/:tabId/controls/:controlId?", m.requireAuth, b.requireUserRoleWriteAccess, b.requirePermissionDashboard(["100", "101"]), m.requireAuth, function (e, t) {
                    return !e.params.dashboardId || e.params.dashboardId.length < 12 ? t.status(400).send("Dashboard Id is not valid") : !e.params.tabId || e.params.tabId.length < 12 ? t.status(400).send("Tab Id is not valid") : void v.controls(e.user.dbPath).then(function (r) {
                        e.params.controlId ? r.findOneAndRemove({
                            _id: e.params.controlId,
                            tabId: e.params.tabId
                        }).exec(function (e, r) {
                            e ? t.status(500).send("Error delete control:" + e) : t.status(201).send({
                                success: 1
                            })
                        }) : r.remove({
                            tabId: e.params.tabId
                        }).exec(function (e) {
                            e ? t.status(500).send("Error delete control:" + e) : t.status(201).send({
                                success: 1
                            })
                        })
                    })
                }), e.get("/controls/controlsList", m.requireAuth, function (e, t) {
                    function r(e, t) {
                        t.forEach(function (t) {
                            var n = i.statSync(e + "/" + t);
                            if (n.isDirectory()) {
                                if ("customControls" == t) {
                                    var o = i.readdirSync(e + "/" + t);
                                    return void r(e + "/" + t, o)
                                }
                                var d = e + "/" + t + "/" + t + ".meta.json";
                                if (i.existsSync(d)) try {
                                    var a = JSON.parse(i.readFileSync(d));
                                    s.push(a)
                                } catch (e) {}
                            }
                        })
                    }
                    var n = f.resolve(S.rootDir + "/client/" + S.client.rootPath + "/dashboard/modules/controls/directives"),
                        o = i.readdirSync(n),
                        s = [];
                    r(n, o), t.status(201).send(s)
                }), e.get("/controls/resources/:controlName/*", function (e, t) {
                    var r = e.params.controlName + "Control",
                        n = o() + "/" + r;
                    NaN + e.params[0];
                    var s = !0;
                    i.existsSync(n) || (n = f.resolve(o() + "/../" + r + "/resources/" + e.params[0]), i.existsSync(n) || (s = !1)), s ? t.sendFile(n) : t.status("404").send("Not Found!")
                }), e.post("/controls", m.requireAuth, function (e, t) {
                    return e.body.controlName ? (e.body.controlName = e.body.controlName[0].toLowerCase() + e.body.controlName.substr(1), i.existsSync(o() + "/" + e.body.controlName + "Control") ? void t.status(500).send("Control with that name already exists!") : /^[a-zA-Z]+$/.test(e.body.controlName) ? (i.mkdirSync(o() + "/" + e.body.controlName + "Control"), p(e), void t.status(201).send({
                        success: !0
                    })) : void t.status(400).send("Control Name contains incorrect invalid characters")) : void t.status(400).send("controlName is not valid")
                }), e.put("/controls/:controlName", m.requireAuth, function (e, t) {
                    return e.params.controlName ? (e.body.controlName = e.body.controlName[0].toLowerCase() + e.body.controlName.substr(1), i.existsSync(o() + "/" + e.params.controlName + "Control") ? (p(e), void t.status(201).send({
                        success: !0
                    })) : void t.status(500).send("Control does not exist!")) : void t.status(400).send("controlName is not valid")
                }), e.post("/controls/:controlName/upload", l, function (e, t) {
                    var r = e.params.controlName + "Control",
                        n = o() + "/" + r + "/" + e.files.file.name,
                        s = i.createReadStream(e.files.file.path),
                        d = i.createWriteStream(n);
                    s.pipe(d), s.on("end", function () {
                        var e = new u(n),
                            t = o() + "/" + r + "/resources";
                        i.existsSync(t) || i.mkdirSync(t), e.extractAllTo(t, !0)
                    }), s.on("error", function (e) {
                        error
                    })
                }), e.delete("/controls/:controlName", m.requireAuth, function (e, t) {
                    return e.params.controlName ? (e.params.controlName = e.params.controlName[0].toLowerCase() + e.params.controlName.substr(1), i.existsSync(o() + "/" + e.params.controlName + "Control") ? void(c(o() + "/" + e.params.controlName + "Control") ? t.status(201).send({
                        success: !0
                    }) : t.status(500).send({
                        success: !1
                    })) : void t.status(500).send("Control does not exist!")) : void t.status(400).send("controlName is not valid![" + e.params.controlName + "]")
                }), !0
            }
        }
    }.call(this, cachedModules[2606], cachedModules[2606].exports), cachedModules[6084] = {
        exports: {}
    },
    function (e, t) {
        var r = require("q"),
            n = require("path"),
            o = require("fs"),
            s = (require("util"), require("serve-static")),
            i = (require("officegen"), require("excel4node"), require("jimp"), cachedModules[4568].exports),
            d = cachedModules[8271].exports,
            a = cachedModules[1682].exports,
            u = cachedModules[4991].exports,
            c = (cachedModules[3669].exports, cachedModules[5151].exports),
            l = cachedModules[937].exports,
            f = cachedModules[6996].exports,
            p = cachedModules[1268].exports,
            h = require("./lib_external/config"),
            m = cachedModules[4585].exports,
            b = cachedModules[7777].exports,
            v = cachedModules[4286].exports,
            g = (require("http"), require("request"), require("async"), require("moment"), require("numberformat"), require("numeral"), cachedModules[7958].exports),
            I = g("report");
        e.exports = {
            name: "ReportBuilder",
            startUrl: "/apps/report/index.html",
            iconClass: "fa-list-alt",
            basicRepoPath: "/reports",
            statics: {
                authRequired: !0,
                prefix: "/apps/report",
                path: "/report"
            },
            initModule: function (e) {
                return e.use(this.statics.prefix, s(n.resolve(h.rootDir + "/client/" + h.client.rootPath + this.statics.path), h.server.staticContent.enableCaching ? {
                    maxAge: h.server.staticContent.cachePeriod
                } : {})), e.get("/reports", i.requireAuth, i.requireAdminRights, function (e, t) {
                    a(e.user.dbPath).then(function (e) {
                        e.find({}, {
                            definition: 0
                        }).lean().exec(function (e, r) {
                            e ? t.status(500).send("Find reports error: " + e) : (r.forEach(function (e) {}), t.status(201).send(r))
                        })
                    })
                }), e.get("/reports/:reportId/exists", i.requireAuth, d.requirePermissionReport(["100"]), function (e, t) {
                    return !e.params.reportId || e.params.reportId.length < 12 ? t.status(400).send("(Get) Invalid reportId " + e.params.reportId) : void a(e.user.dbPath).then(function (r) {
                        r.findOne({
                            _id: e.params.reportId
                        }).exec(function (r, n) {
                            return r ? t.status(500).send("Find report error:" + r) : n ? t.status(201).send("OK") : t.status(404).send("Report not found. Report Id:" + e.params.reportId)
                        })
                    })
                }), e.get("/reports/:reportId", i.requireAuth, d.requirePermissionReport(["100"]), function (e, t) {
                    return !e.params.reportId || e.params.reportId.length < 12 ? void t.status(400).send("(Get) Invalid reportId " + e.params.reportId) : void a(e.user.dbPath).then(function (r) {
                        r.findOne({
                            _id: e.params.reportId
                        }).exec(function (r, n) {
                            r ? t.status(500).send("Find report error:" + r) : n ? d.getDocumentPermissionsResultSet(e.user, n.folderId, e.params.reportId, m.modulesTypeName.report).then(function (r) {
                                n = n.toObject(), n.permissions = r, v.createLog("site", e.user, "Open", "Report", n.name), t.status(201).send(n)
                            }, function (e) {
                                t.status(500).send("Find error:" + e)
                            }) : t.status(404).send("Report not found. Report Id:" + e.params.reportId)
                        })
                    })
                }), e.put("/reports/folderItems", i.requireAuth, d.requireFolderReadAccess, function (e, t) {
                    if (!e.body.folderId || e.body.folderId.length < 12) return t.status(400).send("Invalid folder Id to get reports" + e.body.folderId);
                    var n = {
                        skipCount: e.body.skipCount || 0,
                        size: e.body.pageSize || 30,
                        num: e.body.pageNum || 1
                    };
                    a(e.user.dbPath).then(function (o) {
                        o.find({
                            folderId: e.body.folderId
                        }, {
                            definition: 0,
                            settings: 0
                        }).skip(n.skipCount || n.size * (n.num - 1)).limit(n.size).lean().exec(function (o, s) {
                            if (o) return t.status(500).send("Find folder error:" + o);
                            var i = [];
                            s.forEach(function (t) {
                                i.push(d.getDocumentPermissionsResultSet(e.user, t.folderId, t._id, m.modulesTypeName.report).then(function (e) {
                                    var r = {};
                                    return e.forEach(function (e) {
                                        r[e.enum] = e.value
                                    }), 1 == r[100] ? (b.processObject(t), t.canModify = !!r[101], t) : ""
                                }))
                            }), r.all(i).then(function (e) {
                                e = e.filter(function (e) {
                                    return "" !== e
                                }), t.status(201).send({
                                    page: n,
                                    items: e,
                                    hasMore: e.length == n.size
                                })
                            }, function (e) {
                                t.status(500).send(" Find error:" + e)
                            })
                        })
                    })
                }), e.post("/reports", i.requireAuth, d.requireUserRoleWriteAccess, function (e, t) {
                    return !e.body.folderId || e.body.folderId.length < 12 ? void t.status(400).send("Invalid folderId") : void u(e.user.dbPath).then(function (n) {
                        n.findById(e.body.folderId).exec(function (o, s) {
                            o && t.status(500).send("Find error:" + o), s ? d.checkFolderWriteAccess(e.user, e.body.folderId).then(function (o) {
                                o ? a(n.db).findOne({
                                    folderId: e.body.folderId,
                                    name: e.body.name
                                }, function (o, i) {
                                    var u = new a(n.db)({
                                        name: e.body.name,
                                        title: e.body.title,
                                        subTitle: e.body.subTitle,
                                        description: e.body.description,
                                        folderId: e.body.folderId,
                                        parent: e.body.parent,
                                        "meta.createdDate": new Date,
                                        "meta.ownerId": e.user._id,
                                        settings: e.body.settings || null,
                                        definition: e.body.definition || {},
                                        thumbnail: e.body.thumbnail || null,
                                        version: e.body.version || ""
                                    });
                                    u.save(function (o, u) {
                                        if (o) t.status(500).send("Error save report" + o);
                                        else {
                                            var l = r.defer();
                                            i ? a(n.db).remove({
                                                _id: i._id
                                            }, function (t) {
                                                t && l.reject("Error remove report" + t), v.createLog("site", e.user, "Delete", "Report", "During overwrite " + e.body.name + " in folder " + s.name), l.resolve()
                                            }) : l.resolve(), l.promise.then(function () {
                                                var r = {
                                                    id: u._id,
                                                    type: m.modulesTypeName.report
                                                };
                                                c(n.db).addOrUpdateDoc(e.user._id, r), f(n.db).Init(e.body.folderId, r, p), d.getDocumentPermissionsResultSet(e.user, u.folderId, u._id, m.modulesTypeName.report).then(function (r) {
                                                    u = u.toObject(), u.permissions = r, v.createLog("site", e.user, "Create", "Report", u.name + " in folder " + s.name), t.status(201).send(u)
                                                }, function (e) {
                                                    t.status(500).send("Find error:" + e)
                                                })
                                            }, function (e) {
                                                t.status(500).send(e)
                                            })
                                        }
                                    })
                                }) : t.status(400).send("You don\'t have write permission to the folder")
                            }, function (e) {
                                t.status(500).send("Find error: " + e)
                            }) : t.status(500).send("Folder does not exist")
                        })
                    })
                }), e.put("/reports/:reportId", i.requireAuth, d.requireUserRoleWriteAccess, d.requirePermissionReport(["100", "101"]), function (e, t) {
                    if (e.params.reportId.length < 12) return void t.status(400).send("Invalid report id: " + e.params.reportId);
                    var r = {
                        name: e.body.name,
                        title: e.body.title || "",
                        subTitle: e.body.subTitle || "",
                        description: e.body.description || "",
                        folderId: e.body.folderId,
                        parent: e.body.parent,
                        settings: e.body.settings || null,
                        definition: e.body.definition || {},
                        thumbnail: e.body.thumbnail || null,
                        version: e.body.version || "",
                        "meta.lastModifiedDate": new Date,
                        "meta.modifiedUserId": e.user._id
                    };
                    a(e.user.dbPath).then(function (n) {
                        n.findOneAndUpdate({
                            _id: e.params.reportId
                        }, r, {
                            new: !0,
                            upsert: !1
                        }, function (r, n) {
                            r ? t.status(500).send("Error update report " + r) : n ? d.getDocumentPermissionsResultSet(e.user, n.folderId, n._id, m.modulesTypeName.report).then(function (r) {
                                n = n.toObject(), n.permissions = r, v.createLog("site", e.user, "Save", "Report", n.name), t.status(201).send(n)
                            }, function (e) {
                                t.status(500).send("Find error:" + e)
                            }) : t.status(404).send("Update report not found. Id:" + e.params.reportId)
                        })
                    })
                }), e.put("/reports/:reportId/rename", i.requireAuth, d.requireUserRoleWriteAccess, d.requirePermissionReport(["100", "101"]), function (e, t) {
                    return e.params.reportId.lentht < 12 ? t.status(400).send("Invalid report id: " + e.params.reportId) : e.body.name ? e.body.folderId ? void a(e.user.dbPath).then(function (r) {
                        r.findOne({
                            folderId: e.body.folderId,
                            name: e.body.name
                        }, function (n, o) {
                            return n ? t.status(500).send("Can\'t get dashboard information!" + n) : o ? t.status(400).send("Report with same name [" + o.dashboardName + "] already exists! Choose another name!") : void r.findOneAndUpdate({
                                _id: e.params.reportId
                            }, {
                                $set: {
                                    name: e.body.name
                                }
                            }, function (r, n) {
                                r ? t.status(500).send("Error update report " + r) : (v.createLog("site", e.user, "Update", "Report", "Rename from [" + n.name + "] to [" + e.body.name + "]"), t.status(201).send({
                                    success: !0
                                }))
                            })
                        })
                    }) : t.status(400).send("Invalid folderId of updating report.") : t.status(400).send("Invalid report name.[" + e.body.name + "]")
                }), e.delete("/reports/:reportId", i.requireAuth, d.requireUserRoleWriteAccess, d.requirePermissionReport(["100", "101"]), function (e, t) {
                    return !e.params.reportId || e.params.reportId.length < 12 ? t.status(400).send("(Delete) Invalid reportId " + e.params.reportId) : void a(e.user.dbPath).then(function (r) {
                        r.findOne({
                            _id: e.params.reportId
                        }).exec(function (n, o) {
                            if (n) return t.status(500).send("[Delete] Find error:" + n);
                            if (!o) return t.status(404).send("Report not found. ReportId:" + e.params.reportId);
                            var s = {
                                id: e.params.reportId,
                                type: m.modulesTypeName.report
                            };
                            l(r.db).removeDocForAll([e.params.reportId], m.modulesTypeName.report, function (e, t) {
                                e && I.error("error find doc in favorite")
                            }), c(r.db).removeDocForAll([e.params.reportId], m.modulesTypeName.report, function (e, t) {
                                e && I.error("error find doc in recent")
                            }), f(r.db).RemoveByDoc(s, function (e, t) {
                                e && I.error("error find doc in document permissions")
                            }), o.remove(function (r) {
                                r ? t.status(500).send("Error while delete report" + reportId) : (v.createLog("site", e.user, "Delete", "Report", o.name), t.status(201).send({
                                    success: !0
                                }))
                            })
                        })
                    })
                }), e.put("/reports/:folderId/exists", i.requireAuth, d.requireFolderReadAccess, function (e, t) {
                    return e.params.folderId.length < 12 ? void t.status(400).send("Folder Id is not valid") : void a(e.user.dbPath).then(function (r) {
                        var n = e.body;
                        n.folderId = e.params.folderId, r.findOne(n, function (e, r) {
                            return e ? void t.status(500).send("Error find dashboard " + e) : void t.status(201).send(!!r)
                        })
                    })
                }), e.get("/visualizations", function (e, t) {
                    var r = n.resolve(h.rootDir + "/client/" + h.client.rootPath + "/core/modules/core.visualizations"),
                        s = o.readdirSync(r),
                        i = [];
                    s.forEach(function (e) {
                        var t = o.statSync(r + "/" + e);
                        if (t.isDirectory()) {
                            var n = r + "/" + e + "/" + e + ".meta.json";
                            if (o.existsSync(n)) try {
                                var s = JSON.parse(o.readFileSync(n));
                                i.push(s)
                            } catch (e) {}
                        }
                    }), t.send(i)
                }), e.get("/getFilesList", i.requireAuth, function (e, t) {
                    o.readdir(n.resolve(h.rootDir + "/server/geoJson"), function (e, r) {
                        e ? t.status(500).send("Error read directory:" + e) : t.status(201).send(r)
                    })
                }), e.get("/getFile/:fileName", i.requireAuth, function (e, t) {
                    var r = n.resolve(h.rootDir + "/server/geoJson/" + e.params.fileName);
                    o.existsSync(r) ? o.readFile(r, "utf8", function (r, n) {
                        r ? t.status(500).send("Error read file:" + r) : t.status(201).send({
                            json: n.toString(),
                            fileName: e.params.fileName
                        })
                    }) : t.status(500).send("file not found")
                }), e.post("/saveFile/", i.requireAuth, function (e, t) {}), e.get("/getGeoMapsApiKeys", i.requireAuth, function (e, t) {
                    t.send(h.geoMapsApiKeys)
                }), !0
            }
        }
    }.call(this, cachedModules[6084], cachedModules[6084].exports), cachedModules[999] = {
        exports: {}
    },
    function (e, t) {
        var r = require("path"),
            n = require("serve-static"),
            o = cachedModules[4568].exports,
            s = require("./lib_external/config");
        e.exports = {
            name: "Shell",
            statics: {
                authRequired: !1,
                prefix: "/apps/shell",
                path: "/shell"
            },
            initModule: function (e) {
                return this.statics.authRequired ? e.use(this.statics.prefix, o.requireAuth, n(r.resolve(s.rootDir + "/client/" + s.client.rootPath + this.statics.path), {
                    index: !1,
                    maxAge: s.server.staticContent.enableCaching ? s.server.staticContent.cachePeriod : 0
                })) : e.use(this.statics.prefix, n(r.resolve(s.rootDir + "/../client/" + s.client.rootPath + this.statics.path), {
                    index: !1,
                    maxAge: s.server.staticContent.enableCaching ? s.server.staticContent.cachePeriod : 0
                })), !0
            }
        }
    }.call(this, cachedModules[999], cachedModules[999].exports), cachedModules[5513] = {
        exports: {}
    },
    function (e, t) {
        e.exports = {
            modules: {
                dashboard: cachedModules[2606].exports,
                report: cachedModules[6084].exports,
                shell: cachedModules[999].exports
            },
            startApi: function () {
                for (var e = [], t = Object.keys(this.modules), r = 0; r < t.length; r++) this.modules[t[r]].startUrl && e.push({
                    name: this.modules[t[r]].name,
                    url: this.modules[t[r]].startUrl,
                    iconClass: this.modules[t[r]].iconClass
                });
                return e
            },
            basicRepoPaths: function () {
                for (var e = {}, t = Object.keys(this.modules), r = 0; r < t.length; r++) console.log("module " + t[r], this.modules[t[r]].basicRepoPath), this.modules[t[r]].basicRepoPath && (e[t[r]] = this.modules[t[r]].basicRepoPath);
                return e
            }
        }
    }.call(this, cachedModules[5513], cachedModules[5513].exports), cachedModules[7574] = {
        exports: {}
    },
    function (e, t) {
        var r = cachedModules[4991].exports,
            n = cachedModules[7746].exports;
        e.exports = {
            Folder: r,
            Users: n
        }
    }.call(this, cachedModules[7574], cachedModules[7574].exports), cachedModules[4989] = {
        exports: {}
    },
    function (e, t) {
        var r = (require("http"), require("request")),
            n = cachedModules[7958].exports,
            o = require("./lib_external/config"),
            s = n();
        e.exports = function (e) {
            return function (t, n, i) {
                try {
                    var d = r.defaults({
                        jar: !0
                    });
                    s.info("Proxy {0} to: ", t.method, t.originalUrl, t.body);
                    var a = {
                        uri: (e.protocol || (o.server.https.enabled ? "https" : "http")) + "://" + e.host + ":" + e.port + (e.replacePrefix ? t.originalUrl.replace(e.apiPrefix, e.destPrefix ? e.destPrefix : "") : t.originalUrl),
                        method: t.method,
                        headers: {
                            authorization: t.get("x-auth-token"),
                            referer: t.get("Referrer")
                        },
                        followRedirect: !1
                    };
                    0 == a.uri.indexOf("https") && (a.strictSSL = !1), e.headers && Object.keys(e.headers).forEach(function (t) {
                        a.headers[t] = e.headers[t]
                    }), s.info("uri: ", a.uri), t.body && (a.body = t.body, a.json = !0), t.modifyCallback && t.modifyFunction ? d(a, function (e, r, o) {
                        e || t.modifyFunction(o, function (e, t) {
                            e ? n.status(500).send(e) : n.send(t), n.end()
                        })
                    }).on("error", function (e) {
                        s.error("modified proxy request error", e), n.status(500).json(e), n.end()
                    }) : d(a).on("error", function (e) {
                        s.error("proxy request error", e), n.status(500).json(e), n.end()
                    }).pipe(n)
                } catch (e) {
                    s.error("proxy unhandled error: ", e.stack), n.status(500).json(e), n.end()
                }
            }
        }
    }.call(this, cachedModules[4989], cachedModules[4989].exports), cachedModules[8502] = {
        exports: {}
    },
    function (e, t) {
        function r(e) {
            var t = n.Schema({
                    name: {
                        type: String
                    },
                    description: {
                        type: String
                    },
                    default: {
                        type: Boolean,
                        default: !1
                    }
                }, {
                    read: s.mongoose.replSetRead || "nearest"
                }),
                r = e.model("Site", t);
            r.Init = function (e) {
                e = e || function () {}, r.find({}).exec(function (t, n) {
                    if (0 === n.length) {
                        var o = new r({
                            name: "Default",
                            description: "Default site",
                            default: !0
                        });
                        o.save(e)
                    }
                })
            }, r.InitSite = function (t, n, o) {
                o = o || function () {};
                var s = new r(n);
                s.save(function (r, n) {
                    r ? o(r, n) : (i(e).Init(n._id, function (e, t) {}), d(e).Init(n._id), d(e).InitMyFolder(n._id, t), a(e).Init(n._id), o(r, n))
                })
            }, r.InitUserInSite = function (t, r, n, o, s) {
                s = s || function () {}, d(e).InitMyFolder(t, r)
            }, r.FindDefault = function (e) {
                e = e || function () {}, r.findOne({
                    default: !0
                }).exec(e)
            }, r.FindByName = function (e, t) {
                t = t || function () {}, r.findOne({
                    name: e
                }).exec(t)
            }, r.FindBySiteId = function (e, t) {
                t = t || function () {}, r.findOne({
                    _id: e
                }).exec(t)
            }, r.RemoveSite = function (e, t) {
                return t = t || function () {}, r.remove({
                    _id: e
                }).exec(t)
            }
        }
        var n = require("mongoose"),
            o = cachedModules[4524].exports,
            s = require("./lib_external/config"),
            i = (n.Schema, cachedModules[3669].exports),
            d = cachedModules[4991].exports,
            a = (cachedModules[8294].exports, cachedModules[2611].exports);
        e.exports = o.registerModel("Site", r)
    }.call(this, cachedModules[8502], cachedModules[8502].exports), cachedModules[1143] = {
        exports: {}
    },
    function (e, t) {
        function r(e) {
            var t = n.Schema({
                name: String,
                lastSeq: {
                    type: Number,
                    default: 1
                }
            }, {
                read: s.mongoose.replSetRead || "nearest"
            });
            t.statics.increment = function (e, t) {
                return this.findOneAndUpdate({
                    name: e
                }, {
                    $inc: {
                        lastSeq: 1
                    }
                }, {
                    new: !0,
                    upsert: !0,
                    select: {
                        _id: 0,
                        lastSeq: 1
                    }
                }, t)
            }, e.model("Counter", t)
        }
        var n = require("mongoose"),
            o = cachedModules[4524].exports,
            s = require("./lib_external/config");
        e.exports = o.registerModel("Counter", r)
    }.call(this, cachedModules[1143], cachedModules[1143].exports), cachedModules[9902] = {
        exports: {}
    },
    function (e, t) {
        function r(e) {
            var t = n.Schema({
                userId: i.Types.ObjectId,
                token: String,
                key: String,
                params: {}
            }, {
                read: s.mongoose.replSetRead || "nearest"
            });
            e.model("AuthToken", t)
        }
        var n = require("mongoose"),
            o = cachedModules[4524].exports,
            s = require("./lib_external/config"),
            i = n.Schema;
        e.exports = o.registerModel("AuthToken", r)
    }.call(this, cachedModules[9902], cachedModules[9902].exports), cachedModules[9018] = {
        exports: {}
    },
    function (e, t) {
        function r() {}
        function n(e) {
            var t = o.Schema({
                    userId: d.Types.ObjectId,
                    default: !1,
                    settingType: String,
                    settingObject: d.Types.Mixed
                }, {
                    read: i.mongoose.replSetRead || "nearest"
                }),
                n = e.model("userSettings", t);
            n.getAllUserSettings = function (e) {
                callback = callback || r, n.find({
                    userId: e
                }, callback)
            }, n.getSetting = function (e, t, o) {
                o = o || r, n.findOne({
                    userId: e,
                    settingType: t
                }, o)
            }, n.setSetting = function (e, t, o, s) {
                s = s || r, n.findOneAndUpdate({
                    userId: e,
                    settingType: t
                }, {
                    userId: e,
                    settingType: t,
                    settingObject: o
                }, {
                    new: !0,
                    upsert: !0
                }, s)
            }
        }
        var o = require("mongoose"),
            s = cachedModules[4524].exports,
            i = require("./lib_external/config"),
            d = o.Schema;
        e.exports = s.registerModel("userSettings", n)
    }.call(this, cachedModules[9018], cachedModules[9018].exports), cachedModules[2826] = {
        exports: {}
    },
    function (e, t) {
        function r() {}
        function n(e) {
            return p.mongoose.connPrefix + "/" + e
        }
        function o(e, t, o) {
            o = o || r, x(n(e)).then(function (r) {
                var n = [];
                r.RemoveUser(t, function (s, i) {
                    return s ? o(s) : (n.push(D.UsersMap().then(function (r) {
                        return r.remove({
                            userId: t,
                            siteId: e
                        }).exec()
                    })), n.push(m(r.db).RemoveUser(t)), n.push(b(r.db).remove({
                        createdUser: t,
                        isPersonal: !0
                    }).exec()), n.push(y(r.db).remove({
                        userId: t
                    }).exec()), n.push(I(r.db).remove({
                        userId: t
                    }).exec()), n.push(P(r.db).remove({
                        userId: t
                    }).exec()), n.push(_(r.db).remove({
                        userId: t
                    }).exec()), n.push(q(r.db).RemoveByModule({
                        id: t,
                        type: h.documentPermission.moduleType.users
                    })), void f.all(n).then(function () {
                        o(null, !0)
                    }, o))
                })
            })
        }
        function s(e, t, s, i, d) {
            return "function" == typeof i && (d = i, i = {}), d = d || r, i = i || {}, e && t ? void m(n(e)).then(function (r) {
                r.find({}).exec(function (n, s) {
                    return n ? d("Error get groups: " + n) : (s.forEach(function (e) {
                        var t = [],
                            r = [],
                            n = e.userIds.map(function (e) {
                                return e.userId.toString()
                            });
                        n.forEach(function (n, o) {
                            t.indexOf(n) == -1 && (t.push(n), r.push(e.userIds[o]))
                        }), e.userIds.length != r.length && (U.info("Remove duplicates from", e.name, e.userIds.length - r.length, "duplicates found"), e.userIds = r, e.save(function () {}))
                    }), w(r.db).InitEmptyObj(D.PermissionList), q(r.db).InitEmptyObj(D.PermissionList), N(r.db).Init(), _(r.db).setSetting(null, "startuptype", h.defaultStartUpSettings), b(r.db).InitPublicFolder(function (e, n) {
                        e && !n || r.InitEveryone(function (e, o) {
                            return e ? d("InitEveryone:" + e) : (w(r.db).InitPublicFolderPermission(h.securityStrategy.publicFolderOptimisticMethod, n._id, o._id), void r.InitAdmins(function (e, n) {
                                if (e) return d("InitAdmins:" + e);
                                var o = !0;
                                x(r.db).InitUserAdminInSite(t, function (e, n) {
                                    return e ? d("InitUserAdminInSite:" + e) : (x(r.db).UpdateUserInfoFromMaster(t), b(r.db).InitMyFolder(t), P(r.db).InitUserPermission(t, n.roleId, N), m(r.db).AddUserToDefaultGroup(t, o), b(r.db).normalizeNames(function (e, t) {
                                        console.log("updated", t, "folders")
                                    }), v.dashboard(r.db).normalizeNames(function (e, t) {
                                        console.log("updated", t, "dashboards")
                                    }), g(r.db).normalizeNames(function (e, t) {
                                        console.log("updated", t, "reports")
                                    }), void d(null, n))
                                }), i.users && i.users.forEach(function (e) {
                                    x(r.db).AssignUserWithRole(e.userId, e.roleId, function (t, r) {
                                        t && U.error("Init users error", e, t)
                                    })
                                })
                            }))
                        })
                    }), void x(r.db).find({}, function (t, n) {
                        if (!t) {
                            var s = n.map(function (e) {
                                return e.userId.toString()
                            });
                            n && n.length > 0 && D.Users().then(function (t) {
                                t.find({
                                    _id: {
                                        $in: s
                                    }
                                }, function (t, s) {
                                    if (!t) {
                                        var i = s.map(function (e) {
                                            return e._id.toString()
                                        });
                                        n.forEach(function (t) {
                                            var n = i.indexOf(t.userId.toString()),
                                                d = s[n];
                                            if (n == -1) U.info("Remove user ", t.userName, t.userId), o(e, t.userId);
                                            else {
                                                b(r.db).InitMyFolder(t.userId), m(r.db).AddUserToDefaultGroup(t.userId, t.isAdmin);
                                                var a = !1;
                                                d.roleId ? t.roleId && t.roleId.toString() == d.roleId.toString() || (t.roleId = d.roleId.toString(), a = !0) : t.roleId ? (U.info("Init roleId in mdb from local user: ", t.userName), d.roleId = t.roleId, d.save()) : U.warn("Cannot find suitable role for : " + d.userName, "Please setup it manually"), t.userName && t.firstName && t.lastName || (t.userName = t.userName || d.userName, t.firstName = t.firstName || d.firstName, t.lastName = t.lastName || d.lastName, t.email = t.email || d.email, a = !0), a && t.save()
                                            }
                                        })
                                    }
                                })
                            })
                        }
                    }))
                })
            }) : d("Invalid parameters: adminUserId:" + t)
        }
        function i(e) {
            m(e).then(function (e) {
                e.remove({}).exec(), b(e.db).remove({}).exec(), g(e.db).remove({}).exec(), I(e.db).remove({}).exec(), y(e.db).remove({}).exec(), x(e.db).remove({}).exec(), M(e.db).remove({}).exec(), S(e.db).remove({}).exec(), P(e.db).remove({}).exec(), N(e.db).remove({}).exec(), w(e.db).remove({}).exec(), q(e.db).remove({}).exec(), v.dashboard(e.db).remove({}).exec(), v.controls(e.db).remove({}).exec(), v.tabs(e.db).remove({}).exec(), b(e.db).remove({}).exec(), b(e.db).remove({}).exec(), b(e.db).remove({}).exec()
            })
        }
        function d() {
            D.Roles().then(function (e) {
                e.remove({}).exec();
                var t = e.db;
                D.PermissionList(t).remove({}).exec(), D.Users(t).remove({}).exec(), D.Sites(t).find({}).exec(function (e, r) {
                    !e && r.length > 0 && r.forEach(function (e) {
                        i(n(e._id.toString()))
                    }), D.Sites(t).remove({}).exec()
                }), D.Partners(t).remove({}).exec(), D.UsersMap(t).remove({}).exec()
            })
        }
        function a(e) {
            e = e || r, D.Roles().then(function (t) {
                var r = t.db;
                t.Init(function (n, o) {
                    return n ? e(n) : void t.GetServerAdminRole(function (t, n) {
                        return t ? e(t) : void D.PermissionList(r).Init(function (t, i) {
                            return t ? e(t) : void D.Partners(r).Init(function (t, i) {
                                return t ? e(t) : void D.Users(r).Init(i, n._id, function (t, d) {
                                    return t ? e(t) : void O.getLicenseInfo({
                                        headers: {}
                                    }, function (t, a) {
                                        if (t) {
                                            if (t.indexOf("decrypt") == -1) return e("Error get license information: " + t);
                                            a = {}
                                        }
                                        var u = f.defer();
                                        a.key ? u.resolve(a) : O.activateTrial({
                                            headers: {}
                                        }, function (e, r) {
                                            return e ? u.reject(t) : void u.resolve(r)
                                        }), u.promise.then(function (t) {
                                            D.Sites(r).Init(i, d._id, function (a, u) {
                                                if (a) return e(a);
                                                D.UsersMap(r).Init(d._id, u._id, n._id);
                                                var c = {};
                                                l(r, o, t, i._id, u._id).then(function (t) {
                                                    t && (c.users = [{
                                                        userId: t._id,
                                                        roleId: t.roleId
                                                    }]), s(u._id.toString(), d._id, n._id, c, function (t, n) {
                                                        if (t) return e(t);
                                                        u.status = "Ready", u.save(function (t, r) {
                                                            return t ? e(err) : void e(null, "Initialized successfully!")
                                                        });
                                                        var s = null,
                                                            i = o.map(function (e) {
                                                                return e._id.toString()
                                                            });
                                                        o.forEach(function (e) {
                                                            100 == e.power && (s = e)
                                                        }), s && D.Users(r).update({
                                                            $or: [{
                                                                roleId: {
                                                                    $exists: !1
                                                                }
                                                            }, {
                                                                roleId: null
                                                            }, {
                                                                roleId: {
                                                                    $nin: i
                                                                }
                                                            }]
                                                        }, {
                                                            $set: {
                                                                roleId: s._id
                                                            }
                                                        }, {
                                                            multi: !0
                                                        }).exec()
                                                    })
                                                }, function (t) {
                                                    e("Public user init error: " + t)
                                                })
                                            })
                                        }, function (t) {
                                            e("License error: " + t)
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        }
        function u(e, t) {
            t = t || r, D.Roles().then(function (r) {
                r.find({}).exec(function (n, o) {
                    return n ? t(n) : !e && o.length > 0 ? (U.info("MasterDb is already initialized!"), t()) : void a(function (e) {
                        return e ? t(e) : void r.GetServerAdminRole(function (e, n) {
                            return e ? t(e) : void D.Sites(r.db).find({
                                disabled: !1
                            }, function (e, i) {
                                return e ? t(e) : (i = i || [], 1 == i.length ? t(null) : void O.getLicenseInfo({
                                    headers: {}
                                }, function (e, d) {
                                    if (e) return t("Error get license information: " + e);
                                    if (!d.key) return t("Invalid license key");
                                    var a = f.defer(),
                                        u = {};
                                    if ("true" == d.publicUserEnabled) {
                                        var c = null;
                                        o.forEach(function (e) {
                                            e.power == h.publicUser.rolePower && (c = e)
                                        }), c ? D.Users(r.db).findOne({
                                            userName: h.publicUser.userName
                                        }, function (e, t) {
                                            return e || !t ? a.reject("Find Public user error: " + (e || "Not found")) : (u.users = [{
                                                userId: t._id,
                                                roleId: c._id
                                            }], void a.resolve(t))
                                        }) : a.reject("Unable to find publicUserRole role(power):" + h.publicUser.rolePower)
                                    } else a.resolve(null);
                                    a.promise.then(function (e) {
                                        i.forEach(function (t) {
                                            s(t._id.toString(), t.adminUserId, n._id, u, function (e, r) {
                                                return e ? U.error(" Error init site [" + t.name + "]!", e) : (t.status = "Ready", void t.save(function (e, r) {
                                                    return e ? U.error(" Error update state for site [" + t.name + "]!", e) : void U.info("[" + t.name + "] initialized successfully!")
                                                }))
                                            }), e && D.UsersMap(r.db).Init(e._id, t._id, e.roleId)
                                        })
                                    }, function (e) {
                                        t("Process Public user error: " + e)
                                    })
                                }))
                            })
                        })
                    })
                })
            })
        }
        function c(e, t) {
            var r = f.defer();
            return D.Roles().then(function (o) {
                o.find({}).exec(function (s, i) {
                    if (s) return r.reject("Error get roles: " + err);
                    if ("true" == e.publicUserEnabled) {
                        U.info("Enable public user");
                        var d = null;
                        i.forEach(function (e) {
                            e.power == h.publicUser.rolePower && (d = e)
                        }), d ? D.Users(o.db).InitPublicUser(t, d._id, function (e, t) {
                            return e ? r.reject("Init [" + h.publicUser.userName + "] User Error: " + e) : void D.Sites(o.db).find({
                                disabled: !1
                            }, function (s, i) {
                                return s ? e.reject(s) : (i = i || [], i.forEach(function (e) {
                                    D.UsersMap(o.db).Init(t._id, e._id, t.roleId), x(n(e._id.toString())).then(function (e) {
                                        e.UpdateUserInfoFromMaster(t._id)
                                    })
                                }), void r.resolve(t))
                            })
                        }) : r.reject("Unable to find [" + h.publicUser.userName + "] role: " + h.publicUser.rolePower)
                    } else U.info("Remove public user"), D.Users(o.db).findOneAndRemove({
                        userName: h.publicUser.userName
                    }).exec(), r.resolve(null)
                })
            }), r.promise
        }
        function l(e, t, r, n, o) {
            var s = f.defer();
            if ("true" == r.publicUserEnabled) {
                var i = null;
                t.forEach(function (e) {
                    e.power == h.publicUser.rolePower && (i = e)
                }), i ? D.Users(e).InitPublicUser(n, i._id, function (t, r) {
                    return t ? s.reject("Init [" + h.publicUser.userName + "] User Error: " + t) : (o && D.UsersMap(e).Init(r._id, o, i._id), void s.resolve(r))
                }) : s.reject("Unable to find [" + h.publicUser.userName + "] role: " + h.publicUser.rolePower)
            } else D.Users(e).findOneAndRemove({
                userName: h.publicUser.userName
            }).exec(), s.resolve(null);
            return s.promise
        }
        var f = require("q"),
            p = require("./lib_external/config"),
            h = cachedModules[4585].exports,
            m = (cachedModules[8502].exports, cachedModules[3669].exports),
            b = cachedModules[4991].exports,
            v = (cachedModules[1950].exports.slaveDB, cachedModules[5033].exports),
            g = cachedModules[1682].exports,
            I = cachedModules[5151].exports,
            y = cachedModules[937].exports,
            x = cachedModules[7746].exports,
            M = cachedModules[1143].exports,
            S = cachedModules[9902].exports,
            P = cachedModules[8294].exports,
            N = cachedModules[2611].exports,
            w = cachedModules[1268].exports,
            q = cachedModules[6996].exports,
            _ = cachedModules[9018].exports,
            O = cachedModules[3062].exports,
            D = cachedModules[3760].exports,
            A = cachedModules[7958].exports,
            U = A();
        e.exports = {
            initMasterDB: a,
            cleanMasterDB: d,
            initSite: s,
            cleanSlave: i,
            reInitMasterAndAllSites: u,
            processPublicUser: c
        }
    }.call(this, cachedModules[2826], cachedModules[2826].exports), cachedModules[1499] = {
        exports: {}
    },
    function (e, t) {
        function r(e) {
            return n.existsSync(e + "/plugins.js")
        }
        var n = require("fs"),
            o = require("path"),
            s = (require("util"), require("serve-static")),
            i = require("./lib_external/config"),
            d = cachedModules[7958].exports,
            a = d("plugins"),
            u = [];
        e.exports = {
            initPlugins: function (e, t, d) {
                var c = i.rootDir + "/plugins";
                if (!r(c)) return void a.warn("Plugins are not found!");
                var l = require(c + "/plugins.js").pluginsList;
                l.forEach(function (e) {
                    try {
                        var r = c + "/" + e;
                        if (!n.existsSync(o.resolve(r + "/module.config.json"))) return void a.error(e + ":[module.config.json] file is not exists");
                        var i = require(r + "/module.config.json"),
                            d = i.pluginStatic;
                        t.use(d, s(o.resolve(r + "/" + i.clientSrc))), t.use(d, s(o.resolve(r + "/" + i.vendorsDirectory))), i.indexFile && (i.startUrl = d + "/" + i.indexFile), u.push(i)
                    } catch (t) {
                        a.error("Failed load plugin [" + e + "] " + t)
                    }
                })
            },
            registerProxy: function (e, t, s) {
                var d = i.rootDir + "/plugins";
                if (r(d)) {
                    var u = require(d + "/plugins.js").pluginsList;
                    u.forEach(function (r) {
                        try {
                            var i = d + "/" + r;
                            if (!n.existsSync(o.resolve(i + "/module.config.json"))) return void a.error(r + ":[module.config.json] file is not exists");
                            var u = require(i + "/module.config.json"),
                                c = (u.pluginStatic, require(d + "/" + r + "/routes"));
                            c.initProxy && c.initProxy(e, t, s)
                        } catch (e) {
                            a.error("Failed register proxy plugin [" + r + "] " + e)
                        }
                    })
                }
            },
            registerRoutes: function (e, t, s) {
                var d = i.rootDir + "/plugins";
                if (r(d)) {
                    var u = require(d + "/plugins.js").pluginsList;
                    u.forEach(function (r) {
                        try {
                            var i = d + "/" + r;
                            if (!n.existsSync(o.resolve(i + "/module.config.json"))) return void a.error(r + ":[module.config.json] file is not exists");
                            var u = require(i + "/module.config.json"),
                                c = (u.pluginStatic, require(d + "/" + r + "/routes"));
                            c.initRoutes && c.initRoutes(e, t, s), a.info("Plugin [" + r + "] successfully loaded")
                        } catch (e) {
                            a.error("Failed register plugin [" + r + "] route" + e)
                        }
                    })
                }
            },
            startApi: function () {
                var e = [];
                return u.forEach(function (t) {
                    t.startUrl && e.push({
                        name: t.name,
                        url: t.startUrl,
                        iconClass: t.iconClass
                    })
                }), e
            }
        }
    }.call(this, cachedModules[1499], cachedModules[1499].exports), cachedModules[502] = {
        exports: {}
    },
    function (e, t) {
        function r() {
            var e = s.rootDir
                t = require(e + "index.js");
        }
        var n = require("fs"),
            o = require("path"),
            s = require("./lib_external/config"),
            i = cachedModules[7958].exports,
            d = i("authServices"),
            a = {};
        e.exports = {
            init: r,
            readyServices: a
        }
    }.call(this, cachedModules[502], cachedModules[502].exports), cachedModules[9857] = {
        exports: {}
    },
    function (e, t) {
        function r(e, t) {
            if ("function" == typeof e && (t = e, e = {}), !t) throw new TypeError("HTTPBearerStrategy requires a verify callback");
            n.Strategy.call(this), this.options = e, this.name = "bearer", this._verify = t, this._realm = e.realm || "Users", e.scope && (this._scope = Array.isArray(e.scope) ? e.scope : [e.scope]), this._passReqToCallback = e.passReqToCallback
        }
        var n = require("passport-strategy"),
            o = require("util");
        o.inherits(r, n.Strategy), r.prototype.authenticate = function (e) {
            function t(e, t, r) {
                return e ? d.error(e) : t ? void d.success(t, r) : ("string" == typeof r && (r = {
                    message: r
                }), r = r || {}, d.fail(d._challenge("invalid_token", r.message)))
            }
            var r, n = this.options.authHeader || "authorization";
            if (e.headers && e.headers[n]) {
                var o = e.headers[n].split(" ");
                if (2 != o.length) return this.fail(400);
                var s = o[0],
                    i = o[1];
                /^Bearer$/i.test(s) && (r = i)
            }
            if (e.body && e.body.access_token) {
                if (r) return this.fail(400);
                r = e.body.access_token
            }
            if (e.query && e.query.access_token) {
                if (r) return this.fail(400);
                r = e.query.access_token
            }
            if (!r) return this.fail(this._challenge());
            var d = this;
            d._passReqToCallback ? this._verify(e, r, t) : this._verify(r, t)
        }, r.prototype._challenge = function (e, t, r) {
            var n = "Bearer realm=\"" + this._realm + "\"";
            return this._scope && (n += ", scope=\"" + this._scope.join(" ") + "\""), e && (n += ", error=\"" + e + "\""), t && t.length && (n += ", error_description=\"" + t + "\""), r && r.length && (n += ", error_uri=\"" + r + "\""), n
        }, e.exports = r
    }.call(this, cachedModules[9857], cachedModules[9857].exports), cachedModules[9660] = {
        exports: {}
    },
    function (e, t) {
        var r = cachedModules[9857].exports;
        t = e.exports = r, t.Strategy = r
    }.call(this, cachedModules[9660], cachedModules[9660].exports), cachedModules[792] = {
        exports: {}
    },
    function (e, t) {
        function r(e, t, r) {
            t && p[t] ? r(null, p[t]) : n.UsersMap().then(function (o) {
                o.find({
                    userId: e
                }).exec(function (e, o) {
                    if (e) return r(e, !1);
                    if (!o) return r("user map not found", !1);
                    var s = o.map(function (e) {
                        return e.siteId
                    });
                    n.Sites().then(function (e) {
                        e.find({
                            _id: {
                                $in: s
                            }
                        }).exec(function (e, n) {
                            e ? r(e, !1) : (n.forEach(function (e) {
                                p[e._id.toString()] = e
                            }), r(null, t ? p[t] : n))
                        })
                    }, function (e) {
                        r(e, null)
                    })
                })
            }, function (e) {
                r(e, null)
            })
        }
        var n = cachedModules[3760].exports,
            o = require("./lib_external/config"),
            s = cachedModules[4585].exports,
            i = require("passport"),
            d = require("passport-local").Strategy,
            a = cachedModules[9660].exports.Strategy,
            u = cachedModules[2049].exports,
            c = cachedModules[7746].exports,
            l = cachedModules[502].exports,
            f = cachedModules[8471].exports,
            p = {};
        i.use(new d(function (e, t, i) {
            function d(e) {
                r(e._id, null, function (t, r) {
                    t && i(t, !1), r && 0 != r.length ? (e.sessionId = f.getRandomSequence(32), n.Users().then(function (t) {
                        t.update({
                            _id: e._id
                        }, {
                            $set: {
                                sessionId: e.sessionId
                            }
                        }, function () {
                            return i(null, e, r.map(function (e) {
                                return e._id.toString()
                            }))
                        })
                    })) : i("No assigned sites!Contact to administrator!", !1)
                })
            }
            n.Users().then(function (r) {
                r.findByUserName(e.toLowerCase(), function (r, n) {
                    if (r) return i(r, !1);
                    if (!n) return i("Invalid user name", null);
                    if (o.server.sso.enabled && !n.authId && n.userName.toLowerCase() != s.publicUser.userName.toLowerCase() && "superadmin" != n._role) return i("Not allowed userName when SSO is enabled. Tried login as: " + n.userName);
                    if (n.authId) {
                        if (!l.readyServices[n.authId]) return i("Invalid authentication service", null);
                        l.readyServices[n.authId].interface.authenticate(e.replace(/^.*[\\,@]/, ""), t, function (e, t, r) {
                            return e ? i(e.message || e, null) : void d(n)
                        })
                    } else {
                        if (!n.checkPassword(t)) return i(null, !1);
                        d(n)
                    }
                })
            })
        })), i.serializeUser(function (e, t) {
            e && t(null, e._id)
        }), i.deserializeUser(function (e, t) {
            n.User.findOne({
                _id: e
            }, function (e, r) {
                return e && t(e, !1), r ? t(null, r) : t(null, !1)
            })
        }), i.use(new a({
            authHeader: "x-auth-token"
        }, function (e, t) {
            var n = u.decodeToken(e);
            if (!n) return t("Invalid token", !1);
            if (!n.siteId) return t(null, {}, {
                payload: n,
                token: e
            });
            var s = {
                userId: n.userId
            };
            r(n.userId, n.siteId, function (r, i) {
                if (r) return t(r, !1);
                if (!i) return t(null, !1);
                var d = o.mongoose.connPrefix + "/" + i._id.toString();
                c(d).then(function (r) {
                    r.findOne(s, function (r, o) {
                        return r ? t(r) : o ? (o._id = o.userId, o.dbPath = d, o.siteId = i._id, o.partnerId = i.partnerId, t(null, o, {
                            payload: n,
                            token: e
                        })) : t(null, !1)
                    })
                })
            })
        }))
    }.call(this, cachedModules[792], cachedModules[792].exports), cachedModules[5827] = {
        exports: {}
    },
    function (e, t) {
        var r = cachedModules[4568].exports,
            n = cachedModules[3062].exports,
            o = require("./lib_external/config");
        e.exports = function (e) {
            function t(e) {
                return o.server.sso.enabled ? ("http://" + e.headers.host).replace(o.server.port, o.server.sso.idp.port).replace("https", "http") + "/ssoState" : ""
            }
            e.post("/login", r.login), e.post("/ssoLogin", r.ssoLogin), e.post("/ssoValue", function (e, r) {
                var n = t(e);
                r.status(201).send({
                    success: !0,
                    sso: n
                })
            }), e.post("/logout", r.requireAuth, r.logout), e.post("/authstate", n.requireLicenseValidation, function (e, n) {
                r.isAuthenticated(e, function (r, o) {
                    if (r) {
                        var s = e.user && e.user.userId ? e.user : o,
                            i = {
                                userName: s.userName,
                                firstName: s.firstName,
                                lastName: s.lastName,
                                email: s.email
                            };
                        void 0 != s.isAdmin && (i.isAdmin = s.isAdmin);
                        var d = !0;
                        !e.body.siteId || o.siteId == e.body.siteId && e.user && e.user.token || (d = !1), n.cookie("l", "1", {
                            httpOnly: !0
                        }), n.status(201).send({
                            success: d,
                            sso: t(e),
                            user: d ? i : null,
                            warningDays: e.warningDays
                        })
                    } else n.clearCookie("l"), n.status(201).send({
                        success: !1,
                        sso: t(e),
                        message: o
                    })
                })
            }), e.post("/ensureSMRole", r.requireAuth, r.ensureSitesManagerRole, function (e, t) {
                t.status(201).send(e.smError || "OK")
            })
        }
    }.call(this, cachedModules[5827], cachedModules[5827].exports), cachedModules[463] = {
        exports: {}
    },
    function (e, t) {
        function r(e) {
            var t = {};
            return void 0 != e.userName && (t.userName = e.userName), void 0 != e.firstName && (t.firstName = e.firstName), void 0 != e.lastName && (t.lastName = e.lastName), void 0 != e.email && (t.email = e.email), void 0 != e.phone && (t.phone = e.phone), void 0 != e.blocked && (t.blocked = e.blocked), void 0 != e.dob && (t.dob = e.dob), void 0 != e.gender && (t.gender = e.gender), null != e.avatar && (t.avatar = e.avatar), null != e.roleId && (t.roleId = e.roleId), t
        }
        function n(e, t, r) {
            f(e.user.dbPath).then(function (n) {
                return r.length < 12 ? t.status(400).send("Invalid userId") : void n.findOne({
                    userId: r
                }).lean().exec(function (r, o) {
                    return r || !o ? t.status(500).send("Error get current user information!" + (r || "User not found with Id:" + e.userId)) : void x.Users.findById(o.userId, function (e, r) {
                        e ? t.status(500).send("Error get current user information!" + e) : (delete r.hashed_pwd, delete r.salt, delete r._role, delete r.sessionId, delete r.partnerId, r.isAdmin = o.isAdmin, p(n.db).FindByUserId(o.userId, function (e, n) {
                            return e ? t.status(500).send("Error get groups of current user! " + e) : (r.groups = n.map(function (e) {
                                return e.name
                            }).join(", "), void(o.roleId ? x.Roles.findById(r.roleId, function (e, n) {
                                e ? t.status(500).send("Error get current user information!" + e) : (n && (r.roleName = n.name), t.status(201).send(r))
                            }) : t.status(201).send(r)))
                        }))
                    })
                })
            }, o(e, "Get userInfo error"))
        }
        function o(e) {
            return function (t) {
                e.status(500).send(t)
            }
        }
        var s = require("q"),
            i = (require("lodash"), require("./lib_external/config")),
            d = cachedModules[4585].exports,
            a = cachedModules[8471].exports,
            u = cachedModules[4568].exports,
            c = cachedModules[3062].exports,
            l = cachedModules[8271].exports,
            f = cachedModules[7746].exports,
            p = (cachedModules[8502].exports, cachedModules[3669].exports),
            h = cachedModules[4991].exports,
            m = cachedModules[937].exports,
            b = cachedModules[5151].exports,
            v = cachedModules[9018].exports,
            g = cachedModules[2611].exports,
            I = cachedModules[8294].exports,
            y = cachedModules[6996].exports,
            x = cachedModules[3174].exports,
            M = cachedModules[3760].exports,
            S = cachedModules[5033].exports.dashboard,
            P = cachedModules[1682].exports,
            N = cachedModules[502].exports,
            w = cachedModules[4286].exports,
            q = cachedModules[7777].exports;
        e.exports = function (e) {
            function t(e) {
                for (var t = {}, r = 0, n = 0, o = 0, s = 0; s < e.length; s++) {
                    var d = !isNaN(parseInt(e[s]));
                    d || e[s] != e[s].toUpperCase() || e[s].toLowerCase() == e[s].toUpperCase() || r++, d && n++, i.passwordPolicy.specialCharactersList.indexOf(e[s]) != -1 && o++
                }
                return i.passwordPolicy.minLength > 0 && e.length < i.passwordPolicy.minLength && (t.short = !0), i.passwordPolicy.maxLength > 0 && e.length > i.passwordPolicy.maxLength && (t.long = !0), i.passwordPolicy.capitalLetters > 0 && r < i.passwordPolicy.capitalLetters && (t.capitals = i.passwordPolicy.capitalLetters), i.passwordPolicy.minNumbersCount > 0 && n < i.passwordPolicy.minNumbersCount && (t.numbers = i.passwordPolicy.minNumbersCount), i.passwordPolicy.minSpecialCharactersCount > 0 && o < i.passwordPolicy.minSpecialCharactersCount && (t.specials = i.passwordPolicy.minSpecialCharactersCount), Object.keys(t).length > 0 ? t : null
            }
            var _ = [u.requireAuth, l.requireRolePermissions(["200"])];
            e.get("/users/authServices", _, function (e, t) {
                var r = [{
                    id: "",
                    name: "Application",
                    description: "Native authentication type",
                    supportImport: !1,
                    usernamePrefix: ""
                }];
                Object.keys(N.readyServices).forEach(function (e) {
                    var t = N.readyServices[e];
                    r.push({
                        id: t.id,
                        name: t.name,
                        description: t.description,
                        usernamePrefix: t.usernamePrefix,
                        supportImport: !!t.interface.search
                    })
                }), t.status(201).send(r)
            }), e.get("/users", _, function (e, t) {
                f(e.user.dbPath).then(function (e) {
                    e.find({}).exec(function (e, r) {
                        if (e) return t.status(500).send("Error find users: " + e);
                        if (r.length > 0) {
                            var n = [];
                            r.forEach(function (e) {
                                n.push(e.userId || "")
                            }), x.Users.findByIds(n, function (r, n) {
                                r ? t.status(500).send("Error find users: " + e) : t.status(201).send(n)
                            })
                        } else t.status(201).send(r)
                    })
                }, o(t))
            }), e.get("/users/isAdmin", _, function (e, t) {
                l.checkIsAdmin(e.user).then(function (e) {
                    t.status(200).send(e)
                }, o(t))
            }), e.get("/users/startup", u.requireAuth, function (e, t) {
                p(e.user.dbPath).then(function (r) {
                    var n = [],
                        o = [];
                    r.FindByUserId(e.user._id, function (e, i) {
                        return e ? t.status(500).send("Error in getting startup: " + e) : ((i || []).map(function (e) {
                            e.settings && e.settings.startupD && e.settings.startupD.docId && e.settings.startupD.type && n.push(e)
                        }), void(n.length > 0 ? (n.forEach(function (e) {
                            e && (e.settings.startupD.type == d.modulesTypeName.dashboard ? o.push(S(r.db).findOne({
                                _id: e.settings.startupD.docId
                            }).lean().exec().then(function (t) {
                                return t && (e.settings.startupD.name = t.dashboardName), s.resolve("")
                            }), function (e) {
                                return s.resolve("")
                            }) : e.settings.startupD.type == d.modulesTypeName.report && o.push(P(r.db).findOne({
                                _id: e.settings.startupD.docId
                            }).lean().exec().then(function (t) {
                                return t && (e.settings.startupD.name = t.name), s.resolve("")
                            }), function (e) {
                                return s.resolve("")
                            }))
                        }), s.all(o).then(function (e) {
                            t.status(201).send(n.map(function (e) {
                                return e.settings
                            }))
                        }, function (e) {
                            t.status(500).send(e)
                        })) : t.status(201).send([])))
                    })
                }, o(t))
            }), e.get("/users/currentUser", u.requireAuth, function (e, t) {
                n(e, t, e.user._id)
            }), e.get("/users/passwordPolicy", function (e, t) {
                var r = {};
                i.passwordPolicy.minLength > 0 && (r.minLength = i.passwordPolicy.minLength), i.passwordPolicy.maxLength > 0 && (r.maxLength = i.passwordPolicy.maxLength), i.passwordPolicy.capitalLetters > 0 && (r.capitals = i.passwordPolicy.capitalLetters), i.passwordPolicy.minNumbersCount > 0 && (r.numbers = i.passwordPolicy.minNumbersCount), i.passwordPolicy.minSpecialCharactersCount > 0 && (r.specials = i.passwordPolicy.minSpecialCharactersCount, r.specialCharactersList = i.passwordPolicy.specialCharactersList), t.status(201).send(r)
            }), e.get("/users/:userId", _, function (e, t) {
                n(e, t, e.params.userId)
            }), e.get("/users/:userId/permission", _, function (e, t) {
                var r = e.params.userId;
                return r.length < 12 ? t.status(400).send("Invalid userId") : void I(e.user.dbPath).then(function (e) {
                    e.GetUserPermission(r, function (e, r) {
                        return e || !r ? t.status(500).send("Error in getting user permission: " + (e || "No user permission")) : void t.status(201).send(r.permissions)
                    })
                }, o(t))
            }), e.get("/users/current/photo", u.requireAuth, function (e, t) {
                M.Users().then(function (r) {
                    r.findOne({
                        _id: e.user._id
                    }, {
                        avatar: 1
                    }, function (r, n) {
                        return r || !n ? t.status(500).send("Get user error " + (r || "User not found with name:" + e.user._id)) : (n = n.toObject(), q.processObject(n), void t.status(201).send(n.avatar))
                    })
                }, o(t))
            }), e.get("/users/:userId/photo", _, function (e, t) {
                return e.params.userId ? void M.Users().then(function (r) {
                    r.findOne({
                        _id: e.params.userId
                    }, {
                        avatar: 1
                    }, function (r, n) {
                        return r || !n ? t.status(500).send("Get user error " + (r || "User not found with name:" + e.params.userId)) : (n = n.toObject(), q.processObject(n), void t.status(201).send(n.avatar))
                    })
                }, o(t)) : t.status(400).send("Not valid user id" + e.params.userId)
            }), e.post("/users", u.requireAuth, c.requireUserLicenseValidation, l.requireRolePermissions(["200"]), function (e, r) {
                if (!e.body.userName) return r.status(400).send("Invalid username can\'t be empty!");
                if (!e.body.roleId || e.body.roleId.length < 12) return r.status(400).send("Invalid roleId");
                var n = {
                        userName: e.body.userName,
                        firstName: e.body.firstName || "",
                        lastName: e.body.lastName || "",
                        roleId: e.body.roleId,
                        newPwd: e.body.newPwd,
                        email: e.body.email || "",
                        phone: e.body.phone || "",
                        blocked: !1,
                        dob: e.body.dob || null,
                        gender: e.body.gender || null,
                        avatar: e.body.avatar || null,
                        authId: "",
                        meta: {
                            createdDate: new Date
                        }
                    },
                    o = e.body.roleId,
                    s = e.user.siteId;
                if (e.body.authId) {
                    var i = null;
                    if (Object.keys(N.readyServices).some(function (t) {
                            var r = N.readyServices[t];
                            if (r.id == e.body.authId) return i = r, !0
                        }), !i) return r.status(400).send("Invalid authentication Id", e.body.authId);
                    n.userName = i.usernamePrefix + String.fromCharCode(92) + e.body.userName, n.authId = i.id
                } else {
                    if (!e.body.newPwd) return r.status(400).send("Invalid password can\'t be empty!");
                    var a = t(e.body.newPwd);
                    if (a) return r.status(400).send("Password not respond to strict conditions")
                }
                return e.body.userName.toLowerCase() == d.publicUser.userName.toLowerCase() ? r.status(400).send("[" + d.publicUser.userName + "] userName is predefined and cannot be created manually!") : void x.Users.findById(e.user._id, function (t, i) {
                    return t ? r.status(500).send("Error inserting user" + t) : (n.partnerId = i.partnerId, void M.Users().then(function (t) {
                        t.addUser(n, function (t, n) {
                            return t || !n ? r.status(500).send("Error insert user: " + (t || "User not created")) : void x.Sites.addUserToSite(n._id, s, o, function (t, o) {
                                return t ? r.status(500).send("Error inserting user " + t) : (w.createLog("site", e.user, "Create", "User", n.userName + "(" + n.firstName + "," + n.lastName + ")"), void r.status(201).send(n))
                            })
                        })
                    }))
                })
            }), e.post("/users/init", u.requireAuth, function (e, t) {
                t.status(500).send("Error")
            }), e.post("/users/existing", u.requireAuth, l.requireRolePermissions(["200"]), function (e, t) {
                if (!e.body._id || e.body._id.length < 12) return t.status(400).send("Invalid userId");
                var r = e.body._id,
                    n = e.user.siteId;
                x.Users.findById(r, function (o, s) {
                    return o || !s ? t.status(500).send("Error find user: " + (o || "User not found " + r)) : void x.Sites.addUserToSite(r, n, s.roleId, function (r, n) {
                        return r ? t.status(500).send("Error add user " + r) : (w.createLog("site", e.user, "Insert", "User", s.userName + "(" + s.firstName + "," + s.lastName + ")"), void t.status(201).send(s))
                    })
                })
            }), e.post("/users/groups/:type", _, function (e, t) {
                if ("in" != e.params.type && "nin" != e.params.type) return t.status(400).send("Invalid type");
                if (!e.body) return t.status(400).send("Invalid groupIds");
                var r = {},
                    n = e.body;
                "in" == e.params.type ? r = {
                    _id: {
                        $in: n
                    }
                } : "nin" == e.params.type && (r = {
                    _id: {
                        $nin: n
                    }
                }), p(e.user.dbPath).then(function (e) {
                    e.find(r).exec(function (e, r) {
                        if (e) return t.status(500).send("Error getting users: " + e);
                        var n = [];
                        (r || []).forEach(function (e) {
                            e.userIds.forEach(function (e) {
                                n.push(e.userId)
                            })
                        }), x.Users.findByIds(n, function (e, r) {
                            e ? t.status(500).send("Error getting users: " + e) : t.status(201).send(r)
                        })
                    })
                }, o(t))
            }), e.put("/users/testConnection", _, function (e, t) {
                if (!e.body.authId) return t.status(400).send("Invalid authentication service");
                var r = null;
                if (Object.keys(N.readyServices).some(function (t) {
                        var n = N.readyServices[t];
                        if (n.id == e.body.authId) return r = n, !0
                    }), !r) return t.status(400).send("Invalid authentication Id", e.body.authId);
                if (!r.interface.testConnection) return t.status(400).send("Test connection is not supporting for this authentication Id " + e.body.authId);
                var n = {};
                e.body.userName && (n.userName = e.body.userName), r.interface.testConnection(n, function (e) {
                    t.status(201).send(e)
                })
            }), e.put("/users/filter", u.requireAuth, function (e, t) {
                if (!e.user || !e.user.roleId) return t.status(400).send("Invalid user or user\'s role");
                if (!e.body) return t.status(400).send("Invalid parametersfor search");
                var r = {
                        userId: {
                            $nin: e.body.userIds || []
                        }
                    },
                    n = {
                        avatar: 0,
                        salt: 0,
                        hashed_pwd: 0
                    };
                e.body.userName && (r.userName = new RegExp(e.body.userName, "i")), e.body.firstName && (r.firstName = new RegExp(e.body.firstName, "i")), e.body.lastName && (r.lastName = new RegExp(e.body.lastName, "i")), e.body.exclude && e.body.exclude.length > 0 && e.body.exclude.forEach(function (e) {
                    n[e] = 0
                }), M.Roles().then(function (s) {
                    s.find({}).lean().exec(function (s, i) {
                        if (s) return t.status(500).send("Get roles error");
                        var d = null;
                        if (i.some(function (t) {
                                if (t._id.toString() == e.user.roleId.toString()) return d = t, !0
                            }), !d) return t.status(500).send("Cannot find user role");
                        var a = [];
                        switch (d.power) {
                        case 0:
                        case 2:
                        case 3:
                        case 4:
                            i.forEach(function (e) {
                                e.power >= d.power && a.push(e._id.toString())
                            }), r.roleId = {
                                $in: a
                            };
                            break;
                        default:
                            r._id = e.user._id
                        }
                        f(e.user.dbPath).then(function (e) {
                            return e.find(r, n).sort({
                                userName: 1
                            }).exec(function (e, r) {
                                return e ? t.status(500).send("Error get users" + e) : void t.status(201).send(r)
                            })
                        }, o(t))
                    })
                }, o(t))
            }), e.put("/users/block", _, function (e, t) {
                return !e.body || e.body.userId < 12 ? t.status(400).send("Invalid userId") : e.user._id.toString() == e.body.userId ? t.status(400).send("You cannot block Yourself") : void M.Users().then(function (r) {
                    r.findOneAndUpdate({
                        _id: e.body.userId
                    }, {
                        $set: {
                            blocked: e.body.blocked
                        }
                    }, {
                        new: !0
                    }, function (r, n) {
                        return r ? t.status(500).send("Error while change status " + (r.message || r)) : (w.createLog("site", e.user, "Update", "User", (n.blocked ? "Blocked" : "Unblock") + " user " + n.userName + "(" + n.firstName + "," + n.lastName + ") by " + e.user.userName), void t.status(201).send({
                            success: !0,
                            blocked: n.blocked
                        }))
                    })
                }, o(t))
            }), e.put("/users/current", u.requireAuth, function (e, t) {
                var n = e.user._id;
                if (!n || n < 12) return t.status(400).send("Invalid userId");
                var s = r(e.body);
                return s.userName.toLowerCase() == d.publicUser.userName.toLowerCase() ? t.status(400).send("[" + d.publicUser.userName + "] userName cannot be modified!") : (delete s.userName, void f(e.user.dbPath).then(function (r) {
                    r.UpdateUser(n, s, function (o, s, i) {
                        return o || !s ? t.status(500).send("Error editing user" + (o || "User not found" + n)) : (s = s.toObject(), r.ExtendUserInfo(n, {
                            userName: s.userName,
                            firstName: s.firstName || "",
                            lastName: s.lastName || "",
                            email: s.email
                        }), w.createLog("site", e.user, "Update", "User", "Current " + s.userName + "(" + s.firstName + "," + s.lastName + ")"), void t.status(201).send(s))
                    })
                }, o(t)))
            }), e.put("/users", _, c.requireUserLicenseValidation, function (e, n) {
                if (!e.body._id || e.body._id < 12) return n.status(400).send("Invalid userId");
                var s = r(e.body);
                if ((e.body.curPwd || e.user.isAdmin) && e.body.newPwd) {
                    var i = t(e.body.newPwd);
                    if (i) return n.status(400).send("Password not respond to strict conditions");
                    if (e.body.newPwd !== e.body.newPwdConf) return n.status(400).send("New password and confirmation are not match!");
                    s.newPwd = e.body.newPwd
                }
                if (e.body.authId) {
                    var a = null;
                    if (Object.keys(N.readyServices).some(function (t) {
                            var r = N.readyServices[t];
                            if (r.id == e.body.authId) return a = r, !0
                        }), !a) return n.status(400).send("Invalid authentication Id", e.body.authId);
                    s.userName = a.usernamePrefix + String.fromCharCode(92) + s.userName
                }
                M.Users().then(function (t) {
                    t.findOne({
                        _id: e.body._id
                    }, function (r, o) {
                        if (r) return n.status(500).send("Error find current user: " + r);
                        if (!o) return n.status(500).send("Current user not found!");
                        if (o.userName.toLowerCase() == d.publicUser.userName.toLowerCase()) {
                            if (s.userName.toLowerCase() != d.publicUser.userName.toLowerCase()) return n.status(400).send("[" + d.publicUser.userName + "] userName is predefined and cannot be changed!");
                            if (s.roleId && o.roleId.toString() != s.roleId.toString()) return n.status(400).send("Role of [" + d.publicUser.userName + "] user cannot be changed!")
                        }
                        return o.userName.toLowerCase() != d.publicUser.userName.toLowerCase() && s.userName.toLowerCase() == d.publicUser.userName.toLowerCase() ? n.status(400).send("[" + d.publicUser.userName + "] userName is predefined and cannot be created manually!") : void t.findOne({
                            userName: s.userName,
                            _id: {
                                $ne: e.body._id
                            }
                        }, function (r, i) {
                            return r ? n.status(500).send("Error find new user: " + r) : i && i._id.toString() != e.body._id ? n.status(500).send("User with this name already exists") : ((o.userName != s.userName || o.roleId.toString() != s.roleId.toString() || s.newPwd || s.authId) && (s.sessionId = ""), void t.updateUser(e.body._id, s, function (r, o, s) {
                                return r ? n.status(500).send("\"Error update user" + r) : (M.UsersMap(t.db).findUserSites(o._id, function (e, t) {
                                    return e ? n.status(500).send("Error find user sites" + r) : void t.forEach(function (e) {
                                        x.UserMap.addUser(e.siteId, o._id, o.roleId, function (t, r) {
                                            t && console.error("Error update user in site: ", e.siteId, t)
                                        })
                                    })
                                }), w.createLog("site", e.user, "Update", "User", o.userName + "(" + o.firstName + "," + o.lastName + ")"), void n.status(201).send(o))
                            }))
                        })
                    })
                }, o(n))
            }), e.put("/users/current/changePassword", u.requireAuth, function (e, r) {
                var n = e.user._id;
                return e.body.curPwd && e.body.newPwd ? void x.Users.isPasswordValid(n, e.body.curPwd, function (s) {
                    if (0 == s) return r.status(500).send("The password you have entered does not match your current one");
                    var i = t(e.body.newPwd);
                    if (i) return r.status(400).send("Password not respond to strict conditions");
                    var d = a.createSalt(),
                        u = a.makeHash(d, e.body.newPwd),
                        c = {
                            salt: d,
                            hashed_pwd: u,
                            sessionId: ""
                        };
                    f(e.user.dbPath).then(function (e) {
                        e.findOne({
                            userId: n
                        }).exec(function (e, t) {
                            return e || !t ? r.status(500).send("Error editing user" + (e || "Local user not exist")) : void x.Users.updateUser(n, c, function (e, n) {
                                return e || !n ? r.status(500).send("Error editing user" + (e || "Master user not exist")) : (n.isAdmin = t.isAdmin, void r.status(201).send(n))
                            })
                        })
                    }, o(r))
                }) : r.status(400).send("Invalid, provide current and new credentials!")
            }), e.put("/users/changePassword", _, function (e, r) {
                var n = e.params.userId || e.user._id;
                return e.body.curPwd && e.body.newPwd ? void x.Users.isPasswordValid(n, e.body.curPwd, function (s) {
                    if (0 == s) return r.status(500).send("The password you have entered does not match your current one");
                    var i = t(e.body.newPwd);
                    if (i) return r.status(400).send("Password not respond to strict conditions");
                    var d = a.createSalt(),
                        u = a.makeHash(d, e.body.newPwd),
                        c = {
                            salt: d,
                            hashed_pwd: u
                        };
                    f(e.user.dbPath).then(function (e) {
                        e.findOne({
                            userId: n
                        }).exec(function (e, t) {
                            return e || t ? r.status(500).send("Error editing user" + (e || "User not exist")) : void x.Users.updateUser(n, c, function (e, n) {
                                e ? r.status(500).send("Error editing user" + e) : n ? (n.isAdmin = t.isAdmin, r.status(201).send(n)) : r.status(500).send("User not exist")
                            })
                        })
                    }, o(r))
                }) : r.status(400).send("Invalid, provide current and new credentials!")
            }), e.put("/users/name", _, function (e, t) {
                return e.body.userName ? void x.Users.findByName(e.body.userName.toLowerCase(), function (e, r) {
                    return e ? t.status(500).send("Get user error " + (e.message || e)) : r ? void t.status(201).send({
                        _id: r._id
                    }) : t.status(201).send(null)
                }) : t.status(400).send("Invalid userName")
            }), e.put("/users/exists", _, function (e, t) {
                if (!e.body.userName) return t.status(400).send("Invalid userName");
                var r = {
                    isExists: !1,
                    isExistsOnSite: !1
                };
                x.Users.findByName(e.body.userName.toLowerCase(), function (n, s) {
                    return n ? t.status(500).send("Get user error " + n.message || n) : s ? (r.isExists = !0, r.user = {
                        _id: s._id.toString()
                    }, void f(e.user.dbPath).then(function (e) {
                        e.findOne({
                            userId: s._id
                        }).exec(function (e, n) {
                            return e ? t.status(500).send("Error get user information!" + e) : (n && (r.isExistsOnSite = !0), void t.status(201).send(r))
                        })
                    }, o(t))) : t.status(201).send(r)
                })
            }), e.put("/users/:userId/role", _, function (e, t) {
                return e.params.userId.length < 12 ? t.status(400).send("Invalid userId") : e.user._id == e.params.userId ? t.status(400).send("Invalid user, unable to change your role") : !e.body.roleId || e.body.roleId.length < 12 ? t.status(400).send("Invalid roleId") : void M.Roles().then(function (r) {
                    r.CheckIsAdminRole(e.body.roleId, function (r, n) {
                        return r ? t.status(500).send("Error" + r) : void f(e.user.dbPath).then(function (r) {
                            r.UpdateUserRole(e.body._id, e.body.roleId, n, g, I, function (o, s) {
                                o ? t.status(500).send("Update roles error! " + o) : (n ? p(r.db).AddUserToAdminsGroup(e.body._id) : p(r.db).RemoveUserFromAdminGroup(e.body._id), t.status(201).send({
                                    success: !0
                                }))
                            })
                        }, o(t))
                    })
                }, o(t))
            }), e.put("/users/:userId/permission", u.requireAuth, l.requireRolePermissions(["200", "203", "204"]), function (e, t) {
                var r = e.params.userId;
                if (e.params.userId.length < 12) return t.status(400).send("Invalid userId");
                if (!e.body.permissions) return t.status(400).send("Invalid permissions list");
                var n = e.body.permissions;
                I(e.user.dbPath).then(function (e) {
                    e.AssignUserPermission(r, n, function (e, r) {
                        e ? t.status(500).send("Error in updating user permission: " + e) : t.status(201).send(r)
                    })
                }, o(t))
            }), e.delete("/users/users", _, function (e, t) {
                if (!e.body || 0 == e.body.length) return t.status(400).send("Not valid users");
                var r = e.body.map(function (e) {
                    return e._id.toString()
                }).indexOf(e.user._id.toString());
                r != -1 && e.body.splice(r, 1);
                var n = e.body;
                return 0 == n.length ? t.status(400).send("You cannot remove Yourself") : void f(e.user.dbPath).then(function (r) {
                    r.RemoveUsers(n, function (o, s) {
                        return o ? t.status(500).send(o) : (s.forEach(function (t) {
                            "" != t && (x.Sites.removeUserFromSite(t, e.user.siteId, function (e) {}), p(r.db).RemoveUser(t), h(r.db).remove({
                                createdUser: t,
                                isPersonal: !0
                            }).exec(), m(r.db).remove({
                                userId: t
                            }).exec(), b(r.db).remove({
                                userId: t
                            }).exec(), I(r.db).remove({
                                userId: t
                            }).exec(), v(r.db).remove({
                                userId: t
                            }).exec(), y(r.db).RemoveByModule({
                                id: t,
                                type: d.documentPermission.moduleType.users
                            }))
                        }), w.createLog("site", e.user, "Delete", "User", "User(s)" + n.map(function (e) {
                            return e.userName
                        })), void t.status(201).send({
                            success: !0
                        }))
                    })
                }, o(t))
            }), e.delete("/users/:userId", _, function (e, t) {
                return e.params.userId.length < 12 ? t.status(400).send("Invalid userId") : e.user._id.toString() == e.params.userId.toString() ? t.status(400).send("Invalid userId, unable to delete yourself") : void f(e.user.dbPath).then(function (r) {
                    r.RemoveUser(e.params.userId, function (n, o) {
                        return n ? t.status(500).send("User remove error " + n) : (x.Sites.removeUserFromSite(e.params.userId, e.user.siteId), p(r.db).RemoveUser(e.params.userId), h(r.db).remove({
                            createdUser: e.params.userId,
                            isPersonal: !0
                        }).exec(), m(r.db).remove({
                            userId: e.params.userId
                        }).exec(), b(r.db).remove({
                            userId: e.params.userId
                        }).exec(), I(r.db).remove({
                            userId: e.params.userId
                        }).exec(), v(r.db).remove({
                            userId: e.params.userId
                        }).exec(), y(r.db).RemoveByModule({
                            id: e.params.userId,
                            type: d.documentPermission.moduleType.users
                        }), w.createLog("site", e.user, "Delete", "User", "User " + e.user.userName), void t.status(201).send({
                            success: !0
                        }))
                    })
                }, o(t))
            })
        }
    }.call(this, cachedModules[463], cachedModules[463].exports), cachedModules[922] = {
        exports: {}
    },
    function (e, t) {
        function r() {}
        function n(e, t, o) {
            return o = o || r, t && 0 != t.length ? void c(e).then(function (r) {
                r.find({
                    rootFolderId: {
                        $in: t
                    }
                }, {
                    _id: 1
                }, function (r, s) {
                    r && o(r, []), n(e, s.map(function (e) {
                        return e._id
                    }), function (e, r) {
                        e ? o(e, null) : (t.push.apply(t, r), o(null, t))
                    })
                })
            }) : void o(null, [])
        }
        function o(e, t, n, o) {
            o = o || r, n = n || {};
            var s = e.dbPath,
                d = e._id,
                a = {
                    rootFolderId: t,
                    $or: [{
                        isPersonal: !1
                    }, {
                        isPersonal: !0,
                        createdUser: d
                    }]
                };
            c(s).then(function (t) {
                t.find(a).sort({
                    createdDate: 1
                }).lean().exec(function (r, s) {
                    if (r) o("Get folders error!" + r, null);
                    else {
                        var a = [];
                        s.length > 0 ? (s.forEach(function (r) {
                            var o = i.defer(),
                                s = {
                                    rootFolderId: r._id,
                                    $or: [{
                                        isPersonal: !1
                                    }, {
                                        isPersonal: !0,
                                        createdUser: d
                                    }]
                                };
                            r.isPersonal ? (r.canModify = !0, t.count(s, function (e, t) {
                                r.childrenCount = t || 0, o.resolve(r)
                            })) : u.getFolderPermissionsResultSet(e, r._id).then(function (e) {
                                var i = {};
                                e.forEach(function (e) {
                                    i[e.enum] = e.value
                                });
                                var d = n.writeOnly ? "101" : "100";
                                i[d] ? (r.canModify = !!i[101], t.count(s, function (e, t) {
                                    r.childrenCount = t || 0, o.resolve(r)
                                })) : o.resolve("")
                            }, function (e) {
                                o.resolve("")
                            }), a.push(o.promise)
                        }), i.all(a).then(function (e) {
                            e = e.filter(function (e) {
                                return "" !== e
                            }), o(null, e)
                        }, function (e) {
                            o(e, null)
                        })) : o(null, s)
                    }
                })
            })
        }
        function s(e, t) {
            h(t).remove({
                folderId: {
                    $in: e
                }
            }).exec(), f.dashboard(t).find({
                folderId: {
                    $in: e
                }
            }).exec(function (e, r) {
                if (e) return logger.error("Error get dashboards:", e);
                if (0 != r.length) {
                    var n = r.map(function (e) {
                        return e._id
                    });
                    b(t).removeDocForAll(n, d.modulesTypeName.dashboard), v(t).removeDocForAll(n, d.modulesTypeName.dashboard), m(t).remove({
                        "doc.id": {
                            $in: n
                        },
                        "doc.type": d.documentPermission.documentType.dashboard
                    }).exec(), f.tabs(t).find({
                        dashboardId: {
                            $in: n
                        }
                    }).exec(function (e, r) {
                        if (e) return loader.error("Error get tabs of dashboards");
                        var o = r.map(function (e) {
                            return e._id
                        });
                        f.controls(t).remove({
                            tabId: {
                                $in: o
                            }
                        }).exec(), f.tabs(t).remove({
                            _id: {
                                $in: o
                            }
                        }).exec(), f.dashboard(t).remove({
                            _id: {
                                $in: n
                            }
                        }).exec()
                    })
                }
            }), p(t).find({
                folderId: {
                    $in: e
                }
            }).exec(function (e, r) {
                if (e) return logger.error("Error get reports:", e);
                if (0 != r.length) {
                    var n = r.map(function (e) {
                        return e._id
                    });
                    b(t).removedocForAll(n, d.modulesTypeName.report), v(t).removedocForAll(n, d.modulesTypeName.report), m(t).remove({
                        "doc.id": {
                            $in: n
                        },
                        "doc.type": d.documentPermission.documentType.report
                    }).exec(), p(t).remove({
                        _id: {
                            $in: n
                        }
                    }).exec()
                }
            })
        }
        var i = require("q"),
            d = (require("lodash"), require("./lib_external/config"), cachedModules[4585].exports),
            a = cachedModules[4568].exports,
            u = cachedModules[8271].exports,
            c = cachedModules[4991].exports,
            l = cachedModules[3669].exports,
            f = cachedModules[5033].exports,
            p = cachedModules[1682].exports,
            h = cachedModules[1268].exports,
            m = cachedModules[6996].exports,
            b = cachedModules[5151].exports,
            v = cachedModules[937].exports,
            g = (cachedModules[3174].exports, cachedModules[2611].exports, cachedModules[4286].exports),
            I = cachedModules[7777].exports;
        e.exports = function (e) {
            function t(e) {
                return function (t) {
                    e.status(500).send("Connection error: " + t)
                }
            }
            e.get("/folder/rootNodes/:writeMode?", a.requireAuth, function (e, t) {
                o(e.user, null, {
                    writeOnly: !1
                }, function (e, r) {
                    e ? t.status(500).send("Get folders error " + e) : t.status(201).send(r)
                })
            }), e.get("/folder/:folderId", a.requireAuth, u.requireFolderReadAccess, function (e, t) {
                return e.params.folderId.length < 12 ? t.status(400).send("Invalid folderId") : void c(e.user.dbPath).then(function (r) {
                    r.find({
                        _id: e.params.folderId
                    }).lean().exec(function (e, n) {
                        return e || !n ? t.status(500).send("Get folder error: " + (e || "Not found")) : void r.count({
                            rootFolderId: n._id
                        }, function (e, r) {
                            n.childrenCount = r, t.status(201).send(n)
                        })
                    })
                })
            }), e.get("/folder/:folderId/children/:writeMode?", a.requireAuth, u.requireFolderReadAccess, function (e, t) {
                return e.params.folderId.length < 12 ? t.status(400).send("Invalid folderId") : void o(e.user, e.params.folderId, {
                    writeOnly: !1
                }, function (e, r) {
                    e ? t.status(500).send("Get folders error " + e) : t.status(201).send(r)
                })
            }), e.get("/folder/:folderId/items/:itemType", a.requireAuth, u.requireFolderReadAccess, function (e, t) {
                return e.params.folderId.length < 12 ? t.status(400).send("Invalid folderId") : void c(e.user.dbPath).then(function (r) {
                    r.find({
                        rootFolderId: e.params.folderId,
                        nodeType: e.params.itemType
                    }).lean().exec(function (e, n) {
                        return e ? t.status(500).send("Get child items error " + e) : (n.forEach(function (e) {
                            r.count({
                                rootFolderId: e.tid
                            }, function (t, r) {
                                e.childrenCount = r || 0
                            })
                        }), void t.status(201).send(n))
                    })
                })
            }), e.put("/folder/searchItems", a.requireAuth, function (e, t) {
                function r(e, t, r, n, o) {
                    for (var s = [], i = {
                            a: 0,
                            b: 0
                        }, d = o ? "name" : "createdDate";
                        (i.a < e.length || i.b < t.length) && s.length < r;)
                        if (e[i.a] && t[i.b] && "undefined" != typeof e[i.a][d] && "undefined" != typeof t[i.b][d]) {
                            var a = o ? e[i.a].name.localeCompare(t[i.b].name) : new Date(e[i.a].createdDate).getTime() - new Date(t[i.b].createdDate).getTime();
                            n * a > 0 ? s.push(t[i.b++]) : s.push(e[i.a++])
                        } else "undefined" == typeof e[i.a] ? s.push(t[i.b++]) : s.push(e[i.a++]);
                    return {
                        items: s,
                        sortPos: i
                    }
                }
                if (!e.body) return void t.status(400).send("Invalid input parameters");
                var n = ["folder"],
                    o = e.body.rootFolderId || null,
                    s = e.body.searchTemplate || "",
                    a = e.body.sortDesc ? -1 : 1,
                    l = e.body.foldersOnly,
                    h = e.user.dbPath,
                    m = e.user._id,
                    b = {
                        lcName: a
                    },
                    v = {
                        size: e.body.pageSize || 500
                    };
                e.body.docTypes && e.body.docTypes.length > 0 ? ["report", "dashboard"].forEach(function (t) {
                    e.body.docTypes.indexOf(t) != -1 && n.push(t)
                }) : n.push.apply(n, ["report", "dashboard"]), e.body.sortField && "createddate" == e.body.sortField.toLowerCase() && (b = {
                    createdDate: a
                });
                var g = e.body.lastState || {
                        folder: {
                            offset: 0,
                            hasMore: !0
                        },
                        dashboard: {
                            offset: 0,
                            hasMore: !0
                        },
                        report: {
                            offset: 0,
                            hasMore: !0
                        }
                    },
                    y = {
                        rootFolderId: o,
                        $or: [{
                            isPersonal: !1
                        }, {
                            isPersonal: !0,
                            createdUser: m
                        }]
                    };
                s && (y.name = {
                    $regex: s,
                    $options: "ig"
                }), c(h).then(function (c) {
                    var h = c.find(y).sort(b).skip(g.folder.offset).limit(v.size).lean().exec().then(function (t) {
                        if (!t || 0 == t.length) return {
                            items: [],
                            portionSize: 0,
                            hasMore: !1
                        };
                        var r = [];
                        return t.forEach(function (t) {
                            var n = i.defer(),
                                o = {
                                    rootFolderId: t._id,
                                    $or: [{
                                        isPersonal: !1
                                    }, {
                                        isPersonal: !0,
                                        createdUser: m
                                    }]
                                },
                                s = {
                                    folderId: t._id
                                },
                                d = s,
                                a = i.defer();
                            t.isPersonal ? (t.canModify = !0, a.resolve(t)) : u.getFolderPermissionsResultSet(e.user, t._id).then(function (e) {
                                var r = {};
                                e.forEach(function (e) {
                                    r[e.enum] = e.value
                                }), r[100] ? (t.canModify = !!r[101], a.resolve(t)) : a.resolve("")
                            }, function (e) {
                                a.resolve("")
                            }), a.promise.then(function (e) {
                                if (!e) return n.resolve("");
                                var t = [];
                                t.push(c.count(o).exec()), l || (t.push(f.dashboard(c.db).count(s).exec()), t.push(p(c.db).count(d).exec())), i.all(t).then(function (t) {
                                    e.childrenCount = t.reduce(function (e, t) {
                                        return e + t
                                    }, 0)
                                }).finally(function () {
                                    n.resolve(e)
                                })
                            }, function (e) {
                                n.resolve(e)
                            }), r.push(n.promise)
                        }), i.all(r).then(function (e) {
                            e = e.filter(function (e) {
                                return "" !== e
                            });
                            var t = e.map(function (e) {
                                return {
                                    id: e._id,
                                    name: e.name,
                                    description: e.description,
                                    type: e.nodeType,
                                    parentFolderId: e.rootFolderId,
                                    createdDate: e.createdDate,
                                    lastModifiedDate: e.lastModifiedDate || e.createdDate,
                                    childrenCount: e.childrenCount,
                                    canModify: e.canModify
                                }
                            });
                            return {
                                items: t,
                                portionSize: e.length,
                                hasMore: e.length == v.size
                            }
                        })
                    }, function (e) {
                        return "Get folders error!" + e
                    });
                    h.then(function (h) {
                        if (g.folder.offset += h.items.length, l || !o || h.hasMore) return t.status(201).send({
                            page: v,
                            items: h.items,
                            hasMore: h.hasMore,
                            lastState: g
                        });
                        var m = {
                            folderId: o
                        };
                        s && (m.dashboardName = {
                            $regex: s,
                            $options: "ig"
                        });
                        var y = n.indexOf("dashboard") == -1 ? i({}) : f.dashboard(c.db).find(m, {
                                settings: 0
                            }).sort(b).skip(g.dashboard.offset).limit(v.size).lean().exec().then(function (t) {
                                if (!t || 0 == t.length) return !1;
                                var r = [];
                                return t.forEach(function (t) {
                                    r.push(u.getDocumentPermissionsResultSet(e.user, t.folderId, t._id, d.modulesTypeName.dashboard).then(function (e) {
                                        var r = {};
                                        return e.forEach(function (e) {
                                            r[e.enum] = e.value
                                        }), 1 == r[100] ? (I.processObject(t), t.canModify = !!r[101], t) : ""
                                    }))
                                }), i.all(r).then(function (e) {
                                    e = e.filter(function (e) {
                                        return "" !== e
                                    });
                                    var t = e.map(function (e) {
                                        return {
                                            id: e._id,
                                            name: e.dashboardName,
                                            description: e.description,
                                            thumbnail: e.thumbnail,
                                            type: "dashboard",
                                            createdDate: e.meta.createdDate,
                                            lastModifiedDate: e.meta.lastModifiedDate || e.meta.createdDate,
                                            canModify: e.canModify
                                        }
                                    });
                                    return {
                                        items: t,
                                        hasMore: e.length == v.size
                                    }
                                }, function (e) {
                                    return "Dashboard find error:" + e
                                })
                            }, function (e) {
                                return "Find dashboards error:" + e
                            }),
                            x = {
                                folderId: o
                            };
                        s && (x.name = {
                            $regex: s,
                            $options: "ig"
                        });
                        var M = n.indexOf("report") == -1 ? i({}) : p(c.db).find(x, {
                                definition: 0
                            }).sort(b).skip(g.report.offset).limit(v.size).lean().exec().then(function (t) {
                                if (!t || 0 == t.length) return !1;
                                var r = [];
                                return t.forEach(function (t) {
                                    r.push(u.getDocumentPermissionsResultSet(e.user, t.folderId, t._id, d.modulesTypeName.report).then(function (e) {
                                        var r = {};
                                        return e.forEach(function (e) {
                                            r[e.enum] = e.value
                                        }), 1 == r[100] ? (I.processObject(t), t.canModify = !!r[101], t) : ""
                                    }))
                                }), i.all(r).then(function (e) {
                                    e = e.filter(function (e) {
                                        return "" !== e
                                    });
                                    var t = e.map(function (e) {
                                        return {
                                            id: e._id,
                                            name: e.name,
                                            description: e.description,
                                            thumbnail: e.thumbnail,
                                            type: "reportbuilder",
                                            createdDate: e.meta.createdDate,
                                            lastModifiedDate: e.meta.lastModifiedDate || e.meta.createdDate,
                                            canModify: e.canModify
                                        }
                                    });
                                    return {
                                        items: t,
                                        hasMore: e.length == v.size
                                    }
                                }, function (e) {
                                    return " Find error:" + e
                                })
                            }, function (e) {
                                return "Find folder error:" + e
                            }),
                            S = [];
                        S.push(y), S.push(M), i.all(S).then(function (e) {
                            var n = v.size - h.portionSize,
                                o = r(e[0].items || [], e[1].items || [], n, a, !!b.lcName);
                            g.dashboard.offset += o.sortPos.a, g.report.offset += o.sortPos.b, t.status(201).send({
                                page: v,
                                items: h.items.concat(o.items),
                                hasMore: o.items.length == n,
                                lastState: g
                            })
                        }, function (e) {
                            t.status(500).send(e)
                        })
                    }, function (e) {
                        t.status(500).send(e)
                    })
                }, function (e) {
                    t.status(500).send("Connection error: " + e)
                })
            }), e.put("/folder/search", a.requireAuth, function (e, t) {
                if (!e.body) return void t.status(400).send("Invalid input parameters");
                var r = e.body.rootFolderId || null,
                    n = e.user.dbPath,
                    o = e.user._id,
                    s = {};
                e.body.pagination || (e.body.pagination = {}), s.num = e.body.pagination.num || 1, s.size = e.body.pagination.partialSize || 30, s.skipCount = s.size * (s.num - 1);
                var a = {
                        rootFolderId: r,
                        $or: [{
                            isPersonal: !1
                        }, {
                            isPersonal: !0,
                            createdUser: o
                        }]
                    },
                    l = [];
                c(n).then(function (n) {
                    var o = n.find(a).skip(s.skipCount).limit(s.size).lean().exec().then(function (t) {
                            if (!t || 0 == t.length) return !1;
                            var r = [];
                            return t.forEach(function (t) {
                                var n = i.defer();
                                u.checkFolderAccessibility(e.user, t._id).then(function (e) {
                                    e ? n.resolve(t) : n.resolve("")
                                }, function (e) {
                                    n.resolve("")
                                }), r.push(n.promise)
                            }), i.all(r).then(function (e) {
                                return e = e.filter(function (e) {
                                    return "" !== e
                                }), e.forEach(function (e) {
                                    l.push({
                                        id: e._id,
                                        name: e.name,
                                        description: e.description,
                                        type: e.nodeType,
                                        parentFolderId: e.rootFolderId,
                                        lastModifiedDate: e.createdDate
                                    })
                                }), e.length == s.size
                            })
                        }, function (e) {
                            return "Get folders error!" + e
                        }),
                        c = f.dashboard(n.db).find({
                            folderId: r
                        }, {
                            settings: 0
                        }).skip(s.skipCount || s.size * (s.num - 1)).limit(s.size).lean().exec().then(function (t) {
                            if (!t || 0 == t.length) return !1;
                            var r = [];
                            return t.forEach(function (t) {
                                r.push(u.checkDocumentReadAccess(e.user, t.folderId, t._id, d.modulesTypeName.dashboard).then(function (e) {
                                    return 1 == e ? (I.processObject(t), t) : ""
                                }))
                            }), i.all(r).then(function (e) {
                                return e = e.filter(function (e) {
                                    return "" !== e
                                }), e.forEach(function (e) {
                                    l.push({
                                        id: e._id,
                                        name: e.dashboardName,
                                        description: e.description,
                                        thumbnail: e.thumbnail,
                                        type: "dashboard",
                                        lastModifiedDate: e.meta.lastModifiedDate
                                    })
                                }), e.length == s.size
                            }, function (e) {
                                return "Dashboard find error:" + e
                            })
                        }, function (e) {
                            return "Find dashboards error:" + e
                        }),
                        h = p(n.db).find({
                            folderId: r
                        }, {
                            definition: 0
                        }).skip(s.skipCount).limit(s.size).lean().exec().then(function (t) {
                            if (!t || 0 == t.length) return !1;
                            var r = [];
                            return t.forEach(function (t) {
                                I.processObject(t), r.push(u.checkDocumentReadAccess(e.user, t.folderId, t._id, d.modulesTypeName.report).then(function (e) {
                                    return 1 == e ? t : ""
                                }))
                            }), i.all(r).then(function (e) {
                                return e = e.filter(function (e) {
                                    return "" !== e
                                }), e.forEach(function (e) {
                                    l.push({
                                        id: e._id,
                                        name: e.name,
                                        description: e.description,
                                        thumbnail: e.thumbnail,
                                        type: "reportbuilder",
                                        lastModifiedDate: e.meta.lastModifiedDate
                                    })
                                }), e.length == s.size
                            }, function (e) {
                                return " Find error:" + e
                            })
                        }, function (e) {
                            return "Find folder error:" + e
                        }),
                        m = [o];
                    r && (m.push(c), m.push(h)), i.all(m).then(function (e) {
                        t.status(201).send({
                            page: s,
                            items: l,
                            hasMore: e.some(function (e) {
                                return e
                            })
                        })
                    }, function (e) {
                        t.status(500).send(e)
                    })
                })
            }), e.put("/folder/pathItems", a.requireAuth, function (e, r) {
                function n(e, t, r) {
                    var n = null;
                    switch (t.toLowerCase()) {
                    case "folder":
                        n = c(e).findOne({
                            _id: r
                        }).exec().then(function (e) {
                            return e ? e.rootFolderId : ""
                        });
                        break;
                    case "dashboard":
                        n = f.dashboard(e).findOne({
                            _id: r
                        }).exec().then(function (e) {
                            return e ? e.folderId : ""
                        });
                        break;
                    case "report":
                    case "reportbuilder":
                        n = p(e).findOne({
                            _id: r
                        }).exec().then(function (e) {
                            return e ? e.folderId : ""
                        })
                    }
                    return n
                }
                function o(e, t) {
                    return e.findOne({
                        _id: t.parentFolderId || t
                    }).exec().then(function (r) {
                        if (!r) return i.reject("Not found parent folder");
                        var n = {
                            id: r._id,
                            name: r.name,
                            description: r.description,
                            type: r.nodeType,
                            parentFolderId: r.rootFolderId,
                            createdDate: r.createdDate,
                            lastModifiedDate: r.lastModifiedDate || r.createdDate,
                            childrenCount: 0,
                            canModify: !1
                        };
                        return t.parentFolderId ? n.childNodes = [t] : (t = n, t.childNodes = []), n.parentFolderId ? o(e, n) : n
                    })
                }
                return e.body && e.body.docType && e.body.docId ? void c(e.user.dbPath).then(function (t) {
                    n(t.db, e.body.docType, e.body.docId).then(function (n) {
                        return n ? void u.checkFolderReadAccess(e.user, n).then(function (e) {
                            return e ? void o(t, n).then(function (e) {
                                r.status(201).send(e)
                            }, function (e) {
                                r.status(500).send("Get folder path error: " + e)
                            }) : r.status(400).send("No read access to document folder!")
                        }, function (e) {
                            r.status(500).send("Get read permissions error:" + e)
                        }) : r.status(400).send("Not found folderId")
                    }, function (e) {
                        r.status(500).send("Error get folderId by doc: " + e)
                    })
                }, t(r)) : r.status(400).send("Invalid parameters")
            }), e.put("/folder/:folderId", a.requireAuth, u.requireFolderReadAccess, function (e, t) {
                return e.params.folderId.length < 12 ? t.status(400).send("Invalid folderId") : void c(e.user.dbPath).then(function (r) {
                    r.findOneAndUpdate({
                        _id: params.folderId
                    }, {
                        $set: {
                            nodeType: e.body.nodeType,
                            rootFolderId: r.objectId(e.params.folderId) || null,
                            name: e.body.name,
                            metaData: e.body.metaData,
                            iconUrl: e.body.iconUrl,
                            lastModifiedDate: new Date,
                            description: e.body.description || ""
                        }
                    }, {
                        new: !0
                    }, function (r, n) {
                        return r ? t.status(500).send("Update error! " + r) : (g.createLog("site", e.user, "Update", "Folder", "Renamed to " + e.body.name), void t.status(201).send({
                            success: !0,
                            node: n
                        }))
                    })
                })
            }), e.put("/folder/:folderId/rename", a.requireAuth, u.requireFolderReadAccess, function (e, t) {
                return e.params.folderId.length < 12 ? t.status(400).send("Invalid folderId") : void c(e.user.dbPath).then(function (r) {
                    r.findOne({
                        _id: e.params.folderId
                    }, function (n, o) {
                        return n || !o ? t.status(500).send("Can\'t get folder information!" + (n || "Folder not found")) : void r.findOne({
                            rootFolderId: o.rootFolderId,
                            name: e.body.name
                        }, function (r, n) {
                            if (r) return t.status(500).send("Can\'t get folder information!" + r);
                            if (n) return t.status(400).send("Folder with name [" + n.name + "] already exists!Choose another name!");
                            var s = o.name;
                            o.name = e.body.name, o.save(function (r, n) {
                                return r ? t.status(500).send("Update error! " + r) : (g.createLog("site", e.user, "Update", "Folder", "Renamed from " + s + " to " + n.name), void t.status(201).send({
                                    success: !0,
                                    node: n
                                }))
                            })
                        })
                    })
                })
            }), e.put("/folder/:folderId/exists", a.requireAuth, u.requireFolderReadAccess, function (e, t) {
                if (e.params.folderId.length < 12) return t.status(400).send("Invalid folderId");
                var r = e.body;
                r.rootFolderId = e.params.folderId, c(e.user.dbPath).then(function (e) {
                    e.findOne(r, function (e, r) {
                        return e ? t.status(500).send("Can\'t get folder information!" + e) : void t.status(201).send(r)
                    })
                })
            }), e.post("/folder/folders", a.requireAuth, u.requireRolePermissions(["201"]), function (e, t) {
                if (!e.body.groupId || e.body.groupId.length < 12) return t.status(400).send("Invalid groupId");
                var r = e.body.groupId,
                    n = e.body.withPermission || !0;
                c(e.user.dbPath).then(function (e) {
                    e.GetParentsWithChildrens(n, r, l, h, function (e, r) {
                        return e ? t.status(500).send("Error getting folders" + e) : void t.status(201).send(r)
                    })
                })
            }), e.post("/folder/:folderId", a.requireAuth, u.requireFolderWriteAccess, function (e, t) {
                function r(r, n, o) {
                    r.save(function (r, s) {
                        return r ? t.status(500).send("Error while save folder!" + r) : (n._id && h(o).CopyParentFolderPermission(n._id, s._id, l), g.createLog("site", e.user, "Create", "Folder", s.name + " in " + (n.name || "[rootFolder]") + " (" + s._id.toString() + (n._id || "") + ")"), void t.status(201).send({
                            success: !0,
                            node: s
                        }))
                    })
                }
                var n = e.user._id;
                return !e.body.parentFolderId || e.body.parentFolderId.length < 12 ? t.status(400).send("Invalid parentFolderId") : void u.checkFolderWriteAccess(e.user, e.body.parentFolderId).then(function (o) {
                    return o !== !0 ? t.status(403).send("Forbidden, you don\'t have permission") : void c(e.user.dbPath).then(function (o) {
                        var s = new o({
                            nodeType: e.body.nodeType,
                            rootFolderId: null,
                            name: e.body.name,
                            metaData: e.body.metaData,
                            iconUrl: e.body.iconUrl,
                            isPersonal: !0,
                            createdDate: new Date,
                            createdUser: n,
                            description: e.body.description || ""
                        });
                        e.body.parentFolderId && e.body.parentFolderId.length > 12 && (s.rootFolderId = o.objectId(e.body.parentFolderId)), o.findOne({
                            rootFolderId: s.rootFolderId,
                            name: s.name
                        }, function (e, n) {
                            return e ? t.status(500).send("Can\'t get folder information!" + e) : n ? t.status(400).send("Folder with name [" + n.name + "] already exists!Choose another name!") : void(s.rootFolderId ? o.findOne({
                                _id: s.rootFolderId
                            }, function (e, n) {
                                return e || !n ? t.status(500).send("Error get parent folder information!" + (e || "Parent folder not found")) : (s.isPersonal = !!n.isPersonal, void r(s, n, o.db))
                            }) : r(s, {}, o.db))
                        })
                    })
                }, function (e) {
                    t.status(500).send("Get permission error")
                })
            }), e.delete("/folder/:folderId", a.requireAuth, u.requireFolderWriteAccess, function (e, t) {
                return e.params.folderId.length < 12 ? t.status(400).send("Invalid folderId") : void c(e.user.dbPath).then(function (r) {
                    r.findOne({
                        _id: e.params.folderId
                    }).exec(function (o, i) {
                        return o || !i ? t.status(500).send("Delete folder error! " + (o || "Not found folder remove")) : null == i.rootFolderId ? t.status(400).send("Can\'t remove root folders") : void n(e.user.dbPath, [e.params.folderId], function (n, o) {
                            return n ? t.status(500).send("Folders search error! " + n) : void r.remove({
                                _id: {
                                    $in: o
                                }
                            }, function (n, d) {
                                return n ? t.status(500).send("Remove error! " + n) : (s(o, r.db), g.createLog("site", e.user, "Delete", "Folder", i.name + "(and all subfolders)"), void t.status(201).send({
                                    success: d.ok,
                                    deletedCount: d.n
                                }))
                            })
                        })
                    })
                })
            })
        }
    }.call(this, cachedModules[922], cachedModules[922].exports), cachedModules[1084] = {
        exports: {}
    },
    function (e, t) {
        var r = require("q"),
            n = require("lodash"),
            o = cachedModules[4585].exports,
            s = cachedModules[4568].exports,
            i = cachedModules[8271].exports,
            d = cachedModules[4991].exports,
            a = cachedModules[1682].exports,
            u = cachedModules[5033].exports.dashboard,
            c = cachedModules[7777].exports;
        e.exports = function (e) {
            e.get("/search/shell/:value", s.requireAuth, function (e, t) {
                var s = e.params.userId || e.user._id,
                    l = "";
                try {
                    l = new RegExp(e.params.value, "i")
                } catch (e) {
                    return t.status(400).send("Invalid Search pattern")
                }
                var f = [],
                    p = [],
                    h = r.defer(),
                    m = r.defer();
                p.push(h.promise), p.push(m.promise), u(e.user.dbPath).then(function (t) {
                    t.find({
                        dashboardName: l
                    }).lean().exec(function (n, a) {
                        if (n) return h.reject(n);
                        var u = [],
                            l = [];
                        a.forEach(function (n) {
                            l.push(d(t.db).findOne({
                                _id: n.folderId
                            }).exec().then(function (t) {
                                if (t) {
                                    if (c.processObject(n), t.isPersonal) {
                                        if (t.createdUser.toString() === s.toString()) {
                                            var d = {
                                                id: n._id,
                                                name: n.dashboardName,
                                                description: n.description,
                                                type: "dashboard",
                                                thumbnail: n.thumbnail
                                            };
                                            return c.processObject(d), r.resolve(d)
                                        }
                                        return r.resolve("")
                                    }
                                    return i.checkDocumentReadAccess(e.user, t._id, n._id, o.modulesTypeName.dashboard).then(function (e) {
                                        if (e) {
                                            var t = {
                                                id: n._id,
                                                name: n.dashboardName,
                                                description: n.description,
                                                type: "dashboard",
                                                thumbnail: n.thumbnail
                                            };
                                            return c.processObject(t), r.resolve(t)
                                        }
                                        return r.resolve("")
                                    }, function (e) {
                                        return r.resolve("")
                                    })
                                }
                                return r.resolve("")
                            }))
                        }), r.all(l).then(function (e) {
                            u = e.filter(function (e) {
                                return "" !== e
                            }), h.resolve(u)
                        })
                    })
                }), a(e.user.dbPath).then(function (t) {
                    t.find({
                        name: l
                    }).lean().exec(function (n, a) {
                        if (n) return m.reject(n);
                        var u = [],
                            l = [];
                        a.forEach(function (n) {
                            l.push(d(t.db).findOne({
                                _id: n.folderId
                            }).exec().then(function (t) {
                                if (t) {
                                    if (c.processObject(n), t.isPersonal) {
                                        if (t.createdUser.toString() === s.toString()) {
                                            var d = {
                                                id: n._id,
                                                name: n.name,
                                                description: n.description,
                                                type: "report",
                                                thumbnail: n.thumbnail
                                            };
                                            return c.processObject(d), r.resolve(d)
                                        }
                                        return r.resolve("")
                                    }
                                    return i.checkDocumentReadAccess(e.user, t._id, n._id, o.modulesTypeName.report).then(function (e) {
                                        if (e) {
                                            var t = {
                                                id: n._id,
                                                name: n.name,
                                                description: n.description,
                                                type: "report",
                                                thumbnail: n.thumbnail
                                            };
                                            return c.processObject(t), r.resolve(t)
                                        }
                                        return r.resolve("")
                                    }, function (e) {
                                        return r.resolve("")
                                    })
                                }
                                return r.resolve("")
                            }, function (e) {
                                return r.resolve("")
                            }))
                        }), r.all(l).then(function (e) {
                            u = e.filter(function (e) {
                                return "" !== e
                            }), m.resolve(u)
                        })
                    })
                }), r.all(p).then(function (e) {
                    f = n.flatten(e), t.status(201).send(f)
                }, function (e) {
                    t.status(500).send(e)
                })
            })
        }
    }.call(this, cachedModules[1084], cachedModules[1084].exports), cachedModules[2664] = {
        exports: {}
    },
    function (e, t) {
        var r = cachedModules[4568].exports,
            n = cachedModules[7746].exports,
            o = cachedModules[2611].exports,
            s = cachedModules[8294].exports,
            i = cachedModules[3760].exports;
        e.exports = function (e) {
            e.get("/roles", r.requireAuth, function (e, t) {
                i.Roles().then(function (e) {
                    e.GetAll(function (e, r) {
                        e ? t.status(500).send("Error in getting roles: " + e) : t.status(201).send(r)
                    })
                })
            }), e.get("/roles/default", r.requireAuth, function (e, t) {
                i.Roles().then(function (e) {
                    e.GetServerAdminRole(function (e, r) {
                        e ? t.status(500).send("Error getting defaultServerAdmin " + e) : r ? t.status(201).send(r) : t.status(404).send("ServerAdmin not found")
                    })
                })
            }), e.get("/roles/user/:userId", r.requireAuth, function (e, t) {
                var r = e.params.userId;
                return r.length < 12 ? void t.status(400).send("Invalid userId") : void n(e.user.dbPath).then(function (e) {
                    e.GetUserRole(r, function (e, n) {
                        e ? t.status(500).send("Error in getting user role: " + e) : n ? t.status(201).send(n.roleId) : t.status(500).send("Error in getting user role for: " + r)
                    })
                })
            }), e.get("/roles/:roleId/users", r.requireAuth, function (e, t) {
                var r = e.params.roleId;
                return r.length < 12 ? void t.status(400).send("Invalid roleId") : void n(e.user.dbPath).then(function (e) {
                    e.GetUsersByRole(r, function (e, r) {
                        e ? t.status(500).send("Error error " + e) : t.status(201).send(r)
                    })
                })
            }), e.get("/roles/:roleId/permissions", r.requireAuth, function (e, t) {
                var r = e.params.roleId;
                return r.length < 12 ? void t.status(400).send("Invalid roleId") : void o(e.user.dbPath).then(function (e) {
                    e.GetRolePermission(r, function (e, r) {
                        e ? t.status(500).send("Error in getting role permission: " + e) : t.status(201).send(r)
                    })
                })
            }), e.put("/roles/:roleId/permissions", r.requireAuth, function (e, t) {
                var r = e.params.roleId;
                if (r.length < 12) return void t.status(400).send("Invalid roleId");
                if (!e.body.permissions) return void t.status(400).send("Invalid permissions list");
                var i = e.body.permissions;
                n(e.user.dbPath).then(function (e) {
                    e.find({
                        roleId: r
                    }).exec(function (n, d) {
                        if (n) t.status(500).send("Error in updating role permission: " + n);
                        else {
                            var a = d.map(function (e) {
                                return e.userId
                            });
                            o(e.db).UpdateRolePermission(r, a, i, s, function (e, r) {
                                e ? t.status(500).send("Error in updating role permission: " + e) : t.status(201).send(r)
                            })
                        }
                    })
                })
            })
        }
    }.call(this, cachedModules[2664], cachedModules[2664].exports), cachedModules[1497] = {
        exports: {}
    },
    function (e, t) {
        cachedModules[4568].exports, require("./lib_external/config");
        e.exports = function (e) {}
    }.call(this, cachedModules[1497], cachedModules[1497].exports), cachedModules[1941] = {
        exports: {}
    },
    function (e, t) {
        var r = cachedModules[4568].exports,
            n = require("fs"),
            o = require("path"),
            s = (require("util"), require("serve-static")),
            i = require("./lib_external/config");
        e.exports = function (e) {
            var t = o.resolve(i.rootDir + "/client/resources/images");
            e.use("/resources", s(t)), e.get("/imagelibrary/rootNodes", r.requireAuth, function (e, r) {
                var o = [];
                n.readdir(t, function (e, s) {
                    s.forEach(function (e) {
                        n.statSync(t + "/" + e).isDirectory() && o.push(e)
                    }), r.status(201).send(o)
                })
            }), e.get("/imagelibrary/children/*", r.requireAuth, function (e, r) {
                var s = [],
                    i = o.resolve(t + "/" + e.params[0]);
                n.readdir(i, function (e, t) {
                    t && t.forEach(function (e) {
                        n.statSync(i + "/" + e).isDirectory() && s.push(e)
                    }), r.status(201).send(s)
                })
            }), e.get("/imagelibrary/items/*", r.requireAuth, function (e, r) {
                var s = [],
                    i = o.resolve(t + "/" + e.params[0]);
                n.readdir(i, function (e, t) {
                    t && t.forEach(function (e) {
                        n.statSync(i + "/" + e).isFile() && s.push(e)
                    }), r.status(201).send(s)
                })
            })
        }
    }.call(this, cachedModules[1941], cachedModules[1941].exports), cachedModules[5406] = {
        exports: {}
    },
    function (e, t) {
        var r = require("q"),
            n = (require("lodash"), require("./lib_external/config"), cachedModules[4585].exports),
            o = cachedModules[4568].exports,
            s = cachedModules[5151].exports,
            i = cachedModules[5033].exports.dashboard,
            d = cachedModules[1682].exports,
            a = cachedModules[7777].exports;
        e.exports = function (e) {
            function t(e, t) {
                var o = t.map(function (e) {
                        return e.doc.type == n.modulesTypeName.dashboard ? e.doc.id.toString() : null
                    }),
                    u = t.map(function (e) {
                        return e.doc.type == n.modulesTypeName.report ? e.doc.id.toString() : null
                    }),
                    c = i(e).then(function (r) {
                        return r.find({
                            _id: {
                                $in: o
                            }
                        }).exec().then(function (r) {
                            r.forEach(function (e) {
                                var r = o.indexOf(e._id.toString());
                                r != -1 && (t[r].doc.name = e.dashboardName, t[r].doc.description = e.description, t[r].doc.thumbnail = e.thumbnail, a.processObject(t[r].doc), o[r] = null)
                            });
                            var n = t.map(function (e) {
                                return o.indexOf(e.doc.id.toString()) != -1 ? e._id : null
                            });
                            return s(e).then(function (e) {
                                e.remove({
                                    _id: {
                                        $in: n
                                    }
                                }).exec()
                            }), !0
                        }, function (e) {
                            return ""
                        })
                    }),
                    l = d(e).then(function (r) {
                        return r.find({
                            _id: {
                                $in: u
                            }
                        }).exec().then(function (r) {
                            r.forEach(function (e) {
                                var r = u.indexOf(e._id.toString());
                                r != -1 && (t[r].doc.name = e.name, t[r].doc.description = e.description, t[r].doc.thumbnail = e.thumbnail, u[r] = null, a.processObject(t[r].doc))
                            });
                            var n = t.map(function (e) {
                                return u.indexOf(e.doc.id.toString()) != -1 ? e._id : null
                            });
                            return s(e).then(function (e) {
                                e.remove({
                                    _id: {
                                        $in: n
                                    }
                                }).exec()
                            }), !0
                        }, function (e) {
                            return ""
                        })
                    });
                return r.all([c, l])
            }
            e.get("/recentdocs/:docType", o.requireAuth, function (e, r) {
                var n = e.params.userId || e.user._id;
                if (n.length < 12) return void e.status(400).send("Invalid userId");
                var o = {
                    userId: n
                };
                "" != e.params.docType && "all" != e.params.docType && (o["doc.type"] = e.params.docType), s(e.user.dbPath).then(function (n) {
                    n.find(o).sort({
                        order: 1
                    }).lean().exec(function (n, o) {
                        n ? r.status(500).send("recent docs get error" + n) : t(e.user.dbPath, o).then(function (e) {
                            r.status(201).send(o)
                        })
                    })
                })
            }), e.put("/recentdocs", o.requireAuth, function (e, t) {
                var r = e.params.userId || e.user._id;
                return r.length < 12 ? void e.status(400).send("Invalid userId") : e.body.docId && e.body.docType ? e.body.docId.length < 12 ? void e.status(400).send("Invalid docId") : void s(e.user.dbPath).then(function (n) {
                    n.addOrUpdateDoc(r, {
                        id: e.body.docId || "eid",
                        type: e.body.docType || "edt"
                    }, function (e, r) {
                        e ? t.status(500).send("Error insert/update RD: " + e) : t.status(201).send(r)
                    })
                }) : void t.status(400).send("Invalid recent document")
            }), e.delete("/recentdocs/clear", o.requireAuth, function (e, t) {
                var r = e.params.userId || e.user._id;
                return r.length < 12 ? void e.status(400).send("Invalid userId") : void s(e.user.dbPath).then(function (e) {
                    e.remove({
                        userId: r
                    }, function (e, r) {
                        e ? t.status(500).send("Error delete recent document: " + e) : t.status(201).send({
                            success: !0,
                            count: r
                        })
                    })
                })
            }), e.delete("/recentdocs", o.requireAuth, function (e, t) {
                var r = e.params.userId || e.user._id;
                return r.length < 12 ? void e.status(400).send("Invalid userId") : e.body.docId && e.body.docType ? e.body.docId < 12 ? void e.status(400).send("Invalid docId") : void s(e.user.dbPath).then(function (n) {
                    n.removeDoc(r, {
                        id: e.body.docId,
                        type: e.body.docType
                    }, function (e, r) {
                        e ? t.status(500).send("Error delete recent document: " + e) : t.status(201).send({
                            success: !0,
                            count: r
                        })
                    })
                }) : void t.status(400).send("Invalid recent document")
            })
        }
    }.call(this, cachedModules[5406], cachedModules[5406].exports), cachedModules[5005] = {
        exports: {}
    },
    function (e, t) {
        var r = require("q"),
            n = require("lodash"),
            o = (require("./lib_external/config"), cachedModules[4585].exports),
            s = cachedModules[4568].exports,
            i = cachedModules[937].exports,
            d = cachedModules[5033].exports.dashboard,
            a = cachedModules[1682].exports,
            u = cachedModules[7777].exports;
        e.exports = function (e) {
            function t(e, t) {
                var n = t.map(function (e) {
                        return e.doc.type == o.modulesTypeName.dashboard ? e.doc.id.toString() : null
                    }),
                    s = t.map(function (e) {
                        return e.doc.type == o.modulesTypeName.report ? e.doc.id.toString() : null
                    }),
                    i = d(e).then(function (e) {
                        return e.find({
                            _id: {
                                $in: n
                            }
                        }).exec().then(function (e) {
                            var r = [];
                            return e.forEach(function (e) {
                                var o = n.indexOf(e._id.toString());
                                if (o != -1) {
                                    var s = {
                                        id: t[o].doc.id,
                                        name: e.dashboardName,
                                        type: t[o].doc.type,
                                        displayName: t[o].doc.displayName,
                                        description: e.description,
                                        thumbnail: e.thumbnail,
                                        group: t[o].gName
                                    };
                                    u.processObject(s), r.push(s)
                                }
                            }), r
                        }, function (e) {
                            return ""
                        })
                    }),
                    c = a(e).then(function (e) {
                        return e.find({
                            _id: {
                                $in: s
                            }
                        }).exec().then(function (e) {
                            var r = [];
                            return e.forEach(function (e) {
                                var n = s.indexOf(e._id.toString());
                                if (n != -1) {
                                    var o = {
                                        id: t[n].doc.id,
                                        name: e.name,
                                        type: t[n].doc.type,
                                        displayName: t[n].doc.displayName,
                                        description: e.description,
                                        thumbnail: e.thumbnail,
                                        group: t[n].gName
                                    };
                                    u.processObject(o), r.push(o)
                                }
                            }), r
                        }, function (e) {
                            return ""
                        })
                    });
                return r.all([i, c])
            }
            e.get("/favoritedocs/get/:docType", s.requireAuth, function (e, r) {
                var o = {
                    userId: e.user._id
                };
                "" != e.params.docType && "all" != e.params.docType && (o["docs.type"] = e.params.docType), i(e.user.dbPath).then(function (s) {
                    s.find(o).sort({
                        order: 1
                    }).lean().exec(function (o, s) {
                        o ? r.status(500).send("Error recent docs get error FD:" + o) : t(e.user.dbPath, s).then(function (e) {
                            e = e.filter(function (e) {
                                return "" !== e
                            });
                            var t = n.flatten(e);
                            r.status(201).send(t)
                        })
                    })
                })
            }), e.post("/favoritedocs/check", s.requireAuth, function (e, t) {
                var r = e.user._id;
                if (!e.body.docId || !e.body.docType) return void t.status(400).send("Invalid favorite document");
                if (e.body.docId.length < 12) return void t.status(400).send("Invalid docId");
                var n = {
                    id: e.body.docId,
                    type: e.body.docType
                };
                i(e.user.dbPath).then(function (e) {
                    e.check(r, n, function (e, r) {
                        e ? t.status(500).send("Error checking favorite document FD: " + e) : t.status(201).send(r)
                    })
                })
            }), e.put("/favoritedocs/insert", s.requireAuth, function (e, t) {
                var r = e.user._id;
                return e.body.docId && e.body.docType ? e.body.docId.length < 12 ? void t.status(400).send("Invalid docId") : void i(e.user.dbPath).then(function (n) {
                    var o = new n({
                        userId: r,
                        doc: {
                            id: e.body.docId,
                            type: e.body.docType
                        }
                    });
                    o.save(function (e) {
                        e ? t.status(500).send("Error adding favorite document FD: ") : t.status(201).send(o)
                    })
                }) : void t.status(400).send("Invalid favorite document")
            }), e.put("/favoritedocs/edit/:docId", s.requireAuth, function (e, t) {
                var r = e.user._id;
                if (e.params.docId.length < 12) return void t.status(400).send("Invalid docId");
                var n = e.params.docId;
                if (void 0 == e.body.name) return void t.status(400).send("Invalid favorite document");
                var o = e.body.name;
                i(e.user.dbPath).then(function (e) {
                    e.findOneAndUpdate({
                        userId: r,
                        "doc.id": n
                    }, {
                        "doc.displayName": o
                    }, {
                        new: !0
                    }, function (e, r) {
                        e ? t.status(500).send("Error adding favorite document FD: " + e) : t.status(201).send(r)
                    })
                })
            }), e.put("/favoritedocs/group/add/:gName", s.requireAuth, function (e, t) {
                var r = e.user._id,
                    n = e.params.gName,
                    o = {},
                    s = {};
                if (!e.body.doc.docId || !e.body.doc.docType) return void t.status(400).send("Invalid favorite document");
                if (e.body.doc.docId.length < 12) return void t.status(400).send("Invalid docId");
                if (e.body.odoc.docId && e.body.odoc.docType) {
                    if (e.body.odoc.docId.length < 12) return void t.status(400).send("Invalid docId");
                    s = {
                        id: e.body.odoc.docId,
                        type: e.body.odoc.docType
                    }
                }
                o = {
                    id: e.body.doc.docId,
                    type: e.body.doc.docType
                }, i(e.user.dbPath).then(function (e) {
                    e.addDocToGroup(r, n, o, s, function (e, r) {
                        e ? t.status(500).send("Error adding favorite document to group FD: " + e) : t.status(201).send(r)
                    })
                })
            }), e.put("/favoritedocs/group/edit/:gName", s.requireAuth, function (e, t) {
                var r = e.user._id,
                    n = e.params.gName;
                if (!e.body.gName) return void t.status(400).send("Invalid favorite document");
                var o = e.body.gName;
                i(e.user.dbPath).then(function (e) {
                    e.update({
                        userId: r,
                        gName: n
                    }, {
                        gName: o
                    }, {
                        multi: !0
                    }, function (e, r) {
                        e ? t.status(500).send("Error adding favorite document to group FD: " + e) : t.status(201).send(r)
                    })
                })
            }), e.delete("/favoritedocs/group/remove/:gName", s.requireAuth, function (e, t) {
                var r = e.user._id,
                    n = e.params.gName;
                if (!e.body.docId || !e.body.docType) return void t.status(400).send("Invalid favorite document");
                if (e.body.docId.length < 12) return void t.status(400).send("Invalid docId");
                var o = {
                    id: e.body.docId,
                    type: e.body.docType
                };
                i(e.user.dbPath).then(function (e) {
                    e.removeDocFromGroup(r, n, o, function (e, r) {
                        e ? t.status(500).send("Error delete favorite document from group FD: " + e) : t.status(201).send(r)
                    })
                })
            }), e.delete("/favoritedocs/group/clear/:gName", s.requireAuth, function (e, t) {
                var r = e.user._id,
                    n = e.params.gName;
                return void 0 == e.body.remove ? void t.status(400).send("Invalid favorite document") : void i(e.user.dbPath).then(function (o) {
                    e.body.remove ? o.removeGroupWithDocs(r, n, function (e, r) {
                        e ? t.status(500).send("Error delete favorite document FD:" + e) : t.status(201).send({
                            success: !0,
                            count: r
                        })
                    }) : o.removeGroupWithoutDocs(r, n, function (e, r) {
                        e ? t.status(500).send("Error delete favorite document FD:" + e) : t.status(201).send({
                            success: !0,
                            count: r
                        })
                    })
                })
            }), e.delete("/favoritedocs/clear", s.requireAuth, function (e, t) {
                var r = e.user._id;
                i(e.user.dbPath).then(function (e) {
                    e.remove({
                        userId: r
                    }, function (e, r) {
                        e ? t.status(500).send("Error delete favorite document FD:" + e) : t.status(201).send({
                            success: !0,
                            count: r
                        })
                    })
                })
            }), e.delete("/favoritedocs", s.requireAuth, function (e, t) {
                var r = e.user._id;
                if (!e.body.docId || !e.body.docType) return void t.status(400).send("Invalid favorite document");
                if (e.body.docId.length < 12) return void t.status(400).send("Invalid docId");
                var n = {
                    id: e.body.docId,
                    type: e.body.docType
                };
                i(e.user.dbPath).then(function (e) {
                    e.removeDoc(r, n, function (e, r) {
                        e ? t.status(500).send("Error delete favorite document FD:" + e) : t.status(201).send({
                            success: !0,
                            count: r
                        })
                    })
                })
            })
        }
    }.call(this, cachedModules[5005], cachedModules[5005].exports), cachedModules[4684] = {
        exports: {}
    },
    function (e, t) {
        var r = (require("q"), cachedModules[4568].exports),
            n = (cachedModules[8502].exports, cachedModules[3669].exports, cachedModules[2611].exports, cachedModules[4991].exports, cachedModules[7746].exports),
            o = cachedModules[3174].exports,
            s = (cachedModules[4286].exports, cachedModules[3062].exports);
        e.exports = function (e) {
            e.get("/sites", r.requireAuth, function (e, t) {
                o.Sites.findAll().sort({
                    name: 1
                }).exec(function (e, r) {
                    if (e) t.status(500).send("Error can\'t get sites: " + e);
                    else {
                        var n = [];
                        r.forEach(function (e) {
                            n.push({
                                id: e._id,
                                name: e.name,
                                description: e.description,
                                default: e.default
                            })
                        }), t.status(201).send(n)
                    }
                })
            }), e.get("/sites/default", r.requireAuth, function (e, t) {
                o.Sites.findDefaultSite(function (e, r) {
                    e ? t.status(500).send("Error can\'t get sites: " + e) : t.status(201).send(r)
                })
            }), e.get("/sites/currentUser", s.requireLicenseValidation, r.validAuthToken, function (e, t) {
                var r = e.params.userId || e.info.payload.userId || e.user._id;
                return r.length < 12 ? void t.status(400).send("Invalid userId") : void o.Sites.findSiteBelongToUser(r, function (e, r) {
                    e ? t.status(500).send("Error can\'t get sites: " + e) : (r && (r = r.map(function (e) {
                        return {
                            _id: e._id,
                            description: e.description,
                            name: e.name
                        }
                    })), t.status(201).send(r))
                })
            }), e.get("/sites/users", r.requireAuth, function (e, t) {
                var r = e.params.userId || e.user._id;
                return r.length < 12 ? void t.status(400).send("Invalid userId") : void n(e.user.dbPath).then(function (e) {
                    e.find({}).lean().exec(function (e, r) {
                        if (e) return void t.status(500).send("Error find users: " + e);
                        var n = r.map(function (e) {
                            return e.userId.toString()
                        });
                        o.Users.findByIds(n, function (e, o) {
                            if (e) t.status(500).send("Error find master users: " + e);
                            else {
                                var s = o.map(function (e) {
                                    var t = n.indexOf(e._id.toString());
                                    return t != -1 ? (e.roleId = r[t].roleId, e.isAdmin = r[t].isAdmin) : (e.roleId = "", e.isAdmin = !1), delete e.avatar, e
                                });
                                t.status(200).send({
                                    users: s
                                })
                            }
                        })
                    })
                })
            }), e.get("/sites/switch/:siteId", s.requireLicenseValidation, r.validAuthToken, function (e, t) {
                var n = e.params.siteId;
                o.Sites.findById(n, function (n, s) {
                    n ? t.status(500).send("Error can\'t get site") : s ? o.UserMap.findMapItem(e.info.payload.userId, s._id, function (n, o) {
                        n ? t.status(500).send(n) : o ? r.changeSite(e, t, s) : t.status(400).send("Restricted site!")
                    }) : t.status(400).send("Invalid site id" + e.params.siteId)
                })
            }), e.get("/sites/byname/:name?", s.requireLicenseValidation, r.validAuthToken, function (e, t) {
                var n = e.params.name;
                o.Sites.findByName(n, function (n, s) {
                    n ? t.status(500).send("Error can\'t get site") : s ? o.UserMap.findMapItem(e.info.payload.userId, s._id, function (n, o) {
                        n ? t.status(500).send(n) : o ? r.changeSite(e, t, s) : t.status(400).send("Invalid Site name")
                    }) : t.status(400).send("Invalid site name")
                })
            }), e.get("/sites/:siteId", r.requireAuth, function (e, t) {
                return e.params.siteId ? void o.Sites.findById(e.params.siteId, function (e, r) {
                    e ? t.status(500).send("Error can\'t get site") : t.status(201).send(r)
                }) : void t.status(400).send("Invalid site Id" + e.params.siteId)
            }), e.post("/sites", r.requireAuth, function (e, t) {
                e.params.userId || e.user._id;
                if (!e.body) return void t.status(400).send("Invalid object");
                var r = {
                        name: e.body.name,
                        description: e.body.description,
                        default: e.body.default
                    },
                    n = {
                        id: e.body.partner.id,
                        name: e.body.partner.name
                    };
                o.Sites.createSite(n, r, function (e, r) {
                    e ? t.status(500).send("Error creating site" + e) : t.status(201).send(r)
                })
            }), e.post("/sites/:siteId/user", r.requireAuth, function (e, t) {
                var r = e.params.siteId;
                if (r.length < 12) return void t.status(400).send("Invalid siteId");
                if (!e.body.userId || e.body.userId.length < 12) return void t.status(400).send("Invalid userId");
                var n = e.body.userId;
                o.Sites.addUserToSite(n, r, function () {
                    err ? t.status(500).send("Error adding user" + err) : t.status(201).send(result)
                })
            }), e.put("/sites", r.requireAuth, function (e, t) {
                var r = e.body.siteId;
                return !r.length < 12 ? void t.status(400).send("Invalid siteId") : e.body ? void o.Sites.updateSite(r, e.body, function (e, r) {
                    e ? t.status(500).send("site update sucess " + e) : t.status(201).send({
                        success: !0
                    })
                }) : void t.status(400).send("Invalid object")
            }), e.delete("/sites", r.requireAuth, function (e, t) {
                if (!e.body) return void t.status(400).send("Invalid object");
                var r = e.body;
                o.Sites.deleteSites(r, function (e) {
                    e.then(function (e) {
                        t.status(201).send(e)
                    }, function (e) {
                        t.status(500).send(e)
                    })
                })
            })
        }
    }.call(this, cachedModules[4684], cachedModules[4684].exports), cachedModules[8822] = {
        exports: {}
    },
    function (e, t) {
        function r(e, t) {
            function r() {
                d + c > e.width && (c = e.width - d), p.read(f, function (t, s) {
                    s.crop(d, a, c, l).getBuffer(p.MIME_PNG, function (t, s) {
                        o.addImage(s, {
                            cx: c,
                            cy: l
                        }), a += l, a < e.height ? r() : (a = 0, d += c, d < e.width ? r() : n.resolve())
                    })
                })
            }
            var n = u.defer(),
                o = t.createP(),
                s = 650,
                i = 900,
                d = 0,
                a = 0,
                c = s,
                l = i,
                f = new Buffer(e.dataUrl.replace(/^data:image\/png;base64,/, ""), "base64");
            return e.width < s && (c = e.width), e.height < i && (l = e.height), r(), n.promise
        }
        function n(e, t, r, n, o, s, i) {
            var d = [],
                a = new y;
            if (e.length > 0 && null != e.forEach) {
                e.forEach(function (e) {
                    for (var u = 0; u < e.Column.Tuples[0].Members.length; u++) {
                        var c = [];
                        if (s && c.push(i ? {
                                type: "numberColumn",
                                value: "#"
                            } : "#"), r && r.length > 0)
                            for (var l = 0; l < e.Row.Tuples[0].Members.length; l++) "ColumnAxis" == o ? c.push(i ? {
                                type: "caption",
                                value: r[l].caption
                            } : r[l].caption) : c.push(i ? {
                                type: "caption",
                                value: r[u].caption
                            } : r[u].caption);
                        if (t || "ColumnAxis" != o || u != e.Column.Tuples[0].Members.length - 1)
                            for (var l = 0; l < e.Column.Tuples.length; l++) c.push(i ? {
                                type: "caption",
                                value: e.Column.Tuples[l].Members[u].Caption
                            } : e.Column.Tuples[l].Members[u].Caption);
                        else
                            for (var l = 0; l < e.Column.Tuples.length; l++)
                                for (var f = 0; f < n.length; f++) n[f].UniqueName == e.Measures[e.Column.Tuples[l].Members[e.Column.Tuples[l].Members.length - 1].Index].UniqueName && c.push(i ? {
                                    type: "caption",
                                    value: n[f].Caption
                                } : n[f].Caption);
                        d.push(c)
                    }
                    for (var u = 0; u < e.Row.Tuples.length; u++) {
                        var p = e.Row.Tuples[u],
                            c = [];
                        s && c.push(i ? {
                            type: "numberColumn",
                            value: s + u
                        } : s + u), e.Cluster && c.push(i ? {
                            type: "caption",
                            value: e.Cluster.Attribute.Name + "[" + e.Cluster.Attribute.Member.Caption + "]"
                        } : e.Cluster.Attribute.Name + "[" + e.Cluster.Attribute.Member.Caption + "]");
                        for (var l = 0; l < p.Members.length; l++)
                            if (t || "RowAxis" != o || l != p.Members.length - 1) c.push(i ? {
                                type: "caption",
                                value: p.Members[l].Caption
                            } : p.Members[l].Caption);
                            else
                                for (var f = 0; f < n.length; f++)
                                    if (n[f].UniqueName == e.Measures[p.Members[p.Members.length - 1].Index].UniqueName) {
                                        c.push(i ? {
                                            type: "caption",
                                            value: n[f].Caption
                                        } : n[f].Caption);
                                        break
                                    } for (var l = 0; l < e.Column.Tuples.length; l++) {
                            var h = e.Column.Tuples.length * u + l,
                                m = [];
                            if (e.Cells.length > 0) {
                                for (var b in e.Cells[h].Values) {
                                    var v;
                                    if ("RowAxis" == o) {
                                        var g = e.Row.Tuples[u].Members[e.Row.Tuples[u].Members.length - 1].Index;
                                        v = n[g]
                                    } else {
                                        var g = e.Column.Tuples[l].Members[e.Column.Tuples[l].Members.length - 1].Index;
                                        v = n[g]
                                    }
                                    if (v && v.Formatting && v.Formatting.Format) {
                                        var I = parseFloat(e.Cells[h].Values[b]),
                                            y = I;
                                        switch (v.Formatting.Type) {
                                        case "General":
                                            y = I;
                                            break;
                                        case "Currency":
                                            y = x(I).format("$0,0.00");
                                            break;
                                        case "Decimal":
                                            y = I.toFixed(2);
                                            break;
                                        case "Scientific":
                                            y = I.toExponential();
                                            break;
                                        case "FixedPoint":
                                            y = I.toFixed(2);
                                            break;
                                        case "CommasForThousands":
                                            a.defaults.format = "#,###.00", y = a.formatNumber(I, "#,###.00");
                                            break;
                                        case "Percent":
                                            y = I + "%";
                                            break;
                                        case "Round":
                                            y = x(I).format("0.0a");
                                            break;
                                        case "Custom":
                                            a.defaults.format = v.Formatting.Format, y = a.formatNumber(I, v.Formatting.Format)
                                        }
                                        m.push(y)
                                    } else m.push(e.Cells[h].Values[b])
                                }
                                1 == m.length ? c.push(i ? {
                                    type: "cell",
                                    value: m[0]
                                } : m[0]) : c.push(i ? {
                                    type: "cell",
                                    value: m.join("/")
                                } : m.join("/"))
                            }
                        }
                        d.push(c)
                    }
                })
            }
            return d
        }
        function o(e, t, r, o) {
            var s = !0,
                i = 1e5,
                d = e.body.data.includeRowNumbers ? i * r + 1 : 0,
                a = e.body.data.query;
            a.Query.RowAxisLimit = {
                Count: i,
                Offset: i * r
            };
            var u = (b.server.https.enabled ? "https" : "http") + "://" + e.headers.host + b.queryProcessor.apiPrefix + "/query?siteId=" + e.user.siteId;
            S.info("qp url is : "), S.info(u), S.info("strict ssl false");
            var c = v.defaults({
                    jar: !0,
                    strictSSL: !1
                }),
                l = {
                    uri: u,
                    method: "post",
                    headers: {
                        "x-auth-token": e.get("x-auth-token")
                    },
                    followRedirect: !1
                };
            return e.body && (l.body = a, l.json = !0), c(l, function (r, a, u) {
                if (r) return void S.error("qp response error ", r);
                if (!a || 2 != a.statusCode.toString()[0]) return o(null);
                S.info("response body(dataset)"), S.info(u);
                var c = n(u, e.body.data.isMeasureAggregationShown, e.body.data.attributes, e.body.data.measures, e.body.data.query.Query.MeasureAxis, d, !0);
                if (e.body.data.hiddenTableIndexes) {
                    if (e.body.data.hiddenTableIndexes.hiddenRowsIndexes && e.body.data.hiddenTableIndexes.hiddenRowsIndexes.length > 0) {
                        for (var l = 0; l < c.length; l++)
                            for (var f = 0; f < e.body.data.hiddenTableIndexes.hiddenRowsIndexes.length; f++) c[e.body.data.hiddenTableIndexes.hiddenRowsIndexes[f] + 1] = null;
                        for (var l = 0; l < c.length; l++) c[l] || (c.splice(l, 1), l--)
                    }
                    if (e.body.data.hiddenTableIndexes.hiddenColumnsIndexes && e.body.data.hiddenTableIndexes.hiddenColumnsIndexes.length > 0) {
                        for (var l = 0; l < c.length; l++)
                            for (var f = 0; f < e.body.data.hiddenTableIndexes.hiddenColumnsIndexes.length; f++) e.body.data.includeRowNumbers ? c[l][e.body.data.hiddenTableIndexes.hiddenColumnsIndexes[f] + 1] = "deleteit" : c[l][e.body.data.hiddenTableIndexes.hiddenColumnsIndexes[f] + 1] = "deleteit";
                        for (var l = 0; l < c.length; l++)
                            for (var f = 0; f < c[l].length; f++) "deleteit" == c[l][f] && (c[l].splice(f, 1), f--)
                    }
                }
                c.length < i && (s = !1);
                for (var l = 0; l < c.length; l++) {
                    t.addRow(c[l]);
                    var p = t.lastRow,
                        h = 0;
                    p.eachCell({
                        includeEmpty: !0
                    }, function (e, t) {
                        "caption" == c[l][h].type ? (e.value = c[l][h].value, e.font = {
                            name: "Arial",
                            family: 4,
                            size: 8,
                            bold: !0,
                            outline: !0
                        }, e.fill = {
                            type: "gradient",
                            gradient: "angle",
                            degree: 0,
                            stops: [{
                                position: 0,
                                color: {
                                    argb: "f0f0f6"
                                }
                            }, {
                                position: .5,
                                color: {
                                    argb: "f0f0f6"
                                }
                            }, {
                                position: 1,
                                color: {
                                    argb: "f0f0f6"
                                }
                            }]
                        }) : e.value = c[l][h].value, h++
                    })
                }
                o(null, h + 1, s)
            }).on("error", function (e) {
                return S.error("error event"), S.error("error"), S.error("request error", e), o(null)
            }), s
        }
        function s(e) {
            var t = u.defer(),
                r = e.body.data.includeRowNumbers ? 1 : 0;
            S.info("strict ssl false");
            var o = v.defaults({
                    jar: !0,
                    strictSSL: !1
                }),
                s = {
                    uri: (b.server.https.enabled ? "https" : "http") + "://" + e.headers.host + b.queryProcessor.apiPrefix + "/query?siteId=" + e.user.siteId,
                    method: "post",
                    headers: {
                        "x-auth-token": e.get("x-auth-token")
                    },
                    followRedirect: !1
                };
            return e.body && (s.body = e.body.data.query, s.json = !0), o(s, function (o, s, i) {
                if (s && 2 == s.statusCode.toString()[0]) {
                    var d = n(i, e.body.data.isMeasureAggregationShown, e.body.data.attributes, e.body.data.measures, e.body.data.query.Query.MeasureAxis, r, !1);
                    if (e.body.data.hiddenTableIndexes) {
                        if (e.body.data.hiddenTableIndexes.hiddenRowsIndexes && e.body.data.hiddenTableIndexes.hiddenRowsIndexes.length > 0) {
                            for (var a = 0; a < d.length; a++)
                                for (var u = 0; u < e.body.data.hiddenTableIndexes.hiddenRowsIndexes.length; u++) d[e.body.data.hiddenTableIndexes.hiddenRowsIndexes[u] + 1] = null;
                            for (var a = 0; a < d.length; a++) d[a] || (d.splice(a, 1), a--)
                        }
                        if (e.body.data.hiddenTableIndexes.hiddenColumnsIndexes && e.body.data.hiddenTableIndexes.hiddenColumnsIndexes.length > 0) {
                            for (var a = 0; a < d.length; a++)
                                for (var u = 0; u < e.body.data.hiddenTableIndexes.hiddenColumnsIndexes.length; u++) e.body.data.includeRowNumbers ? d[a][e.body.data.hiddenTableIndexes.hiddenColumnsIndexes[u] + 1] = "deleteit" : d[a][e.body.data.hiddenTableIndexes.hiddenColumnsIndexes[u] + 1] = "deleteit";
                            for (var a = 0; a < d.length; a++)
                                for (var u = 0; u < d[a].length; u++) "deleteit" == d[a][u] && (d[a].splice(u, 1), u--)
                        }
                    }
                    t.resolve(d)
                }
            }).on("error", function (e) {
                t.reject(e)
            }), t.promise
        }
        function i(e, t) {
            var r = t.createP();
            r.addText("Title: ", {
                font_face: "Calibri",
                font_size: 11
            }), r.addText(e.body.data.title, {
                color: "a39292",
                font_face: "Calibri",
                font_size: 11
            }), r.addLineBreak(), r.addText("Report time: ", {
                font_face: "Calibri",
                font_size: 11
            });
            var n = I().format("DD/MM/YYYY HH:mm:ss");
            if (r.addText(n, {
                    color: "a39292",
                    font_face: "Calibri",
                    font_size: 11
                }), e.body.data.slicerSet && e.body.data.slicerSet.length > 0) {
                r.addHorizontalLine(), r.addText("Slicer Set: ", {
                    font_face: "Calibri",
                    font_size: 11
                }), r.addLineBreak();
                for (var o = 0; o < e.body.data.slicerSet.length; o++) r.addText(e.body.data.slicerSet[o].filterName + ": ", {
                    font_face: "Calibri",
                    font_size: 11
                }), r.addText(e.body.data.slicerSet[o].filterValue, {
                    color: "a39292",
                    font_face: "Calibri",
                    font_size: 11
                }), r.addLineBreak()
            }
        }
        function d(e, t) {
            var r = 0;
            t.addText("Title:", {
                font_size: 14,
                font_face: "Calibri"
            }), r += 20, t.addText(e.body.data.title, {
                font_size: 14,
                font_face: "Calibri",
                color: "a39292",
                y: r
            });
            var n = I().format("DD/MM/YYYY HH:mm:ss");
            if (t.addText("Report time:", {
                    font_size: 14,
                    font_face: "Calibri",
                    y: 0,
                    x: "70%"
                }), t.addText(n, {
                    font_size: 14,
                    font_face: "Calibri",
                    y: 0,
                    x: "80%",
                    color: "a39292"
                }), e.body.data.slicerSet && e.body.data.slicerSet.length > 0) {
                r += 20, t.addText("Slicer Set:", {
                    font_size: 14,
                    font_face: "Calibri",
                    y: r
                }), r += 2;
                for (var o = 0; o < e.body.data.slicerSet.length; o++) r += 22, t.addText(e.body.data.slicerSet[o].filterName + ": " + e.body.data.slicerSet[o].filterValue, {
                    font_face: "Calibri",
                    font_size: 14,
                    y: r,
                    shape: "line",
                    cx: "90%",
                    x: 8
                })
            }
        }
        function a(e, t) {
            return e.body && e.body.data && e.body.data.reportId ? m.checkReportPermission(e, e.body.data.reportId, t) : e.body && e.body.data && e.body.data.dashboardId ? m.checkDashboardPermission(e, e.body.data.dashboardId, t) : m.checkRolePermission(e, t)
        }
        var u = require("q"),
            c = (require("path"), require("fs")),
            l = require("officegen"),
            f = require("excel4node"),
            p = require("jimp"),
            h = cachedModules[4568].exports,
            m = cachedModules[8271].exports,
            b = require("./lib_external/config"),
            v = (require("http"), require("request")),
            g = require("async"),
            I = require("moment"),
            y = require("numberformat"),
            x = require("numeral"),
            M = cachedModules[7958].exports,
            S = M("report");
        e.exports = function (e) {
            return e.post("/makeExcel", h.requireAuth, function (e, t) {
                a(e, ["403"]).then(function () {
                    var r = new f.Workbook,
                        n = [];
                    e.body.images.forEach(function (e, t) {
                        var r = u.defer();
                        c.writeFile("visualization" + t + ".png", new Buffer(e.dataUrl.replace(/^data:image\/png;base64,/, ""), "base64"), function (e) {
                            e ? r.reject(e) : r.resolve()
                        }), n.push(r.promise)
                    }), u.all(n).then(function () {
                        var n = r.addWorksheet("Sheet 1"),
                            o = r.createStyle({
                                font: {
                                    size: 10,
                                    name: "Calibri",
                                    bold: !0
                                },
                                fill: {
                                    type: "pattern",
                                    patternType: "solid",
                                    fgColor: "ADD8E6"
                                }
                            }),
                            s = r.createStyle({
                                font: {
                                    size: 10,
                                    name: "Calibri"
                                }
                            }),
                            i = 2;
                        if (n.cell(i, 1).string("Title:").style(o), n.cell(i, 2).string(e.body.data.title).style(s), n.cell(i, 4).string("Report time: ").style(o), n.column(5).setWidth(20), n.cell(i, 5).date(new Date).style({
                                font: {
                                    name: "Calibri",
                                    size: 10
                                },
                                numberFormat: "DD/MM/YYYY HH:mm:ss"
                            }), i += 2, e.body.data.slicerSet && (n.cell(i, 1).string("Slicer set: ").style(o), i++, e.body.data.slicerSet.length > 0))
                            for (var d = 0; d < e.body.data.slicerSet.length; d++) n.cell(i, 1).string(e.body.data.slicerSet[d].filterName).style(s), n.cell(i, 2).string(e.body.data.slicerSet[d].filterValue).style(s), i++;
                        for (var d = 0; d < e.body.images.length; d++) n.addImage({
                            path: "./visualization" + d + ".png",
                            type: "picture",
                            position: {
                                type: "oneCellAnchor",
                                from: {
                                    col: 1,
                                    row: i
                                }
                            }
                        }, function (e) {
                            throw e
                        }), i += Math.round(e.body.images[d].height / 19);
                        r.write("Excel.xlsx", t)
                    }, function (e) {
                        throw e
                    }), t.on("finish", function () {
                        for (var t = 0; t < e.body.images.length; t++) c.unlink("visualization" + t + ".png")
                    })
                }, function (e) {
                    t.status(403).send("makeExcel error:" + e)
                })
            }), e.post("/makeExcelAgregatedData", h.requireAuth, function (e, t) {
                a(e, ["403"]).then(function () {
                    S.info("export to excel started");
                    for (var r = require("exceljs"), n = new r.Workbook, s = n.addWorksheet("My Sheet"), i = e.body.data.slicerSet, d = [], a = 0; a < 100; a++) d.push({
                        header: "",
                        key: a,
                        width: 20
                    });
                    s.columns = d, s.addRow([]), s.getCell("A2").font = {
                        name: "Arial",
                        family: 4,
                        size: 8,
                        bold: !0,
                        outline: !0
                    }, s.getCell("A2").fill = {
                        type: "gradient",
                        gradient: "angle",
                        degree: 0,
                        stops: [{
                            position: 0,
                            color: {
                                argb: "ADD8E6"
                            }
                        }, {
                            position: .5,
                            color: {
                                argb: "ADD8E6"
                            }
                        }, {
                            position: 1,
                            color: {
                                argb: "ADD8E6"
                            }
                        }]
                    }, s.getCell("A2").value = "Title: ", s.getCell("B2").value = e.body.data.title, s.getCell("D2").font = {
                        name: "Arial",
                        family: 4,
                        size: 8,
                        bold: !0,
                        outline: !0
                    }, s.getCell("D2").fill = {
                        type: "gradient",
                        gradient: "angle",
                        degree: 0,
                        stops: [{
                            position: 0,
                            color: {
                                argb: "ADD8E6"
                            }
                        }, {
                            position: .5,
                            color: {
                                argb: "ADD8E6"
                            }
                        }, {
                            position: 1,
                            color: {
                                argb: "ADD8E6"
                            }
                        }]
                    }, s.getCell("D2").value = "Report time: ", s.getCell("E2").value = I().format("DD/MM/YYYY HH:mm:ss"), s.addRow([]), s.addRow(["SlicerSet"]), s.getCell("A4").font = {
                        name: "Arial",
                        family: 4,
                        size: 8,
                        bold: !0,
                        outline: !0
                    }, s.getCell("A4").fill = {
                        type: "gradient",
                        gradient: "angle",
                        degree: 0,
                        stops: [{
                            position: 0,
                            color: {
                                argb: "ADD8E6"
                            }
                        }, {
                            position: .5,
                            color: {
                                argb: "ADD8E6"
                            }
                        }, {
                            position: 1,
                            color: {
                                argb: "ADD8E6"
                            }
                        }]
                    };
                    for (var a = 0; a < i.length; a++) s.addRow([i[a].filterName, i[a].filterValue]);
                    s.addRow([]);
                    var u = [];
                    u[0] = function (t) {
                        o(e, s, 0, t)
                    };
                    for (var a = 0; a < 100; a++) u.push(function (r, i, d) {
                        i ? o(e, s, r, d) : (t.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"), t.setHeader("Content-Disposition", "attachment; filename=Report.xlsx"), n.xlsx.write(t).then(function () {
                            t.end()
                        }))
                    });
                    g.waterfall(u)
                }, function (e) {
                    t.status(403).send("makeExcelAgregatedData error:" + e)
                })
            }), e.post("/makeWord", h.requireAuth, function (e, t) {
                a(e, ["406"]).then(function () {
                    t.writeHead(200, {
                        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        "Content-disposition": "attachment; filename=chart.docx",
                        "Access-Control-Allow-Origin": "*"
                    });
                    var r = l("docx");
                    i(e, r);
                    for (var n = r.createP(), o = 650, s = 900, d = 0; d < e.body.images.length; d++) {
                        var a = new Buffer(e.body.images[d].dataUrl.replace(/^data:image\/png;base64,/, ""), "base64");
                        n.addImage(a, {
                            cx: e.body.images[d].width < o ? e.body.images[d].width : o,
                            cy: e.body.images[d].height < s ? e.body.images[d].height : s
                        })
                    }
                    r.generate(t), r.on("finalize", function (e) {
                        S.info("Finish to create Word file.undefinedTotal bytes created: " + e + "undefined")
                    }), r.on("error", function (e) {
                        S.error(e)
                    })
                }, function (e) {
                    t.status(403).send("makeWord error:" + e)
                })
            }), e.post("/makeWordTable", h.requireAuth, function (e, t) {
                a(e, ["406"]).then(function () {
                    t.writeHead(200, {
                        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        "Content-disposition": "attachment; filename=chart.docx",
                        "Access-Control-Allow-Origin": "*"
                    });
                    var r = l("docx");
                    i(e, r);
                    s(e).then(function (e) {
                        for (var n = 0; n < e[0].length; n++) e[0][n] = {
                            val: e[0][n],
                            opts: {
                                cellColWidth: 4261,
                                b: !0,
                                sz: "24",
                                shd: {
                                    fill: "999",
                                    themeFill: "text2",
                                    themeFillTint: "40"
                                },
                                fontFamily: "Avenir Book"
                            }
                        };
                        for (var o = {
                                tableColWidth: 20,
                                tableSize: 50,
                                tableColor: "ada",
                                tableAlign: "left",
                                tableFontFamily: "Times New Roman",
                                borders: !0
                            }, s = []; e[0].length > 0;)
                            for (var n = 0; n < e.length; n++) {
                                var i = e[n];
                                s.push(i.splice(0, 7))
                            }
                        r.createTable(s, o), r.generate(t)
                    }, function (e) {}), r.on("finalize", function (e) {
                        S.info("Finish to create Word file.undefinedTotal bytes created: " + e + "undefined")
                    }), r.on("error", function (e) {
                        S.error(e)
                    })
                }, function (e) {
                    t.status(403).send("makeWordTable error:" + e)
                })
            }), e.post("/makeWordSplit", h.requireAuth, function (e, t) {
                a(e, ["406"]).then(function () {
                    t.writeHead(200, {
                        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        "Content-disposition": "attachment; filename=chart.docx",
                        "Access-Control-Allow-Origin": "*"
                    });
                    var n = l("docx");
                    i(e, n);
                    for (var o = [], s = 0; s < e.body.images.length; s++) {
                        var d = r(e.body.images[s], n);
                        o.push(d)
                    }
                    u.all(o).then(function () {
                        n.generate(t)
                    })
                }, function (e) {
                    t.status(403).send("makeWordSplit error:" + e)
                })
            }), e.post("/makePowerPoint", h.requireAuth, function (e, t) {
                a(e, ["405"]).then(function () {
                    t.writeHead(200, {
                        "Content-Type": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                        "Content-disposition": "attachment; filename=chart.pptx",
                        "Access-Control-Allow-Origin": "*"
                    });
                    var r = l("pptx");
                    r.setWidescreen(!0);
                    var n, o = r.makeNewSlide();
                    n = e.body.data.slicerSet && e.body.data.slicerSet.length > 0 ? 80 / e.body.images.length : 93 / e.body.images.length;
                    for (var s = 0; s < e.body.images.length; s++) {
                        var i = new Buffer(e.body.images[s].dataUrl.replace(/^data:image\/png;base64,/, ""), "base64");
                        0 == s && d(e, o), e.body.data.slicerSet && e.body.data.slicerSet.length > 0 ? o.addImage(i, {
                            y: 20 + n * s + "%",
                            cx: "100%",
                            cy: n + "%"
                        }) : o.addImage(i, {
                            y: 7 + n * s + "%",
                            cx: "100%",
                            cy: n + "%"
                        })
                    }
                    r.generate(t), r.on("finalize", function (e) {
                        S.info("Finish to create PowerPoint file.undefinedTotal bytes created: " + e + "undefined")
                    }), r.on("error", function (e) {
                        S.error("Power point", e)
                    })
                }, function (e) {
                    t.status(403).send("makePowerPoint error:" + e)
                })
            }), e.post("/makePowerPointSplit", h.requireAuth, function (e, t) {
                a(e, ["405"]).then(function () {
                    t.writeHead(200, {
                        "Content-Type": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                        "Content-disposition": "attachment; filename=chart.pptx",
                        "Access-Control-Allow-Origin": "*"
                    });
                    var r = l("pptx");
                    r.setWidescreen(!0);
                    for (var n = 0; n < e.body.images.length; n++) {
                        var o = new Buffer(e.body.images[n].dataUrl.replace(/^data:image\/png;base64,/, ""), "base64"),
                            s = r.makeNewSlide();
                        0 == n ? (d(e, s), e.body.data.slicerSet && e.body.data.slicerSet.length > 0 ? s.addImage(o, {
                            y: "20%",
                            cx: "100%",
                            cy: "80%"
                        }) : s.addImage(o, {
                            y: "7%",
                            cx: "100%",
                            cy: "93%"
                        })) : s.addImage(o, {
                            cx: "100%",
                            cy: "100%"
                        })
                    }
                    r.generate(t), r.on("finalize", function (e) {
                        S.info("Finish to create PowerPoint file.undefinedTotal bytes created: " + e + "undefined")
                    }), r.on("error", function (e) {
                        S.error(e)
                    })
                }, function (e) {
                    t.status(403).send("makePowerPointSplit error:" + e)
                })
            }), e.post("/makePowerPointTable", h.requireAuth, function (e, t) {
                a(e, ["405"]).then(function () {
                    t.writeHead(200, {
                        "Content-Type": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                        "Content-disposition": "attachment; filename=chart.pptx",
                        "Access-Control-Allow-Origin": "*"
                    });
                    var r = l("pptx");
                    r.setWidescreen(!0);
                    var n = r.makeNewSlide();
                    d(e, n), s(e).then(function (e) {
                        for (var o = 0; o < e.length; o++)
                            for (var s = 0; s < e[o].length; s++) e[o][s] && (e[o][s] = {
                                val: e[o][s],
                                opts: {
                                    font_size: 10,
                                    font_face: "Arial"
                                }
                            });
                        var o, s, i, d = 9;
                        for (o = 0, s = e.length; o < s; o += d)
                            if (i = e.slice(o, o + d), 0 == o) n.addTable(i, {
                                x: 1,
                                columnWidth: 12e5
                            });
                            else {
                                i.unshift(e[0]);
                                var a = r.makeNewSlide();
                                a.addTable(i, {
                                    x: 1,
                                    columnWidth: 12e5
                                })
                            } r.generate(t)
                    }, function (e) {}), r.on("finalize", function (e) {
                        S.info("Finish to create PowerPoint file.undefinedTotal bytes created: " + e + "undefined")
                    }), r.on("error", function (e) {
                        S.error(e)
                    })
                }, function (e) {
                    t.status(403).send("makePowerPointTable error:" + e)
                })
            }), !0
        }
    }.call(this, cachedModules[8822], cachedModules[8822].exports), cachedModules[4796] = {
        exports: {}
    },
    function (e, t) {
        var r = require("q"),
            n = cachedModules[4568].exports,
            o = (require("./lib_external/config"), cachedModules[4585].exports),
            s = cachedModules[3669].exports,
            i = cachedModules[7746].exports,
            d = (cachedModules[8502].exports, cachedModules[4991].exports),
            a = cachedModules[1682].exports,
            u = cachedModules[5033].exports.dashboard,
            c = cachedModules[1268].exports,
            l = cachedModules[6996].exports,
            f = cachedModules[3174].exports,
            p = cachedModules[4286].exports,
            h = cachedModules[8271].exports,
            m = cachedModules[7777].exports;
        e.exports = function (e) {
            var t = [n.requireAuth, h.requireRolePermissions(["203"])];
            e.get("/groups", n.requireAuth, h.requireRolePermissions(["201", "203", "205"]), function (e, t) {
                s(e.user.dbPath).then(function (e) {
                    e.find({
                        admins: !1
                    }, {
                        settings: 0,
                        userIds: 0,
                        admins: 0
                    }).lean().exec(function (e, r) {
                        return e ? t.status(500).send("Get groups error " + e) : void t.status(201).send(r)
                    })
                })
            }), e.get("/groups/admins", t, function (e, t) {
                var n = (r.defer(), []);
                s(e.user.dbPath).then(function (e) {
                    e.find().lean().exec(function (s, i) {
                        return s ? t.status(500).send("Get groups error " + s) : 0 == i.length ? t.status(201).send([]) : (i.forEach(function (t) {
                            o.startupObjectNames.forEach(function (r) {
                                t.settings && t.settings[r] && null != t.settings[r].docId && null != t.settings[r].type && (t.settings[r].type == o.modulesTypeName.dashboard && n.push(u(e.db).findOne({
                                    _id: t.settings[r].docId
                                }).lean().exec().then(function (e) {
                                    e && (t.settings[r].name = e.dashboardName, t.settings[r].thumbnail = e.thumbnail, t.settings[r].description = e.description)
                                }, function (e) {
                                    return "Get dashboard details error: " + e
                                })), t.settings[r].type == o.modulesTypeName.report && n.push(a(e.db).findOne({
                                    _id: t.settings[r].docId
                                }).lean().exec().then(function (e) {
                                    e && (t.settings[r].name = e.name, t.settings[r].thumbnail = e.thumbnail, t.settings[r].description = e.description)
                                }, function (e) {
                                    return "Get report details error: " + e
                                })))
                            })
                        }), void r.all(n).then(function (e) {
                            m.processObject(i), t.status(201).send(i)
                        }, function (e) {
                            t.status(500).send("Get groups error " + e)
                        }))
                    })
                })
            }), e.get("/groups/:groupId", t, function (e, t) {
                if (e.params.groupId.length < 12) return t.status(400).send("Invalid groupId");
                var r = e.params.groupId;
                s(e.user.dbPath).then(function (e) {
                    e.findOne({
                        _id: r
                    }).lean().exec(function (n, o) {
                        if (n) return t.status(500).send("Error getting group: " + n);
                        if (!o) return t.status(500).send("Group not found " + r);
                        var s = o.userIds.map(function (e) {
                            return e.userId.toString()
                        });
                        i(e.db).find({}, {
                            userId: 1
                        }).lean().exec(function (e, r) {
                            if (e) return t.status(500).send("Error getting users: " + e);
                            r = r || [];
                            var n = r.map(function (e) {
                                return e.userId.toString()
                            });
                            f.Users.findByIds(n, function (e, r) {
                                e ? t.status(500).send("Error find master users: " + e) : (o.Users = [], r.forEach(function (e) {
                                    o.Users.push({
                                        _id: e._id.toString(),
                                        userName: e.userName,
                                        firstName: e.fisrtName,
                                        lastName: e.lastName,
                                        isAssigned: s.indexOf(e._id.toString()) != -1
                                    })
                                }), t.status(200).send(o))
                            })
                        })
                    })
                })
            }), e.get("/groups/:groupId/settings", t, function (e, t) {
                if (e.params.groupId.length < 12) return t.status(400).send("Invalid groupId");
                var n = e.params.groupId,
                    i = [];
                s(e.user.dbPath).then(function (e) {
                    e.findOne({
                        _id: n
                    }).lean().exec(function (n, s) {
                        return n || !s ? t.status(500).send("Get group error! " + (n || "Group not found")) : (o.startupObjectNames.forEach(function (t) {
                            s.settings && s.settings[t] && null != s.settings[t].docId && null != s.settings[t].type && (s.settings[t].type == o.modulesTypeName.dashboard && i.push(u(e.db).findOne({
                                _id: s.settings[t].docId
                            }).lean().exec().then(function (e) {
                                e && (s.settings[t].name = e.dashboardName, s.settings[t].thumbnail = e.thumbnail, s.settings[t].description = e.description)
                            }, function (e) {
                                return "Get dashboard details error: " + e
                            })), s.settings[t].type == o.modulesTypeName.report && i.push(a(e.db).findOne({
                                _id: s.settings[t].docId
                            }).lean().exec().then(function (e) {
                                e && (s.settings[t].name = e.name, s.settings[t].thumbnail = e.thumbnail, s.settings[t].description = e.description)
                            }, function (e) {
                                return "Get report details error: " + e
                            })))
                        }), void r.all(i).then(function (e) {
                            m.processObject(s.settings), t.status(201).send(s.settings)
                        }, function () {
                            t.status(500).send("Get groups error " + n)
                        }))
                    })
                })
            }), e.put("/groups", t, function (e, t) {
                if (!e.body._id || e.body._id.length < 12) return t.status(400).send("Invalid groupId");
                if (!e.body.name || "" == e.body.name) return t.status(400).send("Invalid group name");
                var r = {
                    name: e.body.name
                };
                void 0 != e.body.description && (r.description = e.body.description), void 0 != e.body.settings && (r.settings = e.body.settings);
                var n = e.body._id;
                s(e.user.dbPath).then(function (o) {
                    o.findOneAndUpdate({
                        _id: n,
                        default: !1
                    }, {
                        $set: r
                    }, {
                        new: !0
                    }, function (r, n) {
                        return r ? t.status(500).send("group update success " + r) : (p.createLog("site", e.user, "Update", "Group", n.name), void t.status(201).send({
                            success: !0
                        }))
                    })
                })
            }), e.put("/groups/:groupId/assign", t, function (e, t) {
                if (e.params.groupId.length < 12) return t.status(400).send("Invalid groupId");
                var r = e.body;
                s(e.user.dbPath).then(function (n) {
                    n.findOne({
                        _id: e.params.groupId
                    }).exec(function (n, o) {
                        if (n) return t.status(500).send("Error while get group! " + n);
                        if (!o) return t.status(500).send("Error find group! " + e.params.groupId);
                        var s = r.map(function (e) {
                            return {
                                userId: e._id
                            }
                        });
                        o.userIds = s, o.save(function (n, o) {
                            n ? t.status(500).send("Assign user to group error! " + n) : (p.createLog("site", e.user, "Update", "Group", "Assign user(s) [" + r.map(function (e) {
                                return e.userName || e.userId
                            }) + "]"), t.status(201).send({
                                success: !0
                            }))
                        })
                    })
                })
            }), e.put("/groups/:groupId/assignUser/:userId", t, function (e, t) {
                if (e.params.groupId.length < 12) return t.status(400).send("Invalid groupId");
                if (e.params.userId.length < 12) return t.status(400).send("Invalid userId");
                var r = e.params.userId;
                s(e.user.dbPath).then(function (n) {
                    n.findOne({
                        _id: e.params.groupId
                    }).exec(function (o, s) {
                        return o ? t.status(500).send("Error while get group! " + o) : s ? void i(n.db).findOne({
                            userId: r
                        }).lean().exec(function (n, o) {
                            if (n) return t.status(500).send("Error getting users: " + n);
                            if (!o) return t.status(500).send("User not found: " + r);
                            var i = o.userName,
                                d = s.userIds.some(function (e) {
                                    return e.userId == r
                                });
                            d ? (p.createLog("site", e.user, "Update", "Group", "Assign user: User" + i + " is already in group " + s.name), t.status(201).send({
                                success: !0
                            })) : (s.userIds.push({
                                userId: r
                            }), s.save(function (r, n) {
                                r ? t.status(500).send("Assign user to group error! " + r) : (p.createLog("site", e.user, "Update", "Group", "Assigned user [" + i + "] to " + s.name), t.status(201).send({
                                    success: !0
                                }))
                            }))
                        }) : t.status(500).send("Error find group! " + e.params.groupId)
                    })
                })
            }), e.post("/groups", t, function (e, t) {
                if (!e.body.name || "" == e.body.name) return t.status(400).send("Invalid group name");
                var r = {
                    name: e.body.name,
                    description: e.body.description || "",
                    default: !1,
                    admins: !1
                };
                s(e.user.dbPath).then(function (n) {
                    n.findOne({
                        name: e.body.name
                    }).exec(function (s, i) {
                        if (s) return t.status(500).send("Error inserting group" + s);
                        if (i) return t.status(400).send("Group with same name already exist");
                        var a = new n(r);
                        a.save(function (r, s) {
                            r ? t.status(500).send("Error inserting group" + r) : (d(n.db).findOne({
                                isPersonal: !1,
                                rootFolderId: null
                            }).exec(function (e, t) {
                                !e && t && c(n.db).InitPublicFolderPermission(o.securityStrategy.publicFolderOptimisticMethod, t._id, s._id)
                            }), p.createLog("site", e.user, "Create", "Group", s.name), t.status(201).send(s))
                        })
                    })
                })
            }), e.delete("/groups", t, function (e, t) {
                if (!e.body) return t.status(400).send("Not valid groups");
                var r = e.body;
                s(e.user.dbPath).then(function (n) {
                    n.find({
                        _id: {
                            $in: r.map(function (e) {
                                return e._id
                            })
                        }
                    }, function (s, i) {
                        n.RemoveGroups(r, function (r) {
                            r.then(function (r) {
                                r.forEach(function (e) {
                                    "" != e && (l(n.db).remove({
                                        "module.id": e,
                                        "module.type": o.documentPermission.moduleType.groups
                                    }).exec(), c(n.db).remove({
                                        groupId: e
                                    }).exec())
                                }), p.createLog("site", e.user, "Delete", "Group", "[" + i.map(function (e) {
                                    return e.name
                                }) + "]"), t.status(201).send({
                                    success: !0
                                })
                            }, function (e) {
                                t.status(500).send(e)
                            })
                        })
                    })
                })
            }), e.delete("/groups/:groupId", t, function (e, t) {
                if (e.params.groupId.length < 12) return t.status(400).send("Invalid groupId");
                var r = [];
                r.push({
                    _id: e.params.groupId
                }), s(e.user.dbPath).then(function (n) {
                    n.find({
                        _id: {
                            $in: r.map(function (e) {
                                return e._id
                            })
                        }
                    }, function (s, i) {
                        n.RemoveGroups(r, function (r) {
                            r.then(function (r) {
                                r.forEach(function (e) {
                                    "" != e && (l(n.db).RemoveByModule({
                                        id: e,
                                        type: o.documentPermission.moduleType.groups
                                    }), c(n.db).remove({
                                        groupId: e
                                    }).exec())
                                }), p.createLog("site", e.user, "Delete", "Group", "[" + i.map(function (e) {
                                    return e.name
                                }) + "]"), t.status(201).send({
                                    success: !0
                                })
                            }, function (e) {
                                t.status(500).send(e)
                            })
                        })
                    })
                })
            })
        }
    }.call(this, cachedModules[4796], cachedModules[4796].exports), cachedModules[9077] = {
        exports: {}
    },
    function (e, t) {
        var r = require("q"),
            n = (require("lodash"), cachedModules[4568].exports),
            o = cachedModules[8271].exports,
            s = cachedModules[7746].exports,
            i = cachedModules[2611].exports,
            d = cachedModules[8294].exports,
            a = cachedModules[1268].exports,
            u = cachedModules[3760].exports.PermissionList;
        e.exports = function (e) {
            function t(e, t, n) {
                var o = [],
                    a = r.defer(),
                    u = r.defer();
                return o.push(a.promise), o.push(u.promise), s(e).then(function (r) {
                    r.GetUserRole(n, function (r, n) {
                        !r && n ? i(e).then(function (e) {
                            e.GetSinglePermission(n.roleId, t, function (e, t) {
                                return !e && t ? t.permissions.length > 0 ? a.resolve({
                                    role: t.permissions[0].value
                                }) : a.resolve({
                                    role: ""
                                }) : a.resolve({
                                    role: !1
                                })
                            })
                        }) : a.resolve(!1)
                    })
                }), d(e).then(function (e) {
                    e.GetSinglePermission(n, t, function (e, t) {
                        return !e && t && t.permissions.length > 0 ? u.resolve({
                            user: t.permissions[0].value
                        }) : u.resolve({
                            user: ""
                        })
                    })
                }), r.all(o)
            }
            function c(e, t, n, o, d) {
                var u = [],
                    c = r.defer(),
                    l = r.defer(),
                    f = r.defer();
                return u.push(c.promise), u.push(l.promise), u.push(f.promise), s(e).then(function (r) {
                    r.GetUserRole(n, function (r, n) {
                        !r && n ? i(e).then(function (e) {
                            e.GetSinglePermission(n.roleId, t, function (e, t) {
                                return !e && t && t.permissions.length > 0 ? c.resolve({
                                    role: t.permissions[0].value
                                }) : c.resolve({
                                    role: ""
                                })
                            })
                        }) : c.resolve("")
                    })
                }), i(e).then(function (e) {
                    s.GetSinglePermission(n, t, function (e, t) {
                        return !e && t && t.permissions.length > 0 ? l.resolve({
                            user: t.permissions[0].value
                        }) : l.resolve({
                            user: ""
                        })
                    })
                }), a(e).then(function (e) {
                    e.GetSinglePermission(o, d, t, function (e, t) {
                        return !e && t && t.permissions.length > 0 ? f.resolve({
                            group: t.permissions[0].value
                        }) : f.resolve({
                            group: !0
                        })
                    })
                }), r.all(u)
            }
            function l(e) {
                var t = !1;
                return e.forEach(function (e) {
                    "" !== e.role && void 0 !== e.role && (t = e.role), "" !== e.user && void 0 !== e.user && (t = !!e.user), "" !== e.group && void 0 !== e.group && (t = !!e.group)
                }), t
            }
            e.post("/permissionsList/shell/:userId?", n.requireAuth, function (e, r) {
                var n = e.params.userId || e.user._id;
                if (!e.body.permission) return void r.status(400).send("Invalid permission code");
                if (n.length < 12) return void r.status(400).send("Invalid userId");
                var o = e.body.permission;
                u().then(function (s) {
                    s.findOne({
                        enum: o
                    }).exec(function (o, s) {
                        if (o) r.status(500).send("Check the permission error " + o);
                        else if (s) {
                            var i = s._id;
                            t(e.user.dbPath, i, n).then(function (e) {
                                var t = l(e);
                                r.status(201).send(t)
                            })
                        } else r.status(200).send({
                            success: !1
                        })
                    })
                })
            }), e.post("/permissionsList/all/:userId?", n.requireAuth, function (e, t) {
                var r = e.params.userId || e.user._id;
                if (!e.body.permission || e.body.folderId || e.body.groupId) return void t.status(400).send("Invalid object");
                if (r.length < 12) return void t.status(400).send("Invalid userId");
                if (e.body.folderId.length < 12) return void t.status(400).send("Invalid folderId");
                if (e.body.groupId.length < 12) return void t.status(400).send("Invalid groupId");
                var n = e.body.permission,
                    o = e.body.folderId,
                    s = e.body.groupId;
                u().then(function (i) {
                    i.findOne({
                        enum: n
                    }).exec(function (n, i) {
                        if (n) t.status(500).send("Check the permission error " + n);
                        else if (i) {
                            var d = i._id;
                            c(e.user.dbPath, d, r, s, o).then(function (e) {
                                t.status(201).send(e)
                            })
                        } else t.status(200).send({
                            success: !1
                        })
                    })
                })
            }), e.post("/permissionsList/getAllValues", n.requireAuth, function (e, t) {
                o.getUserRolePermissionsResultSet(e.user).then(function (e) {
                    t.status(201).send(e)
                }, function () {
                    t.status(500).send("Cannot get permission valuse")
                })
            })
        }
    }.call(this, cachedModules[9077], cachedModules[9077].exports), cachedModules[8417] = {
        exports: {}
    },
    function (e, t) {
        var r = require("q"),
            n = cachedModules[4568].exports,
            o = cachedModules[3669].exports,
            s = cachedModules[1268].exports,
            i = cachedModules[6996].exports,
            d = cachedModules[3174].exports,
            a = cachedModules[8271].exports;
        e.exports = function (e) {
            var t = [n.requireAuth, a.requireRolePermissions(["201"])];
            e.get("/folderpermission/list/:type", t, function (e, t) {
                return "" == e.params.type ? void t.status(400).send("Invalid type") : void d.Permission.findByType(e.params.type, function (e, r) {
                    e ? t.status(500).send("Get group folder permission list " + e) : t.status(201).send(r)
                })
            }), e.get("/folderpermission/:folderId", t, function (e, t) {
                return e.params.folderId.length < 12 ? void t.status(400).send("Invalid folderId") : void o(e.user.dbPath).then(function (n) {
                    n.find().lean().exec(function (n, o) {
                        if (n) t.status(500).send("Get group error " + n);
                        else if (o) {
                            var i = [];
                            o.forEach(function (t) {
                                i.push(s(e.user.dbPath).then(function (r) {
                                    return r.findOne({
                                        folderId: e.params.folderId,
                                        groupId: t._id
                                    }).exec().then(function (e) {
                                        return e && (t.permission = e.permission || []), t
                                    })
                                }))
                            }), r.all(i).then(function (e) {
                                t.status(201).send(e)
                            })
                        } else t.status(404).send("group not found")
                    })
                })
            }), e.get("/folderpermission/:folderId/:groupId", t, function (e, t) {
                return e.params.groupId.length < 12 ? void t.status(400).send("Invalid groupId") : e.params.folderId.length < 12 ? void t.status(400).send("Invalid folderId") : void s(e.user.dbPath).then(function (r) {
                    return r.findOne({
                        folderId: e.params.folderId,
                        groupId: e.params.groupId
                    }).exec(function (e, r) {
                        if (e) t.status(500).send("Get group permission error " + e);
                        else if (r) {
                            if (r) {
                                var n = {
                                    permission: r.permission || []
                                };
                                t.status(201).send(n)
                            }
                        } else t.status(201).send(r)
                    })
                })
            }), e.put("/folderpermission", t, function (e, t) {
                if (null == e.body.groups || 0 == e.body.groups.length) return void t.status(400).send("Invalid group permissions");
                var r = [];
                for (var n in e.body.groups) r.push(n);
                s(e.user.dbPath).then(function (n) {
                    n.update({
                        folderId: {
                            $in: r
                        }
                    }, {
                        $set: {
                            permission: []
                        }
                    }, {
                        multi: !0
                    }, function (r) {
                        if (r) t.status(500).send("Permission update error " + r);
                        else {
                            for (var o in e.body.groups) e.body.groups[o].forEach(function (e) {
                                var r = [];
                                e.permission.forEach(function (e) {
                                    r.push({
                                        permissionId: e._id,
                                        enum: e.enum,
                                        value: !!e.isChecked
                                    })
                                }), r.length > 0 && n.findOneAndUpdate({
                                    groupId: e._id,
                                    folderId: o
                                }, {
                                    groupId: e._id,
                                    folderId: o,
                                    permission: r
                                }, {
                                    new: !0,
                                    upsert: !0
                                }, function (e, r) {
                                    if (e) return void t.status(500).send("Error inserting user" + e)
                                })
                            });
                            t.status(201).send({
                                success: !0
                            })
                        }
                    })
                })
            }), e.put("/folderpermission/:groupId/update", t, function (e, t) {
                if (e.params.groupId.length < 12) return void t.status(400).send("Invalid groupId");
                if (null == e.body.folders || 0 == e.body.folders.length) return void t.status(400).send("Invalid folders body object");
                var n = e.params.groupId,
                    d = e.body.folders,
                    a = [];
                d.forEach(function (e) {
                    a.push(e.folderId)
                }), o(e.user.dbPath).then(function (e) {
                    e.findById(n).exec(function (o, u) {
                        o && t.status(500).send("Error can\'t update group :" + o), u ? u.default === !0 && u.admins === !0 ? t.status(500).send("Invalid Can\'t update admins group") : s(e.db).update({
                            folderId: {
                                $in: a
                            },
                            groupId: n
                        }, {
                            $set: {
                                permission: []
                            }
                        }, {
                            multi: !0
                        }, function (o) {
                            if (o) t.status(500).send("Group permission update " + o);
                            else {
                                var u = [];
                                d.forEach(function (t) {
                                    u.push(s(e.db).findOneAndUpdate({
                                        groupId: n,
                                        folderId: t.folderId
                                    }, {
                                        groupId: n,
                                        folderId: t.folderId,
                                        permission: t.permissions
                                    }, {
                                        new: !0,
                                        upsert: !0
                                    }).exec().then(function (e) {
                                        r.resolve(!0)
                                    }, function (e) {
                                        r.resolve(!0)
                                    }))
                                }), r.all(u).then(function (r) {
                                    i(e.db).ReInit(n, a), t.status(201).send({
                                        success: !0
                                    })
                                }, function (e) {
                                    t.status(500).send("Group permission update " + e)
                                })
                            }
                        }) : t.status(500).send("Group not exist!")
                    })
                })
            })
        }
    }.call(this, cachedModules[8417], cachedModules[8417].exports), cachedModules[437] = {
        exports: {}
    },
    function (e, t) {
        var r = require("q"),
            n = require("lodash"),
            o = cachedModules[4568].exports,
            s = cachedModules[4585].exports,
            i = cachedModules[7746].exports,
            d = cachedModules[3669].exports,
            a = cachedModules[6996].exports,
            u = cachedModules[3174].exports;
        e.exports = function (e) {
            function t(e, t) {
                var n = t.map(function (e) {
                        return e.module.type == s.documentPermission.moduleType.users ? e.module.id.toString() : null
                    }),
                    o = t.map(function (e) {
                        return e.module.type == s.documentPermission.moduleType.groups ? e.module.id.toString() : null
                    }),
                    a = i(e).find({
                        userId: {
                            $in: n
                        }
                    }).exec().then(function (e) {
                        var o = [];
                        return e.forEach(function (e) {
                            var r = n.indexOf(e.userId.toString());
                            if (r != -1) {
                                var s = t[r];
                                s.module.name = e.userName, o.push(s)
                            }
                        }), r.resolve(o)
                    }, function (e) {
                        return r.resolve("")
                    }),
                    u = d(e).find({
                        _id: {
                            $in: o
                        }
                    }).exec().then(function (e) {
                        var n = [];
                        return e.forEach(function (e) {
                            var r = o.indexOf(e._id.toString());
                            if (r != -1) {
                                var s = t[r];
                                s.module.name = e.name, n.push(s)
                            }
                        }), r.resolve(n)
                    }, function (e) {
                        return r.resolve("")
                    });
                return r.all([a, u])
            }
            e.get("/documentpermission/empty", o.requireAuth, function (e, t) {
                a(e.user.dbPath).then(function (e) {
                    e.getEmpty(function (e, r) {
                        return e ? t.status(500).send("Getting empty object err" + e) : void t.status(201).send(r)
                    })
                })
            }), e.get("/documentpermission/:type", o.requireAuth, function (e, t) {
                if ("" == e.params.type) return void t.status(400).send("Invalid type");
                var r = e.params.type;
                u.Permission.findByType(r, function (e, r) {
                    e ? t.status(500).send("Get document permissions list " + e) : t.status(201).send(r)
                })
            }), e.get("/documentpermission/:docType/:docId", o.requireAuth, function (e, r) {
                if (e.params.docId.length < 12) return void r.status(400).send("Invalid objId");
                var o = e.params.docId,
                    s = e.params.docType;
                a(e.user.dbPath).then(function (e) {
                    e.find({
                        "doc.id": o,
                        "doc.type": s
                    }).lean().exec(function (o, s) {
                        o ? r.status(500).send("Get document permissions " + o) : t(e.db, s).then(function (e) {
                            e = e.filter(function (e) {
                                return "" !== e
                            });
                            var t = n.flatten(e);
                            r.status(201).send(t)
                        })
                    })
                })
            }), e.put("/documentpermission/:docType/:docId", o.requireAuth, function (e, t) {
                if (e.params.docId.length < 12) return void t.status(400).send("Invalid docId");
                var r = e.params.docId,
                    n = e.params.docType;
                if (n != s.documentPermission.documentType.report && n != s.documentPermission.documentType.dashboard) return void t.status(400).send("Invalid document type");
                var o = e.body;
                if (!o.module || !o.module.id || o.module.id.length < 12) return void t.status(400).send("Invalid module");
                if (o.module.type != s.documentPermission.moduleType.groups && o.module.type != s.documentPermission.moduleType.users) return void t.status(400).send("Invalid module type");
                if (!o.permissions || o.permissions.length <= 0) return void t.status(400).send("Invalid permission");
                var u = {
                        id: o.module.id,
                        type: o.module.type
                    },
                    c = {
                        id: r,
                        type: n
                    },
                    l = {
                        "doc.id": c.id,
                        "doc.type": c.type,
                        "module.id": u.id,
                        "module.type": u.type
                    };
                a(e.user.dbPath).then(function (e) {
                    switch (u.type) {
                    case s.documentPermission.moduleType.groups:
                        d(e.db).findById(u.id).exec(function (r, n) {
                            r ? t.status(500).send("Document permission update " + r) : n ? f(e) : t.status(400).send("Group not exit")
                        });
                        break;
                    case s.documentPermission.moduleType.users:
                        i(e.db).findOne({
                            userId: u.id
                        }).exec(function (r, n) {
                            r ? t.status(500).send("Document permission update " + r) : n ? f(e) : t.status(400).send("User not exit")
                        });
                        break;
                    default:
                        t.status(400).send("Invalid module")
                    }
                });
                var f = function (e) {
                    e.findOne(l).exec(function (r, n) {
                        if (r) t.status(500).send("Document permission update " + r);
                        else if (n) {
                            var s = o.permissions.map(function (e) {
                                return e.permissionId.toString()
                            });
                            n.permissions.forEach(function (e) {
                                var t = s.indexOf(e.permissionId.toString());
                                t != -1 && (e.value = o.permissions[t].value)
                            }), n.save(function (e, r) {
                                e ? t.status(500).send("Document permission update " + e) : t.status(201).send(r)
                            })
                        } else {
                            var i = new e({
                                doc: c,
                                module: u,
                                permissions: o.permissions
                            });
                            i.save(function (e, r) {
                                e ? t.status(500).send("Document permission update " + e) : t.status(201).send(r)
                            })
                        }
                    })
                }
            }), e.delete("/documentpermission/:docType/:docId", o.requireAuth, function (e, t) {
                if (e.params.docId.length < 12) return void t.status(400).send("Invalid docId");
                var r = e.params.docId,
                    n = e.params.docType;
                if (n != s.documentPermission.documentType.report && n != s.documentPermission.documentType.dashboard) return void t.status(400).send("Invalid document type");
                var o = e.body;
                if (!o.module || !o.module.id || o.module.id.length < 12) return void t.status(400).send("Invalid module");
                if (o.module.type != s.documentPermission.moduleType.groups && o.module.type != s.documentPermission.moduleType.users) return void t.status(400).send("Invalid module type");
                if (!o.permissions || o.permissions.length <= 0) return void t.status(400).send("Invalid permission");
                var u = {
                        id: o.module.id,
                        type: o.module.type
                    },
                    c = {
                        id: r,
                        type: n
                    },
                    l = {
                        "doc.id": c.id,
                        "doc.type": c.type,
                        "module.id": u.id,
                        "module.type": u.type
                    };
                a(e.user.dbPath).then(function (e) {
                    switch (u.type) {
                    case s.documentPermission.moduleType.groups:
                        d(e.db).findById(u.id).exec(function (r, n) {
                            r ? t.status(500).send("Document permission update " + r) : n ? f(e) : t.status(400).send("Group not exit")
                        });
                        break;
                    case s.documentPermission.moduleType.users:
                        i(e.db).findOne({
                            userId: u.id
                        }).exec(function (r, n) {
                            r ? t.status(500).send("Document permission update " + r) : n ? f(e) : t.status(400).send("User not exit")
                        });
                        break;
                    default:
                        t.status(400).send("Invalid module")
                    }
                });
                var f = function (e) {
                    e.findOneAndRemove(l).exec(function (e, r) {
                        e ? t.status(500).send("Document permission remove " + e) : t.status(201).send({
                            success: !0
                        })
                    })
                }
            })
        }
    }.call(this, cachedModules[437], cachedModules[437].exports), cachedModules[1731] = {
        exports: {}
    },
    function (e, t) {
        var r = require("q"),
            n = (require("./lib_external/config"), cachedModules[4585].exports),
            o = cachedModules[4568].exports,
            s = cachedModules[7746].exports,
            i = cachedModules[9018].exports,
            d = cachedModules[1682].exports,
            a = cachedModules[5033].exports.dashboard,
            u = cachedModules[3669].exports,
            c = cachedModules[7777].exports;
        e.exports = function (e) {
            function t(e) {
                return function (t) {
                    e.status(500).send("Connection error: " + t)
                }
            }
            function l(e, t, n, o) {
                var s = r.defer();
                return e.findOne({
                    userId: t,
                    settingType: n
                }).lean().exec().then(function (t) {
                    return t ? s.resolve(t) : void(o ? e.findOne({
                        userId: null,
                        settingType: n
                    }, function (e, t) {
                        return e ? s.reject("Get default settingConfig error: " + e) : void s.resolve(t)
                    }) : s.resolve(null))
                }, function (e) {
                    s.reject("Get user settingConfig error: " + e)
                }), s.promise
            }
            e.get("/userSettings", o.requireAuth, function (e, t) {
                t.status(201).send("Not realized")
            }), e.get("/userSettings/activeStartupSetting", o.requireAuth, function (e, o) {
                var s = e.user._id;
                i(e.user.dbPath).then(function (e) {
                    l(e, s, "startuptype", !0).then(function (t) {
                        function i() {
                            var t = [];
                            u(e.db).find({
                                "userIds.userId": s
                            }).lean().exec(function (e, s) {
                                return e ? o.status(500).send("Error get group startup: " + e) : ((s || []).forEach(function (e) {
                                    var r = !1;
                                    n.startupObjectNames.forEach(function (n) {
                                        !r && e && e.settings && e.settings[n] && e.settings[n].docId && e.settings[n].type && (r = !0, t.push(l(e.settings).then(function (t) {
                                            return e.settings
                                        })))
                                    })
                                }), void r.all(t).then(function (e) {
                                    o.status(201).send({
                                        type: "group",
                                        setting: e
                                    })
                                }, function () {
                                    o.status(500).send("Error get group setting: " + e)
                                }))
                            })
                        }
                        function l(t) {
                            var o = [];
                            return n.startupObjectNames.forEach(function (r) {
                                t && t[r] && null != t[r].docId && null != t[r].type && (t[r].type == n.modulesTypeName.dashboard && o.push(a(e.db).findOne({
                                    _id: t[r].docId
                                }).lean().exec().then(function (e) {
                                    e && (t[r].name = e.dashboardName, t[r].thumbnail = e.thumbnail, t[r].description = e.description)
                                }, function (e) {
                                    return "Get dashboard details error: " + e
                                })), t[r].type == n.modulesTypeName.report && o.push(d(e.db).findOne({
                                    _id: t[r].docId
                                }).lean().exec().then(function (e) {
                                    e && (t[r].name = e.name, t[r].thumbnail = e.thumbnail, t[r].description = e.description)
                                }, function (e) {
                                    return "Get report details error: " + e
                                })))
                            }), r.all(o).then(function (e) {
                                return c.processObject(t), t
                            })
                        }
                        if (!t) return o.status(201).send({});
                        if (t.settingObject.personal) e.findOne({
                            userId: s,
                            settingType: "startup"
                        }).lean().exec(function (e, r) {
                            return e ? o.status(500).send("Error get personal startup setting: " + e) : r && r.settingObject && 0 != Object.keys(r.settingObject).length ? void l(r.settingObject).then(function () {
                                o.status(201).send({
                                    type: "personal",
                                    setting: [r.settingObject]
                                })
                            }, function (e) {
                                o.status(500).send("Error get personal setting: " + e)
                            }) : t.settingObject.group ? i() : o.status(201).send({})
                        });
                        else {
                            if (!t.settingObject.group) return o.status(201).send({});
                            i()
                        }
                    }, function (e) {
                        o.status(500).send("Error get active setting: " + e)
                    })
                }, t(o))
            }), e.get("/userSettings/:settingType/:isDefault?", o.requireAuth, function (e, o) {
                var s = e.user._id,
                    u = {
                        $or: [{
                            userId: s
                        }],
                        settingType: e.params.settingType
                    };
                e.params.isDefault && u.$or.push({
                    userId: null
                }), i(e.user.dbPath).then(function (t) {
                    l(t, s, e.params.settingType, e.params.isDefault).then(function (e) {
                        if (!e) return o.status(201).send(e);
                        if ("startup" === e.settingType) {
                            var s = [];
                            n.startupObjectNames.forEach(function (r) {
                                e.settingObject && e.settingObject[r] && null != e.settingObject[r].docId && null != e.settingObject[r].type && (e.settingObject[r].type == n.modulesTypeName.dashboard && s.push(a(t.db).findOne({
                                    _id: e.settingObject[r].docId
                                }).lean().exec().then(function (t) {
                                    e.settingObject[r].name = t.dashboardName, e.settingObject[r].thumbnail = t.thumbnail, e.settingObject[r].description = t.description
                                }, function (e) {
                                    return "Get dashboard details error: " + e
                                })), e.settingObject[r].type == n.modulesTypeName.report && s.push(d(t.db).findOne({
                                    _id: e.settingObject[r].docId
                                }).lean().exec().then(function (t) {
                                    t && (e.settingObject[r].name = t.name, e.settingObject[r].thumbnail = t.thumbnail, e.settingObject[r].description = t.description)
                                }, function (e) {
                                    return "Get report details error: " + e
                                })))
                            }), r.all(s).then(function () {
                                c.processObject(e.settingObject), o.status(201).send(e)
                            })
                        } else o.status(201).send(e)
                    }, function (e) {
                        return o.status(500).send(e)
                    })
                }, t(o))
            }), e.post("/userSettings", o.requireAuth, function (e, r) {
                var n = e.user._id;
                return e.body.SettingType && e.body.SettingObject ? void i(e.user.dbPath).then(function (t) {
                    var o = new t({
                        userId: e.body.isDefault ? void 0 : n,
                        settingType: e.body.SettingType,
                        settingObject: e.body.SettingObject
                    });
                    o.save(function (e) {
                        return e ? r.status(500).send("Error insert UserSettings: " + e) : void r.status(201).send(o)
                    })
                }, t(r)) : r.status(400).send("Invalid parameters! Setting\'s Type or Object")
            }), e.post("/userSettings/addOrUpdate", o.requireAuth, function (e, r) {
                var n = e.user._id;
                return n ? e.body.SettingType && e.body.SettingObject ? void i(e.user.dbPath).then(function (t) {
                    t.setSetting(n, e.body.SettingType, e.body.SettingObject, function (e, t) {
                        return e ? r.status(500).send("Error insert/update UserSettings: " + e) : void r.status(201).send(t)
                    })
                }, t(r)) : r.status(400).send("Invalid parameters! Setting\'s Type or Object") : r.status(400).send("Invalid parameters! Current user not defined")
            }), e.put("/userSettings/:settingId", o.requireAuth, function (e, r) {
                if (!e.params.settingId || e.params.settingId.length < 12) return r.status(400).send("Invalid settingId! " + e.params.settingId);
                if (!e.body.settingObject) return r.status(400).send("Invalid settingObject parameter!");
                var n = {
                    settingObject: e.body.settingObject
                };
                e.body.settingType && (n.settingType = e.body.settingType), i(e.user.dbPath).then(function (t) {
                    t.findOneAndUpdate({
                        _id: e.params.settingId
                    }, {
                        $set: n
                    }, function (e, t) {
                        return e || !t ? r.status(500).send("Error get setting: " + (e || "Not found")) : void r.status(201).send({
                            success: !0
                        })
                    })
                }, t(r))
            }), e.delete("/userSettings/:settingId", o.requireAuth, function (e, r) {
                return !e.params.settingId || e.params.settingId.length < 12 ? r.status(400).send("Invalid settingId! " + e.params.settingId) : void s(e.user.dbPath).then(function (t) {
                    t.findOneAndRemove({
                        _id: e.params.settingId
                    }, function (e) {
                        e ? r.status(500).send("Error remove User Setting! " + e) : r.status(201).send({
                            success: !0
                        })
                    })
                }, t(r))
            }), e.delete("/userSettings/byType/:settingType", o.requireAuth, function (e, r) {
                null == e.params.settingType && r.status(404).send("Setting type undefined"), i(e.user.dbPath).then(function (t) {
                    t.findOneAndRemove({
                        userId: e.user._id,
                        settingType: e.params.settingType
                    }, function (e) {
                        return e ? r.status(500).send("User setting remove error " + e) : void r.status(201).send({
                            success: !0
                        })
                    })
                }, t(r))
            })
        }
    }.call(this, cachedModules[1731], cachedModules[1731].exports), cachedModules[5410] = {
        exports: {}
    },
    function (e, t) {
        var r = (require("q"), cachedModules[4568].exports),
            n = cachedModules[1284].exports,
            o = cachedModules[7365].exports,
            s = cachedModules[8271].exports,
            i = cachedModules[7958].exports,
            d = i("dataSource");
        e.exports = function (e) {
            var t = [r.requireAuth, s.requireRolePermissions(["202", "205"], !0)];
            e.post("/datasource/preslicer", t, function (e, t) {
                n(e.user.dbPath).then(function (r) {
                    r.findOne({
                        projName: e.body.Name
                    }).remove().exec(function (n, o) {
                        if (n) d.error(e.body.Name + "error"), t.status(500).send("Error recent docs get error FD:" + n);
                        else {
                            d.info(e.body.Name + "found");
                            var s = new r;
                            s.projName = e.body.Name, s.preslicers = e.body.preslicers, s.save(function (e) {
                                return e ? (d.error(e), t.status(500).send("Error saving " + e)) : void t.status(201).send(s)
                            })
                        }
                    })
                })
            }), e.get("/datasource/preslicer/:projName", t, function (e, t) {
                n(e.user.dbPath).then(function (r) {
                    r.find({
                        projName: e.params.projName
                    }).lean().exec(function (e, r) {
                        e ? t.status(500).send("Error recent docs get error FD:" + e) : t.status(201).send(r)
                    })
                })
            }), e.delete("/datasource/preslicer/:presliceName/:projName", t, function (e, t) {
                n(e.user.dbPath).then(function (r) {
                    r.findOneAndUpdate({
                        projName: e.params.projName
                    }, {
                        $pull: {
                            preslicers: {
                                name: e.params.presliceName
                            }
                        }
                    }, function (e, r) {
                        return e ? t.status(500).json({
                            error: "error  deleting "
                        }) : void t.json(r)
                    })
                })
            }), e.post("/datasource/permission", t, function (e, t) {
                o(e.user.dbPath).then(function (r) {
                    r.findOne({
                        projName: e.body.projName,
                        groupId: e.body.groupId
                    }).remove().exec(function (n, o) {
                        if (n) t.status(500).send("Error recent docs get error FD:" + n);
                        else {
                            var s = new r;
                            s.groupId = e.body.groupId, s.projName = e.body.projName, s.trees = e.body.trees, s.save(function (e) {
                                return e ? (d.error(e), t.status(500).send("Error saving: " + e)) : void t.status(201).send(s)
                            })
                        }
                    })
                })
            }), e.delete("/datasource/permission", t, function (e, t) {
                return e.body.projName ? !e.body.groupId || e.body.groupId.length < 12 ? void t.status(400).send("Invalid group Id") : void o(e.user.dbPath).then(function (r) {
                    r.findOne({
                        projName: e.body.projName,
                        groupId: e.body.groupId
                    }).remove().exec(function (e, r) {
                        return e ? t.status(500).send({
                            error: "error  deleting "
                        }) : void t.status(201).send(r)
                    })
                }) : void t.status(400).send("Invalid project name")
            }), e.get("/datasource/permission/:projName", t, function (e, t) {
                o(e.user.dbPath).then(function (r) {
                    r.find({
                        projName: e.params.projName
                    }).lean().exec(function (e, r) {
                        e ? t.status(500).send("Error recent docs get error FD:" + e) : t.status(201).send(r)
                    })
                })
            })
        }
    }.call(this, cachedModules[5410], cachedModules[5410].exports), cachedModules[3045] = {
        exports: {}
    },
    function (e, t) {
        var r = cachedModules[3062].exports;
        e.exports = function (e) {
            e.get("/license/checklicense", function (e, t) {
                r.checkLicenseValidation(e, function (e, r) {
                    return e ? t.status(500).send("Error check License: " + e) : void t.status(201).send(r)
                })
            }), e.get("/license/serverId", function (e, t) {
                r.getServerId(function (e, r) {
                    return e ? t.status(500).send("Error get serverId" + e) : void t.status(201).send(r)
                })
            }), e.post("/license", function (e, t) {
                return e.body.licenseKey ? void r.activateLicense(e, e.body.licenseKey, function (e, r) {
                    e ? t.status(500).send("\"Error updating license. " + e) : t.status(201).send(r)
                }) : t.status(400).send("Invalid licenseKey [" + e.body.licenseKey + "]")
            })
        }
    }.call(this, cachedModules[3045], cachedModules[3045].exports), cachedModules[805] = {
        exports: {}
    },
    function (e, t) {
        var r = cachedModules[4568].exports,
            n = (cachedModules[7746].exports, cachedModules[9087].exports),
            o = cachedModules[2129].exports,
            s = cachedModules[8271].exports;
        e.exports = function (e) {
            var t = [r.requireAuth, s.requireRolePermissions(["200", "201", "202", "203"], !0)];
            e.put("/auditlog/search", t, function (e, t) {
                var r = {},
                    o = -1,
                    s = 500,
                    i = 1;
                if (e.body.page && (i = e.body.page, i < 1 && (i = 1)), e.body.objectName && e.body.objectName.length > 0) try {
                    var d = new RegExp(e.body.objectName, "ig");
                    r.objectName = {
                        $regex: d
                    }
                } catch (r) {
                    return t.status(500).send("Invalid contains pattern:" + e.body.objectName)
                }
                e.body.userId && e.body.userId.length > 0 && (r.userId = {
                    $in: e.body.userId
                }), e.body.objectType && e.body.objectType.length > 0 && (r.objectType = {
                    $in: e.body.objectType
                }), e.body.activityType && e.body.activityType.length > 0 && (r.activityType = {
                    $in: e.body.activityType
                }), e.body.sortLogAsc && (o = 1), e.body.fromDate && (r.activityDate = {
                    $gte: new Date(e.body.fromDate)
                }), e.body.toDate && (r.activityDate ? r.activityDate.$lt = new Date(new Date(e.body.toDate).getTime() + 864e5) : r.activityDate = {
                    $lt: new Date(new Date(e.body.toDate).getTime() + 864e5)
                }), n(e.user.dbPath).then(function (e) {
                    e.find(r).sort({
                        activityDate: o
                    }).skip(s * (i - 1)).limit(s).exec(function (e, r) {
                        return e ? t.status(500).send("Error while getting local audit logs: " + e) : (r = r || [], void t.status(201).send({
                            page: i,
                            data: r,
                            hasMore: r.length == s
                        }))
                    })
                })
            }), e.get("/auditlog/users", t, function (e, t) {
                n(e.user.dbPath).then(function (e) {
                    e.distinct("userId", function (e, r) {
                        return e ? t.status(500).send("Error getting local audit types: " + e) : (r = r || [], void o().then(function (e) {
                            e.find({
                                _id: {
                                    $in: r
                                }
                            }, {
                                userName: 1,
                                firstName: 1,
                                lastName: 1
                            }, function (e, r) {
                                e ? t.status(500).send("Error getting users info: " + e) : t.status(201).send(r || [])
                            })
                        }))
                    })
                })
            }), e.get("/auditlog/activityTypes", t, function (e, t) {
                n(e.user.dbPath).then(function (e) {
                    e.distinct("activityType", function (e, r) {
                        e ? t.status(500).send("Error getting local audit types: " + e) : t.status(201).send(r)
                    })
                })
            }), e.get("/auditlog/objectTypes", t, function (e, t) {
                n(e.user.dbPath).then(function (e) {
                    e.distinct("objectType", function (e, r) {
                        e ? t.status(500).send("Error getting object types: " + e) : t.status(201).send(r)
                    })
                })
            })
        }
    }.call(this, cachedModules[805], cachedModules[805].exports), cachedModules[1789] = {
        exports: {}
    },
    function (e, t) {
        function r(e) {
            var t = n.Schema({
                description: {
                    type: String
                },
                title: {
                    type: String
                },
                thumbnail: {
                    type: String
                },
                documents: [],
                dataSources: [],
                createdUserId: {
                    type: i.Types.ObjectId
                },
                createdDate: {
                    type: Date,
                    default: Date.now
                },
                version: {
                    type: String
                },
                status: {
                    type: String
                },
                tmpHashKey: {
                    type: String
                },
                tmpData: i.Types.Mixed
            }, {
                read: s.mongoose.replSetRead || "nearest"
            });
            t.statics.newObjectId = function () {
                return n.Types.ObjectId()
            };
            e.model("contentPack", t)
        }
        var n = (require("q"), require("mongoose")),
            o = cachedModules[4524].exports,
            s = require("./lib_external/config"),
            i = n.Schema;
        e.exports = o.registerModel("contentPack", r)
    }.call(this, cachedModules[1789], cachedModules[1789].exports), cachedModules[1761] = {
        exports: {}
    },
    function (t, r) {
        var n = require("request"),
            o = require("q"),
            s = require("fs"),
            i = require("path"),
            d = require("stream").Writable,
            a = require("node-zip"),
            u = require("fast-crc32c"),
            c = require("connect-multiparty"),
            l = c(),
            f = require("./lib_external/config"),
            p = cachedModules[8471].exports,
            h = cachedModules[4568].exports,
            m = cachedModules[1789].exports,
            b = cachedModules[8271].exports,
            v = cachedModules[5033].exports,
            g = cachedModules[4991].exports,
            I = cachedModules[1682].exports,
            y = cachedModules[7958].exports,
            x = y("contentPack");
        t.exports = function (t) {
            function r(e, t, r, o) {
                try {
                    var s = n.defaults({
                            jar: !0
                        }),
                        i = {
                            uri: (f.server.https.enabled ? "https" : "http") + "://" + e.headers.host + t,
                            method: r.method,
                            encoding: null,
                            headers: {
                                "x-auth-token": e.get("x-auth-token"),
                                referer: e.get("Referrer")
                            },
                            followRedirect: !1
                        };
                    f.server.https.enabled && (i.strictSSL = !1);
                    var a, c = !1,
                        l = [],
                        p = new d;
                    p._write = function (e, t, r) {
                        l.push(Buffer.from(e)), r()
                    }, p.on("finish", function () {
                        if (c) return o(Buffer.concat(l));
                        var e = u.calculate(Buffer.concat(l)).toString(16).toLowerCase();
                        if (a) {
                            if (a != e) return x.info("calculated crc32c", e, "received from response", a), o("Invalid checkSum of received file: origin[" + a + "] calc[" + e + "]")
                        } else x.warn("No checksum in response to check that Data Source is received correctly! Please update version of QP to avoid this message!");
                        o(null, Buffer.concat(l))
                    }), p.on("error", function (e) {
                        o(e)
                    }), s(i).on("response", function (e) {
                        e && e.statusCode && 2 == e.statusCode.toString()[0] || (c = !0), a = e && e.headers.crc32c ? e.headers.crc32c.toLowerCase() : ""
                    }).on("error", function (e) {
                        x.error("request error", e), o(e)
                    }).pipe(p)
                } catch (e) {
                    x.error("ERROR: make download request ", e.stack), o(e)
                }
            }
            function c(e, t, r, o, s) {
                var i = (n.defaults({
                        jar: !0
                    }), {
                        siteId: r.siteId.toString(),
                        doNotReplace: (!!r.notReplaceProjects).toString(),
                        file: {
                            value: Buffer.from(o, "binary"),
                            options: {
                                filename: r.fileName,
                                contentType: "bvp"
                            }
                        }
                    }),
                    d = {
                        url: (f.server.https.enabled ? "https" : "http") + "://" + e.headers.host + t,
                        formData: i,
                        headers: {
                            "x-auth-token": e.get("x-auth-token")
                        }
                    };
                f.server.https.enabled && (d.strictSSL = !1), n.post(d, function (e, t, n) {
                    return e ? s("Upload project [" + r.fileName + "] error: " + JSON.stringify(e)) : t && t.statusCode && 2 == t.statusCode.toString()[0] ? void s(null, n) : s("Upload project [" + r.fileName + "] failed: Status:" + (t && t.statusCode ? t.statusCode : "No response") + "; Body: " + n)
                })
            }
            function y(e, t) {
                var r = [],
                    n = e.map(function (e) {
                        return e.id
                    });
                return t.forEach(function (e) {
                    n.indexOf(e.id) == -1 && r.push(e)
                }), r
            }
            function M(e, t, r, n, s) {
                var i = o.defer();
                switch (0 == y(r, [t]).length && i.resolve(), x.info("processing", t), t.type) {
                case "dashboard":
                    v.dashboard(e).then(function (s) {
                        s.findOne({
                            _id: t.id
                        }).exec(function (d, a) {
                            if (d) i.reject("Cannot get dashboard [" + t.id + "]. " + d);
                            else {
                                if (!a) return x.warn("Dashboard [" + t.id + "] is not found"), void i.resolve();
                                v.tabs(s.db).find({
                                    dashboardId: a._id
                                }).exec(function (d, u) {
                                    if (d || !u) i.reject("Cannot get tabs in dashboard. " + (d || "No tabs"));
                                    else {
                                        var c = u.map(function (e) {
                                            return e._id.toString()
                                        });
                                        v.controls(s.db).find({
                                            tabId: {
                                                $in: c
                                            }
                                        }).exec(function (s, d) {
                                            if (s) i.reject("Error while get dashboard controls");
                                            else {
                                                var c = {
                                                    id: a._id.toString(),
                                                    dashboard: a,
                                                    tabs: u,
                                                    controls: d,
                                                    type: t.type
                                                };
                                                r.push(c), c.controls && c.controls.length > 0 ? P(c.type, c.controls, function (t, s) {
                                                    var d = y(r, t),
                                                        a = [];
                                                    s.forEach(function (e) {
                                                        S(n, e)
                                                    }), d.length > 0 ? (d.forEach(function (t) {
                                                        a.push(M(e, t, r, n))
                                                    }), o.all(a).then(function () {
                                                        i.resolve()
                                                    }, function (e) {
                                                        i.resolve(e)
                                                    })) : i.resolve()
                                                }) : i.resolve()
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    });
                    break;
                case "report":
                case "reportbuilder":
                    I(e).then(function (s) {
                        s.findOne({
                            _id: t.id
                        }).exec(function (s, d) {
                            if (s) i.reject("Find report error: " + s);
                            else {
                                if (!d) return x.warn("Report [" + t.id + "] is not found"), void i.resolve();
                                var a = {
                                    id: d._id.toString(),
                                    report: d,
                                    type: t.type
                                };
                                r.push(a), P(a.type, a.report, function (t, s) {
                                    var d = y(r, t),
                                        a = [];
                                    s.forEach(function (e) {
                                        S(n, e)
                                    }), d.length > 0 ? (d.forEach(function (t) {
                                        a.push(M(e, t, r, n))
                                    }), o.all(a).then(function () {
                                        i.resolve()
                                    }, function (e) {
                                        i.reject(e)
                                    })) : i.resolve()
                                })
                            }
                        })
                    });
                    break;
                default:
                    i.reject("Invalid doc type")
                }
                return i.promise
            }
            function S(e, t) {
                e.indexOf(t) == -1 && e.push(t)
            }
            function P(e, t, r) {
                function n(e, t) {
                    var r = e.map(function (e) {
                        return e.id
                    });
                    r.indexOf(t.id) == -1 && e.push(t)
                }
                var o = [],
                    s = [];
                switch (e) {
                case "dashboard":
                    t.forEach(function (e) {
                        e.controlObject && e.controlObject.settings && e.controlObject.settings && (e.controlObject.settings.Data && e.controlObject.settings.Data.value && e.controlObject.settings.Data.value.selectedProject && e.controlObject.settings.Data.value.selectedProject.Id && S(s, e.controlObject.settings.Data.value.selectedProject.Id), e.controlObject.settings.Drill && e.controlObject.settings.Drill.value && e.controlObject.settings.Drill.value.forEach(function (e) {
                            ("Dashboard" == e.drillType || "Report" == e.drillType) && e.drillObjects.length > 0 && e.drillObjects.forEach(function (t) {
                                t && t.id && n(o, {
                                    type: e.drillType.toLowerCase(),
                                    id: t.id.toString()
                                })
                            }), "Filter" == e.drillType && e.configurable && e.drillObjects.length > 0 && e.drillObjects[0].value && e.drillObjects[0].value.selectedProject && e.drillObjects[0].value.selectedProject.Id && S(s, e.drillObjects[0].value.selectedProject.Id)
                        }), e.controlObject.settings.FilterProvider && e.controlObject.settings.FilterProvider.value && e.controlObject.settings.FilterProvider.value.selectedProject && e.controlObject.settings.FilterProvider.value.selectedProject.Id && S(s, e.controlObject.settings.FilterProvider.value.selectedProject.Id), e.controlObject.settings.General && e.controlObject.settings.General.report && e.controlObject.settings.General.report.query && e.controlObject.settings.General.report.query.dataSourceInfo && e.controlObject.settings.General.report.query.dataSourceInfo.Id && S(s, e.controlObject.settings.General.report.query.dataSourceInfo.Id), e.controlObject.settings.General && e.controlObject.settings.General.reportId && n(o, {
                            type: "report",
                            id: e.controlObject.settings.General.reportId.toString()
                        }))
                    });
                    break;
                case "report":
                case "reportbuilder":
                    t.definition && t.definition.query && t.definition.query.dataSourceInfo && t.definition.query.dataSourceInfo.Id && S(s, t.definition.query.dataSourceInfo.Id), t.definition && t.definition.visualisation && t.definition.visualisation.visSetting && t.definition.visualisation.visSetting.drillConfig && t.definition.visualisation.visSetting.drillConfig.forEach(function (e) {
                        ("Dashboard" == e.drillType || "Report" == e.drillType) && e.drillObjects.length > 0 && e.drillObjects.forEach(function (t) {
                            t && t.id && n(o, {
                                type: e.drillType.toLowerCase(),
                                id: t.id.toString()
                            })
                        })
                    })
                }
                r(o, s)
            }
            function N(e, t) {
                var r = e;
                return t.forEach(function (e) {
                    r = r.replace(new RegExp(e.oldId, "ig"), e.newId)
                }), r
            }
            var w = [h.requireAuth, b.requireRolePermissions(["200", "201", "202", "205"], !0)],
                q = [],
                _ = f.rootDir + "/server/contentPacks/";
            t.put("/contentPack/search", w, function (e, t) {
                m(e.user.dbPath).then(function (e) {
                    e.find({
                        $or: [{
                            tmpHashKey: {
                                $exists: !1
                            }
                        }, {
                            tmpHashKey: ""
                        }]
                    }).exec(function (e, r) {
                        return e ? t.status(500).send("Error while getting content packs: " + e) : (r = r || [], void t.status(201).send(r))
                    })
                })
            }), t.get("/contentPack/version", w, function (e, t) {
                t.status(201).send(f.version)
            }), t.get("/contentPack/download/:dKey", function (e, t) {
                var r = q.map(function (e) {
                    return e.key
                }).indexOf(e.params.dKey);
                if (!e.params.dKey || e.params.dKey.length < 30 || r == -1) return t.status("401").send("Invalid download Key");
                var n = q[r].name + ".zip",
                    o = f.rootDir + "/server/contentPacks/" + q[r].id + ".zip";
                return s.existsSync(o) ? (q.splice(r, 1), t.set({
                    "Content-Disposition": "attachment; filename=\"" + encodeURI(n) + "\""
                }), void t.sendFile(o)) : t.status(500).send("ContentPack file not found!")
            }), t.post("/contentPack", w, function (e, t) {
                if (!e.body.documents || 0 == e.body.documents.length) return t.status(400).send("No documents in content pack");
                if (!e.body.version) return t.status(400).send("Invalid version in content Pack");
                s.existsSync(i.resolve(_)) || s.mkdir(i.resolve(_));
                var n = a(),
                    d = a(),
                    u = [],
                    c = [],
                    l = [],
                    h = [],
                    b = [];
                e.body.documents.forEach(function (t) {
                    o.defer();
                    c.push(M(e.user.dbPath, t, l, h))
                }), o.all(c).then(function (t) {
                    return t && t.length > 0 && x.warn("dashboard warnings", t.join(", ")), l.forEach(function (e) {
                        var t = JSON.stringify(e).replace(/[\u007F-\uFFFF]/g, function (e) {
                            return String.fromCharCode(92) + "u" + ("0000" + e.charCodeAt(0).toString(16)).substr(-4)
                        });
                        n.file("documents/" + e.id, t)
                    }), x.info("allProjects", h), h.forEach(function (t) {
                        var s = o.defer(),
                            i = "/publisher/download/" + e.user.siteId + "/" + encodeURI(t);
                        r(e, i, {
                            method: "GET"
                        }, function (r, o) {
                            if (r || !o) {
                                var i = "Download project [" + encodeURI(t) + "] failed!" + (r || "Invalid/empty response from QP!");
                                e.body.skipInvalidProjects ? (b.push("Skipped: " + i), s.resolve()) : s.reject(i)
                            } else n.file("dataSources/" + t, Buffer.from(o, "binary")), s.resolve()
                        }), u.push(s.promise)
                    }), o.all(u)
                }).then(function () {
                    var r = {
                        version: f.version,
                        title: e.body.title,
                        description: e.body.description
                    };
                    n.file("info", Buffer.from(JSON.stringify(r)));
                    var o = p.encrypt(Buffer.from(n.generate({
                        base64: !1,
                        compression: "DEFLATE"
                    }), "binary"), f.version);
                    if (d.file("data", o), d.file("info.txt", Buffer.from(JSON.stringify(r))), e.body.thumbnail) {
                        var i = e.body.thumbnail.match(/^data:image\/(png|jpg|jpeg|tiff|gif)/);
                        i && (i = i[0].substr(11)), d.file("thumbnail." + i, Buffer.from(e.body.thumbnail.replace(/^data:image\/(png|jpg|jpeg|tiff|gif);base64/gi, ""), "base64"))
                    }
                    d.file("metaData.txt", e.body.documents.map(function (e) {
                        return e.name
                    }).join(",") + String.fromCharCode(13) + e.body.documents.map(function (e) {
                        return e.name
                    }).join(",")), m(e.user.dbPath).then(function (r) {
                        var n = new r({
                            title: e.body.title || "No title",
                            description: e.body.description || "",
                            thumbnail: e.body.thumbnail || "",
                            documents: e.body.documents || [],
                            dataSources: e.body.dataSources || [],
                            createdUserId: e.user._id,
                            status: "Created",
                            version: e.body.version
                        });
                        n.save(function (e, r) {
                            if (e) return t.status(500).send("Error while save content pack: " + e);
                            var n = _ + r._id.toString() + ".zip";
                            s.writeFile(n, d.generate({
                                base64: !1,
                                compression: "DEFLATE"
                            }), "binary", function () {}), t.status(201).send(b.join(String.fromCharCode(13)))
                        })
                    })
                }, function (e) {
                    return t.status(500).send("Error while create content Pack: " + e)
                })
            }), t.put("/contentPack/import", w, function (e, t) {
                if (!e.body.folderInfo.folderId) return t.status(400).send("No folder information presented");
                var r = p.getRandomSequence(32, "hex"),
                    n = {
                        parentFolderId: e.body.folderInfo.folderId,
                        overwriteData: !!e.body.overwriteData,
                        createFolder: e.body.createFolder || !1,
                        newFolderName: e.body.folderInfo.objectName,
                        skipInvalidProjects: !!e.body.skipInvalidProjects,
                        notReplaceProjects: !!e.body.notReplaceProjects
                    };
                m(e.user.dbPath).then(function (e) {
                    var o = new e({
                        tmpHashKey: r,
                        tmpData: n
                    });
                    o.save(function (e, n) {
                        e ? t.status(500).send("ContentPack create error! " + e) : t.status(201).send({
                            success: !0,
                            key: r
                        })
                    })
                })
            }), t.post("/contentPack/upload/:cpHash", w, l, function (t, r) {
                function n(e, t) {
                    var r = o.defer();
                    return t.createFolder ? g(e.user.dbPath).then(function (n) {
                        n.findOne({
                            _id: t.parentFolderId
                        }, function (o, s) {
                            o ? r.reject("Can\'t get root folder information!" + o) : s ? n.findOne({
                                rootFolderId: t.parentFolderId,
                                name: t.newFolderName
                            }, function (o, i) {
                                if (o && r.reject("Can\'t get folder information!" + o), i) t.newFolderId = i._id, r.resolve();
                                else {
                                    var d = new n({
                                        nodeType: "folder",
                                        rootFolderId: t.parentFolderId,
                                        name: t.newFolderName,
                                        metaData: e.body.metaData,
                                        isPersonal: s.isPersonal,
                                        createdDate: new Date,
                                        createdUser: e.user.userId,
                                        description: t.description || ""
                                    });
                                    d.save(function (e, n) {
                                        return e ? r.reject("Unable to save new folder" + o) : (t.newFolderId = n._id, void r.resolve())
                                    })
                                }
                            }) : r.reject("Invalid parent folder!" + o)
                        })
                    }) : (t.newFolderId = t.parentFolderId, r.resolve()), r.promise
                }
                function i(e, t, r, n) {
                    if (t.overwriteData) {
                        var s = [];
                        return s.push(v.dashboard(e.user.dbPath).then(function (e) {
                            return e.remove({
                                folderId: t.newFolderId,
                                dashboardName: {
                                    $in: r
                                }
                            }).exec()
                        })), s.push(I(e.user.dbPath).then(function (e) {
                            return e.remove({
                                folderId: t.newFolderId,
                                name: {
                                    $in: n
                                }
                            }).exec()
                        })), o.all(s)
                    }
                    return o.resolve()
                }
                if (!t.params.cpHash) return r.status(400).send("Invalid cp key " + t.params.cpHash);
                var d = [];
                m(t.user.dbPath).then(function (u) {
                    u.findOne({
                        tmpHashKey: t.params.cpHash
                    }).exec(function (l, h) {
                        if (l || !h) return r.status(500).send("Error get content pack: " + l);
                        var m = h.tmpData;
                        x.info("iInfo", m);
                        var b = s.createReadStream(t.files.file.path),
                            g = [];
                        b.on("data", function (e) {
                            g.push(e)
                        }), b.on("end", function () {
                            try {
                                var s = new a(Buffer.concat(g), {
                                    base64: !1,
                                    checkCRC32: !0
                                });
                                if (!s.files.data) return r.status("500").send("Invalid Archive file: No data");
                                try {
                                    var l = p.decrypt(Buffer.from(s.files.data._data, "binary"), f.version),
                                        b = new a(l, {
                                            base64: !1,
                                            checkCRC32: !0
                                        });
                                    try {
                                        if (!b.files.info) return r.status("500").send("Invalid Archive file: No meta information!");
                                        var y = JSON.parse(b.files.info._data);
                                        if (y.version != f.version) return r.status("500").send("Versions mismatch: source:" + y.version + " destination: " + f.version)
                                    } catch (e) {
                                        return r.status("500").send("Invalid Archive file: Invalid meta information!")
                                    }
                                } catch (t) {
                                    return r.status(400).send("Invalid file content or not applicable: " + (e.message || e))
                                }
                                var M = [],
                                    S = [];
                                Object.keys(b.files).forEach(function (e) {
                                    e.indexOf("dataSources") != -1 && M.push(e), e.indexOf("documents") != -1 && S.push(e)
                                });
                                var P = [];
                                M.forEach(function (e) {
                                    var r = o.defer(),
                                        n = "/publisher/upload";
                                    c(t, n, {
                                        siteId: t.user.siteId,
                                        fileName: e.replace("dataSources/", ""),
                                        notReplaceProjects: m.notReplaceProjects
                                    }, b.files[e]._data, function (e, t) {
                                        e ? m.skipInvalidProjects ? (d.push("Skipped: " + e), r.resolve()) : r.reject(e) : r.resolve()
                                    }), P.push(r.promise)
                                }), o.all(P).then(function () {
                                    n(t, m).then(function () {
                                        var e = [],
                                            n = [],
                                            s = [];
                                        S.forEach(function (t) {
                                            var r = JSON.parse(b.files[t]._data);
                                            switch (r.type) {
                                            case "dashboard":
                                                n.push(r.dashboard.dashboardName), e.push({
                                                    oldId: r.dashboard._id.toString(),
                                                    newId: u.newObjectId()
                                                }), r.tabs.forEach(function (t) {
                                                    e.push({
                                                        oldId: t._id.toString(),
                                                        newId: u.newObjectId()
                                                    })
                                                }), r.controls.forEach(function (t) {
                                                    e.push({
                                                        oldId: t._id.toString(),
                                                        newId: u.newObjectId()
                                                    })
                                                });
                                                break;
                                            case "report":
                                            case "reportbuilder":
                                                s.push(r.report.name), e.push({
                                                    oldId: r.report._id.toString(),
                                                    newId: u.newObjectId()
                                                })
                                            }
                                        }), i(t, m, n, s).then(function (n) {
                                            var s = [];
                                            S.forEach(function (r) {
                                                var n = o.defer(),
                                                    i = b.files[r]._data;
                                                i = N(i, e);
                                                var d = JSON.parse(i);
                                                switch (d.type) {
                                                case "dashboard":
                                                    v.dashboard(t.user.dbPath).then(function (e) {
                                                        d.dashboard.folderId = m.newFolderId;
                                                        var t = d.dashboard._id;
                                                        delete d.dashboard._id, delete d.dashboard.__v, e.findOneAndUpdate({
                                                            _id: t
                                                        }, d.dashboard, {
                                                            upsert: !0,
                                                            new: !0
                                                        }).exec(function (t, r) {
                                                            t ? (x.error(t), n.reject("Cannot upload dashboard" + t)) : d.tabs.forEach(function (t) {
                                                                var r = t._id;
                                                                delete t._id, delete t.__v, v.tabs(e.db).findOneAndUpdate({
                                                                    _id: r
                                                                }, t, {
                                                                    upsert: !0,
                                                                    new: !0
                                                                }).exec(function (t, r) {
                                                                    if (t || !r) n.reject("Cannot upload tab to dashboard!" + t);
                                                                    else {
                                                                        var s = [];
                                                                        d.controls.forEach(function (t) {
                                                                            var r = t._id;
                                                                            delete t._id, delete t.__v, r && s.push(v.controls(e.db).findOneAndUpdate({
                                                                                _id: r
                                                                            }, t, {
                                                                                upsert: !0,
                                                                                new: !0
                                                                            }).exec())
                                                                        }), o.all(s).then(function () {
                                                                            n.resolve()
                                                                        }, function (e) {
                                                                            n.reject(e)
                                                                        })
                                                                    }
                                                                })
                                                            })
                                                        })
                                                    });
                                                    break;
                                                case "report":
                                                case "reportbuilder":
                                                    I(t.user.dbPath).then(function (e) {
                                                        d.report.folderId = m.newFolderId;
                                                        var t = d.report._id;
                                                        delete d.report._id, delete d.report.__v, e.findOneAndUpdate({
                                                            _id: t
                                                        }, d.report, {
                                                            upsert: !0,
                                                            new: !0
                                                        }).exec().then(function () {
                                                            n.resolve()
                                                        }, function (e) {
                                                            n.reject(e)
                                                        })
                                                    });
                                                    break;
                                                default:
                                                    x.warn("Cannot process document with type ", d.type)
                                                }
                                                s.push(n.promise)
                                            }), o.all(s).then(function () {
                                                x.info("Upload done"), h.title = t.files.file.name || "No title", h.description = t.body.description || "", h.thumbnail = "No description", h.documents = S.map(function (e) {
                                                    return e
                                                }), h.dataSources = M.map(function (e) {
                                                    return e
                                                }), h.status = "Imported", h.tmpHashKey = null, h.save(function (e, t) {
                                                    e ? r.status(500).send("Unable update content Pack") : (d.push("Done"), r.status(201).send(d.join(String.fromCharCode(13))))
                                                })
                                            }, function (e) {
                                                x.error("Upload error", e), r.status(500).send(e)
                                            })
                                        }, function (e) {
                                            x.error("Clear Documents error", e), r.status(500).send("Clear Documents error: " + e)
                                        })
                                    }, function (e) {
                                        x.error("Create Folder error", e), r.status(500).send("Create/check folder error: " + e)
                                    })
                                }, function (e) {
                                    x.error("Publish dataSources error", e), r.status(500).send("Publish dataSource(s) error: " + e)
                                })
                            } catch (e) {
                                r.status(500).send("Exec error: " + e)
                            }
                        }), b.on("error", function (e) {
                            x.error(e)
                        })
                    })
                })
            }), t.put("/contentPack/downloadURL/:cpId", w, function (e, t) {
                return e.params.cpId.length < 12 ? t.status(400).send("Invalid content Pack Id" + e.params.cpId) : void m(e.user.dbPath).then(function (r) {
                    r.findOne({
                        _id: e.params.cpId
                    }).exec(function (r, n) {
                        if (r) return t.status(500).send("ContentPack find error! " + r);
                        if (!n) return t.status(500).send("Content Pack not found!");
                        var o = f.rootDir + "/server/contentPacks/" + n._id.toString() + ".zip";
                        if (s.existsSync(o)) {
                            var i = p.getRandomSequence(32, "hex");
                            q.push({
                                key: i,
                                name: n.title,
                                id: n._id.toString()
                            }), t.status("201").send((f.server.https.enabled ? "https://" : "http://") + e.headers.host + "/contentPack/download/" + i)
                        } else t.status(500).send("ContentPack file not found!")
                    })
                })
            }), t.delete("/contentPack/:cpId", w, function (e, t) {
                return e.params.cpId.length < 12 ? t.status(400).send("Invalid content Pack Id" + e.params.cpId) : void m(e.user.dbPath).then(function (r) {
                    r.findOne({
                        _id: e.params.cpId
                    }).exec(function (n, o) {
                        return n ? t.status(500).send("ContentPack find error! " + n) : void r.remove({
                            _id: e.params.cpId
                        }, function (e, r) {
                            if (e) t.status(500).send("ContentPack remove error! " + e);
                            else {
                                var n = f.rootDir + "/server/contentPacks/" + o._id.toString() + ".zip";
                                s.existsSync(n) && s.unlink(n, function () {}), t.status(201).send({
                                    deletedCount: r.ok
                                })
                            }
                        })
                    })
                })
            })
        }
    }.call(this, cachedModules[1761], cachedModules[1761].exports), cachedModules[2965] = {
        exports: {}
    },
    function (e, t) {
        function r(e, t) {
            if (t = t || function (e, t) {
                    e && console.err(e)
                }, e.from = e.from || o.smtp.sendFrom, !e.from) return t("No sender <from> field");
            if (!e.to) return t("No recipient <to> field");
            var r = n.server.connect(o.smtp);
            r.send(e, t)
        }
        var n = require("emailjs"),
            o = require("./lib_external/config");
        e.exports = {
            sendMail: r
        }
    }.call(this, cachedModules[2965], cachedModules[2965].exports), cachedModules[873] = {
        exports: {}
    },
    function (e, t) {
        function r(e) {
            var t = n.Schema({
                title: {
                    type: String
                },
                description: {
                    type: String
                },
                cronExpression: {
                    type: String
                },
                documents: [],
                receivers: [],
                createdUserId: {
                    type: i.Types.ObjectId
                },
                createdDate: {
                    type: Date,
                    default: Date.now
                },
                status: {
                    type: String
                },
                taskId: {
                    type: String
                }
            }, {
                read: s.mongoose.replSetRead || "nearest"
            });
            e.model("contentBurst", t)
        }
        var n = require("mongoose"),
            o = cachedModules[4524].exports,
            s = require("./lib_external/config"),
            i = n.Schema;
        e.exports = o.registerModel("contentBurst", r)
    }.call(this, cachedModules[873], cachedModules[873].exports), cachedModules[9136] = {
        exports: {}
    },
    function (e, t) {
        function r(e, t, r, n) {
            n = n || function () {};
            var o = d.defaults({
                jar: !0
            });
            r.category = "contentBurst", r.runUrl = (l.server.https.enabled ? "https" : "http") + "://" + e.headers.host + "/contentBurst/run";
            var s = {
                method: t.method,
                headers: {
                    "x-auth-token": e.headers["x-auth-token"]
                },
                uri: (l.taskController.protocol || (l.server.https.enabled ? "https" : "http")) + "://" + l.taskController.host + ":" + (l.taskController.port || l.server.port) + "/taskController/tasks/" + t.action,
                json: !0,
                body: r
            };
            l.server.https.enabled && (s.strictSSL = !1), o(s, function (e, t, r) {
                return e ? n(JSON.stringify(e)) : t && t.statusCode && 2 == t.statusCode.toString()[0] ? void n(null, r) : n("Invalid response " + (t ? t.statusCode : "No response") + r)
            })
        }
        function n(e, t) {
            function r(e) {
                var r = new Date,
                    n = {
                        expiration: r.setTime(r.getTime() + 36e5),
                        userId: e.userId,
                        userName: e.userName,
                        siteId: t,
                        sessionId: e.sessionId
                    };
                return m.createToken(n)
            }
            function n(e) {
                var t = m.decodeToken(e.token);
                if (!t) return !0;
                if (e.userId != t.userId) return !0;
                if (e.sessionId != t.sessionId) return !0;
                var r = (new Date(t.expiration).getTime() - (new Date).getTime()) / 1e3;
                return r < 0 && -r > l.server.auth.expLifeTime
            }
            var o = i.defer(),
                s = l.mongoose.connPrefix + "/" + t.toString();
            return b(s).then(function (t) {
                t.findOne({
                    userId: e
                }, function (t, s) {
                    if (t || !s) return o.reject("Error get user info! " + (t || "User not found"));
                    if (s.sessionId && s.token && !n(s)) {
                        var i = r(s);
                        o.resolve(i)
                    } else v.Users().then(function (t) {
                        t.findOne({
                            _id: e
                        }, function (e, t) {
                            if (e || !t) return o.reject("Error get master user info! " + (e || "User not found"));
                            s.sessionId = u.getRandomSequence(32);
                            var n = r(s);
                            s.token = n, t.sessionId = s.sessionId, t.token = n, t.save(function (e) {
                                return e ? o.reject("Error update master user session! " + e) : void s.save(function (e, t) {
                                    return e ? o.reject("Error update user session! " + e) : void o.resolve(n)
                                })
                            }, function (e) {
                                o.reject("Error save master user info" + e)
                            })
                        })
                    }, function (e) {
                        o.reject("maserUser connect error:" + e)
                    })
                })
            }), o.promise
        }
        function o(e) {
            var t = i.defer(),
                r = e.map(function (e) {
                    return e.userId
                });
            return v.Users().then(function (e) {
                e.find({
                    _id: {
                        $in: r
                    },
                    email: {
                        $exists: !0,
                        $ne: ""
                    }
                }, function (e, r) {
                    if (e || !r) return t.reject("Error get receiver users info! " + (e || "Users are not found"));
                    var n = [];
                    (r || []).forEach(function (e) {
                        e.email && n.push({
                            email: e.email
                        })
                    }), t.resolve(n)
                })
            }, function (e) {
                t.reject("Connection error:" + e)
            }), t.promise
        }
        function s(e, t, r) {
            var n = i.defer();
            return setTimeout(function () {
                var o = e.evaluateJavaScript("function(){ return window.totalPendingRequests;}");
                t += 3e4, o.then(function (o) {
                    o < 1 || t > r ? n.resolve(o) : s(e, t).finally(function () {
                        n.resolve()
                    })
                }, function (e) {
                    n.resolve(e)
                })
            }, 3e4), n.promise
        }
        var i = require("q"),
            d = require("request"),
            a = require("phantom"),
            u = cachedModules[8471].exports,
            c = cachedModules[2965].exports,
            l = require("./lib_external/config"),
            f = cachedModules[4568].exports,
            p = cachedModules[8271].exports,
            h = (cachedModules[873].exports, cachedModules[5033].exports),
            m = cachedModules[2049].exports,
            b = cachedModules[7746].exports,
            v = cachedModules[3760].exports,
            g = cachedModules[7958].exports,
            I = g(),
            y = 0;
        e.exports = function (e) {
            var t = [f.requireAuth, p.requireRolePermissions(["200", "201", "202", "205"], !0)];
            e.get("/contentBurst", t, function (e, t) {
                r(e, {
                    method: "post",
                    action: "search"
                }, {
                    searchObject: {
                        category: "contentBurst",
                        "metaData.siteId": e.user.siteId
                    }
                }, function (e, r) {
                    return e ? t.status(500).send("Error get content bursts: " + e) : void t.status(201).send(r)
                })
            }), e.post("/contentBurst/run", function (e, t) {
                var r = e.body.metaData.documents || [],
                    d = e.body.metaData.siteId,
                    u = [],
                    f = e.body.metaData.format || "PNG",
                    p = {
                        width: 800,
                        height: 600
                    };
                if (!e.body.metaData.receivers) return t.status(400).send("No receivers");
                if (!d) return t.status(400).send("No siteId");
                if (!e.body.metaData.userId) return t.status(400).send("No user information");
                e.body.metaData.size && (p.width = e.body.metaData.size.width || p.width, p.height = e.body.metaData.size.height || p.height);
                try {
                    o(e.body.metaData.receivers).then(function (o) {
                        if (0 == o.length) {
                            var m = "No valid receivers to send CB. Aborting";
                            return I.warn(m), t.status(200).send(m)
                        }
                        n(e.body.metaData.userId, d).then(function (n) {
                            a.create().then(function (a) {
                                return r.forEach(function (t) {
                                    t.type = t.type.replace("reportbuilder", "report"), y++, t.viewSize = {
                                        width: p.width,
                                        height: p.height
                                    };
                                    var r = i();
                                    if (e.body.metaData.tryAutoSize && "dashboard" == t.type) {
                                        var o = l.mongoose.connPrefix + "/" + d.toString();
                                        r = h.dashboard(o).then(function (e) {
                                            return e.findOne({
                                                _id: t.id
                                            }).exec().then(function (e) {
                                                t.viewSize.width = e.settings.originalSize.width || p.width, t.viewSize.heigth = e.settings.originalSize.heigth || p.heigth
                                            })
                                        })
                                    }
                                    u.push(r.then(function () {
                                        var r = (l.server.https.enabled ? "https" : "http") + "://" + e.headers.host + "/apps/" + t.type + "/index.html?siteId=" + d + "&objectId=" + t.id + "&action=open&hideToolbar=1&accessToken=" + n;
                                        return a.createPage().then(function (e) {
                                            return e.property("viewportSize", t.viewSize).then(function () {
                                                return e.open(r).then(function (r) {
                                                    var n = i.defer();
                                                    return "success" != r ? i.reject() : (s(e, 0, 18e4).then(function () {
                                                        setTimeout(function () {
                                                            var r = e.renderBase64(t.format || f);
                                                            r.then(function (r) {
                                                                e.close();
                                                                var o = new Buffer(r, "base64");
                                                                n.resolve({
                                                                    name: t.name,
                                                                    img: o,
                                                                    format: t.format || f
                                                                })
                                                            }, function (e) {
                                                                n.reject()
                                                            })
                                                        }, 5e4)
                                                    }), n.promise)
                                                })
                                            })
                                        })
                                    }))
                                }), i.all(u).then(function (n) {
                                    c.sendMail({
                                        text: "Report for " + r.map(function (e) {
                                            return e.name
                                        }).join(", ") + String.fromCharCode(13) + e.body.description || "",
                                        to: o.map(function (e) {
                                            return e.email ? "<" + e.email + ">" : ""
                                        }).join(", "),
                                        subject: "Content Burst " + (e.body.title || "Report") + " (" + (e.body.description || "") + ")",
                                        attachment: n.map(function (e, t) {
                                            return {
                                                data: e.img,
                                                name: e.name + "." + e.format
                                            }
                                        })
                                    }, function (e, r) {
                                        return e ? t.status(500).send("Send emails error." + e) : void t.status(200).send("OK")
                                    })
                                }, function (e) {
                                    return t.status(500).send("Get screenshots error." + e)
                                }).finally(function () {
                                    y--, y <= 0 && (I.info("exit phantom"), a.exit())
                                })
                            })
                        }, function (e) {
                            t.status(500).send("Error create user session:" + e)
                        })
                    }, function (e) {
                        t.status(500).send("Error get receivers:" + e)
                    })
                } catch (e) {
                    I.error("ContentBurst error: " + e)
                }
            }), e.post("/contentBurst", t, function (e, t) {
                if (!e.body.title) return t.status(400).send("Title is required");
                if (!e.body.cronExpression) return t.status(400).send("Cron expression is required");
                if (!e.body.metaData.documents) return t.status(400).send("No documents to burst");
                if (!e.body.metaData.receivers) return t.status(400).send("No receivers are presented");
                var n = {
                    title: e.body.title,
                    description: e.body.description || "",
                    status: e.body.status || "active",
                    cronExpression: e.body.cronExpression,
                    metaData: e.body.metaData
                };
                n.metaData.siteId = e.user.siteId, n.metaData.userId = e.user.userId, r(e, {
                    method: "post",
                    action: "add"
                }, n, function (e, r) {
                    return e ? t.status(500).send("Error create contentBurst: " + e) : void t.status(201).send(r)
                })
            }), e.put("/contentBurst/:cbId", t, function (e, t) {
                if (!e.params.cbId || e.params.cbId.length < 12) return t.status(400).send("Invalid content Burst Id [" + e.params.cbId + "]");
                var n = {
                    title: e.body.title,
                    description: e.body.description || "",
                    status: e.body.status || "active",
                    cronExpression: e.body.cronExpression,
                    _id: e.params.cbId,
                    metaData: e.body.metaData
                };
                n.metaData.siteId = e.user.siteId, n.metaData.userId = e.user.userId, r(e, {
                    method: "put",
                    action: "update"
                }, n, function (e, r) {
                    return e ? t.status(500).send("Error update contentBurst: " + e) : void t.status(201).send(r)
                })
            }), e.put("/contentBurst/runNow/:cbId", t, function (e, t) {
                return !e.params.cbId || e.params.cbId.length < 12 ? t.status(400).send("Invalid content Burst Id [" + e.params.cbId + "]") : void r(e, {
                    method: "put",
                    action: "runNow"
                }, {
                    _id: e.params.cbId
                }, function (e, r) {
                    return e ? t.status(500).send("Error runNow contentBurst: " + e) : void t.status(201).send(r)
                })
            }), e.delete("/contentBurst/:cbId", t, function (e, t) {
                return !e.params.cbId || e.params.cbId.length < 12 ? t.status(400).send("Invalid content Burst Id [" + e.params.cbId + "]") : void r(e, {
                    method: "delete",
                    action: "delete"
                }, {
                    _id: e.params.cbId
                }, function (e, r) {
                    return e ? t.status(500).send("Error delete contentBurst: " + e) : void t.status(201).send({
                        success: r.success
                    })
                })
            })
        }
    }.call(this, cachedModules[9136], cachedModules[9136].exports), cachedModules[3074] = {
        exports: {}
    },
    function (e, t) {
        function r(e, t, r, s) {
            s = s || function () {};
            var i = o.defaults({
                jar: !0
            });
            r.category = "DocumentAlert", r.runUrl = (n.server.https.enabled ? "https" : "http") + "://" + e.headers.host + "/documentalert";
            var d = {
                method: t.method,
                headers: {
                    "x-auth-token": e.headers["x-auth-token"]
                },
                uri: (n.taskController.protocol || (n.server.https.enabled ? "https" : "http")) + "://" + n.taskController.host + ":" + (n.taskController.port || n.server.port) + "/taskController/tasks/" + t.action,
                json: !0,
                body: r
            };
            n.server.https.enabled && (d.strictSSL = !1), i(d, function (e, t, r) {
                return e ? s(e) : t && 2 == t.statusCode.toString()[0] ? void s(null, r) : s("Invalid response " + (t ? t.statusCode : "No response") + r)
            })
        }
        var n = require("./lib_external/config"),
            o = require("request"),
            s = cachedModules[2965].exports,
            i = cachedModules[4568].exports,
            d = require("q"),
            a = (cachedModules[1682].exports, cachedModules[3760].exports);
        e.exports = function (e) {
            function t(e, t) {
                var r = [];
                return t.forEach(function (t) {
                    for (var n = 0; n < e.length; n++)
                        for (var o = 0; o < t.Row.Tuples.length; o++)
                            for (var s = 0; s < t.Column.Tuples.length; s++) {
                                var i;
                                i = "ColumnAxis" == e[n].Measure.AxisType ? t.Measures[t.Column.Tuples[s].Members[t.Column.Tuples[s].Members.length - 1].Index] : t.Measures[t.Row.Tuples[o].Members[t.Row.Tuples[o].Members.length - 1].Index];
                                var d = !0;
                                if (e[n].Member) {
                                    d = !1;
                                    var a = "ColumnAxis" == e[n].Attribute.AxisType ? t.Column.Tuples[s] : t.Row.Tuples[o];
                                    a.Members.forEach(function (t) {
                                        t.UniqueName == e[n].Member.UniqueName && (d = !0)
                                    })
                                }
                                if (d && i.UniqueName == e[n].Measure.UniqueName) {
                                    var c = t.Cells[o * t.Column.Tuples.length + s];
                                    if (c)
                                        for (var l in c.Values) {
                                            var f = u(parseFloat(c.Values[l]), e[n].Value, e[n].Condition);
                                            r.push({
                                                alertCondition: e[n],
                                                checkResult: f
                                            }), f && !e[n].Member && (o = t.Row.Tuples.length, s = t.Column.Tuples.length), e[n].Member && (o = t.Row.Tuples.length, s = t.Column.Tuples.length)
                                        }
                                }
                            }
                }), r
            }
            function u(e, t, r) {
                switch (r) {
                case ">":
                    return e > t;
                case ">=":
                    return e >= t;
                case "<":
                    return e < t;
                case "<=":
                    return e <= t;
                case "=":
                    return e == t;
                default:
                    return !1
                }
            }
            function c(e) {
                var t = Q.defer(),
                    r = e.map(function (e) {
                        return e.userId
                    });
                return a.Users().then(function (e) {
                    e.find({
                        _id: {
                            $in: r
                        },
                        email: {
                            $exists: !0,
                            $ne: ""
                        }
                    }, function (e, r) {
                        if (e || !r) return t.reject("Error get receiver users info! " + (e || "Users are not found"));
                        var n = [];
                        (r || []).forEach(function (e) {
                            e.email && n.push({
                                email: e.email
                            })
                        }), t.resolve(n)
                    })
                }, function (e) {
                    t.reject("Connection error:" + e)
                }), t.promise
            }
            function l(e, t) {
                return e.reduce(function (e, r, n, o) {
                    return "Or" == t ? e.alertCondition ? e.checkResult || r.checkResult : e || r.checkResult : "And" == t ? e.alertCondition ? e.checkResult && r.checkResult : e && r.checkResult : void 0
                })
            }
            function f(e, t, r) {
                var s = d.defer(),
                    i = o.defaults({
                        jar: !0
                    }),
                    a = {
                        uri: "http://" + n.queryProcessor.host + ":" + n.queryProcessor.port + "/query?siteId=" + r,
                        method: "post",
                        headers: {
                            referer: e.get("Referrer")
                        },
                        followRedirect: !1
                    };
                return a.body = {
                    Query: t
                }, a.json = !0, i(a, function (e, t, r) {
                    e ? s.reject(e) : s.resolve(r)
                }), s.promise
            }
            function c(e) {
                var t = d.defer(),
                    r = e.map(function (e) {
                        return e._id
                    });
                return a.Users().then(function (e) {
                    e.find({
                        _id: {
                            $in: r
                        },
                        email: {
                            $exists: !0,
                            $ne: ""
                        }
                    }, function (e, r) {
                        if (e || !r) return t.reject("Error get receiver users info! " + (e || "Users are not found"));
                        var n = [];
                        (r || []).forEach(function (e) {
                            e.email && n.push({
                                email: e.email
                            })
                        }), t.resolve(n)
                    })
                }, function (e) {
                    t.reject("Connection error:" + e)
                }), t.promise
            }
            function p(e, t, r, n) {
                var o = [];
                c(r).then(function (r) {
                    for (var i = 0; i < r.length; i++) {
                        o.push(r[i].email);
                        var d = {
                            from: "",
                            to: o.join(","),
                            subject: e,
                            text: t
                        };
                        s.sendMail(d, function (e, t) {
                            if (!e) return n.status(200).send("OK")
                        })
                    }
                })
            }
            e.post("/documentalert", function (e, r) {
                var n = e.body.metaData.documentAlert,
                    o = n.MainQuery,
                    s = n.Recipients,
                    i = n.Subject,
                    d = n.SiteId,
                    a = n.reportLink;
                f(e, o, d).then(function (e) {
                    var o = !1,
                        d = t(n.Conditions, e);
                    if (d.length > 0) {
                        o = l(d, n.ConditionType);
                        var u = "InstaBI alert notification. " + String.fromCharCode(13);
                        d.forEach(function (e) {
                            if (n && e.checkResult) {
                                var t = e.alertCondition;
                                u += "Attribute: " + t.Attribute.Caption + ", ", t.Member && (u += "Attribute Member: " + t.Member.Caption + ", "), u += "measure: " + t.Measure.Caption + t.Condition + t.Value + "." + String.fromCharCode(13), u += "Report link: " + a + String.fromCharCode(13)
                            }
                        }), o && p(i, u, s, r)
                    }
                }, function (e) {})
            }), e.post("/documentalert/save", i.requireAuth, function (e, t) {
                r(e, {
                    action: "add",
                    method: "POST"
                }, e.body.task, function (e, r) {
                    return e ? t.status(500).send("Can\'t save task" + e) : void t.status(200).send(r)
                })
            })
        }
    }.call(this, cachedModules[3074], cachedModules[3074].exports), cachedModules[1297] = {
        exports: {}
    },
    function (e, t) {
        function r() {}
        function n(e) {
            var t = o.Schema({
                    name: {
                        type: String
                    },
                    cronExpression: {
                        type: String
                    },
                    category: {
                        type: String
                    },
                    active: {
                        type: Boolean
                    }
                }, {
                    read: i.mongoose.replSetRead || "nearest"
                }),
                n = e.model(d, t);
            n.Init = function (e) {
                e = e || r, n.findOne({}).exec(function (t, r) {
                    return t || r ? e(t, r) : void n.insertMany([new n({
                        name: "Every 10 minutes",
                        cronExpression: "0 */10 * * * *",
                        category: "common",
                        active: !0
                    }), new n({
                        name: "Every 30 minutes",
                        cronExpression: "0 */30 * * * *",
                        category: "common",
                        active: !0
                    }), new n({
                        name: "Every 1 hour",
                        cronExpression: "0 0 */1 * * *",
                        category: "common",
                        active: !0
                    }), new n({
                        name: "Every Day at 12AM",
                        cronExpression: "0 0 12 * * *",
                        category: "common",
                        active: !0
                    })], e)
                })
            }
        }
        var o = (require("q"), require("mongoose")),
            s = cachedModules[4524].exports,
            i = require("./lib_external/config"),
            d = "Schedule";
        e.exports = s.registerModel(d, n)
    }.call(this, cachedModules[1297], cachedModules[1297].exports), cachedModules[7825] = {
        exports: {}
    },
    function (e, t) {
        var r = cachedModules[4568].exports,
            n = cachedModules[1297].exports,
            o = (cachedModules[3760].exports, require("cron-parser"));
        e.exports = function (e) {
            e.get("/schedules/:category", r.requireAuth, function (e, t) {
                var r = {};
                e.params.category && "all" != e.params.category && (r.category = e.params.category), n(e.user.dbPath).then(function (e) {
                    e.find({}, function (r, n) {
                        return r ? t.status(500).send("Error find schedules: " + r) : void(0 == n.length ? e.Init(function (e, r) {
                            return e ? t.status(500).send("Error init schedules: " + e) : void t.status(201).send(r)
                        }) : t.status(201).send(n))
                    })
                })
            }), e.post("/schedules", r.requireAuth, function (e, t) {
                if (!e.body) return t.status(400).send("Empty schedule body");
                if (!e.body.cronExpression) return t.status(400).send("Empty cron expression");
                try {
                    o.parseExpression(e.body.cronExpression)
                } catch (e) {
                    return t.status(400).send("Invalid cron expression: " + e.message)
                }
                n(e.user.dbPath).then(function (r) {
                    var n = new r({
                        name: e.body.name,
                        category: e.body.category || "common",
                        cronExpression: e.body.cronExpression,
                        active: !!e.body.active
                    });
                    n.save(function (e, r) {
                        return e ? t.status(500).send("Error create schedule: " + e) : void t.status(201).send(r)
                    })
                })
            }), e.put("/schedules/:scheduleId", r.requireAuth, function (e, t) {
                var r = e.params.scheduleId;
                if (r.length < 12) return t.status(400).send("Invalid scheduleId");
                if (!e.body) return t.status(400).send("Empty schedule object");
                if (!e.body.cronExpression) return t.status(400).send("Empty cron expression");
                try {
                    o.parseExpression(e.body.cronExpression)
                } catch (e) {
                    return t.status(400).send("Invalid cron expression " + e.message)
                }
                n(e.user.dbPath).then(function (n) {
                    n.findOne({
                        _id: r
                    }, function (r, n) {
                        return r || !n ? t.status(500).send("Error find schedule: " + (r || "Not found!")) : (n.name = e.body.name, n.category = e.body.category || "common", n.cronExpression = e.body.cronExpression, n.active = !!e.body.active, void n.save(function (e, r) {
                            return e ? t.status(500).send("Error update schedule " + e) : void t.status(201).send(r)
                        }))
                    })
                })
            }), e.delete("/schedules/:scheduleId", r.requireAuth, function (e, t) {
                var r = e.params.scheduleId;
                return r.length < 12 ? t.status(400).send("Invalid scheduleId") : void n(e.user.dbPath).then(function (e) {
                    e.findOneAndRemove({
                        _id: r
                    }).exec(function (e) {
                        return e ? t.status(500).send("Error remove schedule: " + e) : void t.status(201).send({
                            success: !0
                        })
                    })
                })
            })
        }
    }.call(this, cachedModules[7825], cachedModules[7825].exports), cachedModules[8139] = {
        exports: {}
    },
    function (e, t) {
        var r = require("q"),
            n = cachedModules[4568].exports,
            o = require("./lib_external/config"),
            s = cachedModules[4585].exports,
            i = cachedModules[3760].exports.UserSettings;
        e.exports = function (e) {
            e.get("/languages", function (e, t) {
                n.isAuthenticated(e, function (n, d) {
                    var a = r.defer(),
                        u = e.user && e.user.userName ? e.user : d;
                    n && u && u.userId ? i().then(function (e) {
                        e.getSetting(u.userId, "language", function (e, t) {
                            return e || !t ? a.resolve(null) : void a.resolve(t.settingObject)
                        })
                    }) : a.resolve(null), a.promise.then(function (e) {
                        var r = {
                            default: o.client.defaultLanguage,
                            supportLanguages: s.language.getLanguageObject(o.client.languageSet)
                        };
                        null != e && (r.userSettings = e);
                        var n = JSON.stringify(r).replace(/[\u007F-\uFFFF]/g, function (e) {
                            return String.fromCharCode(92) + "u" + ("0000" + e.charCodeAt(0).toString(16)).substr(-4)
                        });
                        t.status(200).send(n)
                    })
                })
            }), e.post("/languages/saveSettings", n.requireAuth, function (e, t) {
                return e.body.language ? void i().then(function (r) {
                    r.setSetting(e.user.userId, "language", e.body.language, function (e, r) {
                        return e ? t.status(500).send("Error set language settings! " + e) : void t.status(201).send(r)
                    })
                }) : t.status(500).send("Invalid language setting: " + e.body.language)
            })
        }
    }.call(this, cachedModules[8139], cachedModules[8139].exports), cachedModules[9566] = {
        exports: {}
    },
    function (e, t) {
        function r(e, t, r, s) {
            s = s || function () {};
            var i = n.defaults({
                    jar: !0
                }),
                d = {
                    method: t.method,
                    headers: {
                        "x-auth-token": e.headers["x-auth-token"]
                    },
                    uri: (o.taskController.protocol || (o.server.https.enabled ? "https" : "http")) + "://" + o.taskController.host + ":" + (o.taskController.port || o.server.port) + "/taskController/tasks/" + t.action,
                    json: !0,
                    body: r
                };
            o.server.https.enabled && (d.strictSSL = !1), i(d, function (e, t, r) {
                return e ? s(JSON.stringify(e)) : t && t.statusCode && 2 == t.statusCode.toString()[0] ? void s(null, r) : s("Invalid response " + (t ? t.statusCode : "No response") + r)
            })
        }
        var n = require("request"),
            o = require("./lib_external/config"),
            s = cachedModules[4568].exports;
        e.exports = function (e) {
            e.use("/tasks/:action", s.requireAuth, function (e, t) {
                console.log({
                    method: e.method,
                    action: e.action
                }), r(e, {
                    method: e.method,
                    action: e.params.action
                }, e.body, function (e, r) {
                    return e ? t.status(500).send("Error get tasks: " + e) : void t.status(201).send(r)
                })
            }), e.put("/tasks/runNow", s.requireAuth, function (e, t) {
                return !e.body._id || e.body._id.length < 12 ? t.status(400).send("Invalid Task Id [" + e.body._id + "]") : void r(e, {
                    method: "PUT",
                    action: "runNow"
                }, {
                    _id: e.body._id
                }, function (e, r) {
                    return e ? t.status(500).send("Error run task: " + e) : void t.status(201).send(r)
                })
            })
        }
    }.call(this, cachedModules[9566], cachedModules[9566].exports), cachedModules[3180] = {
        exports: {}
    },
    function (e, t) {
        var r = (require("fs"), require("path")),
            n = require("express"),
            o = require("cors"),
            s = require("serve-static"),
            i = require("compression"),
            d = require("body-parser"),
            a = require("cookie-parser"),
            u = require("express-session"),
            c = require("passport"),
            l = cachedModules[4568].exports,
            f = (cachedModules[3062].exports, cachedModules[8271].exports),
            p = (cachedModules[1220].exports, cachedModules[4823].exports, cachedModules[5513].exports),
            h = require("mongoose"),
            m = cachedModules[4524].exports,
            b = cachedModules[7574].exports,
            v = require("./lib_external/config"),
            g = cachedModules[4989].exports,
            I = cachedModules[2826].exports,
            y = cachedModules[1499].exports,
            x = cachedModules[7777].exports,
            M = cachedModules[502].exports,
            S = (cachedModules[4585].exports, cachedModules[2049].exports),
            P = cachedModules[7958].exports,
            N = P(),
            w = require("cluster");
        e.exports = function (e) {
            if (v.version = "1.0", x.init(), v.server.staticContent.enablegzip && e.use(i()), e.use(n.static(__dirname + "/public", v.server.staticContent.enableCaching ? {
                    maxAge: v.server.staticContent.cachePeriod
                } : {})), N.info("apps root", r.resolve(v.rootDir + "/client/" + v.client.rootPath)), v.server.cors.enabled && e.use(o(v.server.cors)), e.use(v.client.staticPath, s(r.resolve(v.rootDir + "/client/vendors"))), v.server.sso.enabled && N.info("SSO is enabled"), e.use(d.urlencoded({
                    limit: "100mb",
                    extended: !0
                })), e.use(a()), e.use(u({
                    resave: !0,
                    saveUninitialized: !0,
                    secret: "session secret phrase",
                    cookie: {
                        maxAge: 6048e5
                    }
                })), e.use(c.initialize()), e.enable("trust proxy"), v.server.auth.session && e.use(c.session()), w.isMaster) {
                var t = !1;
                process.argv.forEach(function (e, r, n) {
                    e.toLowerCase().indexOf("reinitdb") != -1 && (t = !0)
                }), I.reInitMasterAndAllSites(t, function (e) {
                    e ? N.error(e) : N.log("Reinit successfull")
                })
            }
            e.get(/\/apps\/(shell|dashboard|report)\/index.html/, function (e, t) {
                function n(r, n) {
                    var o = "";
                    e.query.siteId && (o += "&siteId=" + e.query.siteId), t.cookie("idp", "1", {
                        maxAge: 9e5,
                        httpOnly: !0
                    }), r ? o += "&ssoError=" + encodeURIComponent(r) : n && (o += "&accessToken=" + encodeURIComponent(n)), e.originalUrl = e.originalUrl.replace("ssoError=" + (e.query.ssoError || ""), ""), e.originalUrl = e.originalUrl.replace("ssoUser=" + (e.query.ssoUser || ""), ""), t.set("X-Frame-Options", "SAMEORIGIN"), t.redirect("/apps/login/index.html?dest=" + encodeURIComponent(e.originalUrl) + o)
                }
                var o = "";
                if (v.server.sso.enabled && (e.query.ssoError || e.query.ssoUser)) {
                    if (e.query.ssoError) return n(decodeURIComponent(e.query.ssoError));
                    try {
                        o = S.decodeToken(e.query.ssoUser), o && o.userName || n("Invalid user code: " + e.query.ssoUser)
                    } catch (e) {
                        return n("Unable to decode user code")
                    }
                    e.query.siteId && (e.body.siteId = e.query.siteId), l.ssoAuthenticate(e, o.userName, function (e, t) {
                        n(e, t ? t.accessToken : null)
                    })
                } else if (e.cookies && "1" == e.cookies.l || e.query && "1" == e.query.l) {
                    var s = e.originalUrl.indexOf("index.html"),
                        i = e.originalUrl.substr(0, s + 10);
                    t.clearCookie("l"), console.log(r.resolve(i.replace("/apps", v.rootDir + "/client/" + v.client.rootPath))), t.sendFile(r.resolve(i.replace("/apps", v.rootDir + "/client/" + v.client.rootPath)), function (e) {
                        e && N.log("send error", e)
                    })
                } else {
                    var d = "";
                    e.query.siteId && (d += "&siteId=" + e.query.siteId), e.query.accessToken && (d += "&accessToken=" + encodeURIComponent(e.query.accessToken)), t.set("X-Frame-Options", "SAMEORIGIN"), t.redirect("/apps/login/index.html?dest=" + encodeURIComponent(e.originalUrl) + d)
                }
            }), M.init();
            var q = {
                auth: l,
                permissions: f,
                config: v,
                mongoose: h,
                mongooseLib: m,
                models: b,
                authServices: M,
                loggerLib: P
            };
            y.initPlugins(q, e, n), y.registerProxy(q, e, n), e.use(d.json({
                limit: "10mb"
            })), y.registerRoutes(q, e, n), Object.keys(p.modules).forEach(function (t) {
                try {
                    var r = p.modules[t].initModule(e);
                    N.log("Load module", t + "..." + (r ? "OK" : "Failed"))
                } catch (e) {
                    N.error("Error load module [" + t + "] " + e)
                }
            }), e.use("/apps", s(r.resolve(v.rootDir + "/client/" + v.client.rootPath), v.server.staticContent.enableCaching ? {
                maxAge: v.server.staticContent.cachePeriod
            } : {})), e.get("/redirectIndex", function (e, t) {
                notExistingObject.notExistingMethod(), process.exit()
            }), e.use("/basicRepoPaths", l.requireAuth, function (e, t) {
                t.status(201).send(p.basicRepoPaths())
            }), e.use("/modules", l.requireAuth, function (e, t) {
                var r = p.startApi().concat(y.startApi());
                t.status(201).send(r)
            }), e.use(v.queryProcessor.apiPrefix + "/*", l.requireAuth, f.requireProjectPermissions, f.requireDataSourcePermissions, f.requirePreSlice, g(v.queryProcessor)), e.use(v.exporter.apiPrefix + "/*", l.requireAuth, f.requirePreSlice, g(v.exporter)), e.use(v.realTimeServer.apiPrefix + "/*", g(v.realTimeServer)), e.get("/", function (e, t) {
                t.redirect("/apps/shell/index.html")
            }), cachedModules[792].exports;
            var _ = cachedModules[5827].exports,
                O = cachedModules[463].exports,
                D = cachedModules[922].exports,
                A = cachedModules[1084].exports,
                U = cachedModules[2664].exports,
                T = cachedModules[1497].exports,
                j = cachedModules[1941].exports,
                C = cachedModules[5406].exports,
                k = cachedModules[5005].exports,
                E = cachedModules[4684].exports,
                R = cachedModules[8822].exports,
                F = cachedModules[4796].exports,
                L = cachedModules[9077].exports,
                $ = cachedModules[8417].exports,
                B = cachedModules[437].exports,
                G = cachedModules[1731].exports,
                z = cachedModules[5410].exports,
                W = cachedModules[3045].exports,
                H = cachedModules[805].exports,
                Y = cachedModules[1761].exports,
                V = cachedModules[9136].exports,
                Q = cachedModules[3074].exports,
                K = cachedModules[7825].exports,
                J = cachedModules[8139].exports,
                X = cachedModules[9566].exports;
            _(e), O(e), D(e), A(e), U(e), T(e), j(e), C(e), k(e), E(e), R(e), F(e), L(e), $(e), B(e), G(e), z(e), W(e), H(e), Y(e), V(e), Q(e), K(e), J(e), X(e), e.use(function (e, t, r, n) {
                N.error(e && e.stack ? e.stack : e), r.status(500).send(e), r.end()
            })
        }
    }.call(this, cachedModules[3180], cachedModules[3180].exports);
var fs = require("fs"),
    path = require("path"),
    config = require("./lib_external/config");
config.rootDir = path.resolve(__dirname + "/../");
var asService = cachedModules[3183].exports,
    express = require("express"),
    https = require("https"),
    cluster = require("cluster"),
    clusterizator = cachedModules[8268].exports,
    worker = cachedModules[1700].exports,
    loggerLib = cachedModules[7958].exports,
    logger = loggerLib();
asService(function () {
    function e(e, t) {
        t && logger.info("PID", process.pid, t), e && (logger.error("PID", process.pid, e && e.stack ? e.stack : e), cluster.isMaster && "exit" == t && process.exit(999))
    }
    process.on("exit", function (t) {
        e(999 == t ? "Exit Program" : null, 999 == t ? "exit" : "Exit code: " + t)
    }), process.on("SIGINT", function () {
        e("Received SIGINT.", "exit")
    }), process.on("uncaughtException", function (t) {
        e(t)
    }), logger.info("rootDir", config.rootDir);
    var t = express(),
        r = cachedModules[3180].exports;
    if (r(t), config.clustering.enabled && !config.server.https.enabled) return worker.setApp(t), void clusterizator.init();
    if (config.server.https.enabled) {
        var n = {
            key: config.server.https.key,
            cert: config.server.https.cert,
            ca: []
        };
        fs.existsSync(config.server.https.key) && (n.key = fs.readFileSync(config.server.https.key, "utf8")), fs.existsSync(config.server.https.cert) && (n.cert = fs.readFileSync(config.server.https.cert, "utf8")), config.server.https.ca.length > 0 && config.server.https.ca.forEach(function (e) {
            if (fs.existsSync(e)) {
                var t = fs.readFileSync(e, "utf8").split("undefined"),
                    r = [];
                t.forEach(function (e) {
                    r.push(e), e.match(/-END CERTIFICATE-/) && (n.ca.push(r.join("undefined")), r = [])
                })
            } else n.ca.push(e)
        });
        var o = https.createServer(n, t).listen(config.server.port, "0.0.0.0", function () {
            logger.info("Listening HTTPS server on port %d", o.address().port)
        });
        o.on("error", function (e) {
            switch (logger.error(e.code, e.message), e.code) {
            case "EACCES":
                logger.error(config.server.port + " requires elevated privileges"), process.exit(999);
                break;
            case "EADDRINUSE":
                logger.error(config.server.port + " is already in use"), process.exit(999);
                break;
            default:
                throw error
            }
        }), o.timeout = 36e5
    } else {
        var s = t.listen(config.server.port, function () {
            logger.info("Listening on port %d", s.address().port)
        });
        s.on("error", function (e) {
            switch (e.code) {
            case "EACCES":
                logger.error(config.server.port + " requires elevated privileges"), process.exit(999);
                break;
            case "EADDRINUSE":
                logger.error(config.server.port + " is already in use"), process.exit(999);
                break;
            default:
                throw error
            }
        }), s.timeout = 36e5
    }
});
