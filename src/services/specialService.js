import {differenceWith} from "lodash";
import db from "../models/index";

require('dotenv').config()

let createSpecial = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!user.avatar || !user.descriptionHTML || !user.descriptionMarkdown || !user.name) {
                resolve({
                    errCode: -1,
                    errMess: "1 Trong 10 truong giong nhu cai tui cua toi (trong)",
                });
            } else {
                // name	descriptionHTML	descriptionMarkdown	img
                await db.Specialty.create({
                    name : user.name,
                    descriptionHTML: user.descriptionHTML,
                    descriptionMarkdown: user.descriptionMarkdown,
                    img: user.avatar
               })
                resolve({
                    errCode: 0,
                    errMess: 'OK'
                })
            }
        } catch (e) {
            reject(e)
        }

    });
``
};

module.exports = {
    createSpecial,
}