const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFiles = (files, validExtension = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {

    return new Promise((resolve, reject) => {
        console.log('esto es', files);
        const { file } = files;
        console.log('esto es', files);
        const shortName = file.name.split('.');
        const extension = shortName[shortName.length - 1];

        // Validate Extension 
        if (!validExtension.includes(extension)) {
            return reject(`Extension ${extension} invalid, correct extensions ${validExtension}`)
        }

        const tempName = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', folder, tempName);

        // Use the mv() method to place the file somewhere on your server
        file.mv(uploadPath, function (err) {
            if (err) {
                reject(err);
            }

            resolve(tempName);
        });
    })

}

module.exports = {
    uploadFiles
}