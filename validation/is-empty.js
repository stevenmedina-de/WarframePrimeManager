/***************************************************************************************
*    Title: MERN Stack Front To Back: Full Stack React, Redux & Node.js
*    Author: Brad Traversy
*    Date: 2018
*    Availability: udemy.com
***************************************************************************************/
const isEmpty = value =>
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0);

module.exports = isEmpty;
