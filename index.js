/**
 * DO NOT MODIFY, I REPEAT, DO NOT MODIFY
 **/

/**
 * Gets an item from a safe
 * @param {string} password - the password for the safe
 * @returns {Promise} promise that resolves or rejects depending on whether the password is correct
 *
 */
async function getItemsFromSafe(password) {
  const itemsMap = {
    "10-A-w-4-878": "Magic Wand",
    "16-R-a-9-1497": "The one ring to rule them all",
    "5-N-3-441": "Corgi",
    "9-Y-d-2-643": "Apples and Pears",
    "7-H-673": "Oscar nomination",
    "12-D-l-4-860": "Chocolate Brownie",
  };
  return new Promise((resolve, reject) => {
    if (itemsMap[password]) {
      resolve(itemsMap[password]);
    } else {
      reject("Unauthorised access to safe");
    }
  });
}
/**
 * END DO NOT MODIFY
 **/

async function unlockSafe(customerName) {
  /**
   * WRITE YOUR CODE IN HERE
   **/
  const addNameLengths = async (fullName) => {
    return await fullName.split(" ").join("").length;
  };
  const capitaliseLastLetterOfFirstName = async (fullName) => {
    const firstNameArr = fullName.split(" ")[0].toUpperCase().split("");
    const len = firstNameArr.length - 1;
    return await firstNameArr[len];
  };
  const lowercaseFirstLetterOfSecondName = async (fullName) => {
    secondNameArr = fullName.split(" ")[1].split("");
    return await secondNameArr[0].toLowerCase();
  };
  const getTotalNumberOfVowelsInName = async (fullName) => {
    return await fullName.match(/[aeiou]/gi).length;
  };
  const removeDuplicateCharacters = async (inputString) => {
    return await [...new Set(inputString.split(""))].join("");
  };
  const removeSpaces = async (inputString) => {
    return await inputString.replace(/\s/g, "");
  };

  const convertToUTF8CharCodeAndReturnTotal = async (fullName) => {
    const deduped = await removeDuplicateCharacters(fullName);
    const noSpaces = await removeSpaces(deduped);
    let total = 0;
    for (x in noSpaces) {
      total += noSpaces[x].toLowerCase().charCodeAt();
    }
    return await total;
  };

  const generatePassword = async () => {
    const vowelsReg = new RegExp("[aeiou]", "i");
    try {
      const passwordArr = [];
      passwordArr.push(await addNameLengths(customerName));
      passwordArr.push(await capitaliseLastLetterOfFirstName(customerName));
      if (customerName.indexOf(" ") > 0) {
        passwordArr.push(await lowercaseFirstLetterOfSecondName(customerName));
      }
      if (customerName.match(vowelsReg)) {
        passwordArr.push(await getTotalNumberOfVowelsInName(customerName));
      }
      passwordArr.push(await convertToUTF8CharCodeAndReturnTotal(customerName));
      const output = await passwordArr.join("-");
      return output;
    } catch (e) {
      console.error(e);
    }
  };
  const passwordString = await generatePassword();
  let output;
  try {
    output = await getItemsFromSafe(passwordString);
  } catch (e) {
    return (output = e);
  }
  return output;
}

module.exports = unlockSafe;
