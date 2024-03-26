// task 4

function idGen() {
    let idGen = 0;
    function idIncrease() {
        idGen++;
        return idGen;
    }
    return idIncrease;
}

function User(username, email) {
    this.id = idUsers();
    this.username = username;
    this.email = email;
    this.login = function() {
        system.setOnline(this.id);
        console.log(`${this.username} was log in`);
    }
    this.logout = function() {
        system.setOffline(this.id);
        console.log(`${this.username} was log out`);
    }
}

function Admin() {
    this.removeUser = function(userID, requesterID) {
        if (
            system.adminIDList.includes(requesterID)
            && system.activeSessionUserID.includes(requesterID)
            && !system.adminIDList.includes(userID)
        ) {
            delete system.userData[userID];
            system.setOffline(userID);
        }
    };
}

const system = {
    userData: {},
    adminIDList: [],
    activeSessionUserID: [],
    setOnline(userID) {
        if (this.userData[userID] && !this.activeSessionUserID.includes(userID)) {
            this.activeSessionUserID.push(userID);
        }
    },
    setOffline(userID) {
        const indexOfID = this.activeSessionUserID.indexOf(userID);
        if (indexOfID >= 0) {
            this.activeSessionUserID.splice(indexOfID, 1);
        }
    },
    addUser(userObj) {
        if (userObj.id) {
            this.userData[userObj.id] = userObj;
        }
    },
    getOnlineUsers() {
        return this.activeSessionUserID;
    },
    getUser(userID) {
        const userProfile = this.userData[userID];
        if (userProfile) {
            return userProfile;
        }
        return 'User not found';
    },
    setAsAdmin(userID) {
        if (!(this.adminIDList.includes(userID)) && this.userData[userID]) {
            this.adminIDList.push(userID);
        }
    }
}

function addAdminPrototype(obj, proto) {
    Object.setPrototypeOf(obj, proto);
}

function startApp() {
    // create user 'admin'
    const admin = new User('admin', 'admin@company.com');
    const hackAdmin = new User('hackAdmin', 'hackAdmin@company.com');  // bad admin;
    addAdminPrototype(admin, new Admin());
    addAdminPrototype(hackAdmin, new Admin());
    system.addUser(admin);
    system.setAsAdmin(admin.id);
    console.log('admin', admin);
    console.log('admin.username', admin.username);

    // create usernames
    let usernameList = [];
    for (let i = 0; i < 5; i++) {
        usernameList[i] = `user${i + 1}`;
    }
    console.log('usernameList', usernameList);

    // create users and add to system
    for (let username of usernameList) {
        system.addUser(new User(username, `${username}@gmail.com`));
    }
    console.log('system.userData', system.userData);
    console.log('system.getOnlineUsers()', system.getOnlineUsers());

    // log in every one of users
    for (let user of Object.values(system.userData)) {
        user.login();
    }
    console.log('system.getOnlineUsers() after "log in"', system.getOnlineUsers());

    // create hackUser, who not exist in system
    const hackUser = new User('hackatonchik', 'hack@matryoshka.bu');  // bad user;
    hackUser.login();
    console.log(`system.getOnlineUsers() after "hackUser id=${hackUser.id} was log in"`, system.getOnlineUsers());
    console.log(`system.getUser(7) - "hackUser id=${hackUser.id}"`, system.getUser(7));
    console.log(`system.getUser(4) - "hackUser id=${hackUser.id}"`, system.getUser(4));

    // admins permission
    console.log('system.adminIDList', system.adminIDList);
    hackAdmin.removeUser(4, hackAdmin.id);
    console.log('hackAdmin.removeUser(4, hackAdmin.id) -> system.userData', system.userData);
    admin.login();
    admin.removeUser(4, admin.id);
    console.log('admin.removeUser(4, admin.id) -> system.userData', system.userData);
    admin.logout();
    console.log('system.getOnlineUsers()', system.getOnlineUsers());
    admin.removeUser(5, admin.id);
    console.log('admin.logout() -> admin.removeUser(4, admin.id) -> system.userData', system.userData);
    admin.login();
    console.log('system.getOnlineUsers()', system.getOnlineUsers());
    admin.removeUser(admin.id, admin.id);
    console.log('admin.login() -> admin.removeUser(admin.id, admin.id) -> system.userData', system.userData);

    // log out every one of users
    for (let user of Object.values(system.userData)) {
        user.logout();
    }
    console.log('system.getOnlineUsers() after "log in"', system.getOnlineUsers());
}

const idUsers = idGen();

startApp();