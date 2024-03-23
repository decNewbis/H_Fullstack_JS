// task 1

function freezingObj(obj) {
    if (typeof obj === 'object') {
        Object.freeze(obj);
        Object.preventExtensions(obj);
        // review results
        console.log(Object.getOwnPropertyDescriptors(obj));
        console.log('extensible:', Object.isExtensible(obj));
        for (let key in obj) {
            if (typeof obj[key] === 'object') {
                freezingObj(obj[key]);
            }
        }
    }
}

function startApp() {
    const fileSystem = {
        name: "root",
        type: "folder",
        children: [
            {
                name: "folder1",
                type: "folder",
                children: [
                    { name: "file1.txt", type: "file" },
                    { name: "file2.txt", type: "file" }
                ]
            },
            {
                name: "folder2",
                type: "folder",
                children: [
                    { name: "file3.txt", type: "file" }
                ]
            }
        ]
    };

    freezingObj(fileSystem);

    // try to change
    fileSystem.name = 'Alan Sidney Patrick Rickman alive in our hearts!';
    console.log('fileSystem.name:', fileSystem.name); // 'root'
}

startApp();
