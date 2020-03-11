class Person {
	constructor(name, surname, gender, dob) {
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.dob = dob;
	}
}

function isVowel(c) {
    return ['a', 'e', 'i', 'o', 'u', 'а', 'е', 'у', 'о',
    		'и', 'ы', 'і', 'ю', 'я', 'ї', 'э', 'є'].indexOf(c.toLowerCase()) !== -1
}

function codePartSurname(surname) {
	var partSurname = "";

	for (var letter of surname) {
		if (!isVowel(letter)){
			partSurname += letter;	
		}
		if (partSurname.length === 3) {
			return partSurname;
		}
	}

	for (var i=0; partSurname.length-1 < 3; i++) {
		if (surname.length > i) {
			if (isVowel(surname[i])) {
				partSurname += surname[i];	
			}
		}
		else {
			partSurname += "x";
		}
	}

	return partSurname;
}

function codePartName (name) {
	var partName = ["X", "X", "X"];
	var consonants = [];
	var vowels = [];

	for (var letter of name) {
		if (consonants.length === 4) {break;}
		if (!isVowel(letter)) {
			if (consonants.length < 4) {
				consonants.push(letter);
			}
			else {
				partName[1] = partName[2];
				partName[2] = letter;
			}
		}
		else {
			vowels.push(letter)
		}
	}

	partName = consonants.concat(vowels, partName).slice(0, 3);
	return partName.join("");
}

function codeLastChars (citizen) {
	const months = { 1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "H", 7: "L", 8: "M", 9: "P", 10: "R", 11: "S", 12: "T" }

	var dobArray = citizen.dob.split('/');
	lastChars = dobArray[2].slice(2);
	lastChars += months[Number(dobArray[1])];
	lastChars += (citizen.gender.toLowerCase() === "m") ? ((dobArray[0].length > 1) ? dobArray[0] : "0"+dobArray[0]) : (Number(dobArray[0])+40).toString();

	return lastChars;
}

function task1(citizen) {
	var CODE = "";
	CODE += codePartSurname(citizen.surname);
	CODE += codePartName(citizen.name);
	CODE += codeLastChars(citizen);

	return CODE.toUpperCase();
}
//======================  TASK 1  ===============================
var human = new Person("Eric", "Smith", "M", "1/1/1990");
var fiscalCode = task1(human);
console.log("\nTASK 1:\n\t", "fiscalCode:")
console.log("\t"+fiscalCode)
//======================  TASK 1  ===============================




function toArray(object) {
	var newArray = [];
	for (x of Object.keys(object)) {
		newArray.push([x, object[x]])
	}
	return newArray;
}
//======================  TASK 2  ===============================
var task2 = toArray({n: "1", m: "2",})
console.log("\nTASK 2:\n\t", task2)
//======================  TASK 2  ===============================




function ascending(string) {
	var res = true;
	var plusOne = false;
	var array = []

	for (var i = 1; i <= Math.floor(string.length/2); i++) {
		for (var j = 0; j < string.length; j+=i) {
			var newNumber = Number(string.slice(j, j+i+plusOne));
			array.push(newNumber);
			j += plusOne;
			if (newNumber.toString().length + 1 === (newNumber+1).toString().length
				&& newNumber.toString().length === i) {
				plusOne = true;
			}
		}
		plusOne = false;

		res = true;
		for (var l=1; l < array.length; l++) {
			// console.log(array[l], array[l-1])
			if (array[l] - array[l-1] === 1) {
				continue;
			}
			res = false;
		}

		if (res) {return res;}
		array = [];
	}

	return false;
}
//======================  TASK 3  ===============================
var task3 = ascending("123124")
console.log("\nTASK 3:\n\t", task3)
//======================  TASK 3  ===============================
